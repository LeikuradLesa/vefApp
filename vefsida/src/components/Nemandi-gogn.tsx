import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './App.css';

interface TypingH1Props {
  username: string;
}

const NemandiGogn: React.FC<TypingH1Props> = ({ username }) => {
  const [books, setBooks] = useState<any[]>([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch("https://bilazon.pythonanywhere.com/call/Showbooks", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            info: [username],
          }),
        });

        const data = await response.json();
        setBooks(data[0]);
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };

    fetchBooks();
  }, [username]);

  return (
    <div className="book-list">
      {books.length === 0 ? (
        <h2 className="empty-message">Engar bækur skráðar</h2>
      ) : (
        <div>
          {books.map((book, index) => (
            <Link key={index} to={`/spurning/${book.nafnbokar}/${book.kaflaID}/${username}`} className="book-link">
              <h2 className="book-title">{book.nafnbokar}</h2>
              <h2 className="book-title">Kafli: {book.kaflaID}</h2>
              <h2 className="book-title">Blaðsíða: {book.siduNumer}</h2>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default NemandiGogn;