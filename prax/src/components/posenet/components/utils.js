import * as posenet from '@tensorflow-models/posenet'


const pointRadius = 10

export const config = {
  videoWidth: (550),
  videoHeight: (550),
  remoteVideoHeight: (550),
  remoteVideoWidth: (550),
  flipHorizontal: true,
  algorithm: 'single-pose',
  showVideo: true,
  // showRemoteVideo: true,
  showSkeleton: true,
  showRemoteSkeleton: true,
  showPoints: true,
  showRemotePoints: true,
  minPoseConfidence: 0.3,
  minPartConfidence: 0.3,
  multiplier: 4,
  maxPoseDetections: 5,
  nmsRadius: 20,
  outputStride: 16,
  imageScaleFactor: .3,
  skeletonColor: "#38A69B",
  remoteSkeletonColor: "#F25252",
  skeletonLineWidth: 6,
  loadingText: 'Loading...please be patient...'
}

function toTuple({x, y}) {
  return [x, y]
}

export function drawKeyPoints(
  keypoints,
  minConfidence,
  {skeletonColor = "#38A698"},

  canvasContext,
  scale = 1
) {
  
  keypoints.forEach(keypoint => {
    if (keypoint.score >= minConfidence) {
      const {x, y} = keypoint.position
      canvasContext.beginPath()
      canvasContext.arc(x * scale, y * scale, pointRadius, 0, 5 * Math.PI)
      canvasContext.fillStyle = skeletonColor
      canvasContext.fill()
      canvasContext.moveTo(20, 20);
      canvasContext.bezierCurveTo(20, 100, 200, 100, 200, 20);
      canvasContext.stroke();
    }
  })
}

export function drawRemoteKeyPoints(
  keypoints,
  minConfidence,
  remoteSkeletonColor = "#F25252",
  remoteCanvasContext,
  scale = 1
) {

  keypoints[0].poses[0].forEach(keypoint => {
    if (keypoint.score >= minConfidence) {
      const {x, y} = keypoint.position
      remoteCanvasContext.beginPath()
      remoteCanvasContext.arc(x * scale, y * scale, pointRadius, 0, 5 * Math.PI)
      remoteCanvasContext.fillStyle = remoteSkeletonColor
      remoteCanvasContext.fill("#a4a")
      remoteCanvasContext.moveTo(20, 20);
      remoteCanvasContext.bezierCurveTo(20, 100, 200, 100, 200, 20);
      remoteCanvasContext.stroke();
    }
  })
}



function drawSegment(
  [firstX, firstY],
  [nextX, nextY],
  color,
  lineWidth,
  scale,
  canvasContext,
  remoteCanvasContext
) {
  canvasContext.beginPath()
  canvasContext.moveTo(firstX * scale, firstY * scale)
  canvasContext.lineTo(nextX * scale, nextY * scale)
  canvasContext.lineWidth = lineWidth
  canvasContext.strokeStyle = color
  canvasContext.stroke()
  if(remoteCanvasContext !== undefined){
  remoteCanvasContext.beginPath()
  remoteCanvasContext.moveTo(firstX * scale, firstY * scale)
  remoteCanvasContext.lineTo(nextX * scale, nextY * scale)
  remoteCanvasContext.fillStyle = 
  remoteCanvasContext.fill()
  remoteCanvasContext.lineWidth = lineWidth
  remoteCanvasContext.strokeStyle = color
  remoteCanvasContext.stroke()
  }
}


export function drawSkeleton(
  keypoints,
  minConfidence,
  color,
  lineWidth,
  canvasContext,
  remoteCanvasContext,
  scale = 1
) {
  const adjacentKeyPoints = posenet.getAdjacentKeyPoints(
    keypoints,
    minConfidence
  )

  adjacentKeyPoints.forEach(keypoints => {
    drawSegment(
      toTuple(keypoints[0].position),
      toTuple(keypoints[1].position),
      color,
      lineWidth,
      scale,
      canvasContext,
      remoteCanvasContext
    )
  })


}

export function drawRemoteSkeleton(
  keypoints,
  minConfidence,
  color,
  lineWidth,
  remoteCanvasContext,
  scale = 5
) {
  const adjacentKeyPoints = posenet.getAdjacentKeyPoints(
    keypoints,
    minConfidence
  )

  adjacentKeyPoints.forEach(keypoints => {
    drawSegment(
      toTuple(keypoints[0].position),
      toTuple(keypoints[1].position),
      color,
      lineWidth,
      scale,
      remoteCanvasContext
    )
  })


}
