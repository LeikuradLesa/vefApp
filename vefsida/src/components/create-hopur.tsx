import React, { useState } from 'react';
import './App.css';

interface CreateHopurProps {
  usernameKennara: string;
}

const CreateHopur: React.FC<CreateHopurProps> = ({ usernameKennara }) => {
  const [hopurName, setHopurName] = useState<string>('');
  const [studentName, setStudentName] = useState<string>('');
  const [bookId, setBookId] = useState<number>(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const apiUrl = 'https://bilazon.pythonanywhere.com/add/Hopur';

    const requestBody = {
      nafnhops: hopurName,
      notendanafn: studentName,
      notendanafnKennara: usernameKennara,
      bokID: bookId,
    };

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        console.log('Hopur created successfully');
      } else {
        console.error('Failed to create Hopur');
      }
    } catch (error) {
      console.error('Error creating Hopur', error);
    }
  };

  return (
    <div className=''>
      <form onSubmit={handleSubmit}>
        <label>
          <h4>Nafn hópar:</h4>
          <input type="text" value={hopurName} onChange={(e) => setHopurName(e.target.value)} />
        </label>
        <br />
        <label>
          <h4>Nafn nemanda:</h4>
          <input type="text" value={studentName} onChange={(e) => setStudentName(e.target.value)} />
        </label>
        <br />
        <label>
          <h4>Velja bók:</h4>
          <input type="number" value={bookId} onChange={(e) => setBookId(Number(e.target.value))} />
        </label>
        <br />
        <button type="submit">Create Hopur</button>
      </form>
    </div>
  );
};

export default CreateHopur;
