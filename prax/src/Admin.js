
import React from "react";
import Button from '@material-ui/core/Button';
import { useAuth } from "./context/auth";

function Admin(props) {
  const { setAuthToken } = useAuth();

  function logOut() {
    setAuthToken();
  }

  return (
    <div>
      <div>Admin Page</div>
      <Button onClick={logOut}>Log out</Button>
    </div>
  );
}

export default Admin;