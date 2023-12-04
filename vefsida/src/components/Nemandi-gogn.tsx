import React, { useEffect, useState } from 'react';
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
            <a key={index} href={`Bok/${book.ID}`} className="book-link">
              <h2 className="book-title">{book.nafnbokar}</h2>
            </a>
          ))}
        </div>
      )}
    </div>
  );
};

export default NemandiGogn;