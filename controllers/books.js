import Book from '../models/Book.js';

const getAllBooks = async (req, res) => {
  const queryObject = {};
  const { authors, title, genre } = req.query;

  if (authors) {
    const authorsList = authors.split(',');
    authorsList.flat();

    authorsList.forEach((author, index) => {
      authorsList[index] = author.replace(/-/g, ' ');
    });

    queryObject.authors = {};
    const operator = '$all';
    queryObject.authors[operator] = authorsList;
  }

  if (title) {
    queryObject.title = title;
  }

  if (genre) {
    queryObject.genre = genre;
  }

  try {
    const books = await Book.find(queryObject);
    res.status(200).json({ books, count: books.length });
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
