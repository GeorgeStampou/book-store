import mongoose from 'mongoose';

const BookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'must provide book title'],
  },
  authors: {
    type: Array,
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
  },
});

export default mongoose.model('Book', BookSchema);
