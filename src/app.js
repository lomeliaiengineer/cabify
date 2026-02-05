const express = require('express');
const webhookRoute = require('./routes/webhook');
const PORT = process.env.PORT || 3000;

require('dotenv').config();

const app = express();

app.use(express.json());

app.use('/webhook', webhookRoute);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});