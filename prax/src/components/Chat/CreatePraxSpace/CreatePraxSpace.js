import React, { Component } from 'react';
// import WebRTC from './components/WebRTC'

import Posenet from '../../posenet/components/Camera.js';
import Grid from '@material-ui/core/Grid';

import {
  BrowserRouter as Router,
} from "react-router-dom";



const styles = {
  camera : {
    backgroundColor: "#aff",
    color: "#f6deba",
  },
  video2 : {
    backgroundColor: "#aff",
    color: "#f6deba",
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

   
    this.state = {};
  }
  componentDidMount(stream) {
    // getting access to webcam
   navigator.mediaDevices
        .getUserMedia({dataOnly: true})
        // .then(stream => this.video.current.srcObject = stream)
        // .then(()=>{return this.stream})
        .then(console.log("hooray"))
        .catch(console.log);
  }

  render() {
const streamingMedia = this.stream
   
    return(
    <Router> 
    <Grid style={styles.outergrid}>

      <div className="App">
        <Posenet streamingMedia={streamingMedia} id="posenetImport" style={styles.camera} />
      </div>

    </Grid>   
    </Router>
    )
  }

}
  


