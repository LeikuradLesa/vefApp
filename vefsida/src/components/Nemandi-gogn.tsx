import React, { useEffect, useState } from 'react';

interface TypingH1Props {
    username: string;
}

const NemandiGogn: React.FC<TypingH1Props> = ({ username }) => {
  const [books, setBooks] = useState<any[]>([]); // Use a more specific type for books if possible

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
        setBooks(data[0]); // Assuming the books are in the first array of the response
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };

    fetchBooks();
  }, [username]);

  return (
    <div>
      <div>
        {books.map((book, index) => (
          <div key={index}>
            <h2>{book.nafnbokar}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NemandiGogn;