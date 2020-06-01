
var express = require("express");
const app = require('express')();
const morgan = require('morgan')
const compression = require('compression')
const dotenv = require('dotenv');

var bodyParser = require('body-parser');
var session = require("express-session");
// var jwt = require('jsonwebtoken');

var cors = require('cors')

var passport = require("passport");


// app.use(cors())

  app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
  }));

  app.options("*", cors())

  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "http://localhost:3000");
    next();
  });

  // jwt.sign({
  //   exp: Math.floor(Date.now() / 1000) + (60 * 60),
  //   data: 'token'
  // }, 'alt_SXSW');

  app.use(morgan('dev'))


  app.get('/', (req, res) => res.sendFile(__dirname + '/index.html'));
    
  app.use(express.static("./public"));
      app.use(bodyParser.json());
          // We need to use sessions to keep track of our user's login status
      app.use(session({ 
        secret: "altSXSW", 
        resave: true, 
        saveUninitialized: true })
        );
      app.use(passport.initialize());
      app.use(passport.session());
      app.use(express.urlencoded({extended: false})) 
  app.use(express.json())
  app.use(bodyParser.json())
    // compression middleware
    app.use(compression())
  // app.use(bodyParser.urlencoded({ extended: true }));



  try{
    const PORT  = process.env.PORT || 5001;
    var server = app.listen(PORT, ()=> console.log(`Server running on port ${PORT}`))
    }
    catch{console.log('server err')}
    
  //=====================================================
    //+++++++++++++++++++++++++++++++++++++++++++++++++  
    var socket = require('socket.io');
    
    var io = socket(server);
    
    io.on('connection', newConnection);
    
    function newConnection(socket){
    console.log('new connection: ' + socket.id);
    socket.emit('message', {message: 'Welcome to the chat room!'});
    socket.emit('message_Users', {message_Users: users});   
    socket.emit('message_Messages', {message_Messages: messages});
    
    socket.on('username', username)
    function username(username){
      console.log(username)
      socket.broadcast.emit('username_Joined', username)
    }  

    socket.on('userID', userID)
    function userID(userID){
      console.log(userID)
      socket.broadcast.emit('userID_Joined', userID)
    }  

    socket.on('roomOption', roomOption)
    function roomOption(roomOption){
      console.log(roomOption)
      socket.broadcast.emit('roomOption_Joined', roomOption)
    }  

    socket.on('poses', poses)
    function poses(poses){
      // BELOW IS AN OBJECT w. PROPERTIES OF SCORE & KEYPOINTS ARRAY
      // console.log(poses)
      // This broadcast emit is working when there are 2 users!!! 
      const serverDrawPoses = poses
      socket.broadcast.emit('serverDrawPoses', serverDrawPoses )
    }
  
    socket.on('canvasURL', canvasURL)
    function canvasURL(canvasURL){

        const canvasRTCDraw = (decodeURI(canvasURL.toString()) );
       // BELOW GIVES AN OBJECT 'poses' WITH PROPERTIES OF 'score' AND 'keypoints'
        // console.log("canvasRTCDRAW", canvasRTCDraw);

      // BELOW GIVES BACK A LONG STRING (IT WORKS!) 
      // console.log(canvasURL)
      const serverDrawCanvasURL = canvasRTCDraw 
      socket.broadcast.emit('serverDrawCanvasURL', serverDrawCanvasURL)
    }
    //+++++++++++++++++++++++++++++++++++++++++++++++++
    // MOVE THIS SOCKET NAMESPACE INTO DYNAMIC URL
    // const nsp = io.of('/:username/:message');
    //   nsp.on('connection', function(socket){
    //     console.log('someone connected!');
    //   });
    //   nsp.emit('hi', 'everyone!');
    }
    
    //+++++++++++++++++++++++++++++++++++++++++++++++++
//=====================================================

const db = require('./models/index');


  app.use('/api/user', require('./routes/user'))
  app.use('/api/message', require('./routes/message'))
  app.use('/api/relation', require('./routes/relation'))
    //   // We need to use sessions to keep track of our user's login status
  app.use(session({ secret: "altSXSW", resave: true, saveUninitialized: true }));
  
  app.get('/', (req, res) => {
    console.log("in /")
    return res.json(users)
  });

  app.get('/login', (req, res) => {
    console.log("in /login")
    return res.json(users)
  });

  app.get('/api/user/login', (req, res) => {
      return res.json(users)
    });
  
  app.get('/api/user', (req, res) => {
      return res.json(users);
    });
  
  app.get('/api/message', (req, res) => {
   console.log("got msg route")
      return res.json({messages});
    });
  
  app.get('/praxspace/:username/:message', (req, res) => {
      console.log("got the audio / video route route")
         console.log(res.json({}));
       });

       
    let roomList = {
    content: ['here is the first room name'],
    username: ['here is the first username']
  };  

  app.get('/api/newestRoom', (req, res) => {
  console.log("IN NEWEST ROOMS")

  let roomList = {
    content: ['here is the first content'],
    username: ['here is the first username']
  };
      return res.json({roomList});
    });



 
  
  app.post("/api/user", function(req, res) {
    
    // req.body hosts is equal to the JSON post sent from the user
      db.User.create({
            // id: req.body.id, 
            username: req.body.username, 
            email: req.body.email,
            // password: req.body.password,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            bandName: req.body.bandName,
            password : req.body.password,
            instrument : req.body.instrument,
            // createdAt : req.body.createdAt,
            // updatedAt : req.body.updatedAt
          })
 
        var newUser = req.body;
          newUser= [{
            // id: req.body.id,
            username: req.body.username, 
            email: req.body.email,
            // password: req.body.password,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            bandName: req.body.bandName,
            password : req.body.password,
            instrument : req.body.instrument,
            // createdAt : req.body.createdAt,
            // updatedAt : req.body.updatedAt
          }]

          console.log(newUser);
          users.push(newUser);
          res.json(users);
          console.log("this is users:", users)
        });

       let messagePosted;
       let usernamePosted; 
  app.post("/api/message", async function(req, res) {
  
          console.log("server is posting db.Message & api/message");
         
          // req.body hosts is equal to the JSON post sent from the user
          // This works because of our body parsing middleware
          // CREATING THE DATABASE
      
  
          db.Message.create({
            // id: req.body.id, 
            origin: req.body.origin,
            content: req.body.content,
            username: req.body.username

            // userPosted: req.body.userPosted
          })
  
        var newMessage = req.body;
            newMessage= {
            origin: req.body.origin,
            content: req.body.content,
            username: req.body.username
            // userPosted: req.body.userPosted
          }
        // console.log(newMessage);
            // Using a RegEx Pattern to remove spaces from newCharacter
            // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
            // newUser.routeName = newUser.name.replace(/\s+/g, "").toLowerCase();
        console.log("newMessage", newMessage)
        messages.push(newMessage);
        res.json(messages);
          console.log(messages);
        console.log("this is messages origin!: ", req.body.origin);
      
      
  
        var postedTheMessageWorks = req.body.origin;
       
        
      
       
 





        // tktktktktk
          // usernamePosted.push(userThatPosted.dataValues.username);
          // messagePosted.push(newMessage[0].content);    
      })
        
 




        var users = [];
        var messages = [];

       
// =============================================================
//  Signalling!
// =============================================================

  // const PeerDataServer = require("peer-data-server");
  // const appendPeerCdnServer = PeerDataServer.default || PeerDataServer;
  // appendPeerCdnServer(server);
  db.sequelize.sync().then(() => {
    // eslint-disable-next-line no-console
    console.log('User db and user table have been created');
  });