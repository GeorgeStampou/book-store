const Book = ({
  _id: id,
  title,
  authors,
  publicationDate,
  isbn,
  price,
  genre,
}) => {
  return (
    <article>
      <div className='book-poster'>
        <img></img>
      </div>
      {id}, {title}, {authors}, {publicationDate}, {isbn}, {price}, {genre}
    </article>
  );
};

export default Book;
