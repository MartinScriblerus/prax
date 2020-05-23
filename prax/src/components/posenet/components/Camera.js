import {drawKeyPoints, drawSkeleton} from './utils'
import React, {Component} from 'react'
import * as posenet from '@tensorflow-models/posenet'
import io from 'socket.io-client';



const socket = io('http://localhost:5001',{transports: ['websocket']});


const styles = {
  video: {
    display:"none"
  }
}
class PoseNet extends Component {
  static defaultProps = {
    videoWidth: (1200),
    videoHeight: (1200),
    flipHorizontal: true,
    algorithm: 'single-pose',
    showVideo: false,
    showSkeleton: true,
    showPoints: true,
    minPoseConfidence: 0.3,
    minPartConfidence: 0.3,
    multiplier: 5,
    maxPoseDetections: 10,
    nmsRadius: 1,
    outputStride: 16,
    imageScaleFactor: .5,
    skeletonColor: "#B925E6",
    skeletonLineWidth: 12,
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
      }, 200)
    }

    this.detectPose()
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
      algorithm,
      imageScaleFactor, 
      flipHorizontal, 
      outputStride, 
      minPoseConfidence, 
      minPartConfidence, 
      maxPoseDetections, 
      nmsRadius, 
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
      console.log(canvasContext)
      socket.emit('canvasContext', {canvasContext: this.canvas.webcam})
      if (showVideo) {
        canvasContext.save()
        canvasContext.scale(-1, 1)
        canvasContext.translate(-videoWidth, 0)
        canvasContext.drawImage(video, 0, 0, videoWidth, videoHeight)
        canvasContext.restore()
      }

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
          <div ref={this.canvasParentRef} className={this.props.className || "react-p5"} style={this.props.style || {}} />;
          <canvas className="webcam" ref={this.getCanvas} />
     
        </div>
      </div>
    )
  }
}

export default PoseNet