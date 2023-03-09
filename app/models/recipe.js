const mongoose = require('mongoose')

const recipeSchema = new mongoose.Schema({
    username:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required:true
    },
    body:{
        type: 'string',
        required:true
    },
    image:{
        type: 'string',
        required:true
    },
}, {timestamps: true}
)

mongoose.model('recipe', recipeSchema)