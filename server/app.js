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
app.use('/comments',commentsRouter)
app.use("/api/geoRoutes", geoRoutes);


// app.get("/api/cities", async (req, res) => {
//   const { q } = req.query;
//   console.log("Received query:", q);  // הדפסת הפרמטר שהתקבל

//   try {
//     const response = await axios.get("https://data.gov.il/api/3/action/datastore_search", {
//       params: {
//         resource_id: "5c78e9fa-c2e2-4771-93ff-7f400a12f7ba",
//         q,
//         limit: 4000,
//       },
//     });

//     const records = response.data.result.records;
//     console.log("Records received:", records.length);

//     const cityNamesSet = new Set(
//       records
//         .map(record => record["שם_ישוב"]?.trim())
//         .filter(Boolean)
//     );

//     const uniqueCities = Array.from(cityNamesSet).map((name, index) => ({
//       id: index + 1,
//       name,
//     }));

//     console.log("Unique cities:", uniqueCities.length);
//     res.json(uniqueCities);
//   } catch (err) {
//     console.error("Error fetching cities:", err.message);
//     res.status(500).json({ error: "Failed to fetch cities" });
//   }
// });




// app.get("/api/streets", async (req, res) => {
//   const { city } = req.query;
//   if (!city) return res.status(400).json({ error: "Missing city parameter" });

//   try {
//     const response = await axios.get("https://data.gov.il/api/3/action/datastore_search", {
//       params: {
//         resource_id: "a7296d1a-f8c9-4b70-96c2-6ebb4352f8e3",
//         q: city,
//         limit: 4000,
//       },
//     });

//     const records = response.data.result.records;
//     const uniqueStreets = [...new Set(
//       records.map(r => r["שם_רחוב"]?.trim()).filter(Boolean)
//     )];

//     res.json(uniqueStreets);
//   } catch (err) {
//     console.error("Error fetching streets:", err.message);
//     res.status(500).json({ error: "Failed to fetch streets" });
//   }
// });


mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
mongoose.connection.on('error', err => {
    console.error("MongoDB connection error:", err);
   
});




