// Express docs: http://expressjs.com/en/api.html
const express = require('express')
// Passport docs: http://www.passportjs.org/docs/
const passport = require('passport')

// pull in Mongoose model for examples
const Recipe = require('../models/recipe')

// this is a collection of methods that help us detect situations when we need
// to throw a custom error
const customErrors = require('../../lib/custom_errors')

// we'll use this function to send 404 when non-existant document is requested
const handle404 = customErrors.handle404
// we'll use this function to send 401 when a user tries to modify a resource
// that's owned by someone else
const requireOwnership = customErrors.requireOwnership

// this is middleware that will remove blank fields from `req.body`, e.g.
// { example: { title: '', text: 'foo' } } -> { example: { text: 'foo' } }
const removeBlanks = require('../../lib/remove_blank_fields')
// passing this as a second argument to `router.<verb>` will make it
// so that a token MUST be passed for that route to be available
// it will also set `req.user`
const requireToken = passport.authenticate('bearer', { session: false })

// instantiate a router (mini app that only handles routes)
const router = express.Router()

// INDEX
// GET /recipes
// requireToken is middleware that protects any route it's a part of.
router.get('/recipes', (req, res, next) => {
	Recipe.find()
		.populate('owner')
		.then((recipes) => {
			// `recipes` will be an array of Mongoose documents
			// we want to convert each one to a POJO, so we use `.map` to
			// apply `.toObject` to each one
			return recipes.map((recipe) => recipe.toObject())
		})
		// respond with status 200 and JSON of the recipes
		.then((recipes) => res.status(200).json({ recipes: recipes }))
		// if an error occurs, pass it to the handler
		.catch(next)
})

// SHOW
// GET /recipes/5a7db6c74d55bc51bdf39793
router.get('/recipes/:id', requireToken, (req, res, next) => {
	// req.params.id will be set based on the `:id` in the route
	Recipe.findById(req.params.id)
		
		.populate('owner')
		.then(handle404)
		// if `findById` is succesful, respond with 200 and "recipe" JSON
		.then((recipe) => res.status(200).json({ recipe: recipe.toObject() }))
		// if an error occurs, pass it to the handler
		.catch(next)
})

// CREATE
// POST /recipes
router.post('/recipes', requireToken, (req, res, next) => {
	// the requireToken middleware, gives us access to req.user
	// set owner of new example to be current user
	req.body.recipe.owner = req.user.id

	Recipe.create(req.body.recipe)
		// respond to succesful `create` with status 201 and JSON of new "recipe"
		.then((recipe) => {
			res.status(201).json({ recipe: recipe.toObject() })
		})
		// if an error occurs, pass it off to our error handler
		// the error handler needs the error message and the `res` object so that it
		// can send an error message back to the client
		.catch(next)
})

// UPDATE
// PATCH /recipes/5a7db6c74d55bc51bdf39793
// removeBlanks is middleware that doesn't allow you to overwrite any data with an empty string(or empty value)
router.patch('/recipes/:id', requireToken, removeBlanks, (req, res, next) => {
	// console.log ('hey look, req.body:', req.user)
	// console.log ('hey look, owner:', req.user.id)
	delete req.user

	Recipe.findById(req.params.id)
		.then(handle404)
		.then((recipe) => {
			console.log('this is req', req.params.id)
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
	console.log('req.user:', req.user)

	Recipe.findOne({_id:req.params.id})
		.then(handle404)
		.then((recipe) => {
			req.user = recipe.owner
			// throw an error if current user doesn't own `recipe`
			// requireOwnership(req, recipe)
			// delete the recipe ONLY IF the above didn't throw
			recipe.deleteOne()
		})
		// send back 204 and no content if the deletion succeeded
		.then(() => res.sendStatus(204))
		// if an error occurs, pass it to the handler
		.catch(next)
})


module.exports = router