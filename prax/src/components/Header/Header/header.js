import React from 'react';
import '../../App/App.css';
import './header.scss'
// import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
require("typeface-open-sans")
require('fontsource-poppins')

const style={
    header: {
        backgroundColor: "#50D4F2",
        // fontFamily: 'Didact Gothic',
        borderBottom: "solid",
        borderWidth: '4px',
        borderColor: "",
        
    },
    text: {
      fontFamily: 'Poppins',
      // subset: 'devanagari',
      weights: 1200,
      style: 'bold',
      marginLeft: 40,
      color: "#F1FFFA"
    },  
    text2: {
      fontFamily: 'Arial',
      fontSize: 22,
      marginLeft: '10%',
      color: "#50D4F2",
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
          Remote Creative Collaboration
          </Typography>
        </div>
      </header>
    );
  }
export default Header;