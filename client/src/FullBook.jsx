import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import Loading from './Loading';
import './FullBook.css';

const FullBook = () => {
  const { isbn } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  const getBook = async () => {
    try {
      const response = await axios.get(`/api/v1/books/${isbn}`);
      const { data } = response;
      setBook(data.book);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBook();
  }, []);

  if (loading) {
    return <Loading />;
  }

  const { title, cover, authors, price } = book;
  const authorsWithSpace = authors.join(', ');

  return (
    <section>
      <div className='title'>
        <Link to='/'>
          <h1>Book Store</h1>
        </Link>
      </div>
      <div className='full-info'>
        <div className='left-body'>
          <img src={cover} alt={title} />
        </div>
        <div className='right-body'>
          <div className='upper'>
            <h2>{title}</h2>
            <h4>by: {authorsWithSpace}</h4>
          </div>
          <div className='lower'>
            <p>Price: {price}€</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FullBook;
