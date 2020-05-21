
var express = require("express");
const app = require('express')();
const morgan = require('morgan')
const compression = require('compression')
const dotenv = require('dotenv');

var bodyParser = require('body-parser');
var session = require("express-session");
// const jwt = require('jsonwebtoken');

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

  app.use(morgan('dev'))



  app.get('/', (req, res) => res.sendFile(__dirname + '/index.html'));
  


  
  app.use(express.static("./public"));
      app.use(bodyParser.json());
          // We need to use sessions to keep track of our user's login status
    //   app.use(session({ 
    //     secret: "altSXSW", 
    //     resave: true, 
    //     saveUninitialized: true })
    //     );
      app.use(passport.initialize());
      app.use(passport.session());
      app.use(express.urlencoded({extended: false})) 
  app.use(express.json())
  app.use(bodyParser.json())
    // compression middleware
    app.use(compression())
  // app.use(bodyParser.urlencoded({ extended: true }));




const db = require('./models/index');
  
  app.use('/api/user', require('./routes/user'))
  app.use('/api/message', require('./routes/message'))
  app.use('/api/relation', require('./routes/relation'))
    //   // We need to use sessions to keep track of our user's login status
  app.use(session({ secret: "altSXSW", resave: true, saveUninitialized: true }));
  
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
      console.log(res.json({}));
    });
  
  app.get('/praxspace/:username/:message', (req, res) => {
      console.log("got the audio / video route route")
         console.log(res.json({}));
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

  app.post("/api/message", function(req, res) {
  
        console.log("server is posting db.Message & api/message");
       
        // req.body hosts is equal to the JSON post sent from the user
        // This works because of our body parsing middleware
        // CREATING THE DATABASE
    

        db.Message.create({
          // id: req.body.id, 
          origin: req.body.origin,
          content: req.body.content,
          // description: req.body.description   
        })
        .then(function(message) {
          // you can now access the newly created user
          console.log('success', message.toJSON());
          console.log("here is the MESSAGE: ", message)
        })
        .catch(function(err) {
            // print the error details
            console.log("error", err, req.body.origin);
        });

       

      var newMessage = req.body;
          newMessage= [{
          origin: req.body.origin,
          content: req.body.content,
          // description: req.body.description  
        }]
      console.log("newMessage", newMessage)
      messages.push(newMessage);
      res.json(messages);
        console.log(messages);
      console.log("this is messages origin!: ", req.body.origin);
      var roomname = req.body.content;
      var username = req.body.origin;
        db.User.findOne({
          where: {
            id: username,
          },
        }).then(dbUser =>
          console.log("username that posted the message: ", dbUser.username)
          ).then(console.log("this is the room that user created: ", roomname))
        .catch(err => res.status(422).json(err));
    });

        var users = [];
        var messages = [];



       
  // =============================================================
//  Signalling!
// =============================================================


  // const PeerDataServer = require("peer-data-server");

  // const appendPeerCdnServer = PeerDataServer.default || PeerDataServer;

  
  // appendPeerCdnServer(server);





try{
const PORT  = process.env.PORT || 5001;
app.listen(PORT, ()=> console.log(`Server corriendo en ${PORT}`))
}
catch{console.log('eeerrrrr')}



   