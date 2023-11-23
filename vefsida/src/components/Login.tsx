import React, { useState } from 'react';
import './Login.css'; // Import the CSS file

const LoginPage: React.FC = () => {
  const [loginInfo, setLoginInfo] = useState({
    "notendanafn" : "",
    "lykilord" : ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const checkResponse = await fetch(`https://bilazon.pythonanywhere.com/login/notandi`, {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          "where": `notendanafn="${loginInfo.notendanafn}"`,
          "lykilord" : loginInfo.lykilord
        }),
      });

      if (!checkResponse.ok) {
        throw new Error(`HTTP error! Status: ${checkResponse.status}`);
      }

      // Check if the name and password match
      const loggedIn = await checkResponse.json();
      console.log(loggedIn)

    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  return (
    <div className="login-container"> {/* Add a class name for styling */}
      <h1>Innskráning nemanda</h1>
      <form onSubmit={handleLogin}>
        <label>
          Notenda Nafn:
          <input type="text" required name="notendanafn" value={loginInfo.notendanafn} onChange={handleInputChange} />
        </label>
        <br />
        <label>
          Lykilorð:
          <input type="password" required name="lykilord" value={loginInfo.lykilord} onChange={handleInputChange} />
        </label>
        <br />
        <button type="submit">Innskrá</button>
      </form>
    </div>
  );
};

export default LoginPage;
