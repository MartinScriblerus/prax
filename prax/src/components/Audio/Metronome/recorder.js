import React, { Component } from 'react'
import MediaCapturer from 'react-multimedia-capture';
 
export default class Recorder extends Component {

    render() {
        return (
            <div>
                ...
                <h1>Video Recording Example</h1>
                <hr />
 
                <MediaCapturer
                    constraints={{ audio: true, video: true }}
                    timeSlice={10}
                    onGranted={this.handleGranted}
                    onDenied={this.handleDenied}
                    onStart={this.handleStart}
                    onStop={this.handleStop}
                    onPause={this.handlePause}
                    onResume={this.handleResume}
                    onError={this.handleError}
                    onStreamClosed={this.handleStreamClose}
                    render={({ request, start, stop, pause, resume }) => 
                    <div>
               
 
                        {<button onClick={request}>Get Permission</button>}
                        <button onClick={start}>Start</button>
                        <button onClick={stop}>Stop</button>
                        <button onClick={pause}>Pause</button>
                        <button onClick={resume}>Resume</button>
                        
                        <p>Streaming test</p>
                        <video autoPlay></video>
                    </div>
                } />
            </div>
        );
    }
}