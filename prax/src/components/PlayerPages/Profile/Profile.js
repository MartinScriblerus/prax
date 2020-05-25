import React, { useState } from "react";
import "./profile.scss";
import { useDispatch } from 'react-redux'
import { logOutUser } from '../../../redux/auth/actions'

const styles = {
  logout: {
    color: "#dadcd7",
    backgroundColor: "#85b1d7" 
  },
  logoutPopup: {
    color: "#85b1d7",
    backgroundColor: "#030303" 
  },
  contactTabs: {
    fontSize: 29,
    marginLeft: "-15%"
  },
  button: {
    color: "black",
    height: 20
  },
  ellipsis: {
    backgroundColor: "#24a7a8",
    fontSize: 26,
    color: "#dadcd7"
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
                <li style={styles.logoutPopup}
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