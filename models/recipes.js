const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
  //schema parameters
  image: String,
  recipeName: { type: String, required: true },
  ingredients: { type: String, required: true },
  cookTime: { type: Number, required: true },
  recipe: { type: String, required: true },
  cost: { type: Number, required: true }
});

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;
