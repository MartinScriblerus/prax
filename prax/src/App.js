// import React from 'react'
// import Camera from './components/posenet/components/Camera.js'
// import io from 'socket.io-client';
// import Header from './components/Header/header/header'
// import Navbar from './components/Header/navbar/navbar'
// import Grid from '@material-ui/core/Grid';


// const socket = io('http://localhost:5001',{transports: ['websocket']});

// // SOCKETS FOR APP --> BRING BACK WHEN FINISHING SIGNALLING
// socket.on('connect', function newConnection(Camera){
//   // console.log('room name: ', futureVariableNameHere)
//   // socket.on('message', function getMessage(message){
//   //   console.log(message);
//   // })
//   // socket.on('message_Users', function getMessageUsers(message_Users){
//   //   console.log(message_Users);
//   // })
//   // socket.on('message_Messages', function getMessageMessages(message_Messages){
//   //   console.log(message_Messages);
//   // })

// });

// const styles = {
//   camera : {
//     backgroundColor: "#030303",
//     color: "#f6f6f6"
//   }
// }

// const App = () => {

//   return (
//     <Grid>
//       <Header />
//       <Navbar />
//       <div id="cameraDiv" style={styles.camera}>
//         <Camera style={styles.camera}/>
//       </div>
//     </Grid>
//   )
// }

// export default App