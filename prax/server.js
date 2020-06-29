
var express = require("express");
const app = require('express')();
const morgan = require('morgan')
const compression = require('compression')
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
    const PORT  = process.env.PORT || 8080;
    var server = app.listen(PORT, ()=> console.log(`Server running on port ${PORT}`))
    }
    catch{console.log('server err')}
 
    

  //=====================================================
    //+++++++++++++++++++++++++++++++++++++++++++++++++  
    var socket = require('socket.io', { origins: '*:*'});
    
    var io = socket(server);
    
  //   io.on('connection', socket => {
  //     if (!users[socket.id]) {
  //         users[socket.id] = socket.id;
  //     }
  //     socket.emit("yourID", socket.id);
  //     io.sockets.emit("allUsers", users);
  //     socket.on('disconnect', () => {
  //         delete users[socket.id];
  //     })
  
  //     socket.on("callUser", (data) => {
  //         io.to(data.userToCall).emit('hey', {signal: data.signalData, from: data.from});
  //     })
  
  //     socket.on("acceptCall", (data) => {
  //         io.to(data.to).emit('callAccepted', data.signal);
  //     })
  // });


  io.on('connection', newConnection);

    function newConnection(socket){
      // I WILL NEED TO TRACK THIS ID AS THE SINGLE SOURCE OF SOCKET TRUTH
  
    console.log('new connection: ' + socket.id);
    // socket.emit('message', {message: 'Welcome to the chat room!'});
    // socket.emit('message_Users', {message_Users: users});   
    // socket.emit('message_Messages', {message_Messages: messages});
    
    // socket.on('poses', poses)
    // function poses(poses){
    //   console.log(poses)
    //   socket.broadcast.emit('posesFromServer', poses)
    // }  

    // socket.on('userID', userID)
    // function userID(userID){
    //   console.log(userID)
    //   socket.broadcast.emit('userID_Joined', userID)
    // }  
       socket.on('joinRoom', roomOption)
      function roomOption(itemToAdd){
      
       console.log("SOCKET JOINING ITEMTOADD", socket.join(itemToAdd));
        socket.broadcast.to(itemToAdd).emit('roomOption_Joined', itemToAdd)
       
      // socket.broadcast.to(itemToAdd).on('poses', poses)
      // function poses(poses){
      //   // BELOW IS AN OBJECT w. PROPERTIES OF SCORE & KEYPOINTS ARRAY
      //   // console.log(poses)
      //   // This broadcast emit is working when there are 2 users!!! 
      //   // const serverDrawPoses = poses
      //   // console.log(serverDrawPoses)
      //   // socket.broadcast.to(itemToAdd).emit('serverDrawPoses', serverDrawPoses )
      // }
    
      // socket.on('canvasContext', canvasCTX)
      // function canvasCTX(canvas_RTCstream){
      //  console.log(canvas_RTCstream)
      //   socket.broadcast.to(itemToAdd).emit("herecanvasCTX", canvas_RTCstream)
      // }
      
      // socket.on('poses', poses)
      // function poses(posesFromServer){
      //   console.log(posesFromServer)
      //   socket.broadcast.to(itemToAdd).emit("posesFromServer", posesFromServer)
      // };

      // socket.on('canvasURL', canvasURL)
      // function canvasURL(canvasURL){
  
      //     const canvasRTCDraw = (decodeURI(canvasURL.toString()) );
      //    // BELOW GIVES AN OBJECT 'poses' WITH PROPERTIES OF 'score' AND 'keypoints'
      //     // console.log("canvasRTCDRAW", canvasRTCDraw);
        
      //   // BELOW GIVES BACK A LONG STRING (IT WORKS!) 
      //   // console.log(canvasURL)
      //   const serverDrawCanvasURL = canvasRTCDraw 
      //   socket.emit('serverDrawCanvasURL', serverDrawCanvasURL)
      //   }
      }  
    
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
  
  app.get('/:message', (req, res) => {
      console.log("got the audio / video route route")
         console.log(res.json({}));
       });

  app.post("/api/user", function(req, res) {
  
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


  app.post("/api/message", async function(req, res) {
  
          console.log("server is posting db.Message & api/message");
  
          db.Message.create({
            // id: req.body.id, 
            origin: req.body.origin,
            content: req.body.content,
            username: req.body.username
          })
  
        var newMessage = req.body;
            newMessage= {
            origin: req.body.origin,
            content: req.body.content,
            username: req.body.username
          }

        console.log("newMessage", newMessage)
        messages.push(newMessage);
        res.json(messages);
          console.log(messages);
        console.log("this is messages origin!: ", req.body.origin);
      
     
      })
        
        var users = [];
        var messages = [];

       





  db.sequelize.sync().then(() => {
    // eslint-disable-next-line no-console
    console.log('User db and user table have been created');
  });