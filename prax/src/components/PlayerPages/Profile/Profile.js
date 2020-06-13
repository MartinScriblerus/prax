import React, { useState } from "react";
import "./profile.scss";
import { useDispatch } from 'react-redux'
import { logOutUser } from '../../../redux/auth/actions'



const styles = {
  loggedAs: {
    color: "#dadcd7",
  

  },
  logout: {
    fontSize: "26px",
    // padding: '20vh',
  justifyContent: 'left',
    // backgroundColor: "#85b1d7",
    color: "#272", 
    
  },
  logoutPopup: {
    color: "#85b1d7",
    fontSize: 20,
    width: '100%',

    // marginRight: '5vh',
    // paddingRight: '5vh',
    
 
  //  marginTop: 20
  },
  contactTabs: {
    // fontSize: '22px',
    // marginLeft: "20px",
    backgroundColor: '#212121' 
  },
  button: {
    color: '#dadcd7',
    backgroundColor: '#212121',

  },
  ellipsis: {
   
    fontSize: 26,
 
    // width: '100%',
  }
}

export const Profile = props => {

  const { username } = props;
  const [showMenu, setShowMenu] = useState(false);
  const dispatch = useDispatch()
  
  return (
    <div className="profile-container" style={styles.logout}>

   

        <button className="buttonMenu" style={styles.button}      
          onClick={() => {
            setShowMenu(!showMenu);
          }}
          > 


          <i style={styles.ellipsis} className="fas fa-ellipsis-v">
          Menu
          </i>
       {showMenu && (
            <nav className="profile-menu">

              <ul className="menuNav">
              <li 
              // className="handle"
              style={styles.logoutPopup}
              type="text"
              placeholder = "Handle"
              > User: <span style={styles.loggedAs}> 
              {username}</span></li>
                <li 
                style={styles.logoutPopup}
                  onClick={() => {
                    dispatch(logOutUser());
                  }}
                >
                  Log out
                </li>
              </ul>
            </nav>
          )}
        </button>
       
        </div>
  
    

  );
};