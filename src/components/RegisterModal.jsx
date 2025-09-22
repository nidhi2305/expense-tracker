import React, { useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "../store/UserSlice"; 
import { useNavigate } from "react-router-dom";

/**
 * RegisterModal Component
 * Shows a modal to create a new user account.
 * Validates user inputs and saves user to localStorage & Redux.
 *
 * @param {boolean} show - whether modal is visible
 * @param {function} handleClose - function to close modal
 * @returns {JSX.Element} Registration modal JSX
 */
export const RegisterModal = ({ show, handleClose }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Form data state
  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // Validation errors state
  const [errors, setErrors] = useState({});

  /**
   * Validate a single field
   * @param {string} field - Field name
   * @param {string} value - Field value
   */
  const validateField = (field, value) => {
    let error = "";

    switch (field) {
      case "name":
        if (!value.trim()) error = "Name is required";
        else if (!/^[a-zA-Z\s]+$/.test(value))
          error = "Name can only contain letters and spaces";
        break;
      case "email":
        if (!value.trim()) error = "Email is required";
        else if (!/\S+@\S+\.\S+/.test(value)) error = "Email is invalid";
        break;
      case "password":
        if (!value.trim()) error = "Password is required";
        else if (value.length < 6) error = "Password must be at least 6 characters";
        break;
      case "confirmPassword":
        if (!value.trim()) error = "Confirm Password is required";
        else if (value !== registerData.password) error = "Passwords do not match";
        break;
      default:
        break;
    }

    // Update errors state
    setErrors((prev) => ({ ...prev, [field]: error }));
  };

  /**
   * Handle input changes for form fields
   * @param {string} field - Field name
   * @param {string} value - Field value
   */
  const handleChange = (field, value) => {
    setRegisterData((prev) => ({ ...prev, [field]: value }));
    validateField(field, value); // Validate as user types
  };

  /**
   * Handle registration form submission
   * Adds new user to localStorage & Redux
   */
  const handleRegister = () => {
    // Validate all fields before submitting
    let valid = true;
    Object.keys(registerData).forEach((field) => {
      validateField(field, registerData[field]);
      if (errors[field]) valid = false;
    });
    if (!valid) return; // Stop if any validation fails

    // Check if email already exists
    const users = JSON.parse(localStorage.getItem("Users")) || [];
    const existingUser = users.find((u) => u.email === registerData.email);
    if (existingUser) {
      alert("User with this email already exists!");
      return;
    }

    // Create new user object
    const newUser = {
      name: registerData.name,
      email: registerData.email,
      password: registerData.password,
      expenses: [],       // Initialize empty expenses
      monthlyTotal: {},   // Initialize monthly totals
    };

    // Save to localStorage
    users.push(newUser);
    localStorage.setItem("Users", JSON.stringify(users));
    localStorage.setItem("CurrentUser", JSON.stringify(newUser));

    // Update Redux store
    dispatch(setCurrentUser(newUser));

    alert("Account created and logged in successfully!");
    handleClose();
    navigate("/dashboard"); // Navigate to dashboard after registration
  };

  return (
  <>
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Register</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          {/* Name field */}
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              value={registerData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              isInvalid={Boolean(errors.name)}
            />
            <Form.Control.Feedback type="invalid">
              {errors.name}
            </Form.Control.Feedback>
          </Form.Group>

          {/* Email field */}
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              value={registerData.email}
              onChange={(e) => handleChange("email", e.target.value)}
              isInvalid={Boolean(errors.email)}
            />
            <Form.Control.Feedback type="invalid">
              {errors.email}
            </Form.Control.Feedback>
          </Form.Group>

          {/* Password field */}
          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={registerData.password}
              onChange={(e) => handleChange("password", e.target.value)}
              isInvalid={Boolean(errors.password)}
            />
            <Form.Control.Feedback type="invalid">
              {errors.password}
            </Form.Control.Feedback>
          </Form.Group>

          {/* Confirm Password field */}
          <Form.Group className="mb-3">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              value={registerData.confirmPassword}
              onChange={(e) => handleChange("confirmPassword", e.target.value)}
              isInvalid={Boolean(errors.confirmPassword)}
            />
            <Form.Control.Feedback type="invalid">
              {errors.confirmPassword}
            </Form.Control.Feedback>
          </Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleRegister}>
          Register
        </Button>
      </Modal.Footer>
    </Modal>
  </>
  );
};

