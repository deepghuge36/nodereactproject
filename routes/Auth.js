const express = require('express');
const passport = require('passport');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../Models/Users');
const keys = require('../config/keys');

const router = express.Router();

router.post('/', (req, res) => {
  User.findOne({ id: req.body.email }).then((user) => {
    if (!user) {
      res.status(400).json({ message: "User with email is not found." });
    } else {
      bcrypt.compare(req.body.password, user.password, (err, isMatch) => {
        if (isMatch) {
          const payload = {
            _id: user.id,
            name: user.name,
            email: user.email,
            branch: user.branch
          };
          jwt.sign(payload, keys.secretOrKey, (err, token)=>{
            res.json({
              success: true,
              token: "Bearer " + token,
            });
          });
        } else {
          res.status(400).json({ message: "Password is Missing" });
        }
      });
    }
  })
})

router.post('/register', (req, res) => {
  return User.findOne({ email: req.body.email }).then((user) => {
    if (user) {
      res.status(400).json({ message: "user with this email already exist" });
    }
    else {
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        branch: req.body.branch,
        password: req.body.password,
      });
      bcrypt.genSalt(10, (err, salt) => bcrypt.hash(newUser.password, salt, (err, hash) => {
        newUser.password = hash;
        newUser.save().then((user) => {
          res.status(200).json({ message: "successfully registered" });
        });
      }));
    }
  });
});

router.get(
  '/verify-user',
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json(req.user);
  }
);

module.exports =router