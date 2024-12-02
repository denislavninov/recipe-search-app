import React, { useState } from "react";
import { useUserDispatch } from "./UserContext";
import { useNavigate } from "react-router-dom";
import { Container } from "../../shared-component/Container/index";
import { Button } from "../../shared-component/Button/index";
import { Input } from "../../shared-component/Input/index";
import { validateEmail } from "../../utils";

export const Login = () => {
  const dispatch = useUserDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (!username || !password) {
      setError("Username and password are required.");
      return;
    }
    if (!validateEmail(username)) {
      setError("Invalid email format");
      return;
    }
    if (password.length < 4) {
      setError("Password must be at least 4 characters.");
      return;
    }

    dispatch({ type: "LOGIN", payload: { username, password } });
    console.log("User logged in:", { username, password });

    navigate("/");
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
