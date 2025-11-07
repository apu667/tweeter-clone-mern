const mongoose = require("mongoose")


const commentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    },
    tweet: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tweet"
    },
    comment: { type: String }
}, {
    timestamps: true
})

module.exports = mongoose.model("Comment", commentSchema)