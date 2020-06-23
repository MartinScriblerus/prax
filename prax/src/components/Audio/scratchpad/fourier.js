import React from 'react';


export default function Fourier(props){

  console.log(props)
  
    // document.addEventListener("DOMContentLoaded", initDocument);

    // function initDocument()
    // {

   
   
 
   
    // }
    
    const sampleRate            = 48000;
    const fftSize               = 32768;
    const smoothingTimeConstant = 0;
    
    // From RFC 7587
    const narrowBand    = Math.round( 4000/sampleRate*fftSize);
    const mediumBand    = Math.round( 6000/sampleRate*fftSize);
    const wideBand      = Math.round( 8000/sampleRate*fftSize);
    const superWideBand = Math.round(12000/sampleRate*fftSize);
    const fullBand      = Math.round(20000/sampleRate*fftSize);
    
    var liveAudioNode, analyserNode;
    console.log(analyserNode)
    
    async function start()
    {
      


      // document.getElementById("startButton").disabled = true;
    
      const audioContext = props.AudioContext
      console.log(audioContext)
  if (audioContext !== undefined){
   liveAudioNode = audioContext.createDelay();
   liveAudioNode.delayTime.value = 5.5;
   var feedback = audioContext.createGain();
   feedback.gain.value = 0.8;
   
   liveAudioNode.connect(feedback);
   feedback.connect(liveAudioNode);
   
   audioContext.connect(liveAudioNode);
   audioContext.connect(audioContext.destination);
   liveAudioNode.connect(audioContext.destination);

      liveAudioNode.start()
  }
 
      const mediaStream = props.remoteStream;
      if (mediaStream !== undefined){
      console.log(mediaStream)
      const userInputNode = new MediaStreamAudioSourceNode(audioContext, {mediaStream});
   console.log({mediaStream});
   console.log(audioContext)
   console.log(userInputNode)
      analyserNode = new AnalyserNode(audioContext, {fftSize, smoothingTimeConstant});
      liveAudioNode.connect(analyserNode);
      userInputNode.connect(analyserNode);
  }
      document.getElementById("setButton");
      document.getElementById("logButton");
    }
    
    function setFrequency()
    {
      const frequency = document.getElementById("frequencyInput").value
      liveAudioNode.frequency.value = frequency;
      console.log(frequency/sampleRate*fftSize);
      }
    
    
    function logFrequencyData()
    {
      const Y = new Uint8Array(fftSize/2);
      analyserNode.getByteFrequencyData(Y)
    
      const narrowBandMax    = arraySliceMax(Y, 0            , narrowBand   );
      const mediumBandMax    = arraySliceMax(Y, narrowBand   , mediumBand   );
      const wideBandMax      = arraySliceMax(Y, mediumBand   , wideBand     );
      const superWideBandMax = arraySliceMax(Y, wideBand     , superWideBand);
      const fullBandMax      = arraySliceMax(Y, superWideBand, fullBand     );
    
      console.log("%d %d %d %d %d", narrowBandMax, mediumBandMax, wideBandMax,
        superWideBandMax, fullBandMax);
    }
   
    function arraySliceMax(array, start, end)
    {
      return array.slice(start, end).reduce((a, b) => Math.max(a, b));
    }

    return(
        <>
        <h1>Fourier Analysis</h1>
       
          <button id="startButton" onClick={()=>{start()}}>Start</button>
          <input id="frequencyInput" defaultValue="440" onClick={()=>{}}/>
          <button id="setButton" onClick={()=>{setFrequency()}}>Set frequency</button>
          <button id="logButton" onClick={()=>{logFrequencyData()}}>Log frequencies</button>
        
          
        
       
        </>
    )
}