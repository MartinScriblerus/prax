import firebase from 'firebase'
// var firebase = require('firebase');
var firebaseui = require('firebaseui');



const firebaseConfig = {
    apiKey: "AIzaSyDArDAlFuzSjzvXvzxo9jvsd6jh_qtEwWE",
    authDomain: "fir-rtc-d3a58.firebaseapp.com",
    databaseURL: "https://fir-rtc-d3a58.firebaseio.com",
    projectId: "fir-rtc-d3a58",
    storageBucket: "fir-rtc-d3a58.appspot.com",
    messagingSenderId: "165177072479",
    appId: "1:165177072479:web:6e4374b9bd51edf74b34ea",
    measurementId: "G-N75YFF2993"
  };
// Initialize Firebase
firebase.initializeApp(firebaseConfig);


var provider = new firebase.auth.GoogleAuthProvider();

firebase.auth().signInWithPopup(provider).then(function(result) {
  // This gives you a Google Access Token. You can use it to access the Google API.
  var token = result.credential.accessToken;
  // The signed-in user info.
  var user = result.user;
  // if(user !== undefined || null || ''){
  // alert(JSON.stringify(result.user))
  // }

}).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  // The email of the user's account used.
  var email = error.email;
  // The firebase.auth.AuthCredential type that was used.
  var credential = error.credential;
  

});




export default firebase;
 

