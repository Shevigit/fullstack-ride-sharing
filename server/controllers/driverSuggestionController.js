const User = require('../models/user')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Suggestion = require('../models/DriverSuggestion');
const mongoose = require('mongoose');

const addDriverSuggestion = async (req, res) => {
    try {
        if (!req.user.id
) {
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
            driver: req.user.id,
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

        const driverSuggestions = await Suggestion.find().populate('driver').sort({ createdAt: -1 }); // מהחדש לישן
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

        if (date && !isNaN(Date.parse(date))) {
            filter.date = new Date(date);
        }

        if (time) filter.time = time;
        if (status) filter.status = status;

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
if (!req.user || suggestion.driver.toString() !== req.user.id) {
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

        const { id } = req.params;

    try {
const updateDriver = await Suggestion.findByIdAndUpdate(
  id,
  req.body,
  { new: true }
);

if(!updateDriver){
     return res.status(404).json({message: 'User not found'})
}
    return res.json(updateDriver)

    } catch (error) {
        console.error("Error updating suggestion:", error);
        res.status(500).json({ message: "Failed to update suggestion" });
    }
};

const joinSuggestion = async (req, res) => {

  const suggestionId = req.params.suggestionId;
  const { userId, countSeat } = req.body;

  if (!userId || countSeat === undefined) {
    return res.status(400).json({ message: 'חסר userId או countSeat בבקשה' });
  }

  try {
    const suggestion = await Suggestion.findById(suggestionId).populate("driver");

    if (!suggestion) {
      return res.status(404).json({ message: 'הצעת נסיעה לא נמצאה' });
    }

    // 1. אסור לנהג להצטרף לנסיעה שלו
    if (suggestion.driver.toString() === userId) {
      return res.status(400).json({ message: 'הנהג לא יכול להצטרף כנסע לנסיעה שלו' });
    }


    let passengers = Array.isArray(suggestion.passengers) ? suggestion.passengers : [];

    const existingPassengerIndex = passengers.findIndex(
      (p) => p.user?.toString() === userId
    );

    // === הסרה ===
    if (countSeat === 0) {
      if (existingPassengerIndex !== -1) {
        const freedSeats = passengers[existingPassengerIndex].countSeat || 1;
        passengers.splice(existingPassengerIndex, 1);
        suggestion.availableSeats += freedSeats;
        suggestion.passengers = passengers;
        await suggestion.save();

        // עדכון משתמש - הסרה ממערך passengerSuggestions
        await User.findByIdAndUpdate(userId, {
          $pull: { passengerSuggestions: suggestion._id }
        });

        return res.json({ message: 'המשתמש הוסר מהרשימת הנוסעים', suggestion });
      } else {
        return res.status(400).json({ message: 'המשתמש לא נמצא ברשימת הנוסעים להסרה' });
      }
    }
if (suggestion.availableSeats <= 0 && existingPassengerIndex === -1) {
  return res.status(400).json({ message: 'הנסיעה מלאה' });
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

      // עדכון משתמש - הוספה למערך passengerSuggestions
      await User.findByIdAndUpdate(userId, {
        $addToSet: { passengerSuggestions: suggestion._id } // מונע כפילויות
      });
    }

    suggestion.passengers = passengers;
    await suggestion.save();

    res.json({ message: 'נוסע נוסף/עודכן בהצלחה', suggestion });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'שגיאה בשרת' });
  }
};




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


// const createSuggestion = async (req, res) => {
//   try {
//     const newSuggestion = new Suggestion(req.body);
//     const savedSuggestion = await newSuggestion.save();

//     // עדכון המשתמש שהוא נהג
//     await User.findByIdAndUpdate(savedSuggestion.driver, {
//       $push: { driverSuggestions: savedSuggestion._id },
//     });

//     res.status(201).json(savedSuggestion);
//   } catch (error) {
//     console.error('שגיאה ביצירת נסיעה:', error);
//     res.status(500).json({ message: 'שגיאה ביצירת נסיעה' });
//   }
// };



// const createSuggestion = async (req, res) => {
//   try {
//     const newSuggestion = new Suggestion(req.body);
//     const savedSuggestion = await newSuggestion.save();

//     // כאן נוסיף את ההדפסה
//     console.log('driver id:', savedSuggestion.driver); // צריך להיות ObjectId תקני

//     // עדכון המשתמש שהוא נהג
//     const updateResult = await User.findByIdAndUpdate(
//       savedSuggestion.driver,
//       { $push: { driverSuggestions: savedSuggestion._id } },
//       { new: true }
//     );

//     console.log('עדכון משתמש:', updateResult); // נוכל לבדוק אם העדכון הצליח

//     res.status(201).json(savedSuggestion);
//   } catch (error) {
//     console.error('שגיאה ביצירת נסיעה:', error);
//     res.status(500).json({ message: 'שגיאה ביצירת נסיעה' });
//   }
// };

const createSuggestion = async (req, res) => {
  try {
    const newSuggestion = new Suggestion(req.body);
    const savedSuggestion = await newSuggestion.save();

    // הדפסת מזהה הנהג
    console.log('driver id:', savedSuggestion.driver); // ObjectId תקני

    // עדכון המשתמש - הוספת מזהה הנסיעה לשדה driverSuggestions
    await User.findByIdAndUpdate(
      savedSuggestion.driver,
      { $push: { driverSuggestions: savedSuggestion._id } },
        { new: true }

    );
console.log('driver:', savedSuggestion.driver); // ודא שזה תקף

    // שליפת המשתמש כולל הנסיעות כדי לבדוק שהכל תקין
    const user = await User.findById(savedSuggestion.driver).populate('driverSuggestions');
    console.log('נסיעות של המשתמש:', user.driverSuggestions);

    res.status(201).json(savedSuggestion);
  } catch (error) {
    console.error('שגיאה ביצירת נסיעה:', error);
    res.status(500).json({ message: 'שגיאה ביצירת נסיעה' });
  }
};
// const getDriverSuggestions = async (req, res) => {
//   try {
//     const { driverId } = req.params;

//     const suggestions = await Suggestion.find({ driver: driverId })
//       .populate('driver')
//       .populate('passengers')
//       .sort({ createdAt: -1 });

//     res.json(suggestions);
//   } catch (error) {
//     console.error('Failed to get driver suggestions:', error);
//     res.status(500).json({ message: 'Failed to get driver suggestions' });
//   }
// };

// const getPassengerSuggestions = async (req, res) => {
//   try {
//     const { userId } = req.params;

//     const suggestions = await Suggestion.find({ passengers: userId })
//       .populate('driver')
//       .populate('passengers')
//       .sort({ createdAt: -1 });

//     res.json(suggestions);
//   } catch (error) {
//     console.error('Failed to get passenger suggestions:', error);
//     res.status(500).json({ message: 'Failed to get passenger suggestions' });
//   }
// };
// const getDriverSuggestions = async (req, res) => {
//   try {
//     const { driverId } = req.params;
//     const objectDriverId = mongoose.Types.ObjectId(driverId);

//     const suggestions = await Suggestion.find({ driver: objectDriverId })
//       .populate('driver')
//       .populate('passengers')
//       .sort({ createdAt: -1 });

//     res.json(suggestions);
//   } catch (error) {
//     console.error('Failed to get driver suggestions:', error);
//     res.status(500).json({ message: 'Failed to get driver suggestions' });
//   }
// };

// const getPassengerSuggestions = async (req, res) => {
//   try {
//     const { userId } = req.params;
//     const objectUserId = mongoose.Types.ObjectId(userId);

//     const suggestions = await Suggestion.find({ passengers: objectUserId })
//       .populate('driver')
//       .populate('passengers')
//       .sort({ createdAt: -1 });

//     res.json(suggestions);
//   } catch (error) {
//     console.error('Failed to get passenger suggestions:', error);
//     res.status(500).json({ message: 'Failed to get passenger suggestions' });
//   }
// };

const getDriverSuggestions = async (req, res) => {
  try {
    const { driverId } = req.params;
    const driverObjectId = new mongoose.Types.ObjectId(driverId);

    const suggestions = await Suggestion.find({ driver: driverObjectId })
      .populate('driver')
      .populate('passengers')
      .sort({ createdAt: -1 });

    res.json(suggestions);
  } catch (error) {
    console.error('Failed to get driver suggestions:', error);
    res.status(500).json({ message: 'Failed to get driver suggestions' });
  }
};

const getPassengerSuggestions = async (req, res) => {
  try {
    const { userId } = req.params;
    const userObjectId = new mongoose.Types.ObjectId(userId);

    const suggestions = await Suggestion.find({ passengers: userObjectId })
      .populate('driver')
      .populate('passengers')
      .sort({ createdAt: -1 });

    res.json(suggestions);
  } catch (error) {
    console.error('Failed to get passenger suggestions:', error);
    res.status(500).json({ message: 'Failed to get passenger suggestions' });
  }
};

module.exports = {getPassengerSuggestions,getDriverSuggestions,joinSuggestion, getSuggestionById, getAllDriverSuggestions, addDriverSuggestion, getActiveDriverSuggestions, filterDriverSuggestions, deleteDriverSuggestion, updateDriverSuggestion, getFoundById,createSuggestion }

