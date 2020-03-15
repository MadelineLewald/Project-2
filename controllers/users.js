const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const User = require('../models/users.js');

router.get('/new', (req, res) => {
  res.render('users/new.ejs');
});

router.post('/', (req, res) => {
  req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
  User.create(req.body, (error, createdUser) => {
    //creates user
    req.session.user = createdUser;
    //cookie provided to redirect you to index page when you create a user
    res.redirect('/recipes');
  });
});

module.exports = router;
