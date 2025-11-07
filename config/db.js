const mongoose = require('mongoose');

const connectedDb = async (req, res) => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("DataBase is successfully connected")
    } catch (error) {
        console.log("DataBase connection field")
    }
}

module.exports = connectedDb