// import React, {useState} from 'react'
// import Metronome from "./metronome.js";
// import Correlator from "./correlator.js";
// import Recorder from "./recorder.js";
// import adapter from 'webrtc-adapter';
// import {signalingServerUrl, stunServerUrl} from "./constants.js";
// import Kick from './Kick.wav'
// import './client.scss'
// import Grid from '@material-ui/core/Grid';

// var signalingChannel, ownId, sessionId; // for Websocket
// var connection; // for RTC
// var audioContext; // for Web Audio API
// var clickBuffer; // click for latency detection
// console.log(clickBuffer)
// var delayNode, userLatency; // needs to be global to access from processAudio
// console.log(delayNode);
// console.log(userLatency)
// var sampleRate;
// var loopLength;
// var recorder;

// export default function ClientLatency(){

// const [sampleRate, setSampleRate] = useState("44100")
// const [tempo, setTempo] = useState("120")
// const [latency, setLatency] = useState("")
// const [sessionId, setSessionId] = useState("")
// const [loopBeats, setLoopBeats] = useState("")

//   document.addEventListener("DOMContentLoaded", initDocument);

//   // We start by associating the event handlers to the frontend.
//   function initDocument()
//   {
//     // Adding event handlers to DOM
//     // document.getElementById("startButton").onclick = startStream;
//     // document.getElementById("stopButton").onclick = stopStream;
  
//     // Creating connection to signaling server
//     signalingChannel = new WebSocket(signalingServerUrl);
//     signalingChannel.onmessage = receiveMessage;
//     signalingChannel.onopen = () =>
//       document.getElementById("startButton");
//   }

// /*                                               * created in gotRemoteStream
// USER                        |                  A
// ----------------------------+------------------+------------------------------
// CLIENT                      |                  |
//                             V                  |
//                      userInputNode        destination
//                             |                  A
//                             V                  |
//                        delay Node              +---------> recordingNode*
//                             |                  |
//                1            V 0                | 0          1
// metronome -----> channelMergerNode     channelSplitterNode* ----> correlator*
//                             |                  A
//                             V                  |
//                     serverOutputNode    serverInputNode*
// CLIENT                      |                  A
// ----------------------------+------------------+------------------------------
// SERVER                      V                  |
// */

// async function startStream()
// {
//   var userInputStream, description, userInputNode, serverOutputNode,
//     channelMergerNode, metronome, tempo, loopBeats;

//   // Disable UI
//   document.getElementById("sessionId")
//   document.getElementById("sampleRate")
//   document.getElementById("loopBeats")
//   document.getElementById("tempo")
//   document.getElementById("latency")
//   document.getElementById("startButton");

//   // Get user input
//   let sessionId   = document.getElementById("sessionId").value;
//   let sampleRate  = document.getElementById("sampleRate").value * 1;
//   tempo       = document.getElementById("tempo").value * 1;
//   userLatency = document.getElementById("latency").value / 1000;
//   loopBeats   = document.getElementById("loopBeats").value * 1;

//   // Calculate loop lenght
//   loopLength  = 60/tempo*loopBeats; // Theoretical loop lengh, but
//   loopLength  = Math.round(loopLength*sampleRate/128)*128/sampleRate;
//   tempo       = 60/loopLength*loopBeats;
//   // according to the Web Audio API specification, "If DelayNode is part of a
//   // cycle, then the value of the delayTime attribute is clamped to a minimum
//   // of one render quantum."  We do this explicitly here so we can sync the
//   // metronome.
//   console.log("Loop lengh is %.5f s, tempos is %.1f bpm.", loopLength, tempo);

//   // Getting user media
//   userInputStream = await navigator.mediaDevices.getUserMedia({audio: {
//     echoCancellation: false,
//     noiseSuppression: false,
//     channelCount:     1}});

//   console.log(userInputStream)

//   // TODO: Assign handler to userInputStream.oninactive

//   // Create Web Audio
//   audioContext = new AudioContext({sampleRate});

//   clickBuffer = await loadAudioBuffer(Kick);
  
//   userInputNode     = new MediaStreamAudioSourceNode     (audioContext, {mediaStream: userInputStream});
//   delayNode         = new DelayNode                      (audioContext, {maxDelayTime: loopLength})
//   channelMergerNode = new ChannelMergerNode              (audioContext, {numberOfInputs: 2});
//   serverOutputNode  = new MediaStreamAudioDestinationNode(audioContext);
//   metronome         = new Metronome                      (audioContext, channelMergerNode, 60, clickBuffer, 1);

//   userInputNode.connect(delayNode);
//   delayNode.connect(channelMergerNode, 0, 0);
//   channelMergerNode.connect(serverOutputNode);

//   metronome.start(-1);

// console.log(userInputNode);
// console.log(delayNode);
// console.log(channelMergerNode);
// console.log(serverOutputNode)

//   // Creating RTC connection
//   connection = new RTCPeerConnection({iceServers: [{urls: stunServerUrl}]});

//   connection.onicecandidate          = sendIceCandidate;
//   connection.ontrack                 = gotRemoteStream;
//   connection.onconnectionstatechange = reportConnectionState;

//   connection.addTrack(serverOutputNode.stream.getAudioTracks()[0],
//                       serverOutputNode.stream);

//   // Creating offer
//   description = await connection.createOffer({voiceActivityDetection: false});

//   // Workaround for Chrome, see https://bugs.chromium.org/p/webrtc/issues/detail?id=8133#c25
//   description.sdp = description.sdp.replace("minptime=10",
//                                             "minptime=10;stereo=1;sprop-stereo=1");

//   console.log("Offer SDP:\n%s", description.sdp)
//   await connection.setLocalDescription(description);
//   signal({offer: description, to:sessionId});
// }

// function receiveMessage(event)
// {
//   const data = (event.data);

//   if (data.id)           {console.log("Received own ID: %d.", data.id);                           ownId = data.id;                              }
//   if (data.answer)       {console.log("Answer SDP:\n%s", data.answer.sdp);                        connection.setRemoteDescription(data.answer); }
//   if (data.iceCandidate) {console.log("Received ICE candidate: %s", data.iceCandidate.candidate); connection.addIceCandidate(data.iceCandidate);}
// }

// function reportConnectionState()
// {
//   console.log("Connection state: %s.", connection.connectionState)
// }

// function sendIceCandidate(event)
// {
//   if (event.candidate)
//   {
//     console.log("Sending ICE candidate to signaling server: %s",
//       event.candidate.candidate);
//     signal({iceCandidate: event.candidate, to: sessionId});
//   }
// }

// function gotRemoteStream(event)
// {
//   var mediaStream, serverInputNode, channelSplitterNode;

//   console.log("Got remote media stream.")
//   mediaStream = event.streams[0];

//   // Workaround for Chrome from https://stackoverflow.com/a/54781147
//   new Audio().srcObject = mediaStream;

//   console.log("Creating server input node.")
//   serverInputNode = new MediaStreamAudioSourceNode(audioContext, {mediaStream});

//   console.log("Creating channel splitter node.")
//   channelSplitterNode = new ChannelSplitterNode(audioContext, {numberOfOutputs: 2});
//   serverInputNode.connect(channelSplitterNode);
//   channelSplitterNode.connect(audioContext.destination, 0);

//   console.log("Creating correlator")
//   new Correlator(audioContext, channelSplitterNode, clickBuffer,
//     updateDelayNode, 1);

//   console.log("Creating recorder");
//   const recordingNode = new MediaStreamAudioDestinationNode(audioContext);
//   channelSplitterNode.connect(recordingNode, 0);
//   const downloadButton = document.getElementById("downloadButton");
//   recorder = new Recorder(recordingNode.stream, downloadButton);
//   recorder.start();

//   document.getElementById("stopButton");
// }

// function updateDelayNode(networkLatency)
// {
//   const totalLatency = userLatency + networkLatency;
// console.log(userLatency);
// console.log(networkLatency);
// console.log(totalLatency);

//   console.log("Latency: %.2f ms (user) + %.2f ms (network) = %.2f ms.",
//     1000*userLatency,
//     1000*networkLatency,
//     1000*totalLatency);

//   delayNode.delayTime.value = loopLength - totalLatency;
// }

// function signal(message)
// {
//   message.from = ownId;
//   signalingChannel.send(JSON.stringify(message));
// }

// async function loadAudioBuffer(url)
// {
//   var response, audioData, buffer;

//   console.log("Loading audio data from %s.", url);
//   response = await fetch(url);
//   audioData = await response.arrayBuffer();
//   buffer = await audioContext.decodeAudioData(audioData);
//   console.log("Loaded audio data from %s.", url);  
//   return buffer;
// }

// function stopStream()
// {
//   document.getElementById("stopButton");
//   console.log("Leaving the session");
//   recorder.stop();
//   connection.close();
// }

// const handleSubmit = (evt) => {
//   evt.preventDefault();
//   alert(`Submitting Name ${sampleRate}`)
//   alert(`Submitting Name ${tempo}`)
//   alert(`Submitting Name ${latency}`)
//   alert(`Submitting Name ${sessionId}`)
//   alert(`Submitting Name ${loopBeats}`)
// }

//   return (
//     <Grid item xs={12} id="LatencyGrid">
// <h1>Looper - Client</h1>
// <form onSubmit={handleSubmit}>
// <p>Session ID: <input 
// id="sessionId"
// defaultValue=''
// onChange={e => setSessionId(e.target.value)}
// /></p>
// <p>Latency: <input 
// id="latency"
// defaultValue=''
// onChange={e => setLatency(e.target.value)}
// /> ms</p>
// <p>
//   Sample rate:
//   <select 
//   defaultValue="44100" 
//   id="sampleRate"
//   onChange={e => setSampleRate(e.target.value)}
//   >
//     <option value="44100">44100 Hz</option>
//     <option value="48000">48000 Hz</option>
//   </select>
// </p>
// <p>
//   Tempo:
//   <select defaultValue="120" id="tempo" onChange={e => setTempo(e.target.value)}>
//     <option value="40">40 bpm</option>
//     <option value="42">42 bpm</option>
//     <option value="44">44 bpm</option>
//     <option value="46">46 bpm</option>
//     <option value="48">48 bpm</option>
//     <option value="50">50 bpm</option>
//     <option value="52">52 bpm</option>
//     <option value="54">54 bpm</option>
//     <option value="56">56 bpm</option>
//     <option value="58">58 bpm</option>
//     <option value="60">60 bpm</option>
//     <option value="63">63 bpm</option>
//     <option value="69">69 bpm</option>
//     <option value="72">72 bpm</option>
//     <option value="76">76 bpm</option>
//     <option value="80">80 bpm</option>
//     <option value="84">84 bpm</option>
//     <option value="88">88 bpm</option>
//     <option value="92">92 bpm</option>
//     <option value="96">96 bpm</option>
//     <option value="100">100 bpm</option>
//     <option value="104">104 bpm</option>
//     <option value="108">108 bpm</option>
//     <option value="112">112 bpm</option>
//     <option value="116">116 bpm</option>
//     <option value="120">120 bpm</option>
//     <option value="126">126 bpm</option>
//     <option value="132">132 bpm</option>
//     <option value="138">138 bpm</option>
//     <option value="144">144 bpm</option>
//     <option value="152">152 bpm</option>
//     <option value="160">160 bpm</option>
//     <option value="168">168 bpm</option>
//     <option value="176">176 bpm</option>
//     <option value="184">184 bpm</option>
//     <option value="192">192 bpm</option>
//     <option value="208">208 bpm</option>
//   </select>
// </p>
// Loop Interval:
// <input type="number" id="loopBeats" defaultValue="4" onChange={e => setLoopBeats(e.target.value)}/>
// </form>
// <p>
//   <button id="startButton" className="latencyButton" onClick={()=>startStream()}>Join</button>
//   <button id="stopButton" className="latencyButton" onClick={()=>stopStream()}>Leave</button>
//   <a id="downloadButton">Download</a>
// </p>

// </Grid>
//   )
// }