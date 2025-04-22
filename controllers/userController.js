const User = require("../models/user")
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');




  exports.getAllUsers = async (req, res) => {
    try {
      const users = await User.find();
      res.json(users);
    } catch (error) {
      console.error("Failed to get users:", error);
      res.status(500).json({ message: "Failed to get users" });
    }
  };


  exports.getUserByEmail= async (req, res) => {
        try {
            const { email } = req.params;
            if (!email) {
              return res.status(400).json({ message: 'Email is required' });
          }
            const user = await User.findOne({ email });
            if (!user) return res.status(401).json({ error: 'User not found!!!' });

            const userInfo = { userId: user._id, email: user.email };
        const accessToken = jwt.sign(userInfo, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });

        res.json({ accessToken, user });
        
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

