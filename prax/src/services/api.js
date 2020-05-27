  
import axios from "axios";
import { BASE_URL } from '../const/index'




const getAxiosClient = () => {
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'
  console.log(token)
  return axios.create({
    baseURL: BASE_URL,
    headers: { "auth-token": token }
  });
  
};

export const registerUser = dataRegister => {
  console.log('DATAREGISTER', dataRegister)
  const api = getAxiosClient();
  return api.post("http://localhost:5001/api/user/login", dataRegister);
};

export const loginUser = dataLogin => {
  const api = getAxiosClient();
  console.log("DATALOGIN", dataLogin)
  api.get("http://localhost:5001/api/user/login");
  return api.post("http://localhost:5001/api/user/login", dataLogin);
};

export const getUsers = () => {
  const api = getAxiosClient();
  api.get("http://localhost:5001/api/user/login");

  return api.get("http://localhost:5001/api/user/login");
  // return axios.post("http://localhost:3000/");
  // return axios.post("http://localhost:5001/api/user/login");
};

export const getChat = id => {
  console.log("gettingChat")
  const api = getAxiosClient();
  return api.get("http://localhost:5001/api/user/login");
  
  // return api.get(`/message/chat/${id}`);
};

export const getMessages = messages => {
  console.log("gettingChat")
  const api = getAxiosClient();
// return api.post(`http://localhost:5001/api/message`, messages)
  // headers= {
  //   Authorization= `Bearer ${token};`
  // }    
  return api.get("http://localhost:5001/api/message");


  // return api.get(`/message/chat/${id}`);
};

export const postMessage = dataMessage => {
  const api = getAxiosClient();
  return api.post("http://localhost:5001/api/message", dataMessage);
};

export const markAsRead = () => {
  const api = getAxiosClient();
  return api.put(`http://localhost:5001/api/message`);
};