import React, { useState } from 'react';
import "./App.css"
import axios from 'axios';

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [userCredentials, setUserCredentials] = useState([]);

  const handlePost = () => {
    axios.post('http://localhost:5000/register', { username, password })
      .then((response) => {
        const result = response.data;
        if (result) {
          alert("Data saved successfully");
          setUsername("");
          setPassword("");
        }
      })
      .catch((error) => {
        console.error("POST request error:", error);
        alert("Something went wrong when saving data.");
      });
  }

  const handleGet = () => {
    axios.get('http://localhost:5000/')
      .then((response) => {
        const users = response.data;
        setUserCredentials(users);
      })
      .catch((error) => {
        console.error("GET request error:", error);
      });
  }

  return (
    <div className="container">
      <h1>This is React WebApp</h1>
      <form>
        <label>Enter Username:&nbsp;&nbsp;</label>
        <input
          type="text"
          className="input-field"
          placeholder="Your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <br /><br />
        <label>Enter Password:&nbsp;&nbsp;</label>
        <input
          type="password"
          className="input-field"
          placeholder="Your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br /><br />
        <button type="button" onClick={handlePost}>Post</button>
        <button type="button" onClick={handleGet}>Get</button>
      </form>
      <div>
        <h2>Stored User Credentials</h2>
        <ul>
          {userCredentials.map((user, index) => (
            <li key={index}>Username: {user.username}, Password: {user.password}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
