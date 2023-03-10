const express = require('express')
const passport = require('passport')
const Recipe = require('../models/recipe')
const customErrors = require('../../lib/custom_errors')
const handle404 = customErrors.handle404
const requireOwnership = customErrors.requireOwnership
const removeBlanks = require('../../lib/remove_blank_fields')
const requireToken = passport.authenticate('bearer', { session: false })


const router = express.Router()

// INDEX
// GET /recipes
router.get('/recipes', requireToken, (req, res, next) => {
	Recipe.find()
		.then((recipes) => {
			return recipes.map((recipe) => recipe.toObject())
		})
		// respond with status 200 and JSON of the recipes
		.then((recipes) => res.status(200).json({ recipes: recipes }))
		// if an error occurs, pass it to the handler
		.catch(next)
})

// SHOW **************(may change to /userId/:id)***********
// GET /recipes/5a7db6c74d55bc51bdf39793
router.get('/recipes/:id', requireToken, (req, res, next) => {
	// req.params.id will be set based on the `:id` in the route
	Recipe.findById(req.params.id)
		.then(handle404)
		// if `findById` is succesful, respond with 200 and "recipe" JSON
		.then((recipe) => res.status(200).json({ recipe: recipe.toObject() }))
		// if an error occurs, pass it to the handler
		.catch(next)
})

// CREATE
// POST /recipes
router.post('/recipes', requireToken, (req, res, next) => {
	// set owner of new recipe to be current user
	req.body.recipe.owner = req.user.id
	Recipe.create(req.body.recipe)
		.then((recipe) => {
			res.status(201).json({ recipe: recipe.toObject() })
		})
		
		.catch(next)
})

// UPDATE
// PATCH /recipes/5a7db6c74d55bc51bdf39793
router.patch('/recipes/:id', requireToken, removeBlanks, (req, res, next) => {
	delete req.body.recipe.owner
	Recipe.findById(req.params.id)
		.then(handle404)
		.then((recipe) => {
			// pass the `req` object and the Mongoose record to `requireOwnership`
			// it will throw an error if the current user isn't the owner
			requireOwnership(req, recipe)

			// pass the result of Mongoose's `.update` to the next `.then`
			return recipe.updateOne(req.body.recipe)
		})
		// if that succeeded, return 204 and no JSON
		.then(() => res.sendStatus(204))
		// if an error occurs, pass it to the handler
		.catch(next)
})

// DESTROY
// DELETE /recipes/5a7db6c74d55bc51bdf39793
router.delete('/recipes/:id', requireToken, (req, res, next) => {
	Recipe.findById(req.params.id)
		.then(handle404)
		.then((recipe) => {
			// throw an error if current user doesn't own `recipe`
			requireOwnership(req, recipe)
			// delete the recipe ONLY IF the above didn't throw
			recipe.deleteOne()
		})
		// send back 204 and no content if the deletion succeeded
		.then(() => res.sendStatus(204))
		// if an error occurs, pass it to the handler
		.catch(next)
})

module.exports = router
