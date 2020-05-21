import React from 'react'
import Camera from './components/posenet/components/Camera.js'

const styles = {
  camera : {
    backgroundColor: "#030303",
    color: "#f6f6f6"
  }
}

const App = () => {
  return (
    <div id="cameraDiv" style={styles.camera}>
      <Camera style={styles.camera}/>
    </div>
  )
}

export default App