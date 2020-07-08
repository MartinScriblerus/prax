import React, { useEffect } from "react";
import "./inputmessage.scss";
import { useSelector } from 'react-redux'
import Grid from '@material-ui/core/Grid';
import setAuthToken from "../../../services/setAuthToken";

// const token = localStorage.getItem("token");
// if (token) {
//   setAuthToken(token);
// }




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

