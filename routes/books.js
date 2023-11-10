import express from 'express';

const router = express.Router();

router.route('/').get((req, res) => {
  res.send('Hello from books');
});

router.route('/hello').get((req, res) => {
  res.send('Hello world from another place');
});

export default router;
