import express from 'express';
const server = express();





const port = process.env.PORT || 5000;

try {
  server.listen(port, console.log(`Server is running on port ${port}`));
} catch (err) {
  console.log(err);
}