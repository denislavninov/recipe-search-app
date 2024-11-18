import { useState } from "react"; // Removed useContext
import { Container } from "../../shared-component/Container/index";
import { Input } from "../../shared-component/Input/index";
import { useUserDispatch } from "./UserContext";
import { useNavigate } from "react-router-dom";
import { Button } from "../../shared-component/Button/index";

export const Register = () => {
  const dispatch = useUserDispatch(); // Use the useUser hook to get dispatch
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  }); // State for form data

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value })); // Update state on input change
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch({ type: "REGISTER_USER", payload: formData }); // Dispatch action with form data
    console.log("Kullanıcı Bilgileri:", formData); // Log form data
  };

  return (
    <Container>
      <h1 className="shared-h1">Register</h1>
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

        <Button
          type="submit"
          className="shared-button"
          onClick={() => navigate("/recipes/new")}
        >
          Register
        </Button>
      </form>
    </Container>
  );
};
