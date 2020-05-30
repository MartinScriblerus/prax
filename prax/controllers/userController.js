// Require all files in the models folder within the SQL database
const db = require("../models");


// Sending out this module of functions, which query every entry 
// in the User table of our SQL db, search each one by paramaters 
// of id, and create, update, and delete existing users. 
module.exports = {
  findAll: function(req, res) {
   
    db.User.find(req.query)
      .then(dbUser => res.json(dbUser))
      .catch(err => res.status(422).json(err));
  },
  findById: function(req, res) {
    db.User.findById(req.params.id)
   
      .then(dbUser => res.json(dbUser))
      .catch(err => res.status(422).json(err));
  },
  create: function(req, res) {
    db.User.create(req.body)
    .then(function(user) {
      // you can now access the newly created user
      console.log('success', user.toJSON());
  })
  db.Messages.create(req.body)
  .then(function(message) {
    // you can now access the newly created user
    console.log('success', message.toJSON());
})
  .catch(function(err) {
      // print the error details
      console.log(err, req.body.user);
  })
      .then(dbUser => res.json(dbUser))
      .catch(err => res.status(422).json(err));
  },
  update: function(req, res) {
    db.User.findOneAndUpdate({ id: req.params.id }, req.body)
      .then(dbUser => res.json(dbUser))
      .catch(err => res.status(422).json(err));
  },
  remove: function(req, res) {
    db.User.findById(req.params.id)
      .then(dbUser => dbUser.remove())
      .then(dbUser => res.json(dbUser))
      .catch(err => res.status(422).json(err));
  }
};