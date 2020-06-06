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

const styles = {
  camera : {
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
    this.state = {
      chatLog: [],
      peers: [],
      options: {
        debug: true,
        dataOnly: true
      }
    };
  }


componentDidMount

  
  
  join = (webrtc) => webrtc.joinRoom('my-p2p-app-demo');

  handleCreatedPeer = (webrtc, peer) => {
    this.addChat(`Peer-${peer.id.substring(0, 5)} joined the room!`, ' ', true);
    this.setState({ peers: [...this.state.peers, peer] });
  }
  
  handleRemovedPeer = () => {
    this.setState({ peers: this.state.peers.filter(p => !p.closed) });
  }

  generateRemotes = () => this.state.peers.map((peer) => (
    <RemoteVideo key={`remote-video-${peer.id}`} peer={peer} />
  ));

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
              <LocalVideo />
            {
            this.state.peers &&
            this.generateRemotes()
            }
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

        <div id="cameraDiv" style={styles.camera}>
            <Posenet style={styles.camera}/>
        </div>
        
      </Grid>
       
    </Router>
    )
  }

}
  

