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
const session = require('express-session'); 
const passport = require('passport');   
const corsOptions = require("./config/corsOptions"); 
const connectDB = require("./config/db"); 
const authRoutes = require('./routes/authRoute'); 
const { log } = require('console');
app.use(cors(corsOptions));
const driverRouter=require('./routes/driverSuggestionRoute')

console.log("start...");
connectDB();
app.use(express.json());
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
app.use('/api', authRoutes); // משתמש ב-authRoutes שיובא למעלה
app.use('/drivers',driverRouter);





const loadCities=()=> {
  return new Promise((resolve, reject) => {
    const results = new Set();
    const filePath = path.join(__dirname, "data", "cities.csv");

    fs.createReadStream(filePath)
      .pipe(iconv.decodeStream("utf-8"))
      .pipe(csv())
      .on("data", (row) => {
        const city = row["cities"];
         console.log(row.cities);
        if (city) results.add(city.trim());
      })
      .on("end", () => {
        resolve(Array.from(results));
      })
      .on("error", reject);
  });
}




// מאפשר CORS לבקשות מהדפדפן (חשוב אם ה־frontend בפורט אחר)

// פונקציה לטעינת ערים מתוך קובץ CSV
// const loadCities = () => {
//   return new Promise((resolve, reject) => {
//     const results = new Set();

//     fs.createReadStream(path.join(__dirname, "data", "cities.csv"))
//       .pipe(iconv.decodeStream("win1255"))
//       .pipe(csv())
//       .on("data", (city) => {
//         // const city = row["שם_ישוב"];
//         // console.log(row.שם_ישוב);
        
//         if (city) results.add(city);
//       })
//       .on("end", () => {
//         console.log("CSV loaded. Total cities:", results.size);
//         console.log(results);
        
//         resolve([...results]);
//       })
//       .on("error", reject);
//   });
// };

// Route שמחזיר את רשימת הערים
app.get("/api/cities", async (req, res) => {
  try {
    const cities = await loadCities();
    res.json(cities);
  } catch (err) {
    console.error("Error loading cities:", err);
    res.status(500).json({ error: "Failed to load cities" });
  }
});

// טיפול בשגיאות 404 (אפשר לשלוח טקסט פשוט)
app.use((req, res) => {
  res.status(404).send("Page not found");
});

// // הפעלת השרת
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });
mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
mongoose.connection.on('error', err => {
    console.error("MongoDB connection error:", err); // השתמש ב-console.error
    // כאן אתה יכול להוסיף לוגיקה נוספת לטיפול בשגיאות קריטיות
});


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





