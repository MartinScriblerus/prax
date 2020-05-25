import React  from 'react';
// import WebRTC from './components/WebRTC'

import Grid from '@material-ui/core/Grid';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

const styles = {
  outergrid: {
    backgroundColor: "#aaf"
  },
  pose: {
    zIndex: 50 
  }
}

export default function CreatePraxSpace() {

    return(
    <Router>
      <Grid style={styles.outergrid}>
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


  

