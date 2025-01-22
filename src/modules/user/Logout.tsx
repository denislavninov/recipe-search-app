import React, { useEffect, useState } from "react";
import { useUserDispatch } from "./UserContext";
import { useNavigate } from "react-router-dom";
import { Stack, Typography } from "@mui/material";

const Logout = () => {
  const dispatch = useUserDispatch();
  const navigate = useNavigate();
  const [message, setMessage] = useState("");

  useEffect(() => {
    dispatch({ type: "LOGOUT" });
    setMessage("Logged out successfully");

    const timer = setTimeout(() => {
      navigate("/login");
    }, 2000);

    return () => clearTimeout(timer);
  }, [dispatch, navigate]);

  return (
    <Stack
      sx={{
        justifyContent: "center",
        alignItems: "center",
        height: "100vh", // Center vertically
        backgroundColor: "#f5f5f5", // Light background color
      }}
    >
      <Typography
        variant="h6" // Use a variant for styling
        color="primary" // Change color to primary theme color
        sx={{
          marginBottom: 2, // Add some margin below the message
          fontWeight: "bold", // Make the text bold
        }}
      >
        {message}
      </Typography>
    </Stack>
  );
};

export default Logout;
