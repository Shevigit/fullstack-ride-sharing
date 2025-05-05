const DriverSuggestion= require("../models/DriverSuggestion");
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


exports.addDriverSuggestion = async(req,res)=>{
    const driverSuggestion = await DriverSuggestion.create(req.body);
    res.json(driverSuggestion);
}

exports.getAllDriverSuggestions = async (req, res) => {
    try {
      const driverSuggestions = await DriverSuggestion.find();
      res.json(driverSuggestions);    
    
    } catch (error) {
      console.error('Failed to get driverSuggestions:', error);
      res.status(500).json({ message: 'Failed to get driverSuggestions' });
    }
};
  


