import { render, screen, fireEvent } from "@testing-library/react";
import { Login } from "../../../modules/user/Login";
import { UserDispatchContext, UserProvider } from "../../../modules/user/UserContext";
import { MemoryRouter } from "react-router-dom";

describe("<Login /> component", () => {
  const mockDispatch = jest.fn();

  const renderWithContext = () => {
    return render(
      <UserProvider>
        <UserDispatchContext.Provider value={mockDispatch}>
          <MemoryRouter>
            <Login />
          </MemoryRouter>
        </UserDispatchContext.Provider>
      </UserProvider>
    );
  };

  it("should render the login form", () => {
    renderWithContext();
    expect(screen.getByRole("heading", { name: /log in/i })).toBeInTheDocument();
  });

  it("should dispatch login action on successful login", () => {
    renderWithContext();

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/password/i, { selector: 'input' }), {
      target: { value: "password123" },
    });

    fireEvent.click(screen.getByRole("button", { name: /log in/i }));

    expect(mockDispatch).toHaveBeenCalledWith({
      type: "LOGIN",
      payload: { email: "test@example.com", name: "Default Name" },
    });
  });

  it("should show error message for invalid email format", () => {
    renderWithContext();

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "invalid-email" },
    });
    fireEvent.change(screen.getByLabelText(/password/i, { selector: 'input' }), {
      target: { value: "password123" },
    });

    fireEvent.click(screen.getByRole("button", { name: /log in/i }));

    expect(screen.getByText(/enter a valid email address./i)).toBeInTheDocument();
  });

  it("should show error message for short password", () => {
    renderWithContext();

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/password/i, { selector: 'input' }), {
      target: { value: "123" },
    });

    fireEvent.click(screen.getByRole("button", { name: /log in/i }));

    expect(screen.getByText(/password must be at least 4 characters/i)).toBeInTheDocument();
  });
  it("should show a correct error message for empty usename or password", () => {
    renderWithContext();

    fireEvent.click(screen.getByRole("button", { name: /log in/i }));

    expect(screen.getByText(/username and password are required/i)).toBeInTheDocument();
  });

  it("should toggle the 'Remember me' checkbox", () => {
    renderWithContext();

    const rememberMeCheckbox = screen.getByLabelText(/remember me/i);

    // Initially, the checkbox should not be checked
    expect(rememberMeCheckbox).not.toBeChecked();

    // Click to check the checkbox
    fireEvent.click(rememberMeCheckbox);
    expect(rememberMeCheckbox).toBeChecked();

    // Click again to uncheck the checkbox
    fireEvent.click(rememberMeCheckbox);
    expect(rememberMeCheckbox).not.toBeChecked();
  });
});