import React, { useState } from "react";
import "./profile.scss";
import { useDispatch } from 'react-redux'
import { logOutUser } from '../../../redux/auth/actions'
import TemporaryDrawer from '../../Home/drawerComponent'
 


const styles = {
  loggedAs: {
    color: "#dadcd7"
  },
  logout: {
    fontSize: "26px",
  justifyContent: 'left',
    // backgroundColor: "#85b1d7",
    color: "#272", 
 
  },
  logoutPopup: {
    color: "#85b1d7",
    fontSize: 20,
    width: '100%',
  //  marginTop: 20
  },
  contactTabs: {
    // fontSize: '22px',
    // marginLeft: "20px",
    backgroundColor: '#212121' 
  },
  button: {
    color: "#aaf",
    
    marginRight: '20px'
  },
  ellipsis: {
   
    fontSize: 26,
    height: '100%',
    // width: '100%',
  }
}

export const Profile = props => {

  const { username } = props;
  const [showMenu, setShowMenu] = useState(false);
  const dispatch = useDispatch()
  
  return (
    <div className="profile-container" style={styles.logout}>

        <div className="options-box">

        <button style={styles.button}      
          onClick={() => {
            setShowMenu(!showMenu);
          }}
          > 


          <i style={styles.ellipsis} className="fas fa-ellipsis-v">
          Menu
          </i>
       {showMenu && (
            <nav className="profile-menu">

              <ul>
              <li 
              // className="handle"
              style={styles.logoutPopup}
              type="text"
              placeholder = "Handle"
              > Logged as: <br/> <span style={styles.loggedAs}> 
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
  
    
    </div>
  );
};