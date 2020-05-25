import React, { useEffect } from "react";
import "./inputmessage.scss";
import { useSelector } from 'react-redux'
import Grid from '@material-ui/core/Grid';
import setAuthToken from "../../../services/setAuthToken";

const token = localStorage.getItem("token");
if (token) {
  setAuthToken(token);
}
console.log(token)

export const InputMessage = props => {

  const auth = useSelector(state => state.auth)
  const { idOrigin } = props;
  console.log(idOrigin)

 // tk works-->
  console.log(auth.user.id)
  // let descriptions = [];
  
      useEffect((dynamicList, getUsersIII) => {
 
      }, []); 
        // const handleInRoom = () => {
        //   inRoom
        //     ? setInRoom(false)
        //     : setInRoom(true);
        // }

  return (
    <>
      <Grid>
          <div>
          </div>
      </Grid>
    </>
  );
};













    // socket.emit('new message', {
    //   room: "Here is message from new message"
    // });
    // setMessageCount(messageCount + 1);
   

      // axios({
      //   method: 'get',
      //   url: 'http://localhost:5001/api/message',

      //   headers:{
      //   Authorization: `Bearer ${token}`
      //   }
      //      // TK Changed on thurs april 23
      // })

    // return () => {
    //   // if(inRoom) {
    //   //   console.log('leaving room');
    //   //   socket.emit('leave room', {
    //   //     content: "leaving room now"
    //   //   })
    //   // }
    // }

  // useEffect(() => {
  //   socket.on('receive message', payload => {
  //     setMessageCount(messageCount + 1);
  //     document.title = `${messageCount} new messages have been emitted FFFYYYIIIII`;
  //   });
  // }, []); //only re-run the effect if new message comes in



 //   <form
    //     onSubmit={e => {
    //       handleSubmit(e);
    //     }}
    //   >
    //     <TextField
    //       className= "message"
    //       style={styles.input}
    //       type="text"
    //       placeholder="Message"
    //       value={message}
    //       onChange={e => setMessage(e.target.value)}
    //       onKeyDown={e => {
    //         if (e.keyCode === 13) {
    //           e.preventDefault();
    //           if (message) handleSubmit(e);
    //           setMessage('');
    //           setMessageCount(messageCount + 1);
    //         }
    //       }}
    //     />
    //     <Button style={styles.button2} className="chatButton" onClick={handleNewMessage} disabled={!message ? true : false} type="submit" className="send">
    //       {sendingMsg ? <Spinner /> : "Send"}
    //     </Button>
    //   </form>
    // </div>

    // <div>       
    //   <h1 style={styles.roomCounterText}>
    //     {inRoom && `You Have Entered The Room` }
    //     {!inRoom && `Outside Room` }
    //   </h1>
    //   <p>{messageCount} messages have been emitted</p>
    //   <Button style={styles.button} onClick={() => handleInRoom()}>
    //       {inRoom && `Leave Room` }
    //         {!inRoom && `Enter Room` }
    //   </Button>