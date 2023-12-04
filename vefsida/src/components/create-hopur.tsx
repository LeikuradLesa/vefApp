import React, { useState } from 'react';

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
    <form onSubmit={handleSubmit}>
      <label>
        Hopur Name:
        <input type="text" value={hopurName} onChange={(e) => setHopurName(e.target.value)} />
      </label>
      <br />
      <label>
        Student Name:
        <input type="text" value={studentName} onChange={(e) => setStudentName(e.target.value)} />
      </label>
      <br />
      <label>
        Book ID:
        <input type="number" value={bookId} onChange={(e) => setBookId(Number(e.target.value))} />
      </label>
      <br />
      <button type="submit">Create Hopur</button>
    </form>
  );
};

export default CreateHopur;
