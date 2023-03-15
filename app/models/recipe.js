const mongoose = require('mongoose')
const commentSchema = require('./comment')
const likesSchema = require('./likes')
// const ingredientSchema = require('./ingredient')


const recipeSchema = new mongoose.Schema({
        recipeName: {
            type: 'string',
            required:true
        },
        caption: {
            type: 'string',
            // required:true
        },
        image: {
            type: [String],
        },
        comment: [commentSchema],
        likes: [likesSchema],
        // ingredient: [ingredientSchema],
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        // likes: {
        //     type: mongoose.Schema.Types.ObjectId,
        //     ref: 'User'
        // },
    }, {timestamps: true}

)

module.exports = mongoose.model('Recipe', recipeSchema)