// This findUsers file takes in valid info from 
// localstrategy and checks user input against 
// the User table in the database. Its primary
// purpose is to check & ensure authentication.

/* eslint-disable no-console */
import passport from 'passport';
import User from '../sequelize';


module.exports = (app) => {
// Creating a /findUser url route 
  app.get('/', (req, res, next) => {
    passport.authenticate('jwt', { session: false }, (err, user, info) => {
      if (err) {
        console.log(err);
      }
      if (info !== undefined) {
        console.log(info.message);
        res.status(401).send(info.message);
      } else if (user.username === req.query.username) {
        User.findOne({
          where: {
            username: req.query.username,
          },
        }).then((user) => {
          if (user != null) {
            console.log('user found in db from findUsers');
            res.status(200).send({
              auth: true,
              id: user.id,
              firstName: user.firstName,
              lastName: user.lastName,
              email: user.email,
              username: user.username,
              password: user.password,
              message: 'user found in db',
            });
          } else {
            console.error('no user exists in db with that username');
            res.status(401).send('no user exists in db with that username');
          }
        });
      } else {
        console.error('jwt id and username do not match');
        res.status(403).send('username and jwt token do not match');
      }
    })(req, res, next);
  });
};