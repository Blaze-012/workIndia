const express = require('express');
const bodyParser = require('body-parser');
const { createUserTable } = require('./models/userModel');
const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

createUserTable();

app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
