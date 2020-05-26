/* eslint-disable camelcase */
/* eslint-disable consistent-return */
/* eslint-disable no-console */
import bcrypt from 'bcrypt';
import Sequelize from 'sequelize';
import jwtSecret from './jwtConfig';

const BCRYPT_SALT_ROUNDS = 12;
const Op = Sequelize.Op;

// Passport Authentication with JWT & a Local Strategy
// (which requires a username and password)
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const User = require('../sequelize');

passport.use(
  'register',
  new LocalStrategy(
    {
      usernameField: 'username',
      passwordField: 'password',
      passReqToCallback: true,
      session: false,
    },
    (req, username, password, done) => {
      console.log(username);
      console.log(req.body.email);

      // 
      try {
        User.findOne({
          where: {
            [Op.or]: [
              {
                username,
              },
              { email: req.body.email },
            ],
          },
        }).then(user => {
          if (user != null) {
            console.log('username or email already taken');
            return done(null, false, {
              message: 'username or email already taken',
            });
          }
          bcrypt.hash(password, BCRYPT_SALT_ROUNDS).then(hashedPassword => {
            User.create({
              username,
              password: hashedPassword,
              email: req.body.email,
            }).then(user => {
              console.log('user created');
              return done(null, user);
            });
          });
        });
      } catch (err) {
        return done(err);
      }
    },
  ),
);

passport.use(
  'login',
  new LocalStrategy(
    {
      usernameField: 'userName',
      passwordField: 'password',
      session: false,
    },
    (username, password, done) => {
      try {
        User.findOne({
          where: {
            username,
          },
        }).then(user => {
          if (user === null) {
            return done(null, false, { message: 'bad username' });
          }
          else if (!user.validPassword(password)) {
            return done(null, false, {
              message: "Incorrect password."
            });
          }
          // If none of the above, return the user
          return done(null, user);
        
        });
      } catch (err) {
        done(err);
      }
    },
  ),
);

const opts = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderWithScheme('JWT'),
  secretOrKey: jwtSecret.secret,
};

passport.use(
  'jwt',
  new JWTstrategy(opts, (jwt_payload, done) => {
    try {
      User.findOne({
        where: {
          id: jwt_payload.id,
        },
      }).then(user => {
        if (user) {
          console.log('user found in db in passport');
          done(null, user);
        } else {
          console.log('user not found in db');
          done(null, false);
        }
      });
    } catch (err) {
      done(err);
    }
  }),
);