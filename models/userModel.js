const connection = require('../config/db');

const createUserTable = () => {
  const query = `
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      username VARCHAR(255) NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL,
      role ENUM('admin', 'user') DEFAULT 'user'
    )
  `;
  connection.query(query, (err) => {
    if (err) {
      console.error('Error creating users table:', err);
    } else {
      console.log('Users table created or already exists');
    }
  });
};

const findUserByUsername = (username, callback) => {
  connection.query('SELECT * FROM users WHERE username = ?', [username], (err, results) => {
    if (err) {
      return callback(err);
    }
    callback(null, results[0]);
  });
};

const createUser = (user, callback) => {
  connection.query('INSERT INTO users SET ?', user, (err, results) => {
    if (err) {
      return callback(err);
    }
    callback(null, results);
  });
};

module.exports = {
  createUserTable,
  findUserByUsername,
  createUser,
};
