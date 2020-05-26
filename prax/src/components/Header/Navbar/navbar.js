import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
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

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,  
    
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  backgroundColor: '#1F95BF'
}));

export default function Navbar() {
  const classes = useStyles();
  const [login, setLogin] = useState(false);
  const [showAbout, setShowAbout] = useState(false);
  const [signUp, setSignUp] = useState(false);

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar className="toolbar">
            <Button>
              <Link 
                to="/login" 
                onClick={() => setLogin(!login)}
                style={{ textDecoration: 'none' }}
                className="title"  
              >
                <Typography variant="h6" className="title" id="homeText" >
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
                <Typography variant="h6" className="title" id="aboutText" >
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
                <Typography variant="h6" className="title" id="signupText" >
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
                <Typography variant="h6" className="title" >
                    
                </Typography>
                </Link>  
            </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}