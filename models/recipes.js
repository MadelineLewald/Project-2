const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
  //schema parameters
  recipeName: { type: String, required: true },
  ingredients: { type: String, required: true },
  cookTime: { type: Number, required: true },
  cost: { type: Number, required: true }
});

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;
