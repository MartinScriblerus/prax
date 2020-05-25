import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
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
  title: {
    flexGrow: 1,
    color: "#aaf0d1",
  fontSize: 24,
  marginTop: -7
  },
}));

export default function Navbar() {
  const classes = useStyles();
  const [login, setLogin] = useState(false);
  const [showAbout, setShowAbout] = useState(false);
  const [signUp, setSignUp] = useState(false);

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
            <Button>
              <Link 
                to="/login" 
                onClick={() => setLogin(!login)}
                style={{ textDecoration: 'none' }}
                className={classes.title}  
              >
                <Typography variant="h6" className={classes.title} >
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
                className={classes.title}  
                >
                <Typography variant="h6" className={classes.title}  >
                    About
                </Typography>
              </Link>
            </Button>

            <Button>
              <Link 
                to="/signup" 
                onClick={() => setSignUp(!signUp)}
                style={{ textDecoration: 'none' }}
                className={classes.title}  
              >
                <Typography variant="h6" className={classes.title} >
                    Sign Up
                </Typography>
              </Link>
            </Button>

            <Button>
                <Link 
                to="/search" 
                onClick={() => setLogin(!login)}
                style={{ textDecoration: 'none' }}
                className={classes.title}  
                >
                <Typography variant="h6" className={classes.title} >
                    
                </Typography>
                </Link>  
            </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}