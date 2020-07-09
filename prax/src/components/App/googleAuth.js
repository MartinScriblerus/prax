import React from "react";
import { Router } from "@reach/router";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import PasswordReset from "./PasswordReset";
import ProfilePage from './ProfilePage'
import PoseNet from '../posenet/components/Camera'

function GoogAuth() {
  const user = null;
  return (
        user ?
        <ProfilePage/>
      :
        <Router>
          <SignUp path="signUp" />
          <SignIn path="/" />
          <PasswordReset path = "passwordReset" />
        </Router>

  );
}
export default GoogAuth;