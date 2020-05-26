import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import { Profile } from '../PlayerPages/Profile/Profile'
import { Contacts } from '../PlayerPages/Contacts/Contacts'
import { useSelector } from 'react-redux'

const useStyles = makeStyles({
  root: {
    backgroundColor: "#030303"
  },
  list: {
    width: 200,
    backgroundColor: '#85b1d7',
  },
  fullList: {
      top: 100,
    width: 'auto',
  },

});

const styles = {
 
  button: {
    color: "#85b1d7",
    width: '40%',
    alignItem: 'right',
    placeholder: {
   float: 'right'
    }
  }
}

export default function TemporaryDrawer() {

    const auth = useSelector(state => state.auth)
    // const chat = useSelector(state => state.chat)
    console.log(auth.user.id)

  const classes = useStyles();
  const [state, setState] = React.useState({
   
    contacts: false,

  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <div style={styles.root}
 
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
    </div>
  );

  return (
    <div style={styles.button}>
      {['contacts'].map((anchor) => (
        <React.Fragment key={anchor} >
          <Button style={styles.button} onClick={toggleDrawer(anchor, true)}>{anchor}</Button>
          <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
            {list(anchor)}

            <div className="left-side" >
            <Profile
              username={auth.user.username}
            />
            <Contacts
    
            username={auth.user.username} 
            idUserLogged={auth.user.id}
           
              // windowWidth={windowWidth}
            ></Contacts>
            
          </div>

          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}