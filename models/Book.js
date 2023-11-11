import mongoose from 'mongoose';

const BooksSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'must provide book title'],
  },
  authors: {
    type: Array,
  },
  publicationDate: {
    type: Date,
  },
  ISBN: {
    type: Number,
    minlength: [13, 'ISBN too short, must be 13 numeric characters'],
    maxlength: [13, 'ISBN too long, must be 13 numeric characters'],
    unique: true,
  },
});

export { BooksSchema as Book };
