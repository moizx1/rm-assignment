import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import Login from "./Login";
import { useAuth } from "../../hooks/useAuth";
import { ThemeProvider } from "../../context/ThemeContext";
import { MemoryRouter } from "react-router-dom";

// Mock the useAuth hook
jest.mock("../../hooks/useAuth");

describe("Login Component", () => {
  const mockLogin = jest.fn();
  const mockMessage = "Login failed";
  const mockFailureMessage = "Invalid username or password";

  beforeEach(() => {
    useAuth.mockReturnValue({
      login: mockLogin,
      message: mockMessage,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders login form inputs and submit button", () => {
    render(
      <MemoryRouter>
        <ThemeProvider>
          <Login />
        </ThemeProvider>
      </MemoryRouter>
    );

    expect(screen.getByPlaceholderText(/username/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /login/i })).toBeInTheDocument();
  });

  test("calls login function with correct data on form submission", async () => {
    render(
      <MemoryRouter>
        <ThemeProvider>
          <Login />
        </ThemeProvider>
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText(/username/i), {
      target: { value: "test@gmail.com" },
    });
    fireEvent.change(screen.getByPlaceholderText(/password/i), {
      target: { value: "admin" },
    });
    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    expect(mockLogin).toHaveBeenCalledWith("test@gmail.com", "admin");
  });

  test("displays message from useAuth", () => {
    render(
      <MemoryRouter>
        <ThemeProvider>
          <Login />
        </ThemeProvider>
      </MemoryRouter>
    );

    expect(screen.getByText(mockMessage)).toBeInTheDocument();
  });


test("displays error message on login failure", async () => {
  // Mock the useAuth hook to reject with an error message
  useAuth.mockReturnValue({
    login: jest.fn().mockRejectedValue(new Error(mockFailureMessage)),
    message: "",
  });

  render(
    <MemoryRouter>
      <ThemeProvider>
        <Login />
      </ThemeProvider>
    </MemoryRouter>
  );

  // Fill in the form fields
  fireEvent.change(screen.getByPlaceholderText(/username/i), {
    target: { value: "wrongemail@gmail.com" },
  });
  fireEvent.change(screen.getByPlaceholderText(/password/i), {
    target: { value: "wrongpassword" },
  });

  // Submit the form
  fireEvent.click(screen.getByRole("button", { name: /login/i }));

  // Wait and verify the error message
  await screen.findByText("Invalid username or password");
  expect(screen.getByText("Invalid username or password")).toBeInTheDocument();
});
  
});
