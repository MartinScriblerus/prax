import React, { useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import './navbar.scss'
// import IconButton from '@material-ui/core/IconButton';
// import PrivateRoute from '../PrivateRoute';
import {
    Link
  } from "react-router-dom";

const styles = {
  h6: {
    color: '#dadcd7'
  }
}

export default function Navbar() {

  const [login, setLogin] = useState(false);
  const [showAbout, setShowAbout] = useState(false);
  const [signUp, setSignUp] = useState(false);

  return (
    <div>
   
        <Toolbar className="toolbar">
            <Button>
              <Link 
                to="/" 
                onClick={() => setLogin(!login)}
                style={{ textDecoration: 'none' }}
                className="title"  
              >
                <Typography variant="h6" style={styles.color} className="title" id="homeText" >
                    Home
                </Typography>
              </Link>  
            </Button>       

            <Button>
              <Link 
                to="/about" 
                onClick={() => 
                setShowAbout(!showAbout)}
                style={{ textDecoration: 'none' }}
                className="title"  
                >
                <Typography variant="h6" style={styles.color}  className="title" id="aboutText" >
                    About
                </Typography>
              </Link>
            </Button>

            <Button>
              <Link 
                to="/signup" 
                onClick={() => setSignUp(!signUp)}
                style={{ textDecoration: 'none' }}
                className="title"  
              >
                <Typography variant="h6" style={styles.color}  className="title" id="signupText" >
                    Sign Up
                </Typography>
              </Link>
            </Button>

            <Button>
                <Link 
                to="/search" 
                onClick={() => setLogin(!login)}
                style={{ textDecoration: 'none' }}
                className="title"  
                >
                <Typography variant="h6" style={styles.color}  className="title" >
                    
                </Typography>
                </Link>  
            </Button>
        </Toolbar>
    
    </div>
  );
}