import React  from 'react';
// import WebRTC from './components/WebRTC'
import Posenet from '../../posenet/components/Camera.js'



import Grid from '@material-ui/core/Grid';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

const styles = {
  camera : {
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

export default function CreatePraxSpace() {

    return(
    <Router>
      <Grid style={styles.outergrid}>
      <div>
      <div id="cameraDiv" style={styles.camera}>
      <Posenet style={styles.camera}/>
    </div>
    </div>
        {/*  <WebRTC />  */}
      </Grid>
       
      <Switch>
        <Route path="/room/:slug">

   <Posenet/>
  
        </Route>
      
      </Switch>
    </Router>
    )
  }


  

