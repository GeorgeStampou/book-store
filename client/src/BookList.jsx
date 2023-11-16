import React from 'react';
import Book from './Book';

const BookList = ({ books }) => {
  return (
    <section>
      <div className='title'>
        <h2>Book Store</h2>
      </div>
      <div>
        {books.map((book) => {
          return <Book key={book._id} {...book} />;
        })}
      </div>
    </section>
  );
};

export default BookList;
