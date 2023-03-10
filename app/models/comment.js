const { Timestamp } = require('mongodb')
const mongoose = require('mongoose')


const commentSchema = new mongoose.Schema(
    {
        text: {
            type: String
        },
        postedBy: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User'
            // required: true
    }
}, {timestamps: true}
)

module.exports = commentSchema