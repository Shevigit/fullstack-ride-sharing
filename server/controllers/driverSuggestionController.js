const User = require('../models/user')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Suggestion = require('../models/DriverSuggestion');

const addDriverSuggestion = async (req, res) => {
    try {
        if (!req.body.driver) {
            console.log("0");
            
            return res.status(401).json({ message: 'Missing user ID from token' });
        }
        const {
            address,
            source,
            destination,
            date,
            time,
            availableSeats,
           genderPreference
        } = req.body;
        if (
            !address || !source || !destination ||
            !date || !time || availableSeats === undefined
        ) {
            console.log("1");
            
            return res.status(400).json({ message: 'Missing required fields' });
        }
        const newSuggestion = await Suggestion.create({
            driver: req.body.driver, // מזהה הנהג מגיע מה־JWT
            address,
            source,
            destination,
            date,
            time,
            availableSeats,
            genderPreference
        });
        console.log("02");
        res.status(201).json(newSuggestion);
    } catch (err) {
        console.error(err);
        console.log("3");
        res.status(500).json({ message: 'Server error' });
    }
};

const getAllDriverSuggestions = async (req, res) => {
    try {

        const driverSuggestions = await Suggestion.find().sort({ createdAt: -1 }); // מהחדש לישן
        console.log("4");
        res.json(driverSuggestions);
    } catch (error) {
        console.error('Failed to get driverSuggestions:', error);
        console.log("5");
        res.status(500).json({ message: 'Failed to get driverSuggestions' });
    }
};


const getActiveDriverSuggestions = async (req, res) => {
    try {
        const suggestions = await Suggestion.find({ status: 'active' }).sort({ createdAt: -1 });
        res.json(suggestions);
    } catch (error) {
        console.error('Failed to get active suggestions:', error);
        res.status(500).json({ message: 'Failed to get active driver suggestions' });
    }
};

const filterDriverSuggestions = async (req, res) => {
    try {
        const { source, destination, date, time, status } = req.query;

        let filter = {};

        if (source) filter.source = source;
        if (destination) filter.destination = destination;
        if (date) filter.date = new Date(date); // ודא שהתאריך בפורמט תקין
        if (time) filter.time = time;
        if (status) filter.status = status; // למשל: active, canceled, completed

        const suggestions = await Suggestion.find(filter).sort({ createdAt: -1 });

        res.json(suggestions);
    } catch (error) {
        console.error('Error filtering driver suggestions:', error);
        res.status(500).json({ message: 'Failed to filter driver suggestions' });
    }
};
const deleteDriverSuggestion = async (req, res) => {
    try {
        const { id } = req.params;

        const suggestion = await Suggestion.findById(id);
        if (!suggestion) {
            return res.status(404).json({ message: "Suggestion not found" });
        }

        if (suggestion.driver.toString() !== req.user.id) {
            return res.status(403).json({ message: "Forbidden – Not your suggestion" });
        }

        await suggestion.deleteOne();
        res.json({ message: "Suggestion deleted successfully" });
    } catch (error) {
        console.error("Error deleting suggestion:", error);
        res.status(500).json({ message: "Failed to delete suggestion" });
    }
};

const updateDriverSuggestion = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;
        const suggestion = await Suggestion.findById(id);
        if (!suggestion) {
            return res.status(404).json({ message: "Suggestion not found" });
        }
        Object.assign(suggestion, updateData); // מיישם את העדכונים
        await suggestion.save();
        res.json(suggestion);
    } catch (error) {
        console.error("Error updating suggestion:", error);
        res.status(500).json({ message: "Failed to update suggestion" });
    }
};
// const joinSuggestion = async (req, res) => {
//   const suggestionId = req.params.suggestionId;
//   const { userId, countSeat } = req.body;

//   if (!userId || countSeat === undefined) {
//     return res.status(400).json({ message: 'חסר userId או countSeat בבקשה' });
//   }

//   try {
//     const suggestion = await Suggestion.findById(suggestionId);
//     if (!suggestion) {
//       return res.status(404).json({ message: 'הצעת נסיעה לא נמצאה' });
//     }

//     if (suggestion.driver.toString() === userId) {
//     return res.status(400).json({ message: 'הנהג לא יכול להצטרף כנסע לנסיעה שלו' });
//     }

//     const passengers = Array.isArray(suggestion.passengers) ? suggestion.passengers : [];

//     const existingPassengerIndex = passengers.findIndex(
//       (p) => p.user?.toString() === userId
//     );

//     if (countSeat === 0) {
//       if (existingPassengerIndex !== -1) {
//         passengers.splice(existingPassengerIndex, 1);
//         suggestion.passengers = passengers;
//         await suggestion.save();
//         return res.json({ message: 'המשתמש הוסר מהרשימת הנוסעים', suggestion });
//       } else {
//         return res.status(400).json({ message: 'המשתמש לא נמצא ברשימת הנוסעים להסרה' });
//       }
//     }

//     const seatsTaken = passengers.reduce((sum, p) => sum + p.countSeat, 0);
//     const seatsLeft = suggestion.availableSeats - seatsTaken + (existingPassengerIndex !== -1 ? passengers[existingPassengerIndex].countSeat : 0);

//     if (countSeat > seatsLeft) {
//       return res.status(400).json({ message: `אין מספיק מקומות פנויים, נותרו ${seatsLeft}` });
//     }

//     if (existingPassengerIndex !== -1) {
//       passengers[existingPassengerIndex].countSeat = countSeat;
//     } else {
//       passengers.push({ user: userId, countSeat });
//     }

//     suggestion.passengers = passengers;
//     await suggestion.save();

//     res.json({ message: 'נוסע נוסף/עודכן בהצלחה', suggestion });

//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'שגיאה בשרת' });
//   }
// }


const joinSuggestion = async (req, res) => {
  const suggestionId = req.params.suggestionId;
  const { userId, countSeat } = req.body;

  if (!userId || countSeat === undefined) {
    return res.status(400).json({ message: 'חסר userId או countSeat בבקשה' });
  }

  try {
    const suggestion = await Suggestion.findById(suggestionId);
    if (!suggestion) {
      return res.status(404).json({ message: 'הצעת נסיעה לא נמצאה' });
    }

    if (suggestion.driver.toString() === userId) {
      return res.status(400).json({ message: 'הנהג לא יכול להצטרף כנסע לנסיעה שלו' });
    }

    // ודא שפורמט passengers הוא מערך של אובייקטים
    let passengers = Array.isArray(suggestion.passengers) ? suggestion.passengers : [];

    // חפש את הנוסע אם קיים
    const existingPassengerIndex = passengers.findIndex(p => p.user?.toString?.() === userId);

    // === הסרה ===
    if (countSeat === 0) {
      if (existingPassengerIndex !== -1) {
        const freedSeats = passengers[existingPassengerIndex].countSeat || 1;
        passengers.splice(existingPassengerIndex, 1);
        suggestion.availableSeats += freedSeats;
        suggestion.passengers = passengers;
        await suggestion.save();
        return res.json({ message: 'המשתמש הוסר מהרשימת הנוסעים', suggestion });
      } else {
        return res.status(400).json({ message: 'המשתמש לא נמצא ברשימת הנוסעים להסרה' });
      }
    }

    // === עדכון או הוספה ===
    if (existingPassengerIndex !== -1) {
      const currentCount = passengers[existingPassengerIndex].countSeat || 1;
      const delta = countSeat - currentCount;

      if (delta > suggestion.availableSeats) {
        return res.status(400).json({ message: `אין מספיק מקומות פנויים, נותרו ${suggestion.availableSeats}` });
      }

      passengers[existingPassengerIndex].countSeat = countSeat;
      suggestion.availableSeats -= delta;
    } else {
      if (countSeat > suggestion.availableSeats) {
        return res.status(400).json({ message: `אין מספיק מקומות פנויים, נותרו ${suggestion.availableSeats}` });
      }

      passengers.push({ user: userId, countSeat });
      suggestion.availableSeats -= countSeat;
    }

    suggestion.passengers = passengers;
    await suggestion.save();

    res.json({ message: 'נוסע נוסף/עודכן בהצלחה', suggestion });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'שגיאה בשרת' });
  }
}


const getFoundById = async (req, res) => {
    try {
        const { id } = req.params; // ID שמגיע מ-req.params (לדוגמה, מ- /suggestions/:id)

        // זו הפונקציה שצריכה להיות בשימוש. היא שולפת את ההצעה ומאכלסת את השדות הרצויים.
        const suggestion = await Suggestion.findById(id)
            .populate('driver', 'userName')          // מאכלס את פרטי הנהג, בוחר רק userName
            .populate('passengers', 'userName gender') // מאכלס את פרטי הנוסעים, בוחר userName ו-gender
            .exec(); // חשוב לקרוא ל-exec()

        if (!suggestion) {
            // אם לא נמצאה הצעה (לא 'found' ולא 'suggestion' אם אלו היו סוגים שונים)
            return res.status(404).json({ message: 'Suggestion not found' });
        }

        // הכל בסדר, שולחים את ההצעה המאוכלסת ללקוח
        res.json(suggestion);

    } catch (error) {
        console.error('Error fetching suggestion/found:', error);
        // אם זו שגיאה של ID לא חוקי, אפשר להחזיר 400
        if (error.name === 'CastError' && error.path === '_id') {
            return res.status(400).json({ message: 'Invalid ID format' });
        }
        // אחרת, שגיאת שרת כללית
        res.status(500).json({ message: 'Failed to retrieve suggestion/found' });
    }
}


const getSuggestionById = async (req, res) => {
    try {
        const { id } = req.params;
        const suggestion = await Suggestion.findById(id)
            .populate('driver', 'userName')
            .populate('passengers', 'userName gender')
            .exec();
        if (!suggestion) {
            return res.status(404).json({ message: 'Suggestion not found' });
        }
        res.json(suggestion);
    } catch (error) {
        console.error('Error fetching suggestion:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = {joinSuggestion, getSuggestionById, getAllDriverSuggestions, addDriverSuggestion, getActiveDriverSuggestions, filterDriverSuggestions, deleteDriverSuggestion, updateDriverSuggestion, getFoundById }
