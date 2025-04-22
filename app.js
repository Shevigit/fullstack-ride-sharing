require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors"); // Assuming you need CORS

const connectDB = require("./config/db");
const PORT = process.env.PORT || 7002;
const app = express();

// Middleware
app.use(cors()); // Use CORS if applicable
app.use(express.json()); // To parse JSON bodies

connectDB();

const CONNECTION_URL = process.env.DATABASE_URI;

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    })
    .catch((error) => console.log(error.message));

mongoose.connection.on('error', err => {
    console.log(err);
});
