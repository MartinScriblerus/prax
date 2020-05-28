// import axios from 'axios';
import React from 'react';
import './about.scss';
// import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import { SocialIcon } from 'react-social-icons';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
// import BottomNavigation from '@material-ui/core/BottomNavigation';

require('typeface-overpass')



const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
}));
  
const styles = ({
  link:{
    zIndex: 10
  },
  about: {
    variant: "h5",
    fontSize: 20,
    fontFamily: 'Overpass',
    backgroundImage: "url(http://davidhall.io/wp-content/uploads/2019/07/graphic-notation-John-Cage.jpg)",
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    overflow: 'auto',
  },
  icons : {
    marginRight: 10,
    marginLeft: 10,
    align: 'center',
    backgroundColor: '#212121'
  },
  card : {
    display: 'flex',
    variant: "h2",
    fontSize: 20,
    overflow: 'auto',
       borderStyle: 'solid',
    borderWidth: 2, 
    color: '$light_grey',
    borderColor: '#aaf',
    borderRadius: 7,
    fontFamily: 'Overpass',
    backgroundColor: '#333333',
    opacity: .93,
    marginLeft:"25%",
    marginRight: "7%",
    marginBottom: 40,
    paddingRight: 10,
    marginTop: 15,
 
    
  },
  card2 : {
    display: 'flex',
    variant: "h5",
    fontSize: 20,
    position:'relative', 
    left: "20%",
    width: "100%",
    overflow: 'auto',
    borderStyle: 'solid',
    borderWidth: 2, 
    color: '#f6f6f6',
    borderColor: '#85b1d7',
    // borderRadius: 7,
    fontFamily: 'Overpass',
    backgroundColor: '#333333',
    
    marginBottom: 50,
    opacity: .93,
   
  },
 
  text : {
    variant: "h5",
    fontSize: 20,
    lineHeight: 1.5,
    // borderRadius: 7,
    fontFamily: 'Overpass',
    margin: 10,
    marginTop: 27,
    marginBottom: 25
  },
  text2 : {
    // variant: "h5",
    fontSize: 22,
  
    borderRadius: 7,
    fontFamily: 'Overpass',
 
  },
})

export default function About(newUser){
  const classes = useStyles();

   
  return (
 
<>
    <Grid item xs={12} className={classes.root} style={styles.about}>
 
        <Card style={styles.card}> 
              <Typography variant="h3" gutterBottom style={styles.text}>
              Prax is a site for remote collaboration. It provides a low-latency A/V connection that enables musicians, actors, comedians, and content creators to record and share live performances. It also provides audio tools to synchronize performers and visual filters to mask their appearance and environment.  
       </Typography>
              </Card> 
 

      <Grid item xs={6}>
          <Card style={styles.card2}>
         
          <ul>
          <h4 id="aboutTech">Tech Stack:  </h4>
              <li>
              WebRTC, Socket.io, Media Stream API
              </li>
              <li>
              Tensorflow PoseNet
              </li>
              <li>
              React, Redux, Express, MySQL, JWT Tokens
              </li>
              <li> 
              HTML, Sass, JSX 
              </li>
             
            </ul>
          </Card>
      </Grid>

    </Grid>

  
<Grid item xs={12} className="iconGrid">
    <div className="iconOrder">
        <SocialIcon className="socialicons" url="https://github.com/MartinScriblerus" style={styles.icons}/>
        <SocialIcon className="socialicons" url="https://twitter.com/A00PE"  style={styles.icons} />
        <SocialIcon className="socialicons" url="https://www.linkedin.com/in/matthew-reilly-91b316142/" style={styles.icons} />
    </div>
</Grid>

 
</>


  );
};