const mongoose = require('mongoose')


const likesSchema = new mongoose.Schema(
    {
        text: {
            type: String
        },
        owner: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User'
            // required: true
    }
}
)

module.exports = likesSchema