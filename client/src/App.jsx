import { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import BookList from './BookList';
import Loading from './Loading';

axios.defaults.baseURL = 'http://localhost:3000';

function App() {
  const [books, setBooks] = useState([]);

  const [loading, setLoading] = useState(true);

  const getBooks = async () => {
    try {
      const response = await axios.get('/api/v1/books');
      const { data } = response;
      // console.log(data);
      // console.log(data.books);
      setBooks(data.books);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBooks();
  }, []);

  return <>{loading ? <Loading /> : <BookList books={books} />}</>;
}

export default App;
