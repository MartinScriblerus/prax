import React from 'react';
import '../../App/App.css';
import './header.scss'
// import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
require("typeface-open-sans")
require('typeface-permanent-marker')

const style={
    header: {
        backgroundColor: "#212121",
        fontFamily: 'Didact Gothic',
        borderBottom: "solid",
        borderWidth: '4px',
        borderColor: "#aaf",
        
    },
    text: {
      fontFamily: 'Permanent Marker',
      marginLeft: 40,
      color: "#e5e6e5"
    },  
    text2: {
      fontFamily: 'Arial',
      fontSize: 22,
      marginLeft: '10%',
      color: "#85b1d7",
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
          A Site for Remote Musicians
          </Typography>
        </div>
      </header>
    );
  }
export default Header;