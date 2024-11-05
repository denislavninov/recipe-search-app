import React, { useState } from "react";
import { useUser } from "./UserContext";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const { setUser } = useUser();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (username && password) {
      setUser({ name: username });
      navigate("/");
    } else {
      setError("Kullanıcı adı ve şifre gereklidir.");
    }
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <input
        className="login-input"
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        className="login-input"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="button-log" onClick={handleLogin}>
        Log in
      </button>{" "}
    </div>
  );
};
