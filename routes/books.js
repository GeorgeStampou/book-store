import express from 'express';
import {
  getAllBooks,
  createBook,
  getBookByIsbn,
} from '../controllers/books.js';

const router = express.Router();

router.route('/').get(getAllBooks).post(createBook);
router.route('/:isbn').get(getBookByIsbn);

export default router;
