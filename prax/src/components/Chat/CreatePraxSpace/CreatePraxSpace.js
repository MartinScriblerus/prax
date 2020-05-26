import React  from 'react';
// import WebRTC from './components/WebRTC'
import Camera from '../../posenet/components/Camera.js'



import Grid from '@material-ui/core/Grid';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

const styles = {
  camera : {
    backgroundColor: "#030303",
    color: "#dadcd7"
  },
  outergrid: {
    backgroundColor: "#1F95BF"
  },
  pose: {
    zIndex: 50 
  }
}

export default function CreatePraxSpace() {

    return(
    <Router>
      <Grid style={styles.outergrid}>
      <div id="cameraDiv" style={styles.camera}>
      <Camera style={styles.camera}/>
    </div>

        {/*  <WebRTC />  */}
      </Grid>
       
      <Switch>
        <Route path="/room/:slug">
        <CreatePraxSpace/> 
      </Route>
      
      </Switch>
    </Router>
    )
  }


  

