import React from 'react';
import '../../App/App.css';
import './header.scss'
// import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
require("typeface-open-sans")
require('typeface-permanent-marker')

const style={
    header: {
        backgroundColor: "#505478",
        fontFamily: 'Didact Gothic',
        borderBottom: "solid",
        borderWidth: '4px',
        borderColor: "#505478",
        
    },
    text: {
      fontFamily: 'Permanent Marker',
      marginLeft: 40,
      color: "#f6deba"
    },  
    text2: {
      fontFamily: 'Arial',
      fontSize: 22,
      marginLeft: '10%',
      color: "#7295AB",
      paddingBottom: '20px'
    }   
}

function Header() {
    return (
      <header className="App-header header">
        <div>
          <Typography justify="left" variant="h1" style={style.text}>
              Prax
        
          </Typography>
          <Typography justify="left" variant="h3" style={style.text2}>
          Collaborate and Perform Remotely
          </Typography>
        </div>
      </header>
    );
  }
export default Header;