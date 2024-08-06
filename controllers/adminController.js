const { createShort } = require('../models/shortModel');

const addShort = async (req, res) => {
  const { category, title, author, publish_date, content, actual_content_link, image, votes } = req.body;

  try {
    // Create a new short
    const shortId = await createShort({
      category,
      title,
      author,
      publish_date,
      content,
      actual_content_link,
      image,
      votes_up: votes.upvote,
      votes_down: votes.downvote,
    });

    res.status(200).json({
      message: 'Short added successfully',
      short_id: shortId,
      status_code: 200,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const updateShort = (req, res) => {
  // Logic to update an existing short
  res.status(200).json({ message: 'Short updated successfully' });
};

module.exports = {
  addShort,
  updateShort,
};
