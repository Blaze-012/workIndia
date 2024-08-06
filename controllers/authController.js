const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { findUserByUsername, createUser } = require('../models/userModel');
require('dotenv').config();

const register = (req, res) => {
  const { username, password, role } = req.body;

  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) {
      return res.status(500).json({ error: 'Error hashing password' });
    }

    const newUser = { username, password: hashedPassword, role };
    createUser(newUser, (err) => {
      if (err) {
        return res.status(500).json({ error: 'Error creating user' });
      }
      res.status(201).json({ message: 'User registered successfully' });
    });
  });
};

const login = (req, res) => {
  const { username, password } = req.body;

  findUserByUsername(username, (err, user) => {
    if (err || !user) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err || !isMatch) {
        return res.status(400).json({ error: 'Invalid credentials' });
      }

      const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.json({ token });
    });
  });
};

module.exports = {
  register,
  login,
};
