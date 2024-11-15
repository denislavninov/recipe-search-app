import React, { useEffect, useState } from "react";
import { useUser } from "./UserContext";
import { useNavigate } from "react-router-dom";
import { Container } from "./Container";
import { Button } from "./shared-button";
import { Input } from "./Shared-input";

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
    <Container>
      <h1 className="shared-h1">Login</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleLogin();
        }}
      >
        <label htmlFor="email-input">Email</label>
        <Input
          id="email-input"
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label htmlFor="password-input">Password</label>
        <Input
          id="password-input"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button type="submit">Log in</Button>
        <Button onClick={() => navigate("/register")}>Register</Button>
      </form>
    </Container>
  );
};
