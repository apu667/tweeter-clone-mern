const mongoose = require("mongoose")


const tweetSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    },
    title: {
        type: String,
    },
    images: {
        type: String,
    },
    like: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    }],
    bookmark: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tweet"
    }],
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment"
    }]
}, {
    timestamps: true
})

module.exports = mongoose.model("Tweet", tweetSchema)