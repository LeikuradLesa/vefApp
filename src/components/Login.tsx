import React, { useState } from "react";
import "./login.css";
import { useNavigate } from "react-router-dom";

const LoginPage: React.FC = () => {
  const [loginInfo, setLoginInfo] = useState({
    notendanafn: "",
    lykilord: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

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
      const checkResponse = await fetch(
        `https://bilazon.pythonanywhere.com/call/Login`,
        {
          method: "post",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            info: [loginInfo.notendanafn, loginInfo.lykilord],
          }),
        }
      );

      if (!checkResponse.ok) {
        throw new Error(`HTTP error! Status: ${checkResponse.status}`);
      }

      // Check if the name and password match
      const loggedIn = await checkResponse.json();
      console.log(loggedIn[0][0]);
      switch (loggedIn[0][0]["result"]) {
        case -1: {
          setError("Notendanafn eða lykilorð er vitlaust");
          break;
        }

        case 0: {
          navigate("/Kennari", { state: { username: loginInfo.notendanafn } });
          break;
        }

        case 1: {
          navigate("/Nemandi", { state: { username: loginInfo.notendanafn } });
          break;
        }
      }
    } catch (error) {
      console.error("Error logging in:", error);
      setError("vandamál að innskrá");
    }
  };

  return (
    <div className="login-container" id="inskráning">
      <h3>{error}</h3>
      <h1>Innskráning nemanda</h1>
      <form onSubmit={handleLogin}>
        <label className="Title">
          Notenda Nafn:
          <input
            type="text"
            required
            name="notendanafn"
            value={loginInfo.notendanafn}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label className="Title">
          Lykilorð:
          <input
            type="password"
            required
            name="lykilord"
            value={loginInfo.lykilord}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <button type="submit">Innskrá</button>
      </form>
    </div>
  );
};

export default LoginPage;
