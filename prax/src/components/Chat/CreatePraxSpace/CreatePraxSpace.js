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
import ExampleVideoChat from './LioWebRTC' 
import MyComponent from './componentLioWebRTC'


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

    this.videoTag = React.createRef();
    this.state = {
      source: "",
      isVideoLoading: true,
      nick: this.props.nick,
      roomID: `party-${this.props.roomName}`,
      muted: false,
      camPaused: false,
      chatLog: [],
      peers: [],
      // options: {
      //   debug: true,
      //   // autoRequestMedia: true,
      //   // media: {
      //   //     video: true,
      //   //     audio: false
      //   // },
      //   video: null,
      // }
    };
    this.remoteVideos = {};
  }

  





// // get user media
getUserMedia = (err, stream) => {
  // if the browser doesn't support user media
  // or the user says "no" the error gets passed
  // as the first argument.
  if (err) {
    console.log('failed');
  } else {
    console.log('got a stream', stream); 
    navigator.mediaDevices.getUserMedia({video: true, audio: true})
    .then(this.handleVideo)
    .catch(this.videoError) 
  }
};

componentDidMount() {
  // getting access to webcam
 navigator.mediaDevices
      .getUserMedia({video: true})
      .then(stream => this.videoTag.current.srcObject = stream)
      .catch(console.log);
}


  join = (webrtc) => webrtc.joinRoom('my-p2p-app-demo');

  handleCreatedPeer = (webrtc, peer) => {

      // this.setState({ peers: [...this.state.peers, peer] });
    this.addChat(`Peer-${peer.id.substring(0, 5)} joined the room!`, ' ', true);


 
  }

  handleRemovedPeer = () => {
    this.setState({ peers: this.state.peers.filter(p => !p.closed) });
    console.log(this.state.peers)
  }

//   generateRemotes = () => this.state.peers.map((peer) => (
//     <>
    
//     <h1>{`remote-video-${peer.id}`}</h1>
  
//     <RemoteVideo 
//     key={`remote-video-${peer.id}`} 
//     peer={peer}
//     id={this.props.id}
//     srcObject={this.videoTag}
//     width={this.props.width}
//     height={this.props.height}
//     autoPlay
//     title={this.props.title}
//     />
// </>

//     ));

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

  handleCreatedPeer = (webrtc, peer) => {
    this.setState({ peers: [...this.state.peers, peer] });
  }

  handleRemovedPeer = () => {
    this.setState({ peers: this.state.peers.filter(p => !p.closed) });
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






  handleConnectionError = (peer) => {
    const pc = peer.pc;
    console.log('had local relay candidate', pc.hadLocalRelayCandidate);
    console.log('had remote relay candidate', pc.hadRemoteRelayCandidate);
  }

  readyToJoin = () => {
    // Starts the process of joining a room.
    this.webrtc.joinRoom(this.state.roomID, (err, desc) => {
    });
  }



  disconnect = () => {
    this.webrtc.quit();
  }

  componentWillUnmount() {
    this.disconnect();
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
          onCreatedPeer={this.handleCreatedPeer}
          onRemovedPeer={this.handleRemovedPeer} 
          >
      <Posenet id="posenetImport" style={styles.camera}>
      <LocalVideo/>
      </Posenet>
  s
    
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
  


