const express = require('express');
const router = express.Router();
const User = require('../models/users.js');
const bcrypt = require('bcrypt');

router.get('/new', (req, res) => {
  res.render('session/new.ejs')
})

router.post('/', (req, res) => {
  User.findOne(
    {
      username: req.body.username
    }, (error, foundUser) => {
      if(foundUser === null) {
        //if username doesnt match
        res.redirect('/session/new');
        //stay on page
      } else {
        //if username does match, then check password
        const doesPasswordMatch = bcrypt.compareSync(req.body.password, foundUser.password);
        //compares the password used to the actual password in the schema

        if(doesPasswordMatch) {
          //if it does doesPasswordMatch
          //cookie
          req.session.user = foundUser;

          res.redirect('/recipes');
          //redirects to recipes page if password is correct
        } else {
          res.redirect('/session/new');
          //otherwise dont
        }
      }
    }
  )
});

module.exports = router;
