import React, { useEffect, useState } from 'react';

interface TypingH1Props {
    username: string;
}

const KennaraGogn: React.FC<TypingH1Props> = ({ username }) => {
  const [hopar, setHopar] = useState<any[]>([]);

  useEffect(() => {
    const fetchHopar = async () => {
      try {
        const response = await fetch("https://bilazon.pythonanywhere.com/call/ShowHopur", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            info: [username],
          }),
        });

        const data = await response.json();
        setHopar(data[0]);
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };

    fetchHopar();
  }, [username]);

  return (
    <div className='book-list'/*Hér er verið að endurnota css úr nemanda síðunni*/>
      {hopar.length === 0 ? (
        <h2>Engir hópar skráðir</h2>
      ) : (
        <div>
          {hopar.map((hopur, index) => (
            <a key={index} href={`Hopur/${hopur.nafnhops}`} className='book-link'>
              <h2 className='book-title'>{hopur.nafnhops}</h2>
            </a>
          ))}
        </div>
      )}
    </div>
  );
};

export default KennaraGogn;