import React from 'react'
import Camera from './components/posenet/components/Camera.js'
import io from 'socket.io-client';



const socket = io('http://localhost:5001',{transports: ['websocket']});
socket.on('connect', function newConnection(Camera){
  // console.log('room name: ', futureVariableNameHere)
  console.log('socketID is: ', socket.id)
  socket.on('message', function getMessage(message){
    console.log(message);
  })
  socket.on('message_Users', function getMessageUsers(message_Users){
    console.log(message_Users);
  })
  socket.on('message_Messages', function getMessageMessages(message_Messages){
    console.log(message_Messages);
  })
  // socket.emit('test', {test: "yes!"})
  



});









const styles = {
  camera : {
    backgroundColor: "#030303",
    color: "#f6f6f6"
  }
}

const App = () => {
console.log(window.canvas)
  return (
    <div id="cameraDiv" style={styles.camera}>
      <Camera style={styles.camera}/>
  
    </div>
  )
}

export default App