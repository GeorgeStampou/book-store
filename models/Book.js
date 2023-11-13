import mongoose from 'mongoose';

const BookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'must provide book title'],
  },
  authors: {
    type: [String],
  },
  publicationDate: {
    type: String,
  },
  isbn: {
    type: String,
    match: [/^\d+$/, 'Please provide a valid ISBN'],
    minLength: [13, 'ISBN too short, must be 13 numeric characters'],
    maxLength: [13, 'ISBN too long, must be 13 numeric characters'],
    unique: true,
    required: [true, 'Must provide Book ISBN'],
  },
  price: {
    type: Number,
    required: [true, 'Book price must be provided'],
  },
  genre: {
    type: String,
  },
  description: {
    type: String,
  },
  cover: {
    type: String,
    match: [
      /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/,
      'Please provide a valid cover url',
    ],
    unique: true,
    sparse: true,
  },
});

export default mongoose.model('Book', BookSchema);
