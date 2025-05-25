require('dotenv').config(); 
const express = require('express');
const mongoose = require("mongoose");
const session = require('express-session'); 
const passport = require('passport');   
const cors = require("cors");
const corsOptions = require("./config/corsOptions"); 
const connectDB = require("./config/db"); 
const authRoutes = require('./routes/authRoute'); 
const driverRoute=require('./routes/driverSuggestionRoute')
const app = express();
const PORT = process.env.PORT || 7001;
console.log("start...");
connectDB();
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.static("public"));
app.use(session({
    secret: process.env.SESSION_SECRET || 'super_secret_key', // רצוי להשתמש במשתנה סביבה עבור Secret
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: process.env.NODE_ENV === 'production', // השתמש ב-secure cookies ב-production
        maxAge: 1000 * 60 * 60 * 24 // יום אחד
    }
}));
app.use(passport.initialize());
app.use(passport.session());
app.use('/api', authRoutes); 
app.use('/drives', driverRoute)
app.all('*', (req, res) => {
    res.status(404);
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html')); // אם יש לך קובץ 404 HTML
    } else if (req.accepts('json')) {
        res.json({ message: '404 Not Found' });
    } else {
        res.type('txt').send('404 Not Found');
    }
});
mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
mongoose.connection.on('error', err => {
    console.error("MongoDB connection error:", err); // השתמש ב-console.error
    // כאן אתה יכול להוסיף לוגיקה נוספת לטיפול בשגיאות קריטיות
});