const DriverSuggestion= require("../models/DriverSuggestion");
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


exports.addDriverSuggestion = async(req,res)=>{
    const driverSuggestion = await DriverSuggestion.create(req.body);
    res.json(driverSuggestion);
}


