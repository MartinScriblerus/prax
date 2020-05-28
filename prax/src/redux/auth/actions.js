import { AuthTypes } from "./types";
import setAuthToken from "../../services/setAuthToken";
import { ChatTypes } from "../chat/types";
// import { socket } from "../../services/socketio";



import { 
  registerUser as registerUserAPI,
  loginUser as loginUserAPI
} from '../../services/api'

export const registerUserRequest = dataRegister => async dispatch => {
  dispatch({ type: AuthTypes.REGISTER_USERS_REQUEST });
  try {
    //await axios.post(`${BASE_URL}/user/register`, dataRegister);
    await registerUserAPI(dataRegister)
    const dataLogin = {
      username: dataRegister.username,
      password: dataRegister.password
    };
    console.log(dataLogin)
    dispatch(registerUserSuccess(dataLogin));
  } catch (err) {
    dispatch(registerUserFailure(err.response.data.errors));
  }
};

export const registerUserSuccess = dataLogin => async dispatch => {
  console.log("in auth getusers")
  dispatch({ type: AuthTypes.REGISTER_USERS_SUCCESS });
  dispatch(loginUserRequest(dataLogin));
console.log(dataLogin)
  // socket.emit("getUsers");
};

export const registerUserFailure = errors => async dispatch => {
  dispatch({
    type: AuthTypes.REGISTER_USER_FAILURE,
    payload: errors
  });
};

export const loginUserRequest = dataLogin => async dispatch => {
  dispatch({ type: AuthTypes.LOGIN_USER_REQUEST });
  try {
    //const response = await axios.post(`${BASE_URL}/user/login`, dataLogin);
    const response = await loginUserAPI(dataLogin)
    dispatch(loginUserSuccess(response.data));
  } catch (err) {
    dispatch(loginUserFailure(err.response.data.errors));
  }
};

export const loginUserSuccess = response => async dispatch => {
  await response;
  const { token, user } = response;
  localStorage.setItem("token", token);
  //setAuthToken(token);
  dispatch({
    type: AuthTypes.LOGIN_USER_SUCCESS,
    payload: user
  });
};

export const loginUserFailure = errors => async dispatch => {
  await errors;
  dispatch({
    type: AuthTypes.LOGIN_USER_FAILURE,
    payload: errors
  });
};

export const setUserLogged = user => async dispatch => {
  await user;
  dispatch({
    type: AuthTypes.SET_USER_LOGGED,
    payload: user
  });
};

export const logOutUser = () => async dispatch => {
  await setAuthToken(false);
  console.log("MADE IT HEEEEEERE")
  localStorage.removeItem("token");
  dispatch({ type: AuthTypes.LOGOUT_USER });
  dispatch({ type: ChatTypes.CLEAR_STORE });
};

export const clearErrors = ()=> dispatch=>{
  dispatch({type: AuthTypes.CLEAR_STATE})
}