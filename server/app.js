require('dotenv').config(); 
const express = require("express");
const app = express();
const PORT = process.env.PORT || 7001;
const fs = require("fs");
const path = require("path");
const csv = require("csv-parser");
const iconv = require("iconv-lite");
const cors = require("cors");
const mongoose = require("mongoose");
// const session = require('express-session'); 
// const passport = require('passport');   
const corsOptions = require("./config/corsOptions"); 
const connectDB = require("./config/db"); 
const authRoutes = require('./routes/authRoute'); 
const { log } = require('console');
app.use(cors(corsOptions));
const driverRouter=require('./routes/driverSuggestionRoute')
console.log("start...");
connectDB();
app.use(express.json());
// app.use(session({
//     secret: process.env.SESSION_SECRET || 'super_secret_key', // רצוי להשתמש במשתנה סביבה עבור Secret
//     resave: false,
//     saveUninitialized: true,
//     cookie: {
//         secure: process.env.NODE_ENV === 'production', // השתמש ב-secure cookies ב-production
//         maxAge: 1000 * 60 * 60 * 24 // יום אחד
//     }
// }));
// app.use(passport.initialize());
// app.use(passport.session());
app.use('/api', authRoutes); // משתמש ב-authRoutes שיובא למעלה
app.use('/drivers',driverRouter);
const loadCities = () => {
  return new Promise((resolve, reject) => {
    const citiesArray = [];
    let idCounter = 1; // מונה ליצירת ID ייחודי
    const filePath = path.join(__dirname, "data", "cities.csv");
    fs.createReadStream(filePath)
      .pipe(iconv.decodeStream("utf-8"))
      .pipe(csv())
      .on("data", (row) => {
        const cityName = row["cities"]; // נניח שזו הכותרת בעמודה ב-CSV
        if (cityName) {
          const existingCity = citiesArray.find(city => city.name === cityName.trim());
          if (!existingCity) {
            citiesArray.push({
              id: idCounter++, // הקצה ID ייחודי וקדם את המונה
              name: cityName.trim(), // השם של העיר
            });
          }
        }
      })
      .on("end", () => {
        citiesArray.sort((a, b) => a.name.localeCompare(b.name));
        resolve(citiesArray); // החזר מערך של אובייקטי City
      })
      .on("error", reject);
  });
}
app.get("/api/cities", async (req, res) => {
  try {
    const cities = await loadCities();
    res.json(cities); // וודא ש-res.json שולח את המערך שהכנו
  } catch (err) {
    console.error("Error loading cities:", err);
    res.status(500).json({ error: "Failed to load cities" });
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




