const User = require("../models/User")
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//עדכון נוסע על נסיעותיו- לכתוב את הפונקציה
exports.updateSuggestion = async (req, res) => { 
    // const { userId } = req.params;
    // const { name, email } = req.body;
    const { driver } = req.params;//מה
    const { address, source,destination,date,time,availableSeats,genderPreference } = req.body;//ההבדל?
    try {
      const updatedSuggestion = await User.findOneAndUpdate(
        { userId: userId }, // עדכון לפי שדה userId
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
