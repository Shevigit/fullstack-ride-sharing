

const Suggestion = require("../models/Suggestion")
const User = require("../models/User")

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// יצירת נסיעה חדשה ע"י נהג
exports.addSuggestion= async (req, res) => {

    try {
       //מה התוקן של הנהג הנוכחי   ????????????
     const token = req.headers.authorization;
     if (!token) {
         return res.status(401).json({ message: 'הטוקן לא נמצא' });
     }
     token = req.headers.authorization.split(' ')[1]; 
     if (!token) {
         return res.status(401).json({ message: 'הטוקן לא נמצא' });
     }
     const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET); 
     const driver = await User.findById(decoded.userId); 
     if (!driver) {
         return res.status(404).json({ message: 'הנהג לא נמצא' });
     }
     // הוספת פרטי הנהג להצעה
     const suggestionData = {
         ...req.body,
         driver: {
             userId: driver._id,
             fullName: driver.fullName,
             phone: driver.phone
         }
     };

     const suggestion = new Suggestion(suggestionData);
     await suggestion.save();
     res.status(201).json(suggestion);
 } catch (error) {
     res.status(500).json({ error: error.message });
 }
};



// חיפוש נסיעות זמינות
exports.searchSuggestion= async (req, res) => {
    try {
        const { origin, destination, date, genderPreference, status, availableSeats,limit = 10, skip = 0 } = req.query;

        // יצירת אובייקט חיפוש דינמי
        const query = {};

        // אם יש פרמטרים, הוסף אותם למסנן
        if (origin) query.origin = origin;
        if (destination) query.destination = destination;
        if (date) query.date = new Date(date);  // ודא שהתאריך בפורמט נכון
        if (genderPreference) query.genderPreference = genderPreference;
        if (status) query.status = status;
        if (availableSeats) query.availableSeats = { $gte: availableSeats };  // חיפוש עבור מס' מושבים פנויים לפחות

        // חיפוש על פי המסנן שנוצר
        const suggestions = await Suggestion.find(query).skip(parseInt(skip)).limit(parseInt(limit));

       
        res.json(suggestions);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
