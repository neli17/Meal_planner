// routes/recipeRoutes.js

const express = require('express');
const { addRecipe, scrapRecipe, getRecipeById, editRecipe,editRecipee, deleteAllRecipes, getAllRecipes, deleteRecipeById, getSimilarRecipes } = require('../controllers/recipeController');

const router = express.Router();

router.post('/add', addRecipe);
router.post('/scrap', scrapRecipe);
router.get('/get-recipe/:id', getRecipeById);
router.put('/edit-recipe/:id', editRecipe);
router.put('/edit/:id', editRecipee);
router.delete('/deleteAll', deleteAllRecipes);
router.get('/getAll', getAllRecipes);
router.delete('/delete/:id', deleteRecipeById);
router.get('/similar/:id', getSimilarRecipes);

module.exports = router;
