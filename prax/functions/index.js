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

exports.helloWorld = functions.https.onRequest(app)
