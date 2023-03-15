const express = require('express')
const passport = require('passport')
const Recipe = require('../models/recipe')
const customErrors = require('../../lib/custom_errors')
const handle404 = customErrors.handle404
const requireOwnership = customErrors.requireOwnership
const removeBlanks = require('../../lib/remove_blank_fields')
const { post } = require('../models/comment')
const requireToken = passport.authenticate('bearer', { session: false })

const router = express.Router()

// Post
router.post('/comments/:recipeId', requireToken, (req, res, next) => {
	const recipeId = req.params.recipeId
    const comment = req.body.comment
	// const rating = req.body.rating
	// comment.owner = req.user.id
  	// comment.rating = req.body.rating
	console.log('this is the rating', req.body)
    // const owner = req.body.
	console.log('this is user', req.user)
    req.body.comment.owner = req.user.id
    console.log ("req user log", req.user.id)
    Recipe.findById(recipeId)
		// respond to succesful `create` with status 201 and JSON of new "recipe"
		.then((recipe) => {
			recipe.comment.push(comment)
			// recipe.comment.push(rating)
			
			console.log ('this comment is being posted', comment)
            res.status(201).json({ recipe: recipe.toObject() })
            return recipe.save()
		})
		.catch(next)
})

// Patch
router.patch('/comments/:recipeId/:commentId', requireToken, removeBlanks, (req, res, next) => {
	// delete req.body.recipe.owner
    const comment = req.body.comment
    const recipeId = req.params.recipeId
    const commentId = req.params.commentId
    // console.log ('this comment has been updated', comment)
    
	Recipe.findById(recipeId)
		.then(handle404)
		.then((recipe) => {
            // console.log ('recipe comment is', recipe.comment)
			// console.log ('recipe returns', recipe)
            const thecomment = recipe.comment.id(commentId)
            // console.log('this is the comment', thecomment)
            // console.log ('the owner is', thecomment.owner)
            requireOwnership(req, thecomment)
            thecomment.set(comment)
			return recipe.save()
		})
		// if that succeeded, return 204 and no JSON
		.then(() => res.sendStatus(204))
		// if an error occurs, pass it to the handler
		.catch(next)
})

// Delete
router.delete('/comments/:recipeId/:commentId', requireToken, (req, res, next) => {
	// delete req.body.recipe.owner
    const recipeId = req.params.recipeId
    const commentId = req.params.commentId
    // console.log ('this comment has been updated', comment)
    
	Recipe.findById(recipeId)
		.then(handle404)
		.then((recipe) => {
            // console.log ('recipe comment is', recipe.comment)
			// console.log ('recipe returns', recipe)
            const thecomment = recipe.comment.id(commentId)
            // console.log('this is the comment', thecomment)
            // console.log ('the owner is', thecomment.owner)
            requireOwnership(req, thecomment)
            thecomment.remove()
			return recipe.save()
		})
		// if that succeeded, return 204 and no JSON
		.then(() => res.sendStatus(204))
		// if an error occurs, pass it to the handler
		.catch(next)
})

module.exports = router