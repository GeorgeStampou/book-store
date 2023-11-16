import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

import router from './routes/books.js';
import connectDB from './db/connect.js';

const app = express();

app.use(express.json());

app.use(function (req, res, next) {
  // Website to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
  // Request methods wish to allow
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, OPTIONS, PUT, PATCH, DELETE'
  );
  // Request headers you wish to allow
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-Requested-With,content-type'
  );
  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  next();
});

app.use('/api/v1/books', router);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`Server is listening on port...${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
