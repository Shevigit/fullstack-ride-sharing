
const Suggestion = require("../models/Suggestion")
const User = require("../models/User")

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


// יצירת נסיעה חדשה ע"י נהג
exports.addSuggestion= async (req, res) => {

    try {
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
     const suggestion  = await Suggestion.create(suggestionData);

     //const suggestion = new Suggestion(suggestionData);
     //await suggestion.save();
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
//פונקציה זו ניסתה להתייחס למקרה שבו הובאו כמה רמות של סינון מה קורהאם לא הכל נשלח?
exports.searchSuggestion2= async (req, res) => {
 
    const { source,destination,date,time,availableSeats,genderPreference } = req.params;
    console.log(source,destination,date,time,availableSeats,genderPreference)
  
    try {
      const suggestion = await Suggestion.find({ source,destination,date,time,availableSeats,genderPreference });
      if (!suggestion) {
        return res.status(404).json({ message: 'suggestion not found' });
      }
      res.json(suggestion);
    } catch (error) {
      console.error('Failed to get suggestion:', error);
      res.status(500).json({ message: 'Failed to get suggestion' });
    }
  }
//עדכון נהג על נסיעותיו
  exports.updateSuggestion = async (req, res) => {
    // const { userId } = req.params;
    // const { name, email } = req.body;
    const { driver } = req.params;//מה
    const { address, source,destination,date,time,availableSeats,genderPreference } = req.body;//ההבדל?
    try {
      const updatedSuggestion = await User.findOneAndUpdate(
      //  { userId: userId }, // עדכון לפי שדה userId
        {  address, source,destination,date,time,availableSeats,genderPreference },
        { new: true }
      );
  
      if (!updatedSuggestion) {
        return res.status(404).json({ message: 'suggestion not found' });
      }
  
      res.json(updatedSuggestion);
    } catch (error) {
      console.error('Failed to update suggestion:', error);
      res.status(500).json({ message: 'Failed to update suggestion' });
    }
  };

