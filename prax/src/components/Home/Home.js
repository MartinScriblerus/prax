import React, { useState, useEffect } from "react";
import { useSelector, Provider } from 'react-redux'
import { Chat } from "../Chat/Chat";
import { InputMessage } from "../Chat/InputMessage/InputMessage";
import Button from '@material-ui/core/Button';
import TemporaryDrawer from './drawerComponent'
import { BrowserRouter, Switch, Route } from "react-router-dom";
import jwt_decode from "jwt-decode";
import store from "../../redux/store";
import setAuthToken from "../../services/setAuthToken";
import { setUserLogged } from "../../redux/auth/actions";
import './home.scss'
// import { Register } from '../Auth/Register'
import { Login } from '../AuthLogin/Login/Login'
// import { PrivateRoute } from '../Auth/PrivateRoute/'
import FirstTimeLogin from "../FirstTimeSignIn/firstTimeSignIn";

const styles = ({
    color:  '#030303',
    
    drawer: {
     color: "#030303",
      width: 2
    },
    button: {
        height: 50,
        backgroundColor: '#85b1d7',
        // variant: "solid",
        // justify: "right",
       width: 2,
        marginTop: 5
    },
    profile: {
      color: "#aafs",
  
    },
    card: {
    
    variant: "solid",
    padding: 5,
    marginRight: 20,
    marginLeft: 200,
    marginTop: 0 
    }
  })

const token = localStorage.getItem("token");
if (token) {
  setAuthToken(token);
  const decoded = jwt_decode(token);
  store.dispatch(setUserLogged(decoded));
}

const App = (props) => {

    const auth = useSelector(state => state.auth)
    const chat = useSelector(state => state.chat)
    console.log(auth.user.id)
  
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

      let showContax = [];
      if (typeof chat.contacts && auth.user.id !== (undefined || null)){
        try{
          console.log("*****************************GETTING CONTACT PROFILES HERE")
        
        console.log("tktktktktktktktktk")
          console.log(auth.user.id)
          
  
  
          for(var id = 0; id< chat.contacts.data.length; id++){
            showContax.push(chat.contacts.data[id][0].username)    
            // console.log(showContax) 
            if (id === chat.contacts.data.length){
              return showContax
            }
          }
        }
        catch{
  
            console.log("catching -- no worries!")
          }
          console.log(showContax)
        }
    let showCtx = showContax.map(s=> s)
  

  return (
    <Provider store={store}>
      <BrowserRouter>
        <main>     
  
       
      
        {<div style={styles.drawer}> {showCtx.map(oneContact=><Button style={styles.button} key={oneContact}>{oneContact}</Button>)}</div>}
          
        
       <TemporaryDrawer style={styles.drawer} />
       
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
            <Route exact path="/login" component={Login} />
          </Switch>
        </main>
      </BrowserRouter>
    </Provider>
  );
};

export default App;