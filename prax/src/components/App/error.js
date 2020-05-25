import React from 'react';
import Card from '@material-ui/core/Card';

import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
require('typeface-overpass')

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  }
}));
  
const styles = ({
  about: {
    variant: "h4",
    fontSize: 18,
    fontFamily: 'Overpass',
    borderStyle: 'solid',
    borderWidth: 2, 
    borderColor: 'black', 
    borderRadius: 7,
    marginRight: 280,
    marginLeft: 280,
    marginTop: 0, 
    padding: 10
  }

})

export default function Error(){
  const classes = useStyles();
   
  return (
    <div className={classes.root}>
        <Card style={styles.card}> 
          <Typography variant="h5" gutterBottom style={styles.about}>
          An error occurred. Try again! <br/>
          </Typography>
        </Card>         
    </div>
  );
};