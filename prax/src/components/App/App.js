import React from 'react'
import Camera from '../posenet/components/Camera.js'
import io from 'socket.io-client';
import Header from '../Header/Header/header'
import Navbar from '../Header/Navbar/navbar'
import Grid from '@material-ui/core/Grid';
import store from '../../redux/store'
import CreatePraxSpace from '../Chat/CreatePraxSpace/CreatePraxSpace'
import Admin from '../../Admin';
import Home from '../Home/Home';
import { AuthContext } from "../../context/auth";
import { Provider } from "react-redux";
import PrivateRoute from './PrivateRoute';
import About from '../About/about';

import FirstTimeLogin from '../FirstTimeSignIn/firstTimeSignIn';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

require('typeface-overpass')
require('typeface-permanent-marker')

const socket = io('http://localhost:5001',{transports: ['websocket']});

// SOCKETS FOR APP --> BRING BACK WHEN FINISHING SIGNALLING
socket.on('connect', function newConnection(Camera){
  // console.log('room name: ', futureVariableNameHere)
  // socket.on('message', function getMessage(message){
  //   console.log(message);
  // })
  // socket.on('message_Users', function getMessageUsers(message_Users){
  //   console.log(message_Users);
  // })
  // socket.on('message_Messages', function getMessageMessages(message_Messages){
  //   console.log(message_Messages);
  // })

});

const styles = {
  camera : {
    backgroundColor: "#030303",
    color: "#f6f6f6"
  }
}

export default function App(state = { isAuth: false }) {

  return (
    <AuthContext.Provider value={{}} style={styles.background}>
    <Provider store={store}>
     
    <Router>
        <div >

    <Grid>
      <Header />
      <Navbar />
          <div id="cameraDiv" style={styles.camera}>
        <Camera style={styles.camera}/>
      </div>
    </Grid>
    <Switch>            
    <Route exact path="/" component={Home} />
    <Route exact path="/login" component={Home} />
    <Route exact path="/about" component={About} />
    <Route exact path="/signup" component={FirstTimeLogin} />
    <Route exact path="/praxspace/:username/:message" component={CreatePraxSpace}/> 
  
    <PrivateRoute exact path="/admin" component={Admin} />

  </Switch>
    </div>
    </Router>
  </Provider>
  </AuthContext.Provider>
  )
}

