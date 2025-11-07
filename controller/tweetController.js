const Tweet = require('../models/tweetModels');
const User = require("../models/userModels")

module.exports.createTweet = async (req, res) => {
    const userId = req.user.userId

    const { title, images } = req.body;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User is not found"
            })
        }
        const tweet = await Tweet.create({
            user,
            title,
            images
        })
        return res.status(201).json({
            success: false,
            message: "Tweet create successfully",
            tweet
        })
    } catch (error) {
        console.log(error)
        return res.status(501).json({
            success: false,
            message: "Internal server error tweet ",
        })
    }
}

module.exports.updateTweet = async (req, res) => {
    const tweetId = req.params.id
    const userId = req.user.userId
    const { title, images } = req.body;
    try {
        const user = await User.findById(userId);
        if (!user) {
            return req.status(401).json({
                success: false,
                message: "User is not found"
            })
        }


        const tweet = await Tweet.findById(tweetId);
        if (user._id.toString() !== tweet.user.toString()) {
            return res.status(403).json({
                success: false,
                message: "You cannot update this tweet"
            })
        }
        if (!tweet) {
            return res.status(401).json({
                success: false,
                message: "Tweet is not found"
            })
        }
        if (title) tweet.title = title
        if (images) tweet.title = images
        await tweet.save()

        return res.status(201).json({
            success: false,
            message: "Tweet updated successfully",
            tweet
        })
    } catch (error) {
        console.log(error)
        return res.status(501).json({
            success: false,
            message: "Internal server error tweet update"
        })
    }
}

module.exports.deleteTweet = async (req, res) => {
    const userId = req.user.userId;
    const tweetId = req.params.id;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User is not found"
            })
        }
        const tweet = await Tweet.findById(tweetId);
        if (!tweet) {
            return res.status(401).json({
                success: false,
                message: "Tweet is not found"
            })
        }

        if (tweet.user._id.toString() !== userId) {
            return res.status(401).json({

                success: false,
                message: "you can not this tweet"
            })
        }
        await Tweet.findByIdAndDelete(tweetId);
        return res.status(201).json({
            success: false,
            message: "Tweet delete successfully"
        })
    } catch (error) {

    }
}


module.exports.likeOrUnLike = async (req, res) => {
    const userId = req.user.userId;
    const tweetId = req.params.id;
    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User is not found"
            })
        }
        const tweet = await Tweet.findById(tweetId);
        if (!tweet) {
            return res.status(401).json({
                success: false,
                message: "Tweet is not found"
            })
        }
        const isLiked = await tweet.like.includes(userId);
        if (isLiked) {
            tweet.like = tweet.like.filter(i => i._id.toString() !== userId.toString())
        } else {
            await tweet.like.push(userId)
        }
        await tweet.save()
        return res.status(200).json({
            success: true,
            message: `Successfully ${isLiked ? "unliked" : "liked"}`,
            likesCount: tweet.like.length
        });

    } catch (error) {
        console.log(error)
        return res.status(401).json({
            success: false,
            message: "Internal server error tweet liked"
        })
    }
}

module.exports.bookUpdated = async (req, res) => {
    const tweetId = req.params.id;
    const userId = req.user.userId

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User is not found"
            })
        }
        const tweet = await Tweet.findById(tweetId);
        if (!tweet) {
            return res.status(401).json({
                success: false,
                message: "Tweet is not found"
            })
        }

        const isBookmark = await tweet.bookmark.includes(tweetId)
        if (isBookmark) {
            tweet.bookmark = tweet.bookmark.filter(i => i._id.toString() !== tweetId)
        } else {
            tweet.bookmark.push(tweetId)
        }

        await tweet.save();
        return res.status(200).json({
            success: true,
            message: `Successfully ${isBookmark ? "bookmarked" : "remove bookmark"}`,
            bookmarkCount: tweet.bookmark.length
        });
    } catch (error) {
        console.log(error)
    }
}

