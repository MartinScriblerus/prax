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
    variant: "h2",
    fontSize: 24,
    paddingTop: 40,
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
    
  },
  card2 : {
    display: 'flex',
    variant: "h2",
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
    paddingRight: 3,
    paddingLeft: 3,
    fontFamily: 'Overpass',
    backgroundColor: '#333333',
    marginTop: 10,
    marginBottom: 10,
    opacity: .93,
    padding: 15
  },
 
  text : {
    variant: "h5",
    fontSize: 22,
    // borderRadius: 7,
    fontFamily: 'Overpass',
    margin: 15
  },
  text2 : {
    variant: "h3",
    fontSize: 20,
    borderRadius: 7,
    fontFamily: 'Overpass',
    marginTop: 25,
    marginBottom: 10,
    marginRight: 10,
    marginLeft: 5,
  },
})

export default function About(newUser){
  const classes = useStyles();

   
  return (
 
<>
    <Grid item xs={12} className={classes.root} style={styles.about}>
 
        <Card style={styles.card}> 
              <Typography variant="h3" gutterBottom style={styles.text}>
              Prax is an audio-video platform enhanced with tools to help musicians stay on time over a remote connection. 
             </Typography>
        </Card> 
 

      <Grid item xs={6}>
          <Card style={styles.card2}>
            <ul>
              <li>
                <Typography variant="h6"> Encrypted Audio & Video</Typography>
              </li>
              <li>
                <Typography variant="h6"> Authentication without Tracking </Typography>
              </li>
              <li>
                <Typography variant="h6"> No Advertisements </Typography>
              </li>
              <li> 
                <Typography variant="h6"> Tools for Remote Musicians </Typography>
              </li>
            </ul>
          </Card>
      </Grid>

    </Grid>

  
<Grid item xs={12}>
    <div className="iconOrder">
        <SocialIcon className="socialicons" url="https://github.com/MartinScriblerus" style={styles.icons}/>
        <SocialIcon className="socialicons" url="https://twitter.com/A00PE"  style={styles.icons} />
        <SocialIcon className="socialicons" url="https://www.linkedin.com/in/matthew-reilly-91b316142/" style={styles.icons} />
    </div>
</Grid>

 
</>


  );
};