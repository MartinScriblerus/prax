import axios from "axios";
const auth = require('../../routes/verifyToken');
console.log(auth)
export default {

// ==================================================================
//  USER ROUTES
// ==================================================================
  // Gets users from the API created by express server
  getUsers: function(q) {
    return axios.get("/api/user/login", { params: { q: "title:" + q } });
  },
  // getMessages: function(d) {
  //   return axios.get("/api/message", auth, { params: { d: "title:" + d } });
  // },
  // Gets all saved users
  getSavedUsers: function() {
    return axios.get("/api/user");
  },
  // getSavedMessages: function() {
  //   return axios.get("/api/message");
  // },
  // Deletes the saved user with the given id
  deleteMessage: function(user_id) {
    return axios.delete("/api/user/" + user_id);
  },
  deleteUser: function(user_id) {
    return axios.delete("/api/user/" + user_id);
  },
  // Saves a user to the database
  saveUser: function(user_id) {
    return axios.post("/api/user", user_id);
  },



// ==================================================================
//  Relation ROUTES
// ==================================================================
  // Gets users from the API created by express server
  getUsers: function(q) {
    return axios.get("/api/user/login", { params: { q: "title:" + q } });
  },
  // Gets all saved users
  getSavedUsers: function() {
    return axios.get("/api/relation");
  },
  // Deletes the saved user with the given id
  deleteUser: function(user_id) {
    return axios.delete("/api/user/" + user_id);
  },
  // Saves a user to the database
  saveUser: function(user_id) {
    return axios.post("/api/user", user_id);
  },

};