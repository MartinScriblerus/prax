// import React, { Component } from 'react';
// import { LioWebRTC, LocalVideo, RemoteVideo } from 'react-liowebrtc'
// import Posenet from '../../posenet/components/Camera'

// class ExampleVideoChat extends Component {
 
//   constructor(props) {
//     super(props);
//     this.state = {
//       peers: []
//     };
//   }
 
//   join = (webrtc) => webrtc.joinRoom('video-chat-room-arbitrary-name');
 
//   handleCreatedPeer = (webrtc, peer) => {
//     this.setState({ peers: [...this.state.peers, peer] });
//   }
 
//   handleRemovedPeer = () => {
//     this.setState({ peers: this.state.peers.filter(p => !p.closed) });
//   }
 
//   generateRemotes = () => this.state.peers.map((peer) => (
//     <RemoteVideo key={`remote-video-${peer.id}`} peer={peer} />
//   ));
 
//   render () {
//     return (
//       <LioWebRTC
//         options={{ debug: true }}
//         onReady={this.join}
//         onCreatedPeer={this.handleCreatedPeer}
//         onRemovedPeer={this.handleRemovedPeer}
//       >
   
//       <Posenet>
//       <LocalVideo/>
//       </Posenet>
   
       
//         {
//           this.state.peers &&
//           this.generateRemotes()
//         }
//       </LioWebRTC>
//     )
//   }
// }
 
// export default ExampleVideoChat;