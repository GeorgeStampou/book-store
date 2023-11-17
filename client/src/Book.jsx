import './Book.css';

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
    <article>
      <div className='book-poster'>
        <img src={cover} alt={title} />
        <div className='book-info'>
          <p>
            Author(s): {authorsWithSpace} <br />
            Genre: {genre}
            <br />
            Publication date: {publicationDate}
            <br />
            Price: {price}€
          </p>
        </div>
      </div>
      <div className='book-title'>
        <h2>{title}</h2>
      </div>
    </article>
  );
};

export default Book;
