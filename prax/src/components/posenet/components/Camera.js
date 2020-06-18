import {drawKeyPoints, drawSkeleton} from './utils'
import React, {Component} from 'react'
import * as posenet from '@tensorflow-models/posenet'
import {socket} from '../../../services/socketIO'
// import { withWebRTC } from 'react-liowebrtc';
import { LioWebRTC } from 'react-liowebrtc'
import ChatBox from '../../Chat/CreatePraxSpace/chatbox';
import firebase from '../../firebase';
import Grid from '@material-ui/core/Grid';
import TimingComponent from '../../Audio/TimingComponent'
import ClientLatencyApp from '../../Audio/Metronome/client'

import './posenet.scss'

const configuration = {
  iceServers: [
    {
      urls: [
        'stun:stun1.l.google.com:19302',
        'stun:stun2.l.google.com:19302',
      ],
    },
  ],
  iceCandidatePoolSize: 10,
};


const styles = {
  video: {
    // display:"none"
    height: '200px',
    width: '200px'
  },
  // THIS IS THE STYLE CONTROLLING CANVAS
  canvas: {
    backgroundColor: "#030303"
  }, 
  joinRoomContainer: {
    backgroundColor: "#aaf0d1"
  },
  container: {
    backgroundColor: '#aff',
  
  },
  btn: {
    backgroundColor: '#212121', 
    color: '#f6deba',
    width: '50%',
    height: '10vh'
  }
}


let peerConnection = null;
let localStream = null;
let remoteStream = null;
// let roomDialog = null;
let roomId = null;

async function createRoom() {
  const db = firebase.firestore();
  const roomRef = await db.collection('rooms').doc();

  console.log('Create PeerConnection with configuration: ', configuration);
  peerConnection = new RTCPeerConnection(configuration);

  // tk added register peer connection listeners based on codelab
registerPeerConnectionListeners();

  localStream.getTracks().forEach(track => {
    peerConnection.addTrack(track, localStream);
  });

    // Code for collecting ICE candidates below
    const callerCandidatesCollection = roomRef.collection('callerCandidates');

    peerConnection.addEventListener('icecandidate', event => {
      if (!event.candidate) {
        console.log('Got final candidate!');
        return;
      }
      console.log('Got candidate: ', event.candidate);
      callerCandidatesCollection.add(event.candidate.toJSON());
    });
    // Code for collecting ICE candidates above
  

  // Code for creating a room below
  const offer = await peerConnection.createOffer();
  await peerConnection.setLocalDescription(offer);
  console.log('Created offer:', offer);

  const roomWithOffer = {
    'offer': {
      type: offer.type,
      sdp: offer.sdp,
    },
  };
  await roomRef.set(roomWithOffer);
  roomId = roomRef.id;
  console.log(`New room created with SDP offer. Room ID: ${roomRef.id}`);
  // Code for creating a room above

  peerConnection.addEventListener('track', event => {
    console.log('Got remote track:', event.streams[0]);
    event.streams[0].getTracks().forEach(track => {
      console.log('Add a track to the remoteStream:', track);
      remoteStream.addTrack(track);
    });
  });

    // Listening for remote session description below
    roomRef.onSnapshot(async snapshot => {
      const data = snapshot.data();
      if (!peerConnection.currentRemoteDescription && data && data.answer) {
        console.log('Got remote description: ', data.answer);
        const rtcSessionDescription = new RTCSessionDescription(data.answer);
        await peerConnection.setRemoteDescription(rtcSessionDescription);
      }
    });
    // Listening for remote session description above

      // Listen for remote ICE candidates below
  roomRef.collection('calleeCandidates').onSnapshot(snapshot => {
    snapshot.docChanges().forEach(async change => {
      if (change.type === 'added') {
        let data = change.doc.data();
        console.log(`Got new remote ICE candidate: ${JSON.stringify(data)}`);
        await peerConnection.addIceCandidate(new RTCIceCandidate(data));
      }
    });
  });
  // Listen for remote ICE candidates above
}
// PICK BACK UP HERE TK
function joinRoom() {
  document.querySelector('#confirmJoinBtn').addEventListener('click', async () => {
        roomId = document.querySelector('#room-id').value;
        console.log('Join room: ', roomId);
        await joinRoomById(roomId);
      }, {once: true});
}
  
async function joinRoomById (roomId) {
    const db = firebase.firestore();
    const roomRef = db.collection('rooms').doc(`${roomId}`);
    const roomSnapshot = await roomRef.get();
    console.log('Got room:', roomSnapshot.exists);
  
    if (roomSnapshot.exists) {
      console.log('Create PeerConnection with configuration: ', configuration);
      peerConnection = new RTCPeerConnection(configuration);
      //added register peer connection listeners based on codelab
      registerPeerConnectionListeners();
      localStream.getTracks().forEach(track => {
        peerConnection.addTrack(track, localStream);
      });
    
        // Code for collecting ICE candidates below
        const calleeCandidatesCollection = roomRef.collection('calleeCandidates');
        peerConnection.addEventListener('icecandidate', event => {
          if (!event.candidate) {
            console.log('Got final candidate!');
            return;
          }
          console.log('Got candidate: ', event.candidate);
          calleeCandidatesCollection.add(event.candidate.toJSON());
        });
        // Code for collecting ICE candidates above
    
        peerConnection.addEventListener('track', event => {
          console.log('Got remote track:', event.streams[0]);
          event.streams[0].getTracks().forEach(track => {
            console.log('Add a track to the remoteStream:', track);
            remoteStream.addTrack(track);
          });
        });

 // Code for creating SDP answer below
 const offer = roomSnapshot.data().offer;
 console.log('Got offer:', offer);
 await peerConnection.setRemoteDescription(new RTCSessionDescription(offer));
 const answer = await peerConnection.createAnswer();
 console.log('Created answer:', answer);
 await peerConnection.setLocalDescription(answer);

 const roomWithAnswer = {
   answer: {
     type: answer.type,
     sdp: answer.sdp,
   },
 };
 await roomRef.update(roomWithAnswer);
 // Code for creating SDP answer above

    // Listening for remote ICE candidates below
    roomRef.collection('callerCandidates').onSnapshot(snapshot => {
      snapshot.docChanges().forEach(async change => {
        if (change.type === 'added') {
          let data = change.doc.data();
          console.log(`Got new remote ICE candidate: ${JSON.stringify(data)}`);
          await peerConnection.addIceCandidate(new RTCIceCandidate(data));
        }
      });
    });
    // Listening for remote ICE candidates above
  }
}
  

async function openUserMedia() {
  const stream = await navigator.mediaDevices.getUserMedia(
      {video: true, audio: true});

      document.querySelector('#localVideo').srcObject = stream;
  localStream = stream;
  remoteStream = new MediaStream();
  document.querySelector('#remoteVideo').srcObject = remoteStream;
  
// tk added querySelectors below based on codelab
console.log('Stream:', document.querySelector('#localVideo').srcObject);
// document.querySelector('#cameraBtn').disabled = true;
// document.querySelector('#joinBtn').disabled = false;
// document.querySelector('#createBtn').disabled = false;
// document.querySelector('#hangupBtn').disabled = false;
}










  async function hangUp(e) {
    const tracks = document.querySelector('#localVideo').srcObject.getTracks();
    tracks.forEach(track => {
      track.stop();
    });
  
    if (remoteStream) {
      remoteStream.getTracks().forEach(track => track.stop());
    }
  
    if (peerConnection) {
      peerConnection.close();
    }

    // tk added querySelectors below based on Codelab 
    document.querySelector('#localVideo').srcObject = null;
    document.querySelector('#remoteVideo').srcObject = null;
    // document.querySelector('#cameraBtn').disabled = false;
    // document.querySelector('#joinBtn').disabled = true;
    // document.querySelector('#createBtn').disabled = true;
    // document.querySelector('#hangupBtn').disabled = true;
    document.querySelector('#currentRoom').innerText = '';

      // Delete room on hangup
  if (roomId) {
    const db = firebase.firestore();
    const roomRef = db.collection('rooms').doc(roomId);
    const calleeCandidates = await roomRef.collection('calleeCandidates').get();
    calleeCandidates.forEach(async candidate => {
      await candidate.ref.delete();
    });
    const callerCandidates = await roomRef.collection('callerCandidates').get();
    callerCandidates.forEach(async candidate => {
      await candidate.ref.delete();
    });
    await roomRef.delete();
  }
  document.location.reload(true);
}

// tk added registerpeerconnection function based on codelab
function registerPeerConnectionListeners() {
  peerConnection.addEventListener('icegatheringstatechange', () => {
    console.log(
        `ICE gathering state changed: ${peerConnection.iceGatheringState}`);
  });

  peerConnection.addEventListener('connectionstatechange', () => {
    console.log(`Connection state change: ${peerConnection.connectionState}`);
  });

  peerConnection.addEventListener('signalingstatechange', () => {
    console.log(`Signaling state change: ${peerConnection.signalingState}`);
  });

  peerConnection.addEventListener('iceconnectionstatechange ', () => {
    console.log(
        `ICE connection state change: ${peerConnection.iceConnectionState}`);
  });
}



export default class PoseNet extends Component {
  static defaultProps = {
    videoWidth: (550),
    videoHeight: (550),
    flipHorizontal: true,
    algorithm: 'single-pose',
    showVideo: false,
    showSkeleton: true,
    showPoints: true,
    minPoseConfidence: 0.2,
    minPartConfidence: 0.3,
    multiplier: 6,
    maxPoseDetections: 2,
    nmsRadius: 2,
    outputStride: 16,
    imageScaleFactor: .2,
    skeletonColor: "#f6deba",
    skeletonLineWidth: 6,
    loadingText: 'Loading...please be patient...'
  }

  constructor(props) {
    super(props, PoseNet.defaultProps)
    this.remoteCanvas = React.createRef();
    this.remoteVideo = React.createRef();
    console.log(props)
    this.state = {
      source: "",
      isVideoLoading: true,
      copySuccess: '', 
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
      }
    };
  }
    state = {
      source: ""
    }
   
    join = (webrtc) => webrtc.joinRoom('video-chat-room-arbitrary-name');
 
    handleCreatedPeer = (webrtc, peer) => {
      console.log(this.props)
      this.setState({ peers: [...this.state.peers, peer] });
      this.addChat(`Peer-${peer.id.substring(0, 5)} joined the room!`, ' ', true);
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

  getCanvas = elem => {
    this.canvas = elem
  }

  getRemoteVideo = async (elem) => {
  await this.video
    this.video = elem
  }

  getRemoteCanvas = async (elem) => {
    await this.remoteVideo
    this.remoteCanvas = elem
    console.log(elem)
  }

  getVideo = elem => {
    this.video = elem
  }

  getRemoteVideo = elem => {
    this.video = elem
  }
  
  async componentDidMount() {
    openUserMedia();
    try {
      await this.setupCamera()
    } catch (error) {
      throw new Error(
        'This browser does not support video capture, or this device does not have a camera'
      )
    }

    try {
      this.posenet = await posenet.load()
    } catch (error) {
      throw new Error('PoseNet failed to load')
    } finally {
      setTimeout(() => {
        this.setState({loading: false})
      }, 2000)
    }
    this.detectPose()

    try {
      function poseFunct(serverDrawPoses){
        console.log("SERVERSIDE DRAW POSES", serverDrawPoses);
        
     
          const remoteCtx = this.remoteCanvas.current.getContext("2d");
          remoteCtx.fillRect(serverDrawPoses, 0, 100, 100);


        }
      socket.on("serverDrawPoses", poseFunct)
      
      socket.on("serverDrawCanvasURL", function (canvasURL){
        
        console.log("SERVERSIDE DRAW CANVAS", canvasURL);


      }) 
    } catch (error) {
      throw new Error('PoseNet failed to load')
    } finally {
      console.log("SOCKETS IN CAMERA COMPONENTDIDMOUNT WORK!")
    }
  

  }

  async setupCamera() {
    await this.video
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      throw new Error(
        'Browser API navigator.mediaDevices.getUserMedia not available'
      )
    }
    const {videoWidth, videoHeight} = this.props
    const video = this.video
    video.width = videoWidth
    video.height = videoHeight


    const stream = await navigator.mediaDevices.getUserMedia({
       audio: false,
      video: {
        facingMode: 'user',
        width: videoWidth,
        height: videoHeight
      }
    })
    await this.stream
    try {
    this.video.srcObject = stream
    }
    catch(err){console.log(err)}
    finally{console.log("stream is ready")}

    return new Promise(resolve => {
      video.onloadedmetadata = () => {
        video.play()
        resolve(video)
      }
    })
  }

  detectPose() {
    const {videoWidth, videoHeight} = this.props
    const canvas = this.canvas
    const canvasContext = canvas.getContext('2d')

    canvas.width = videoWidth
    canvas.height = videoHeight

    this.poseDetectionFrame(canvasContext)
  }

  poseDetectionFrame(canvasContext) {
    const {
      // algorithm,
      imageScaleFactor, 
      flipHorizontal, 
      outputStride, 
      minPoseConfidence, 
      minPartConfidence, 
      // maxPoseDetections, 
      // nmsRadius, 
      videoWidth, 
      videoHeight, 
      showVideo, 
      showPoints, 
      showSkeleton, 
      skeletonColor, 
      skeletonLineWidth 
      } = this.props

    const posenetModel = this.posenet
    const video = this.video

    const findPoseDetectionFrame = async () => {
      let poses = []

        const pose = await posenetModel.estimateSinglePose(
          video, 
          imageScaleFactor, 
          flipHorizontal, 
          outputStride
          )
          poses.push(pose)
    
      canvasContext.clearRect(0, 0, videoWidth, videoHeight)
      // console.log(canvasContext)

      // WebRTC canvas stream below -->
      const canvas_RTCstream = this.canvas.captureStream(25);
      // console.log(canvas_RTCstream)
      
   

      

      socket.emit('canvasContext', {canvasContext: this.canvas.webcam})
      
socket.on('herecanvasCTX', (canvasContext)=>{

    console.log("HEREE IS CANVASCTX", canvasContext)
})

      // var canvasURL = this.canvas.toDataURL();
      // console.log("canvasURL", canvasURL)
      
      if (showVideo) {
        canvasContext.save()
        canvasContext.scale(-.2, .2)
        canvasContext.translate(-videoWidth, 0)
        canvasContext.drawImage(video, 0, 0, videoWidth, videoHeight)
        canvasContext.restore()
      }

      //CURRENTLY EMITTING POSES AND CAMERA BUT WE WILL ONLY WANT ONE  
      socket.emit('poses', {poses: poses})
      // socket.emit('canvasURL', {canvasURL: canvasURL})  
      // THESE TWO SOCKETS FUNCTIONS BELOW MAY BE PROBLEMATIC
  
  
  

      poses.forEach(({score, keypoints}) => {
        if (score >= minPoseConfidence) {
          if (showPoints) {
            drawKeyPoints(
              keypoints,
              minPartConfidence,
              skeletonColor,
              canvasContext
            )
          }
          if (showSkeleton) {
            drawSkeleton(
              keypoints,
              minPartConfidence,
              skeletonColor,
              skeletonLineWidth,
              canvasContext
              
            )
          }
        }
      })
      // console.log(canvasContext)
      socket.emit('poses', {poses: poses})
      
      requestAnimationFrame(findPoseDetectionFrame)
    }
    findPoseDetectionFrame()
    }

  copyToClipboard = (e) => {
    this.textArea.select();
    document.execCommand('copy');
    // This is just personal preference.
    // I prefer to not show the the whole text area selected.
    e.target.focus();
    this.setState({ copySuccess: 'Copied!' });
  };

  render() {
    const { chatLog, options } = this.state;
    return (
   <>
   <Grid item xs={12} id="canvasGrid" style={styles.container}>
        <div >  
        <canvas className="webcam" style={styles.canvas} ref={this.getCanvas} />

        <canvas id="remoteCanvas" ref={this.remoteCanvas}  style={styles.canvas}/>
        </div>
   </Grid>

       
  <Grid item xs={12} style={styles.container}>
   
            <div id="buttons">
                <button onClick={createRoom} style={styles.btn} className="rtcRoomButton" id="createBtn">
                  <span>Create Room</span>
                </button>
                <button onClick={hangUp} style={styles.btn} className="rtcRoomButton" id="hangupBtn">
                  <span>End Prax</span>
                </button>
            </div>
             
              <button onClick={this.copyToClipboard} style={styles.btn} className="rtcRoomButton" >
                <span>Enter Room</span>
              </button> 
         
              <button onClick={joinRoom} style={styles.btn} className="rtcRoomButton" id="confirmJoinBtn" type="button">
                <span>Join Room</span>
              </button>
              
            <div id="room-dialog">
 
            <div id="idRoomJoin">
              Enter ID for room to join:
            
              <input type="text" id="room-id"
                ref={(textarea) => this.textArea = textarea}
                defaultValue={roomId || ''}
                />
                <label htmlFor="my-text-field">Room ID</label>
           
              
            <LioWebRTC
              options={options}
              onReady={this.join}
              onCreatedPeer={this.handleCreatedPeer}
              onReceivedPeerData={this.handlePeerData}
              >
                <ChatBox
                  id="chatbox"
                  chatLog={chatLog}
                  onSend={(msg) => msg && this.addChat('Me', msg)}
                />
            </LioWebRTC>
             </div>
 
          </div> 
          
          <div id="metronomeContainer"/>
   
          {
            /* Logical shortcut for only displaying the 
                button if the copy command exists */
            document.queryCommandSupported('copy') &&
              <div>
                {this.state.copySuccess}
                {roomId}
                
              </div>
            }
         

        </Grid>  
        
      
        <ClientLatencyApp />
  <Grid item xs={12} style={styles.container} id="videosGrid"> 

    <div className="media-bridge" id="videos">
    <video key={`local-video`} style={styles.video} id="localVideo" playsInline ref={this.getVideo} className="local-video" muted autoPlay></video>
    <video className="remote-video" id="remoteVideo" muted autoPlay playsInline ref={this.remoteStream}></video>
  </div>
  </Grid>

  </>
    )
  }

}

