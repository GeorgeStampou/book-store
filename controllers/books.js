import Book from '../models/Book.js';

const getAllBooks = async (req, res) => {
  const queryObject = {};
  const { authors, title, genre, sort, select, limit, page, numFilters } =
    req.query;

  if (authors) {
    const authorsList = authors.split(',');
    authorsList.flat();

    // authorsList.forEach((author, index) => {
    //   authorsList[index] = author.replace(/-/g, ' ');
    // });

    queryObject.authors = {};

    // $all - Matches arrays that contain all elements specified in the query.
    const operator = '$all';
    queryObject.authors[operator] = authorsList;
  }

  if (title) {
    queryObject.title = { $regex: title, $options: 'i' };
  }

  if (genre) {
    queryObject.genre = genre;
  }

  if (numFilters) {
    const operatorMap = {
      '>': '$gt',
      '>=': '$gte',
      '=': '$eq',
      '<': '$lt',
      '<=': '$lte',
    };
    const regEx = /\b(<|>|>=|=|<|<=)\b/g;
    let filter = numFilters.replace(
      regEx,
      (match) => `-${operatorMap[match]}-`
    );
    const [field, operator, value] = filter.split('-');
    if (field === 'price') {
      queryObject[field] = { [operator]: Number(value) };
    }
  }

  let result = Book.find(queryObject);

  if (sort) {
    const sortWithoutCommas = sort.replaceAll(',', ' ');
    result.sort(sortWithoutCommas);
  } else {
    result.sort('title');
  }

  if (select) {
    const selectWIthoutCommas = select.replaceAll(',', ' ');
    result.select(selectWIthoutCommas);
  }

  const pageNum = Number(page) || 1;
  const limitNum = Number(limit) || 10;
  const skip = (pageNum - 1) * limitNum;

  result = result.skip(skip).limit(limitNum);

  try {
    const books = await result;
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

const updateBook = async (req, res) => {
  try {
    const { isbn } = req.params;
    if (!isbn) {
      res.status(400).json({ message: `No isbn given` });
    }
    const book = await Book.findOneAndUpdate({ isbn: isbn }, req.body, {
      new: true,
      runValidators: true,
    });
    if (!book) {
      res.status(404).json({ message: `No book with isbn: ${isbn} found.` });
    } else {
      res.status(200).json({ book });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { getAllBooks, createBook, getBookByIsbn, updateBook };
