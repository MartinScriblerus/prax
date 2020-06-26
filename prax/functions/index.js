const functions = require('firebase-functions');
const express = require('express')

const app = express();


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




app.get('/timestamp', (request, response)=>{
    response.send(`${Date.now()}`)
});

app.get('/login-cached', (request, response)=>{
    response.set('Cache-Control', 'public, max-age=300, s-maxage=600',)
})

app.post("/api/user", (req, res) => {
  
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


app.post("/api/message", async (req, res) => {

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

   

exports.expressFunctions = functions.https.onRequest(app)
