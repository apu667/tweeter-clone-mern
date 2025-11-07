const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
const connectedDb = require('./config/db');
const authRouter = require('./routes/authRoutes');
dotenv.config();
connectedDb()
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use("/api/v1/auth", authRouter)

app.listen(PORT, () => {
    console.log(`This server is running on port ${PORT}`)
})