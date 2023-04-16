const express = require('express');
const app = express();
const connectDB = require('./connect/connect.js');
require('dotenv').config();

app.use(express.json());

const router = require('./routes/routes.js');

app.use(express.static('./public'));
app.use('/api/v1/tasks', router);


const port = process.env.PORT || 6000;

const startServer = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`Server is running on port ${port}`));
  } catch (err) {
    console.log(err);
  }
};

startServer();