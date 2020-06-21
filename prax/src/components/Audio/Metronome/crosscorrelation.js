import React from 'react';
import Metronome from "./metronome.js";
import Correlator from "./correlator.js";
import Kick from './Kick.wav'
import './crosscorrelation.scss'

var audioContext, sampleRate; // for Web Audio API

export default function CrossCorrelation(props){

  // document.addEventListener("DOMContentLoaded", initDocument);
if (window !== undefined) {
  initDocument()
}
// We start by associating the event handlers to the frontend.
function initDocument()
{
  console.log("Adding event handlers to DOM.")

}

const test = false;
var clickBufferDuration;
var metronome, clickBuffer;
var inputNode, mediaStream;

async function start(){


  sampleRate = document.getElementById("sampleRate").value * 1;
  document.getElementById("sampleRate");
  console.log("Sample rate: %.0f Hz.", sampleRate);

  document.getElementById("startButton");

  console.log("Creating audio context.");
  audioContext = new AudioContext({sampleRate});

  // metronome and input node
  clickBuffer = await loadAudioBuffer(Kick);
  clickBufferDuration = clickBuffer.duration;
  console.log("click buffer duration: %.1f ms.", 1000*clickBufferDuration);

  if (test)
  {
    console.log("Working in simulation mode.")
    inputNode = new DelayNode(audioContext, {delayTime: 12345/sampleRate});
    inputNode.connect(audioContext.destination); // for monitoring

    metronome = new Metronome(audioContext, inputNode, 60, clickBuffer);
  }
  else
  {
    console.log("Working actual mode.")
    if (props.stream !== null || undefined){
      console.log("props= ", props.stream)
    mediaStream = props.stream
    }
    inputNode = new MediaStreamAudioSourceNode(audioContext, {mediaStream});

    metronome = new Metronome(audioContext, audioContext.destination, 60,
      clickBuffer);
  }

  metronome.start(-1);

  console.log("Creating correlator")
  new Correlator(audioContext, inputNode, clickBuffer, updateOutput);

  console.log("running...")
}

async function stop(){
  metronome.stop()
}

function updateOutput(latency)
{
  console.log("Latency: %.2f ms = %.0f samples",
    1000*latency, Math.round(latency*sampleRate));

  document.getElementById("outputSpan").innerHTML =
    Math.round(1000*latency) + " ms"
}

async function loadAudioBuffer(url)
{
  var response, audioData, buffer;

  console.log("Loading audio data from %s.", url);
  response = await fetch(url);
  audioData = await response.arrayBuffer();
  buffer = await audioContext.decodeAudioData(audioData);
  console.log("Loaded audio data from %s.", url);  
  return buffer;
}

return(
  <>
  <h3 id="LatencyDetectorContainer">Looper - Latency Detector</h3>
  <p>
    Sample rate:
    <select defaultValue="44100" id="sampleRate">
      <option value="44100">44100 Hz</option>
      <option value="48000">48000 Hz</option>
    </select>
  </p>

    <button id="startButton" className="latencyDetectorButton" onClick={()=>{start()}}>Start Latency Detector</button>

    <span id="outputSpan"></span>

    
  </>
)
}