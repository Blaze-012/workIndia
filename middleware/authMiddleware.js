const jwt = require('jsonwebtoken');
require('dotenv').config();

const authenticate = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(401).json({ error: 'Access denied' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(401).json({ error: 'Invalid token' });
    }
    req.user = user;
    next();
  });
};

const authorize = (roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Forbidden' });
    }
    next();
  };
};

module.exports = {
  authenticate,
  authorize,
};
