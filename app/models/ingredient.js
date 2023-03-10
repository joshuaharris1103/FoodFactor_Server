const mongoose = require('mongoose')

const ingredientSchema = new mongoose.Schema({
    name:{
        type: 'string'
    },
    quantity:{
        type: 'number'
    },
    unit:{
        type: 'string',
        enum: ['ml','l','tsp','tbsp','fl oz','cup','pt','qt','gal','mg','g']
    }
})

module.exports = mongoose.model('Ingredient', ingredientSchema)