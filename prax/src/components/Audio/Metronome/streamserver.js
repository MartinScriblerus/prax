import React, {useState} from 'react'
import Metronome from "./metronome.js";
import {signalingServerUrl, stunServerUrl} from "./constants.js";
// import "https://webrtc.github.io/adapter/adapter-latest.js"
import Grid from '@material-ui/core/Grid';
import adapter from 'webrtc-adapter';
import './streamserver.scss';
import Kick from './Kick.wav';

console.log(adapter);

var signalingChannel, ownId; // for Websocket 
var connection = []; // For RTC
var audioContext, clientOutputNode, gainNode, delayNode, channelMergerNode,
  sampleRate, loopGain; // for Web Audio API

export default function StreamServer(){
const [loopBeats, setLoopBeats] = useState("4")
const [decay, setDecay] = useState("0.9");
const [metronomeGain, setMetronomeGain] = useState("0.5")

    document.addEventListener("DOMContentLoaded", initDocument);

function initDocument()
{
  // Adding event handlers to DOM.
  document.getElementById("startServerButton").onclick = startServer;

  // Creating connection to signaling server.
  signalingChannel = new WebSocket(signalingServerUrl)
  signalingChannel.onmessage = receiveMessage;
  signalingChannel.onopen = () =>
    document.getElementById("startServerButton").disabled = false;
}

async function startServer(){
  var metronome, loopLength, loopBeats, tempo, metronomeGain;

  // Update UI
  document.getElementById("sampleRate").disabled = true;
  document.getElementById("loopBeats").disabled = true;
  document.getElementById("tempo").disabled = true;
  document.getElementById("loopGain").disabled = true;
  document.getElementById("metronomeGain").disabled = true;
  document.getElementById("startServerButton").disabled = true;

  // Get user input
  sampleRate    = document.getElementById("sampleRate").value;
  loopGain      = document.getElementById("loopGain").value;
  metronomeGain = document.getElementById("metronomeGain").value;
  tempo         = document.getElementById("tempo").value;
  loopBeats     = document.getElementById("loopBeats").value;

  // Adjust loop length and tempo according to the Web Audio API specification:
  // "If DelayNode is part of a cycle, then the value of the delayTime
  // attribute is clamped to a minimum of one render quantum."  We do this
  // explicitly here so we can sync the metronome.
  loopLength = 60/tempo*loopBeats;
  loopLength = Math.round(loopLength*sampleRate/128)*128/sampleRate;
  tempo      = 60/loopLength*loopBeats;
  console.log("Loop lengh is %.5f s, tempo is %.1f bpm.", loopLength, tempo);


  console.log("Creating Web Audio.");
  audioContext      = new AudioContext({sampleRate});
  gainNode          = new GainNode(audioContext, {gain: loopGain});
  delayNode         = new DelayNode(audioContext, {delayTime:    loopLength,
                                                   maxDelayTime: loopLength});
  channelMergerNode = new ChannelMergerNode(audioContext, {numberOfInputs: 2});
  clientOutputNode  = new MediaStreamAudioDestinationNode(audioContext);
  
  gainNode.connect(delayNode);
  delayNode.connect(gainNode);
  gainNode.connect(channelMergerNode, 0, 0);
  channelMergerNode.connect(clientOutputNode);

/*
CLIENT           |                                  A
-----------------+----------------------------------+-------------------------
SERVER           V                                  |
          clientInputNode(s)*                clientOutputNode(s)
                 |                                  A
                 V                                  |
        channelSplitterNode(s)* -----1-----> channelMergerNode(s)
                 |                                  |
                 V                                  |
           clientGainNode(s)*                       |
                 |                                  |
                 +-----0------> gainNode -----0-----+
                                 |    A             |
                                 V    |             |
                                delayNode        metronome
                                                  *created on demand
*/

  const clickBuffer = await loadAudioBuffer(Kick);
  metronome = new Metronome(audioContext, channelMergerNode, tempo,
    clickBuffer, 0, metronomeGain);
  metronome.start();

  console.log("Waiting for offers.")
}

function receiveMessage(message)
{
  var data;

  data = (message.data)

  if (data.id)           receiveIdMessage(data);
  if (data.offer)        receiveOfferMessage(data);
  if (data.iceCandidate) receiveIceCandidateMessage(data);
}

function receiveIdMessage(data)
{
  ownId = data.id;
  console.log("Received own ID: %d.", ownId);
  document.getElementById("sessionId").innerHTML = ownId;
}

async function receiveOfferMessage(data)
{
  var description, clientId;

  clientId = data.from;
  
  console.log("Received offer %o from %s.", data.offer, clientId)

  connection[clientId] = new RTCPeerConnection({iceServers: [{urls: stunServerUrl}]});

  connection[clientId].onicecandidate = function (event)
                                        {
                                          if (event.candidate)
                                          {
                                            console.log("Sending ICE candidate %o to %s", event.candidate, clientId);
                                            signal({iceCandidate: event.candidate, to: clientId});
                                          }  
                                        };

  connection[clientId].ontrack = gotRemoteStream;

  connection[clientId].onconnectionstatechange = function ()
                                                 {
                                                   console.log("State of connection with %s: %s.",
                                                     clientId,
                                                     connection[clientId].connectionState);
                                                 }

  // Sending output to client
  connection[clientId].addTrack(clientOutputNode.stream.getAudioTracks()[0], 
                                clientOutputNode.stream);
  await connection[clientId].setRemoteDescription(data.offer);
  description = await connection[clientId].createAnswer();
  description.sdp = description.sdp.replace("minptime=10",
    "minptime=10;stereo=1;sprop-stereo=1"); // For Chrome, see
    // https://bugs.chromium.org/p/webrtc/issues/detail?id=8133#c25
  console.log("Answer SDP:\n%s", description.sdp)
  await connection[clientId].setLocalDescription(description);
  signal({answer: description, to: clientId});
}

function receiveIceCandidateMessage(data)
{
  const clientId = data.from;
  console.log("Received ICE candidate %o from %s.", data.iceCandidate, clientId);
  connection[clientId].addIceCandidate(data.iceCandidate);
}

function gotRemoteStream(event)
{
  console.log("Got remote media stream.")

  const mediaStream = event.streams[0];
  //const mediaStreamTrack = event.track;

  // Workaround for Chrome from https://stackoverflow.com/a/54781147
  new Audio().srcObject = mediaStream;

  const clientInputNode     = new MediaStreamAudioSourceNode(audioContext, {mediaStream:     mediaStream});
  const channelSplitterNode = new ChannelSplitterNode       (audioContext, {numberOfOutputs: 2          });
  const clientGainNode      = new GainNode                  (audioContext, {gain:            0          });

  clientInputNode.connect(channelSplitterNode);
  channelSplitterNode.connect(channelMergerNode, 1, 1);
  channelSplitterNode.connect(clientGainNode, 0);
  clientGainNode.connect(gainNode);

  clientGainNode.gain.setValueAtTime(0, audioContext.currentTime + 0.5);
  clientGainNode.gain.linearRampToValueAtTime(1, audioContext.currentTime + 1);
  // This is to get rid of the initial "click" when new clients connect.
  // New clients will be silenced for 0.5 seconds, then brought to full volume
  // for another 0.5 seconds. Does not really work. :-(
}

function signal(message)
{
  message.from = ownId;
  signalingChannel.send(JSON.stringify(message));
}

async function loadAudioBuffer(url)
{
  console.log("Loading audio data from %s.", url);

  const response  = await fetch(url);
  const audioData = await response.arrayBuffer();
  const buffer    = await audioContext.decodeAudioData(audioData);

  return buffer;
}
  
const handleSubmit = (evt) => {
  evt.preventDefault();
  alert(`Submitting Name ${loopBeats}`)
  alert(`Submitting Name ${decay}`)
  alert(`Submitting Name ${metronomeGain}`)
}

    return(
<Grid item xs={12} id="LatencyGrid">
<p className="latencyBoxText">
Both players must include matching parameters below:
</p>
<p>
  Sample rate:
  <select defaultValue="44100" id="sampleRate">
    <option value="44100">44100 Hz</option>
    <option value="48000">48000 Hz</option>
  </select>
</p>
<p>
  Set Prax Tempo:
  <select defaultValue="120" id="tempo">
    <option value="40">40 bpm</option>
    <option value="42">42 bpm</option>
    <option value="44">44 bpm</option>
    <option value="46">46 bpm</option>
    <option value="48">48 bpm</option>
    <option value="50">50 bpm</option>
    <option value="52">52 bpm</option>
    <option value="54">54 bpm</option>
    <option value="56">56 bpm</option>
    <option value="58">58 bpm</option>
    <option value="60">60 bpm</option>
    <option value="63">63 bpm</option>
    <option value="69">69 bpm</option>
    <option value="72">72 bpm</option>
    <option value="76">76 bpm</option>
    <option value="80">80 bpm</option>
    <option value="84">84 bpm</option>
    <option value="88">88 bpm</option>
    <option value="92">92 bpm</option>
    <option value="96">96 bpm</option>
    <option value="100">100 bpm</option>
    <option value="104">104 bpm</option>
    <option value="108">108 bpm</option>
    <option value="112">112 bpm</option>
    <option value="116">116 bpm</option>
    <option value="120">120 bpm</option>
    <option value="126">126 bpm</option>
    <option value="132">132 bpm</option>
    <option value="138">138 bpm</option>
    <option value="144">144 bpm</option>
    <option value="152">152 bpm</option>
    <option value="160">160 bpm</option>
    <option value="168">168 bpm</option>
    <option value="176">176 bpm</option>
    <option value="184">184 bpm</option>
    <option value="192">192 bpm</option>
    <option value="208">208 bpm</option>
  </select>
</p>
<br/>
<form onSubmit={handleSubmit}>

<label>  Loop Interval </label>
  <input 
    className="sessionLoopInput" 
    id="loopBeats" 
    defaultValue={loopBeats} 
    onChange={e => setLoopBeats(e.target.value)}
  />

<label>  Decay </label>
  <input 
    className="sessionLoopInput" 
    id="loopGain" 
    defaultValue={decay} 
    onChange={e => setDecay(e.target.value)}
  />

<label> Metronome volume: </label>
  <input 
    className="sessionLoopInput" 
    id="metronomeGain" 
    value={metronomeGain} 
    onChange={e => setMetronomeGain(e.target.value)}
  />
  (pick 0 - 1).
</form>

<button id="startServerButton" disabled>Start Session</button>
<p>Session ID: <span id="sessionId"></span></p>
</Grid>
    )
}