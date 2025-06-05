const express = require('express');
const User = require('../models/user')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password)
        return res.status(400).json({ message: 'All fields are required' })
    const foundUser = await User.findOne({ email }).lean()
    if (!foundUser)
        return res.status(401).json({ message: "Unathorized1" })
    const isMatch = await bcrypt.compare(password, foundUser.password);
    if (!isMatch) return res.status(401).json({ error: 'Unathorized2' });
    const userInfo = {
        _id: foundUser._id, userName: foundUser.userName, phone: foundUser.phone, email: foundUser.email,
        hasCar: foundUser.hasCar, driveringLicense: foundUser.driveringLicense, gender: foundUser.gender,
        driverSuggestions: foundUser.driverSuggestions, passengerSuggestions: foundUser.passengerSuggestions, createdAt: foundUser.createdAt
    }
    const accessToken = jwt.sign(userInfo, process.env.ACCESS_TOKEN_SECRET,)
    res.json({user:userInfo, accessToken: accessToken })
};

const register = async (req, res) => {
  const { userName, phone, email, password, hasCar, gender, driveringLicense } = req.body;

  if (!userName || !phone || !email || !password || !gender)
    return res.status(400).json({ message: "All fields are required!" });

  if (hasCar && !driveringLicense)
    return res.status(400).json({ message: "מספר רישיון נדרש כאשר יש רכב" });

  const duplicate = await User.findOne({ email }).lean();
  if (duplicate)
    return res.status(409).json({ message: "duplicate email" });

  const hashedPassword = await bcrypt.hash(password, 10);

  const userObject = {
    userName,
    phone,
    email,
    password: hashedPassword,
    hasCar,
    gender,
    ...(hasCar && driveringLicense && { driveringLicense })
  };

  const user = await User.create(userObject);
  if (!user)
    return res.status(400).json({ message: "invalid user received" });

  const userInfo = {
    _id: user._id,
    userName: user.userName,
    email: user.email,
    phone: user.phone,
    hasCar: user.hasCar,
    gender: user.gender,
    driveringLicense: user.driveringLicense
  };

  const accessToken = jwt.sign(userInfo, process.env.ACCESS_TOKEN_SECRET);
  return res.status(201).json({ accessToken, user: userInfo });
};

module.exports = { login, register }