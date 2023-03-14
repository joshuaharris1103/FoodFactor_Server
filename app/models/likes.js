const mongoose = require('mongoose')


const likesSchema = new mongoose.Schema(
    {
        text: {
            type: String
        },
        postedBy: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User'
            // required: true
    }
}
)

module.exports = likesSchema