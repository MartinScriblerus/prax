// import axios from 'axios';
import React from 'react';
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
  about: {
    variant: "h2",
    fontSize: 24,
    paddingTop: 40,
    fontFamily: 'Overpass',
    // borderStyle: 'solid',
    // borderWidth: 2, 
    // borderColor: 'black',
    backgroundImage: "url(http://davidhall.io/wp-content/uploads/2019/07/graphic-notation-John-Cage.jpg)",
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    overflow: 'auto',
    // borderRadius: 7,
    // marginRight: 0,
    // marginLeft: 0,
    // marginTop: 0,
    // marginBottom: 0, 
  
  },
  icons : {
    marginRight: 5,
    marginLeft: 5,
    alignItems: "center",
  },
  card : {
    display: 'flex',
    variant: "h2",
    fontSize: 24,
    // marginLeft: 400,
   
    overflow: 'auto',
    // marginRight: 60,
       borderStyle: 'solid',
    borderWidth: 2, 
    color: '#aaf',
    borderColor: '',
    borderRadius: 7,
    fontFamily: 'Overpass',
    backgroundColor: '#333333',
    opacity: .93,
    marginLeft:"30%",
    marginRight: "7%",
    marginBottom: 40,
    paddingRight: 10,
    
  },
  card2 : {
    display: 'flex',
    variant: "h2",
    fontSize: 24,
  
    position:'relative', 
    left: "20%",
    width: "100%",
    overflow: 'auto',
       borderStyle: 'solid',
    borderWidth: 2, 
    color: '#f6f6f6',
    borderColor: '',
    // borderRadius: 7,
    paddingRight: 20,
    paddingLeft: 20,
    fontFamily: 'Overpass',
    backgroundColor: '#333333',
    marginTop: 20,
    marginBottom: 20,
    opacity: .93,
    padding: 10
  },
  card3 : {
    display: 'flex',
    
    variant: "h2",
    fontSize: 20,
    justifyContent: "center",
    textAlign: "center",
    // marginLeft: 170,
   position: "relative",

 
    // marginLeft: 450,

    overflow: 'auto',
    padding: 10,

    fontFamily: 'Overpass',
    backgroundColor: '#333333',
    opacity: .93,
  },
 
  text : {
    variant: "h5",
    fontSize: 24,
    // borderRadius: 7,
    fontFamily: 'Overpass',
    margin: 15
  },
  text2 : {
    variant: "h3",
    fontSize: 24,
    borderRadius: 7,
    fontFamily: 'Overpass',
    marginTop: 30,
    marginBottom: 10,
    marginRight: 10,
    marginLeft: 5,
  },
  text3 : {
    variant: "h3",
    fontSize: 18,
    borderRadius: 7,
    fontFamily: 'Overpass',
    marginTop: 50,
    position: "center",
    alignItems: 'center',
    marginBottom: 20,
    marginRight: 5,
    marginLeft: 5,
  }

})

export default function About(newUser){
  const classes = useStyles();
  // const [hidden, setHidden] = useState("");
    // const router = useRouter();
    // console.log(router);
    // const handleSubmit = (evt) => {
    //     evt.preventDefault();
    // }
   
  return (
 
<>
    <Grid item xs={12} className={classes.root} style={styles.about}>
 
        <Card style={styles.card}> 
              <Typography variant="h3" gutterBottom style={styles.text}>
              Prax is an audio-video platform enhanced with tools to help musicians stay on time over a remote connection. The site does not mine data or sell user information. If you want to contribute to Prax, please contact the sole developer at matthewfreilly@gmail.com.<br/>
             </Typography>
        </Card> 
 

      <Grid item xs={6}>
          <Card style={styles.card2}>
            <ul>
              <li>
                <Typography variant="h5"> * Encrypted Audio & Video</Typography>
              </li>
              <li>
                <Typography variant="h5"> * Authentication without Tracking </Typography>
              </li>
              <li>
                <Typography variant="h5"> * No Advertisements </Typography>
              </li>
              <li> 
                <Typography variant="h5"> * Tools for Remote Musicians </Typography>
              </li>
            </ul>
          </Card>
      </Grid>

    </Grid>

  
<Grid item xs={12}>
    <Card style={styles.card3}>
        <SocialIcon url="https://github.com/MartinScriblerus" style={styles.icons}/>
        <SocialIcon url="https://twitter.com/A00PE" style={styles.icons} />
        <SocialIcon url="https://www.linkedin.com/in/matthew-reilly-91b316142/" style={styles.icons} />
    </Card>
</Grid>

 
</>


  );
};