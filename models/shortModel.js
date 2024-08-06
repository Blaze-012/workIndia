const pool = require('../config/db');

const createShortsTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS shorts (
      id INT AUTO_INCREMENT PRIMARY KEY,
      category VARCHAR(255) NOT NULL,
      title VARCHAR(255) NOT NULL,
      author VARCHAR(255) NOT NULL,
      publish_date DATETIME NOT NULL,
      content TEXT NOT NULL,
      actual_content_link VARCHAR(255),
      image VARCHAR(255),
      votes_up INT DEFAULT 0,
      votes_down INT DEFAULT 0
    )
  `;
  try {
    await pool.query(query);
    console.log('Shorts table created or already exists');
  } catch (err) {
    console.error('Error creating shorts table:', err);
  }
};

const createShort = async (short) => {
  const { category, title, author, publish_date, content, actual_content_link, image, votes_up, votes_down } = short;
  const query = `
    INSERT INTO shorts (category, title, author, publish_date, content, actual_content_link, image, votes_up, votes_down)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;
  try {
    const [result] = await pool.query(query, [category, title, author, publish_date, content, actual_content_link, image, votes_up, votes_down]);
    return result.insertId; // Return the ID of the inserted row
  } catch (err) {
    throw err;
  }
};

module.exports = {
  createShortsTable,
  createShort,
};
