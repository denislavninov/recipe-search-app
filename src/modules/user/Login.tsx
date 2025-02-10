import React, { useState } from "react";
import { useUserDispatch, useUser } from "./UserContext";
import { useNavigate } from "react-router-dom";
import { validateEmail } from "../../utils";
import Container from "@mui/material/Container";
import {
  Avatar,
  Box,
  Button,
  Paper,
  Stack,
  TextField,
  Typography,
  FormControl,
  FormControlLabel,
  Checkbox,
  InputAdornment,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

export const Login = () => {
  const dispatch = useUserDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const user = useUser();
  const [error, setError] = useState("");
  const [userNameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const navigate = useNavigate();
  React.useEffect(() => {
    if (user && user.user && user.user.email) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleLogin = () => {
    let error = false;
    
    if (!username || !password) {
      setError("Username and password are required.");
      setUsernameError("Email is empty.");
      error = true;
    } 
    if (!validateEmail(username)) {
      setUsernameError("Please enter a valid email address.");
      error = true;
    }

    if (password.length < 4) {
      setPasswordError("Password must be at least 4 characters.");
      error = true;
    }

    if (error) return;


    dispatch({
      type: "LOGIN",
      payload: { email: username, name: "Default Name" },
    });
    console.log("User logged in:", { username, password });

    navigate("/");
  };

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: { preventDefault: () => void }) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event: { preventDefault: () => void }) => {
    event.preventDefault();
  };

  return (
    <Container maxWidth="xs">
      <Paper
        elevation={4}
        sx={{
          marginTop: { xs: 6, sm: 8, md: 10, lg: 15, xl: 30 },
          padding: { xs: 2, sm: 3, md: 4, lg: 5, xl: 6 },
          width: "100%",
          maxWidth: 500,
        }}
      >
        <Avatar
          sx={{
            mx: "auto",
            bgcolor: "secondary.main",
            textAlign: "center",
          }}
        >
          <LockOutlinedIcon />
        </Avatar>
        <Typography
          component="h1"
          variant="h5"
          textAlign={"center"}
          gutterBottom
          color="secondary"
        >
          Log In
        </Typography>
        {error && (
          <Typography
            component={"p"}
            color="error"
            variant="body2"
            align="center"
            sx={{ m: "2rem auto" }}
          >
            {error}
          </Typography>
        )}
        <Box
          component="form"
          sx={{ mt: 1 }}
          onSubmit={(e) => {
            e.preventDefault();
            handleLogin();
          }}
          noValidate
        >
          <TextField
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            fullWidth
            autoFocus
            sx={{ mb: 2 }}
            error={!!userNameError}
            id="outlined-error-helper-text-username"
            label="Email"
            helperText={userNameError}
            autoComplete="current-username"
            color="secondary"
          />

          <TextField
            placeholder="Password"
            type={showPassword ? "text" : "password"}
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            error={!!passwordError}
            id="outlined-error-helper-text-password"
            label="Password"
            helperText={passwordError}
            sx={{ mb: 2 }}
            autoComplete="current-password"
            color="secondary"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label={
                      showPassword
                        ? "hide the password"
                        : "display the password"
                    }
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    onMouseUp={handleMouseUpPassword}
                    edge="end"
                    color="secondary"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <FormControl>
            <FormControlLabel
              control={<Checkbox value="remember" color="secondary" />}
              label="Remember me"
            />
          </FormControl>
          <Stack spacing={3}>
            <Button type="submit" variant="contained" color="primary">
              Log In
            </Button>

            <Typography component={"p"} textAlign="center" color="secondary">
              Don't you have an account?{" "}
              <Button
                variant="text"
                color="primary"
                onClick={() => navigate("/register")}
              >
                Register here
              </Button>
            </Typography>
          </Stack>
        </Box>
      </Paper>
    </Container>
  );
};
