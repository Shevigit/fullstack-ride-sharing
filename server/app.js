require('dotenv').config(); 
const express = require("express");
const app = express();
const axios = require('axios');  // <-- הוסף שורה זו
const PORT = process.env.PORT || 7001;
const cors = require("cors");
const mongoose = require("mongoose"); 
const corsOptions = require("./config/corsOptions"); 
const connectDB = require("./config/db"); 
const authRoutes = require('./routes/authRoute'); 
app.use(cors(corsOptions));
const driverRouter=require('./routes/driverSuggestionRoute')
const commentsRouter=require('./routes/CommentRoute')
const geoRoutes = require("./server/index"); // נתיב לפי המיקום שיצרת

console.log("start...");
connectDB();
app.use(express.json());

app.use('/api', authRoutes); // משתמש ב-authRoutes שיובא למעלה
app.use('/drivers',driverRouter);
app.use('/comments',commentsRouter)
app.use("/api/geoRoutes", geoRoutes);




mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
mongoose.connection.on('error', err => {
    console.error("MongoDB connection error:", err);
   
});




