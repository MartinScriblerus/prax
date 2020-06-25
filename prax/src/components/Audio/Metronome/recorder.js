import React, { Component } from 'react'
import MediaCapturer from 'react-multimedia-capture';
 
const styles={
    recorderTitle: {
        color: "#50D4F2"
    },
    recorderGrid: {
        width: '100%',
        backgroundColor: "#141013"
    },
}

export default class Recorder extends Component {

    render() {
        return (
            <div style={styles.recorderGrid}>
       

                <hr />
                <h1 style={styles.recorderTitle}>Record Prax</h1>
                <video autoPlay></video>
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
                    <>
               
 
                        {<button className="rtcRoomButton" onClick={request}>Get Permission</button>}
                        <button className="rtcRoomButton" onClick={start}>Start</button>
                        <button className="rtcRoomButton" onClick={stop}>Stop</button>
                        <button className="rtcRoomButton" onClick={pause}>Pause</button>
                        <button className="rtcRoomButton" onClick={resume}>Resume</button>
                        
                   
                    </>
                } />
            </div>
        );
    }
}