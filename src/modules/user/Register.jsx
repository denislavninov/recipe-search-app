import { useState } from "react"; // Removed useContext
import { useUserDispatch } from "./UserContext";
import { useNavigate } from "react-router-dom";
import { validateEmail } from "../../utils";
import Container from "@mui/material/Container";
import HowToRegIcon from "@mui/icons-material/HowToReg";

import {
  Avatar,
  Box,
  Button,
  Paper,
  TextField,
  Typography,
  FormControl,
  FormControlLabel,
  InputAdornment,
  FormLabel,
  RadioGroup,
  Radio,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

export const Register = () => {
  const dispatch = useUserDispatch(); // Use the useUser hook to get dispatch
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    gender: "",
  }); // State for form data
  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value })); // Update state on input change
    setError("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!formData.name || !formData.email || !formData.password) {
      setError("All fields are required.");
      return;
    }

    if (!validateEmail(formData.email)) {
      setError("Invalid email format.");
      return;
    }
    if (formData.password.length < 4) {
      setError("Password must be at least 4 characters.");
      return;
    }

    dispatch({ type: "REGISTER_USER", payload: formData }); // Dispatch action with form data
    console.log("Kullanıcı Bilgileri:", formData); // Log form data
    navigate("/recipes/new");
  };

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword((show) => {
      console.log("Show Password:", !show); // Durumu konsola yazdır
      return !show;
    });
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
          <HowToRegIcon />
        </Avatar>

        <Typography
          component="h1"
          variant="h5"
          textAlign={"center"}
          gutterBottom
          color="secondary"
        >
          Register
        </Typography>

        {error && <p style={{ color: "red" }}>{error}</p>}
        <Box component="form" sx={{ mt: 1 }} onSubmit={handleSubmit}>
          <TextField
            type="text"
            name="name"
            placeholder="Username"
            value={formData.name} // Bind input value to state
            onChange={handleChange} // Handle input change
            fullWidth
            autoFocus
            sx={{ mb: 2 }}
            error={!!error}
            id="outlined-error-helper-text-username"
            label="Username"
            autoComplete="current-username"
            color="secondary"
          />

          <TextField
            type="email"
            name="email"
            placeholder="demail@gmail.com"
            value={formData.email} // Bind input value to state
            onChange={handleChange} // Handle input change
            fullWidth
            autoFocus
            sx={{ mb: 2 }}
            error={!!error}
            id="outlined-error-helper-text-email"
            label="Email"
            autoComplete="current-email"
            color="secondary"
          />
          <TextField
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            fullWidth
            autoFocus
            sx={{ mb: 2 }}
            error={!!error}
            id="outlined-error-helper-text-password"
            label="Password"
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
                    edge="end"
                    color="secondary"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <FormControl
            sx={{
              mb: 2,
              alignItems: "center",
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-start",
              gap: 1,
            }}
          >
            <FormLabel id="demo-row-radio-buttons-group-label">
              <Typography variant="h6" color="secondary">
                Gender:
              </Typography>
            </FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="gender"
              onChange={handleChange}
              value={formData.gender}
              sx={{ p: 1, m: 1 }}
              color="secondary.main"
            >
              <FormControlLabel
                value="female"
                control={
                  <Radio
                    sx={{
                      color: "secondary.main",
                      "&.Mui-checked": { color: "secondary.main" },
                    }}
                  />
                }
                label={<Typography variant="body2">Female</Typography>}
              />
              <FormControlLabel
                value="male"
                control={
                  <Radio
                    sx={{
                      color: "secondary.main",
                      "&.Mui-checked": { color: "secondary.main" },
                    }}
                  />
                }
                label={<Typography variant="body2">Male</Typography>}
              />
              <FormControlLabel
                value="other"
                control={
                  <Radio
                    sx={{
                      color: "secondary.main",
                      "&.Mui-checked": { color: "secondary.main" },
                    }}
                  />
                }
                label={<Typography variant="body2">Other</Typography>}
              />
            </RadioGroup>
          </FormControl>

          <Button type="submit" variant="contained" color="primary" fullWidth>
            Submit
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};
