import React from 'react';
// import clsx from 'clsx';
// import { makeStyles } from '@material-ui/core/styles';
import { Profile } from '../PlayerPages/Profile/Profile'
import { Contacts } from '../PlayerPages/Contacts/Contacts'
import { useSelector } from 'react-redux'
import './home.scss'

// const useStyles = makeStyles({
//   root: {
//     color: "#030303",
//     // height: '100%'
//   },
//   list: {
//     backgroundColor: "#212121",
//     // height: '100%' 
//   },
  
// });

const styles = {
  root: {
color: "#212121"
  },
  button: {
    // color: "#85b1d7",
    borderTopStyle: "solid",
  
    borderBottomStyle: "solid",
    // borderBottomColor: "#85b",
    alignItem: 'right',
    placeholder: {
   float: 'right'
    },
    drawer: {
      color: "#212121",
      
      height: '100%'
    }
  }
}

export default function TemporaryDrawer() {
  const auth = useSelector(state => state.auth)
  const chat = useSelector(state => state.chat)
  let showContax = [];
  if (typeof chat.contacts && auth.user.id !== (undefined || null)){
    try{
      console.log("auth.user.id: ", auth.user.id)
      
      for(var id = 0; id< chat.contacts.data.length; id++){
        showContax.push(chat.contacts.data[id][0].username)    
        // console.log(showContax) 
        if (id === chat.contacts.data.length){
          return showContax
        }
      }
    }
    catch{

        console.log("searching contacts... give me millisecond")
      }
      console.log("showcontax", showContax)
    }
  
  // let showCtx = showContax.map(s=> s)

      console.log(auth.user.id)

  //     const classes = useStyles();
  //     const [state, setState] = React.useState({
  //   left: false,
  // });

  // const toggleDrawer = (anchor, open) => (event) => {
  //   if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
  //     return;
  //   }

  //   setState({ ...state, [anchor]: open });
  // };

  // const list = (anchor) => (
  //   <div style={styles.root}
 
  //     className={clsx(classes.list, {
  //       [classes.fullList]: anchor === 'top' || anchor === 'bottom',
  //     })}
  //     role="presentation"
  //     onClick={toggleDrawer(anchor, false)}
  //     onKeyDown={toggleDrawer(anchor, false)}
  //   >
  //   </div>
  // );
 
  return (
    <div style={styles.button}>
  {/*}  {<div style={styles.drawer}> {showCtx.map(oneContact=><Button style={styles.button} key={auth.user.id}>{auth.user.username}</Button>)}</div>} */}
          <div className="left-side" >
            <Profile
              username={auth.user.username}
              style={styles.profile}
            />
            <Contacts
              username={auth.user.username} 
              idUserLogged={auth.user.id}
              // windowWidth={windowWidth}
            ></Contacts>
          </div>
    </div>
  );
}