import React from 'react';
import Book from './Book';
import './BookList.css';
import { Link } from 'react-router-dom';

const BookList = ({ books }) => {
  return (
    <section>
      <div className='title'>
        <Link to='/'>
          <h1>Book Store</h1>
        </Link>
      </div>
      <div className='book-list'>
        {books.map((book) => {
          return <Book key={book._id} {...book} />;
        })}
      </div>
    </section>
  );
};

export default BookList;
