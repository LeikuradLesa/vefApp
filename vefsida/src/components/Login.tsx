import React, { useState } from 'react';
import './Login.css'; // Import the CSS file

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Add your login logic here
    console.log('Username:', username);
    console.log('Password:', password);
  };

  return (
    <div className="login-container"> {/* Add a class name for styling */}
      <h1>Innskráning nemanda</h1>
      <form onSubmit={handleLogin}>
        <label>
          Notendanafn:  <br />
          <input type="text" value={username} onChange={handleUsernameChange} />
        </label>
        <br />
        <label>
          Lykilorð: <br />
          <input type="password" value={password} onChange={handlePasswordChange} />
        </label>
        <br />
        <button type="submit">Innskrá</button>
      </form>
    </div>
  );
};

export default LoginPage;

