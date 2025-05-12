const express = require('express');
const session = require('express-session');
const passport = require('passport');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const mongoose = require("mongoose")
const connectDB = require("./config/db")
const cors = require("cors")

const corsOptions = require("./config/corsOptions")
require('dotenv').config();

const app = express();
console.log("start...");
app.use(session({ secret: 'your_secret_key', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

const userRoutes = require('./routes/authRoute');
app.use(cors(corsOptions))
app.use(express.json());
app.use('/api', userRoutes);

const PORT = process.env.PORT || 7001
connectDB()
app.use(express.json())
app.use(express.static("public"))
app.use("/api/auth", require("./routes/authRoute"))

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB')
    app.listen(PORT, () => console.log(`Server running on port
  ${PORT}`))
})
mongoose.connection.on('error', err => {
    console.log(err)
})