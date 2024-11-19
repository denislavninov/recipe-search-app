import { useState } from "react"; // Removed useContext
import { Container } from "../../shared-component/Container/index";
import { Input } from "../../shared-component/Input/index";
import { useUserDispatch } from "./UserContext";
import { useNavigate } from "react-router-dom";
import { Button } from "../../shared-component/Button/index";

const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

export const Register = () => {
  const dispatch = useUserDispatch(); // Use the useUser hook to get dispatch
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
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
      setError("All fields Required.");
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

  return (
    <Container>
      <h1 className="shared-h1">Register</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <label htmlFor="name-input">Name</label>
        <Input
          type="text"
          name="name"
          placeholder="Username"
          id="name-input"
          value={formData.name} // Bind input value to state
          onChange={handleChange} // Handle input change
        />
        <label htmlFor="email-input">Email</label>
        <Input
          type="email"
          name="email"
          placeholder="demail@gmail.com"
          id="email-input"
          value={formData.email} // Bind input value to state
          onChange={handleChange} // Handle input change
        />
        <label htmlFor="password-input">Password</label>
        <Input
          type="password"
          name="password"
          placeholder="Password"
          id="password-input"
          value={formData.password} // Bind input value to state
          onChange={handleChange} // Handle input change
        />

        <Button type="submit" className="shared-button">
          Register
        </Button>
      </form>
    </Container>
  );
};
