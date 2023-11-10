import express from 'express';
import { getAllBooks, createBook } from '../controllers/books.js';

const router = express.Router();

router.route('/').get(getAllBooks);
router.route('/f').get(createBook);

export default router;
