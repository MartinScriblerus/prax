import React, { useState } from "react";
import "./profile.scss";
import { useDispatch } from 'react-redux'
import { logOutUser } from '../../../redux/auth/actions'

const styles = {
  logout: {
    backgroundColor: "#85b1d7",
    color: "#272" 
  },
  logoutPopup: {
    color: "#85b1d7",
    backgroundColor: "#030303", 
    fontSize: 20,
    width: '100%'

  },
  contactTabs: {
    fontSize: 29,
    marginLeft: "-15%",
    backgroundColor: '#212121' 
  },
  button: {
    color: "black",
    height: 60
  },
  ellipsis: {
    color: "#daddc7",
    fontSize: 26,
    height: '100%',
    width: '100%',
  }
}

export const Profile = props => {

  const { username } = props;
  const [showMenu, setShowMenu] = useState(false);
  const dispatch = useDispatch()
  
  return (
    <div className="profile-container" style={styles.logout}>
      <div className="username-box">
        <h4 
        className="handle"
        style={styles.contactTabs}
        type="text"
        placeholder = "Handle"
        >{username}</h4>
      
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
    
    </div>
  );
};