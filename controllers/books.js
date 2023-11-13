import Book from '../models/Book.js';

const getAllBooks = async (req, res) => {
  const { authors } = req.query;
  let books = {};
  const authorsList = authors.split(',');
  authorsList.flat();
  // console.log(authorsList);
  authorsList.forEach((author, index) => {
    authorsList[index] = author.replace(/-/g, ' ');
  });

  console.log(authorsList);
  try {
    if (authorsList) {
      books = await Book.find({ authors: { $all: authorsList } });
    } else {
      books = await Book.find({});
    }
    res.status(200).json({ books });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }

  // try {
  //   const authorsList = authors.split(',');
  //   console.log(authorsList);
  //   if (authorsList && authors.length > 1) {
  //     const newAuthorsList = [];
  //     authorsList.map((author) => {
  //       newAuthorsList.push(author.replace('-', ' '));
  //     });
  //     newAuthorsList.sort();
  //     console.log(newAuthorsList);
  //     books = await Book.find({ authors: newAuthorsList });
  //     res.status(200).json({ books });
  //   } else if (authorsList) {
  //     const author = authorsList.replace('-', ' ');
  //     books = await Book.find({ authors: author });
  //     res.status(200).json({ books });
  //   } else {
  //     books = await Book.find({});
  //     res.status(200).json(books);
  //   }
  // } catch (error) {
  //   res.status(500).json({ message: error.message });
  // }
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
