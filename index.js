const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
const connectedDb = require('./config/db');
dotenv.config();
connectedDb()
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use("/", (req, res) => {
    res.send("This app is successfully run")
})

app.listen(PORT, () => {
    console.log(`This server is running on port ${PORT}`)
})