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

   
    this.state = {};
  }
  componentDidMount(stream) {
    // getting access to webcam
   navigator.mediaDevices
        .getUserMedia({video: true})
        .then(stream => this.videoTag.current.srcObject = stream)
        .then(()=>{return this.stream})
        .catch(console.log);
  }

  render() {
const streamingMedia = this.stream
   
    return(
    <Router> 
    <Grid style={styles.outergrid}>

      <div className="App">

      <Posenet streamingMedia={streamingMedia} id="posenetImport" style={styles.camera}>
  
      </Posenet>
  
    
  
      </div>



      








  </Grid>
       
    </Router>
    )
  }

}
  


