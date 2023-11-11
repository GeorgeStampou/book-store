import Book from '../models/Book.js';

const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find({});
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createBook = async (req, res) => {
  try {
    const book = await Book.create(req.body);
    res.status(201).json({ book });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getBookByIsbn = async (req, res) => {
  try {
    const { isbn } = req.params;
    if (!isbn) {
      res.status(400).json({ message: `No isbn given` });
    }
    const book = await Book.find({ isbn });
    if (book.length === 0) {
      res.status(404).json({ message: `No book with isbn: ${isbn} found.` });
    } else {
      res.status(200).json({ book });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { getAllBooks, createBook, getBookByIsbn };
