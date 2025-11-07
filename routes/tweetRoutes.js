const express = require('express');
const { createTweet, likeOrUnLike, updateTweet, bookUpdated } = require('../controller/tweetController');
const { verifyToken } = require('../middleware/authMiddleware');

const tweetRoutes = express.Router();

tweetRoutes.post("/create", verifyToken, createTweet);
tweetRoutes.put("/update/:id", verifyToken, updateTweet);
tweetRoutes.post("/likeORunlik/:id", verifyToken, likeOrUnLike);
tweetRoutes.post("/bookmark/:id", verifyToken, bookUpdated);

module.exports = tweetRoutes;
