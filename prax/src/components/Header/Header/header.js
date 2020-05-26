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
        borderWidth: 4,
        borderColor: "#aaf"
    },
    text: {
      fontFamily: 'Permanent Marker',
      marginLeft: 40,
      color: "#e5e6e5"
    }   
}

function Header() {
    return (
      <header className="App-header" style={style.header}>
        <Typography justify="left" variant="h1" style={style.text}>
            Prax
        </Typography>
      </header>
    );
  }
export default Header;