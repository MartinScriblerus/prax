import {drawKeyPoints, drawSkeleton} from './utils'
import React, {Component} from 'react'
import * as posenet from '@tensorflow-models/posenet'
import {socket} from '../../../services/socketIO'
// import { withWebRTC } from 'react-liowebrtc';
import { LioWebRTC } from 'react-liowebrtc'
import ChatBox from '../../Chat/CreatePraxSpace/chatbox';
import firebase from '../../firebase';
import Grid from '@material-ui/core/Grid';
import StreamServer from '../../Audio/Metronome/streamserver'
import Client from '../../Audio/Metronome/client'
import Fourier from '../../Audio/scratchpad/fourier'
import Latency from '../../Audio/scratchpad/fourier'
import Metronome from '../../Audio/scratchpad/fourier'
import { PitchDetector } from 'pitchy';
import CrossCorrelation from '../../Audio/Metronome/crosscorrelation'
import Recorder from '../../Audio/Metronome/recorder'



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
    backgroundColor: '#212121',
  
  },

}


let peerConnection = null;
let localStream = null;
let remoteStream = null;
// let roomDialog = null;
let roomId = null;
let canvas_RTCstream = null;

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
remotePoses()
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
  // let audioContext = new (window.AudioContext || window.webkitAudioContext)();

  var AudioContext = new (window.AudioContext || window.webkitAudioContext)();
  var AnalyserNode = AudioContext.createAnalyser();
  console.log("AnalyserNode", AnalyserNode)
  console.log("AudioContext", AudioContext)
    const stream = await navigator.mediaDevices.getUserMedia(
      {
      video: true, 
      audio: {
        echoCancellation: true,
        noiseSuppression: true,
        channelCount: 1,
        latency: {exact: 0.003},
      }
    });
   
console.log("Here is getUserMedia Stream", stream)
    function updatePitch(analyserNode, stream, sampleRate) {
      // console.log(analyserNode);
     
      window.requestAnimationFrame(() => updatePitch(analyserNode, sampleRate));
    }
   
   
    let sourceNode = AudioContext.createMediaStreamSource(stream);
    console.log("sourceNode", sourceNode)
    sourceNode.connect(AnalyserNode);
  
    const detector = PitchDetector.forFloat32Array(AnalyserNode.fftSize);
    (console.log(detector))
    const input = new Float32Array(detector.inputLength);
    updatePitch(AnalyserNode, detector, input, AudioContext.sampleRate);
    
      document.querySelector('#localVideo').srcObject = stream;
      localStream = stream;
      remoteStream = new MediaStream();
      
      document.querySelector('#remoteVideo').srcObject = remoteStream;
     console.log("REMOTE STREAM", remoteStream)
// tk added querySelectors below based on codelab
console.log('Stream:', document.querySelector('#localVideo').srcObject);
// document.querySelector('#cameraBtn').disabled = true;
document.querySelector('#joinBtn').disabled = false;
document.querySelector('#createBtn').disabled = false;
document.querySelector('#hangupBtn').disabled = false;

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
    document.querySelector('#joinBtn').disabled = true;
    document.querySelector('#createBtn').disabled = true;
    document.querySelector('#hangupBtn').disabled = true;
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

function remotePoses(remCan, remVid, remCanContext){
  remCan= document.getElementById("remoteCanvas")
  remVid= document.getElementById("remoteVideo")
  remCanContext = remCan.getContext('2d')
  remCan.width = 550;
  remCan.height = 550;
 
}

export default class PoseNet extends Component {
  static defaultProps = {
    videoWidth: (550),
    videoHeight: (550),
    flipHorizontal: true,
    algorithm: 'single-pose',
    showVideo: false,
    showSkeleton: true,
    showRemoteSkeleton: true,
    showPoints: true,
    showRemotePoints: true,
    minPoseConfidence: 0.2,
    minPartConfidence: 0.3,
    multiplier: 6,
    maxPoseDetections: 2,
    nmsRadius: 1,
    outputStride: 16,
    imageScaleFactor: .2,
    skeletonColor: "#f6deba",
    remoteSkeletonColor: "#aff",
    skeletonLineWidth: 6,
    loadingText: 'Loading...please be patient...'
  }

  constructor(props) {
    super(props, PoseNet.defaultProps)
    this.remoteCanvas = React.createRef();
    this.remoteVideo = React.createRef();
  
    this.state = {
      source: "",
      stream: this.props.stream,
      isVideoLoading: true,
      copySuccess: '', 
      nick: this.props.nick,
      roomID: `party-${this.props.roomName}`,
      muted: true,
      camPaused: false,
      chatLog: [],    
      peers: [],
      options: {
        debug: true,
        autoRequestMedia: true,
        media: {
            video: true,
            audio: true
        },
        video: null,
      }
    };
  }

    // state = {
    //   source: ""
    // }
   
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
    console.log(this.state.stream)
    this.canvas = elem
  }

  getRemoteVideo = async (elem) => {
  await this.remoteVideo
    this.remoteVideo = elem
  }

  getRemoteCanvas = async (elemCanvas) => {
    await this.remoteStream
    this.remoteCanvas = elemCanvas
    console.log("this.remoteCanvas", this.remoteCanvas)
  }

  getVideo = elem => {
    this.video = elem
  }

  async componentDidMount() {
    openUserMedia();
    this.audioContext = new AudioContext();
    try {
      await this.setupCamera()
    } catch (error) {
      throw new Error(
        'This browser does not support video capture, or this device does not have a camera'
      )
    }

    try {
      this.posenet = await posenet.load()
      console.log("this.posenet", this.posenet)
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
    const video = this.video;
    const remoteVideo = this.remoteVideo;
    video.width = videoWidth;
    video.height = videoHeight;
console.log("remoteVideo", remoteVideo)


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
    const remoteCanvas = this.remoteCanvas
    const canvasContext = canvas.getContext('2d')
    const remoteCanvasContext = remoteCanvas.getContext('2d')
console.log("remoteCanvasContext", remoteCanvasContext)

    canvas.width = videoWidth
    canvas.height = videoHeight
  remoteCanvas.width = videoWidth 
  remoteCanvas.height = videoHeight

    this.poseDetectionFrame(canvasContext, remoteCanvasContext)
    // this.poseDetectionFrame(remoteCanvasContext)
  }

  poseDetectionFrame(canvasContext, remoteCanvasContext) {
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
      showRemotePoints,
      showSkeleton, 
      showRemoteSkeleton,
      skeletonColor, 
      remoteSkeletonColor,
      skeletonLineWidth 
      } = this.props

    const posenetModel = this.posenet
    console.log("posenetModel", posenetModel)
    const video = this.video;
    const remoteVideo = this.remoteVideo;
    

    if(this.remoteStream !== undefined || null){
    console.log(this.remoteStream)
    }

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
      if(remoteCanvasContext !== undefined){
      remoteCanvasContext.clearRect(0, 0, videoWidth, videoHeight)
      }
      // console.log(canvasContext)

      // WebRTC canvas stream below -->
      canvas_RTCstream = this.canvas.captureStream(25);
      console.log(canvas_RTCstream)
      // console.log(canvas_RTCstream)
      
  // console.log(canvas_RTCstream)

      

      socket.emit('canvasContext', canvas_RTCstream)
      
    

      // var canvasURL = this.canvas.toDataURL();
      // console.log("canvasURL", canvasURL)
      
      if (showVideo) {
        canvasContext.save()
        canvasContext.scale(-.2, .2)
        canvasContext.translate(-videoWidth, 0)
        canvasContext.drawImage(video, 0, 0, videoWidth, videoHeight)
        canvasContext.restore()
        remoteCanvasContext.save()
        remoteCanvasContext.scale(-.2, .2)
        remoteCanvasContext.translate(-videoWidth, 0)
        remoteCanvasContext.drawImage(remoteVideo, 0, 0, videoWidth, videoHeight)
        remoteCanvasContext.restore()
      }

      //CURRENTLY EMITTING POSES AND CAMERA BUT WE WILL ONLY WANT ONE  
      socket.emit('poses', {poses: poses})
      // socket.emit('canvasURL', {canvasURL: canvasURL})  
      // THESE TWO SOCKETS FUNCTIONS BELOW MAY BE PROBLEMATIC
  
  
  console.log("poses", poses)

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
          if (showRemotePoints) {
            drawKeyPoints(
              keypoints,
              minPartConfidence,
              remoteSkeletonColor,
              remoteCanvasContext
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
          if (showRemoteSkeleton) {
            drawSkeleton(
              keypoints,
              minPartConfidence,
              remoteSkeletonColor,
              skeletonLineWidth,
              remoteCanvasContext             
            )
          }
        }
      })
      // console.log(canvasContext)
  //     socket.on('herecanvasCTX', (canvas_RTCstream)=>{

  //       console.log("HEREE IS CANVASCTX", canvas_RTCstream)
  // })
  // console.log(poses)
      // socket.emit('poses', {poses: poses})
      // socket.on('posesFromServer', (poses)=>{
      //   console.log(poses)
      // })
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
    this.addChat(`The Room ID is: `, `${roomId}`, true)
  };




  
  render() {
    const { chatLog, options } = this.state;
    return (
   <>
   <Grid item xs={12} id="canvasGrid" style={styles.container}>
        <div >  
        <canvas className="webcam" style={styles.canvas} ref={this.getCanvas} />

        <canvas id="remoteCanvas" ref={this.getRemoteCanvas} style={styles.canvas}/>
        </div>
   </Grid>

       
  <Grid item xs={12} style={styles.container}>
   
            <div id="buttons">
                <button onClick={createRoom} className="rtcRoomButton" id="createBtn">
                  <span>Create Room</span>
                </button>
                <button onClick={hangUp} style={styles.btn} className="rtcRoomButton" id="hangupBtn">
                  <span>End Prax</span>
                </button>
            </div>
             
           {
             roomId !== undefined || null 
            ? <button onClick={this.copyToClipboard} style={styles.btn} id="joinBtn" className="rtcRoomButton" >
                <span>Enter Room</span>
              </button> 
            : <h1>not yet</h1>
           }

              <button onClick={joinRoom} style={styles.btn} className="rtcRoomButton" id="confirmJoinBtn" type="button">
                <span>Join Room</span>
              </button>
              
            <div id="room-dialog">
 
            <div id="idRoomJoin">
            {
              /* Logical shortcut for only displaying the 
                button if the copy command exists */
              document.queryCommandSupported('copy') &&
                <div>
                  {this.state.copySuccess}
                  {roomId}
                
                </div>
            }
              
            <LioWebRTC
              options={options}
              onReady={this.join}
              onCreatedPeer={this.handleCreatedPeer}
              onReceivedPeerData={this.handlePeerData}
              >
                <ChatBox
                  id="chatbox"
                  chatLog={chatLog}
                  onSend={(msg) => msg && this.addChat('Me: ', msg)}
                />
            </LioWebRTC>

   

             </div>
          </div> 
          
          <div id="metronomeContainer">
          <p> Copy Room Id and Click Join: </p>
            
          <input type="text" id="room-id"
            ref={(textarea) => this.textArea = textarea}
            defaultValue={roomId || ''}
            />
          {/*<p className="currentRoomID" htmlFor="my-text-field">Room ID: {roomId} </p>*/}
       
          
          <CrossCorrelation stream={localStream} remoteStream={remoteStream} canvas_RTCstream={canvas_RTCstream} AudioContext={AudioContext} />

          </div>
     
      
          <p>Recorder begins here:</p>
          <Recorder/>
        </Grid>  
        
      
   
  <Grid item xs={12} style={styles.container} id="videosGrid"> 
    <div className="media-bridge" id="videos">
    <video key={`local-video`} style={styles.video} muted id="localVideo" playsInline ref={this.getVideo} className="local-video" muted autoPlay></video>
    <video className="remote-video" id="remoteVideo" autoPlay playsInline ref={this.remoteStream}></video>
  </div>
  </Grid>

  </>
    )
  }

}