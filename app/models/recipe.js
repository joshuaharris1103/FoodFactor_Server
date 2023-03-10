const mongoose = require('mongoose')
const commentSchema = require('./comment')
const ingredientSchema = require('./ingredient')


const recipeSchema = new mongoose.Schema({
        recipeName: {
            type: 'string',
            // required:true
        },
        caption: {
            type: 'string',
            // required:true
        },
        imageUrl: {
            type: 'string',
            default: 'no photo',
        },
        comment: [commentSchema],
        // ingredient: [ingredientSchema],
        postedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        likes: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
    }, {timestamps: true}

)

module.exports = mongoose.model('Recipe', recipeSchema)