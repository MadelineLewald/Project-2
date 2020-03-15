const express = require('express');
const router = express.Router();
const Recipe = require('../models/recipes.js');
// const session = require('express-session');

//delete route
router.delete('/:id', (req, res) => {
  Recipe.findByIdAndRemove(req.params.id, (error, data) => {
    res.redirect('/recipes');
    //routes back to recipes page when you delete one
  });
});

router.put('/:id', (req, res) => {
  Recipe.findByIdAndUpdate(req.params.id, req.body, {new: true}, (error, updatedModel) => {
    //when you edit a recipe this makes the updated model the one that is shown
    res.redirect('/recipes');
    //once updated this redirects you back to the recipes page
  });
});

router.get('/:id/edit', (req, res) => {
  Recipe.findById(req.params.id, (error, foundRecipe) => {
    res.render(
      'recipes/edit.ejs',
      {
        recipe: foundRecipe,
        user: req.session.user
      }
    )
  });
});

router.get('/new', (req, res) => {
  res.render('recipes/new.ejs');
});

router.get('/:id', (req, res) => {
  Recipe.findById(req.params.id, (error, foundRecipe) => {
    res.render(
      'recipes/show.ejs',
      {
        recipe: foundRecipe
      }
    )
  });
});

//index route
router.get('/', (req, res) => {
  if(req.session.user) {
    //if user is logged in
    Recipe.find({}, (error, allRecipes) => {
      //find all of the recipes
      res.render(
        'recipes/index.ejs',
        //go to recipe index page
        {
          recipe: allRecipes,
          user: req.session.user
        }
      )
    });
  } else {
    //if user is not logged in
    res.redirect('/');
    //go back to home page
  }
});

router.post('/', (req, res) => {
  Recipe.create(req.body, (error, createdRecipe) => {
    res.redirect('/recipes');
  });
});

module.exports = router;
