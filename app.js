import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

import router from './routes/books.js';

const app = express();

app.use('/api/v1/books', router);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is listening on port... ${port}`);
});
