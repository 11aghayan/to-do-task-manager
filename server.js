const express = require('express');
const app = express();
const connectDB = require('./connect/connect.js');
require('dotenv').config();
const cors = require("cors");
const {
  notFound,
  errorHandler
} = require('./error/errors.js');

const corsOptions ={
  origin:'*', 
  credentials:true,          
  optionSuccessStatus:200,
};
app.use(cors(corsOptions));

app.use(express.static('./public'));

app.use(express.json());

const router = require('./routes/routes.js');

app.use('/api/v1/tasks', router);

app.use(notFound);
app.use(errorHandler);

const port = 8000;

let ok;

const startServer = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`Server is running on port ${port}`));
    ok = true;
  } catch (err) {
    console.log(err);
  }
};

module.exports = ok;

startServer();