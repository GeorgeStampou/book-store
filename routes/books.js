import express from 'express';
import {
  getAllBooks,
  createBook,
  getBookByIsbn,
  updateBook,
} from '../controllers/books.js';

const router = express.Router();

router.route('/').get(getAllBooks).post(createBook);
router.route('/:isbn').get(getBookByIsbn).patch(updateBook);

export default router;
