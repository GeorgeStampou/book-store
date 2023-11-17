import React from 'react';
import Book from './Book';
import './BookList.css';

const BookList = ({ books }) => {
  return (
    <section>
      <div className='title'>
        <h1>Book Store</h1>
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
