import React, { Component } from 'react';
// import WebRTC from './components/WebRTC'
import { LioWebRTC, LocalVideo, RemoteVideo } from 'react-liowebrtc';

import Posenet from '../../posenet/components/Camera.js';
import {PropTypes} from 'prop-types';
import Grid from '@material-ui/core/Grid';
import ChatBox from './chatbox';
import {
  BrowserRouter as Router,
} from "react-router-dom";
var getUserMedia = require('getusermedia');
var attachMediaStream = require('attachmediastream');




const styles = {
  camera : {
    backgroundColor: "#aff",
    color: "#dadcd7",
  },
  video2 : {
    backgroundColor: "#aff",
    color: "#dadcd7",
  },
  outergrid: {
    backgroundColor: "#1F95BF"
  },
  pose: {
    zIndex: 50 
  }
}













export default class CreatePraxSpace extends Component  {

  constructor(props) {
    super(props);

    this.videoRef = React.createRef();
    this.state = {
      isVideoLoading: true,
      nick: this.props.nick,
      roomID: `party-${this.props.roomName}`,
      muted: false,
      camPaused: false,
      chatLog: [],
      peers: [],
      options: {
        debug: true,
        autoRequestMedia: true,
        media: {
            video: true,
            audio: false
        },
        video: null,
      //   video: {
      //     autoplay: true, // automatically play the video stream on the page
      //     mirror: true, // flip the local video to mirror mode (for UX)
      //     muted: true // mute local video stream to prevent echo
      // },
        // data: true
      }
    };
    this.remoteVideos = {};
  }


// get user media
getUserMedia = (err, stream) => {
  // if the browser doesn't support user media
  // or the user says "no" the error gets passed
  // as the first argument.
  if (err) {
    console.log('failed');
  } else {
    console.log('got a stream', stream);  
  }
};





  join = (webrtc) => webrtc.joinRoom('my-p2p-app-demo');

  handleCreatedPeer = (webrtc, peer) => {
    if (peer.id ===undefined){
    this.addChat(`Peer-${peer.id.substring(0, 5)} joined the room!`, ' ', true);
    this.webrtc.on('peerStreamAdded', (stream, peer) => {
      webrtc.attachStream(stream, this.videoRef);
      console.log(webrtc)
    });  
  }
    else {
      return
    }
  }

  handleRemovedPeer = () => {
    this.setState({ peers: this.state.peers.filter(p => !p.closed) });
  }

  readyToJoin = () => {
    // Starts the process of joining a room.
    this.webrtc.joinRoom(this.state.roomID, (err, desc) => {
      
    });
  }

 handlePeerData = (webrtc, type, payload, peer) => {
    switch(type) {
      case 'chat':
        this.addChat(`Peer-${peer.id.substring(0, 5)}`, payload);
        break;
      default:
        return;
    };
  }

  addChat = (name, message, alert = false) => {
    this.setState({ chatLog: this.state.chatLog.concat({
      ...this.props,
      name,
      message: `${message}`,
      timestamp: `${Date.now()}`,
      alert,
    })});
  }

  disconnect = () => {
    this.webrtc.quit();
  }

  render() {
    const { chatLog, options } = this.state;
   
    return(
    <Router> 
    <Grid style={styles.outergrid}>
      <div className="App">
        <LioWebRTC
          options={{ debug: true }}
          onReady={this.join}
          onCreatedPeer={this.handleCreatedPeerVideo}
          onRemovedPeer={this.handleRemovedPeer}         
          >
          <Posenet id="posenetImport" style={styles.camera}/>
        </LioWebRTC>
      </div>

      

      <div className="App">
        <LioWebRTC
        options={options}
        onReady={this.join}
        onCreatedPeer={this.handleCreatedPeer}
        onReceivedPeerData={this.handlePeerData}
        >
          <ChatBox
            chatLog={chatLog}
            onSend={(msg) => msg && this.addChat('Me', msg)}
          />
        </LioWebRTC>
      </div>

  </Grid>
       
    </Router>
    )
  }

}
  

