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

module.exports = { getSuggestionById, getAllDriverSuggestions, addDriverSuggestion, getActiveDriverSuggestions, filterDriverSuggestions, deleteDriverSuggestion, updateDriverSuggestion, getFoundById }
