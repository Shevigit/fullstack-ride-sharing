const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Suggestion = require('../models/DriverSuggestion');

const addDriverSuggestion = async (req, res) => {
  try {
    // ודא ש־req.user.id קיים
    if (!req.user?.id) {
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

    // בדיקה של שדות חובה
    if (
      !address || !source || !destination ||
      !date || !time || availableSeats === undefined
    ) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const newSuggestion = await Suggestion.create({
      driver: req.user.id, // מזהה הנהג מגיע מה־JWT
      address,
      source,
      destination,
      date,
      time,
      availableSeats,
      genderPreference
    });

    res.status(201).json(newSuggestion);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

const getAllDriverSuggestions = async (req, res) => {
    try {
        const driverSuggestions = await Suggestion.find().sort({ createdAt: -1 }); // מהחדש לישן
        res.json(driverSuggestions);
    } catch (error) {
        console.error('Failed to get driverSuggestions:', error);
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

        if (suggestion.driver.toString() !== req.user.id) {
            return res.status(403).json({ message: "Forbidden – Not your suggestion" });
        }

        Object.assign(suggestion, updateData); // apply updates
        await suggestion.save();

        res.json(suggestion);
    } catch (error) {
        console.error("Error updating suggestion:", error);
        res.status(500).json({ message: "Failed to update suggestion" });
    }
};


module.exports = { getAllDriverSuggestions, addDriverSuggestion, getActiveDriverSuggestions, filterDriverSuggestions,deleteDriverSuggestion, updateDriverSuggestion}
