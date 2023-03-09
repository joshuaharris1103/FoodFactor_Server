const mongoose = require('mongoose')

const recipeSchema = new mongoose.Schema({
    username:{
        type: 'string',
        required:true
    },
    caption:{
        type: 'string',
        required:true
    },
    imageUrl:{
        type: 'string',
        required:true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
},

)

module.exports = mongoose.model('Recipe', recipeSchema)