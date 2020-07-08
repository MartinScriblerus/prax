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


// var provider = new firebase.auth.GoogleAuthProvider();

// Using a popup.
var provider = new firebase.auth.OAuthProvider('google.com');
// provider.addScope('profile');
provider.addScope('email');
firebase.auth().signInWithPopup(provider).then(function(result) {
 // This gives you the OAuth Access Token for that provider.
 var token = result.credential.accessToken;
 // The signed-in user info.
 var user = result.user;
 alert(JSON.stringify(result))
 return JSON.stringify(result)
});


export default firebase;
 

