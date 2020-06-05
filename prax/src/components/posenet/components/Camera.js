import {drawKeyPoints, drawSkeleton} from './utils'
import React, {Component} from 'react'
import * as posenet from '@tensorflow-models/posenet'
import {socket} from '../../../services/socketIO'


console.log("this should be fine")

const styles = {
  video: {
    display:"none"
  },
  // THIS IS THE STYLE CONTROLLING CANVAS
  canvas: {
    backgroundColor: "#030303"
  }
}

class PoseNet extends Component {
  static defaultProps = {
    videoWidth: (550),
    videoHeight: (550),
    flipHorizontal: true,
    algorithm: 'single-pose',
    showVideo: false,
    showSkeleton: true,
    showPoints: true,
    minPoseConfidence: 0.07,
    minPartConfidence: 0.17,
    multiplier: 6,
    maxPoseDetections: 2,
    nmsRadius: 2,
    outputStride: 16,
    imageScaleFactor: .2,
    skeletonColor: "#dadcd7",
    skeletonLineWidth: 6,
    loadingText: 'Loading...please be patient...'
  }

  constructor(props) {
    super(props, PoseNet.defaultProps)
    console.log(props)
  }
 
  getCanvas = elem => {
    this.canvas = elem
    console.log(elem)
  }

  getVideo = elem => {
    this.video = elem
  }
  
  async componentDidMount() {
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

    video.srcObject = stream
   
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
      
      var canvasURL = this.canvas.toDataURL();
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
      socket.emit('canvasURL', {canvasURL: canvasURL})  
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



  render() {
    return (
      <div>
        <div>  
          <video style={styles.video} id="videoNoShow" playsInline ref={this.getVideo} />
         
          <canvas className="webcam" style={styles.canvas} ref={this.getCanvas} />
     
        </div>

  
      </div>
    )
  }
}

export default PoseNet