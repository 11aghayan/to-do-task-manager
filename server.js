const express = require('express');
const app = express();
const connectDB = require('./connect/connect.js');
require('dotenv').config();
const {
  notFound,
  errorHandler
} = require('./error/errors.js');

app.use(express.static('./public'));

app.use(express.json());

const router = require('./routes/routes.js');

app.use('/api/v1/tasks', router);

app.use(notFound);
app.use(errorHandler);

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