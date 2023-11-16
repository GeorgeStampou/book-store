import { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3000';

function App() {
  const [books, setBooks] = useState([]);

  const getBooks = async () => {
    try {
      const response = await axios.get('/api/v1/books');
      const { data } = response;
      // console.log(data);
      // console.log(data.books);
      setBooks(data.books);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBooks();
  }, []);

  return (
    <>
      <div>Hello from react + nodejs</div>
      <div>f</div>
    </>
  );
}

export default App;
