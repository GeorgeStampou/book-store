import { Link } from 'react-router-dom';
import './Book.css';
import FullBook from './FullBook';

const Book = ({
  _id: id,
  title,
  authors,
  publicationDate,
  isbn,
  price,
  genre,
  cover,
}) => {
  const authorsWithSpace = authors.join(', ');

  return (
    <Link to={isbn}>
      <article>
        <div className='book-poster'>
          <img src={cover} alt={title} />
          <div className='book-info'>
            <p>
              Author(s): <span>{authorsWithSpace}</span>
              <br />
              Genre: <span>{genre}</span>
              <br />
              Publication date: <span>{publicationDate}</span>
              <br />
              Price: <span>{price}€</span>
            </p>
          </div>
        </div>
        <div className='book-title'>
          <h2>{title}</h2>
        </div>
      </article>
    </Link>
  );
};

export default Book;
