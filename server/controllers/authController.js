const express = require('express');
const User = require("../models/User");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            console.log(email, password);
            return res.status(400).json({ message: 'All fields are required' })
        }
        const foundUser = await User.findOne({ email }).lean()
        if (!foundUser) {
            return res.status(401).json({ message: "Unathorized1" })
        }
        const isMatch = await bcrypt.compare(password, foundUser.password);
        if (!isMatch) return res.status(401).json({ error: 'Unathorized2' });
        const userInfo = {
            _id: foundUser._id, userName: foundUser.userName, phone: foundUser.phone, email: foundUser.email,
            hasCar: foundUser.hasCar, driveringLicense: foundUser.driveringLicense, gender: foundUser.gender,
            driverSuggestions: foundUser.driverSuggestions, passengerSuggestions: foundUser.passengerSuggestions, createdAt: foundUser.createdAt
        }
        const accessToken = jwt.sign(userInfo, process.env.ACCESS_TOKEN_SECRET,);
        res.json({ accessToken: accessToken });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


const register = async (req, res) => {
    debugger
    console.log("0");
    try {
       
        const { userName, phone, email, password, hasCar, driveringLicense, gender} = req.body
        console.log("1");
        
        if (!userName || !phone || !email || !password || !gender) {
            console.log("Brachi");
            
            return res.status(400).json({ message: "All fields are required!" })

        }
        const duplicate = await User.findOne({ email: email }).lean()
        console.log("2");
        if (duplicate) {
            console.log("fdfdsfsd")
            return res.status(409).message({ message: "duplicate email" })
        }
        console.log("1321231321")
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log("3");
        const userObject = { userName, phone, email, password: hashedPassword, hasCar, gender }
        console.log("4");
        const user = await User.create(userObject)
        console.log("5");
        await user.save();
        console.log("6");
        if (user) {
            console.log(user)
            return res.status(200).json({
                message: `New user ${user.username}
        created` })
        } else {
            return res.status(400).json({ message: 'Invalid user received' })
        }
    } catch (error) {
        console.log("shevi");
        
        res.status(400).json({ error: error.message });
    }
};

module.exports = { login, register }