const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require("../models/user");

const router = express.Router();
const saltRounds = 10;
const secretkey = 'secretkey';

// sign up route
router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    // check email is use befour
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }

    const hashPassword = await bcrypt.hash(password, saltRounds);
    const newUser = new User({ username, email, password: hashPassword });
    await newUser.save();

    res.status(201).json({ message: "user registered sucessfully" });
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({ message: "server error" });
  }
});



// login route
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Email and Password are required' });
    }
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ error: 'User not found' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ error: 'Incorrect password' });

        // set token to expire in the time
        const token = jwt.sign({ userId: user._id, username: user.username }, secretkey, { expiresIn: '60m' });
        res.status(200).json({ sucess: true, message: 'Login successful', token });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ error: 'server error' });
    }
});


// Middleware  to veryfy JWT
const verifyToken = async (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) res.status(403).json({ error: 'No token provied' });

    try {
        const decoded = jwt.verify(token, secretkey);
        const user = await User.findById(decoded.userId);

        if (!user) return res.status(404).json({ error: 'user not found' });
        req.userId = user._id;
        req.username = user.username;
        req.email = user.email;
        next();
    } catch (err) {
        if (err.name === 'TokenExpiredError') {
            res.status(401).json({ error: 'token expired' });
        } else {
            res.status(500).json({ error: 'Failed to authenticate token' });
        }
    }
};

// get user data
router.get('/me', verifyToken, (req, res) => {
    res.status(200).json({ username: req.username, email: req.email });
});

module.exports = router;