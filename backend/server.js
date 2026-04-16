const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

require('dotenv').config();
connectDB();
const port = process.env.PORT || 5000;

const app = express();
app.use(express.json());
app.use(cors());

app.use('/api/auth', require('./routes/authRoute'));
app.use('/api/users', require('./routes/userRoute'));

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});