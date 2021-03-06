import React from 'react'
import store from '../../redux/store'
// import Camera from '../posenet/components/Camera.js'
import { fire, fireAnalytics } from '../firebase';
import GoogAuth from './googleAuth';
import Header from '../Header/Header/header'
import Navbar from '../Header/Navbar/navbar'
// import Grid from '@material-ui/core/Grid';
import PoseNet from '../posenet/components/Camera'
// import CreatePraxSpace from '../Chat/CreatePraxSpace/CreatePraxSpace'
import Admin from '../../Admin';
import Home from '../Home/Home';
import { AuthContext } from "../../context/auth";
import { Provider } from "react-redux";
import PrivateRoute from './PrivateRoute';
import UserProvider from "../providers/UserProvider";
import About from '../About/about';
import Login from '../AuthLogin/Login/Login'
import FirstTimeLogin from '../FirstTimeSignIn/firstTimeSignIn';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

require('typeface-overpass')
require('fontsource-poppins')


// const theme = createMuiTheme({
//   palette: {
//     primary: {
//       main: '#212121',
//     },
//     secondary: {
//         main: '#f6deba'
//       }
//     },
//     background: {
//       backgroundColor: "$offset_black"
//     }
//   })

const styles = {
  camera : {
    backgroundColor: "#030303",
    color: "#38A69B"
  },
  navbar: {
    marginTop: '100vh',
    borderBottom: '50vh'
  }
}

export default function App(state = { isAuth: false }) {

if (window !== undefined){

  // const existingTokens = JSON.parse(localStorage.getItem("tokens"));
  // const [authTokens, setAuthTokens] = useState(false);

  // const setTokens = (data) => {
  //   localStorage.setItem("tokens", JSON.stringify(data));
  //   setAuthTokens(data);
  // }
}
  return (
    <AuthContext.Provider value={{}} style={styles.background}>
    <Provider store={store}>
    
    <Router>
        <div id="outerDiv">
      <Header />
 
      {/*} <Navbar style={styles.navbar}/> */}

      <div id="firebaseui-auth-container">

     
      </div>
 
      <PoseNet/>

  

   {/*}   <Switch>
                  
        <Route exact path="/" component={Login} />

        <PrivateRoute exact path="/login" component={Home} />
      
        <Route exact path="/about" component={About} />
        <Route exact path="/signup" component={FirstTimeLogin} />
        <PrivateRoute exact path="/:message" component={PoseNet}/> 
        <PrivateRoute exact path="/admin" component={Admin} />

  </Switch> */}

    </div>
    
    </Router>
  </Provider>
  </AuthContext.Provider>
  )
}

