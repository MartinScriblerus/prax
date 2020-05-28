import React, { useState, useEffect } from "react";
import { useSelector, Provider } from 'react-redux'
import { Chat } from "../Chat/Chat";
import { InputMessage } from "../Chat/InputMessage/InputMessage";

import TemporaryDrawer from './drawerComponent'
import { BrowserRouter, Switch, Route } from "react-router-dom";
import jwt_decode from "jwt-decode";
import store from "../../redux/store";
import setAuthToken from "../../services/setAuthToken";
import { setUserLogged } from "../../redux/auth/actions";
import './home.scss'
// import axios from 'axios'
// import { Register } from '../Auth/Register'
// import Login from '../AuthLogin/Login/Login'

// import { PrivateRoute } from '../Auth/PrivateRoute/'
import FirstTimeLogin from "../FirstTimeSignIn/firstTimeSignIn";
// import { BASE_URL } from '../../const'
// var jwt = require('jsonwebtoken');


// const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'
const token = localStorage.getItem("token");
if (token) {

  setAuthToken(token);
  console.log(token)
  const decoded = jwt_decode(token);
  store.dispatch(setUserLogged(decoded));
}

const styles = ({
    color:  '#030303',
    button: {
        height: 50,
        backgroundColor: '#85b1d7',
        // variant: "solid",
        // justify: "right",
       width: 2,
        marginTop: 5
    },
    profile: {
      color: "#aaf",
  
    },
    card: { 
    variant: "solid",
    padding: 5,
    marginRight: 20,
    marginLeft: 200,
    marginTop: 0 
    }
  })




const App = (props) => {
    
  const auth = useSelector(state => state.auth)
  const chat = useSelector(state => state.chat)
  console.log(auth.user.id)

// console.log(auth.user.id)

// const { destiny } = chat;

const [windowWidth, setWindowWidth] = useState(window.innerWidth);

useEffect(() => {
    window.addEventListener("resize", updateWindowWidth);
  }, []);

  const updateWindowWidth = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
   async function fetchData(){ 
    if (windowWidth > 420) {

      // rightSide.classList.remove("show-destiny");
    }
  }
    fetchData()
  }, [windowWidth]);
  
 
 
  return (
    <Provider store={store}>
      <BrowserRouter>
        <main>     
  
       
        <TemporaryDrawer className='title'/>

      


       <div className="right-side">
               <Chat
                 idUserLogged={auth.user.id}
                 username={auth.user.username}
                 instrument={auth.user.instrument}
               />
               <InputMessage
                 idOrigin={auth.user.id}
                 sendingMsg={chat.sendingMsg}
               />
             </div> 
          <Switch>
            <Route exact path="/signup" component={FirstTimeLogin} />
        
          </Switch>
        </main>
      </BrowserRouter>
    </Provider>
  );
};

export default App;