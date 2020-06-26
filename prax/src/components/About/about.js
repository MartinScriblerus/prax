// import axios from 'axios';
import React from 'react';
import './about.scss';
// import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import { SocialIcon } from 'react-social-icons';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

require('typeface-overpass')



  
const styles = ({
  link:{
    zIndex: 10
  },
  about: {
    variant: "h5",
    flexGrow: 1,
    paddingTop: '10vh',
    fontSize: 20,
    fontFamily: 'Overpass',
    // backgroundImage: "url(https://www.getty.edu/art/exhibitions/cisneros/images/landing/4_Fiaminghi_Alternado2_x1024.jpg)",
    backgroundPosition: 'absolute',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    overflow: 'auto',
    // WebkitFilter: 'blur(10px) saturate(2)'
  },

  icons : {
    marginRight: 10,
    marginLeft: 10,
    align: 'center',
    backgroundColor: '#212121',
    fill: '' 

  },
  card : {
    display: 'flex',
    variant: "h2",
    fontSize: 20,
    overflow: 'auto',
       borderStyle: 'solid',
    borderWidth: 2, 
    color: '#f1fffa',
    borderColor: '#F2C84B',
    // borderRadius: 7,
    fontFamily: 'Overpass',
    backgroundColor: '#141013',
    opacity: .97,
    marginLeft:"25%",
    marginRight: "7%",
    marginBottom: 40,
    paddingRight: 10,
    padding: '2vw',
    // marginTop: 15,
 
  },
  card2 : {
  
    variant: "h5",
    fontSize: 20,
    position:'relative', 
    left: "20%",
    width: "100%",
    overflow: 'auto',
    borderStyle: 'solid',
    borderWidth: 1, 
    color: '#F2C84B',
    borderColor: '#F25252',
    borderRadius: 7,
    fontFamily: 'Overpass',
    backgroundColor: '#141013',
    padding: '2vw',
    marginBottom: 50,
    opacity: .97,
   
  },
 
  text : {
    variant: "h5",
    fontSize: 20,
    lineHeight: 1.5,
    // borderRadius: 7,
    fontFamily: 'Poppins',
    margin: 10,
    marginTop: 7,
    marginBottom: 5,
    paddingRight: 10,
    paddingLeft: 10
  },
  text2 : {
    // variant: "h5",
    fontSize: 22,
    borderRadius: 7,
    fontFamily: 'Poppins',
    margin:'5%',
    marginLeft: '2%',
  },
})

export default function About(newUser){


   
  return (
 
<>

   
<Grid item xs={12}  >
<Grid item xs={12} className="about" style={styles.about}>
        <Card style={styles.card}> 
              <Typography variant="h3" gutterBottom style={styles.text}>
              Prax is a site for remote creative collaboration. It provides a low-latency A/V connection, tools for audio synchronization, and filters to mask participants' appearance and environment.  
       </Typography>
              </Card> 
 

      <Grid item xs={6}>
          <Card style={styles.card2}>
          <h4 id="aboutTech">Tech Stack:</h4>
          <Typography style={styles.text2}>
          WebRTC, Socket.io, Media Stream API, 
          Tensorflow PoseNet, Firebase,
          React, Redux, Express, MySQL, JWT Tokens
          </Typography>
         
             
       
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
</Grid>
 
</>


  );
};