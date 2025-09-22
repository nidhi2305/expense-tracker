import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { login } from "../store/UserSlice";
import { useNavigate } from "react-router-dom";

/**
 * LoginModal component
 * Shows a modal to login a user
 *
 * @param {boolean} show - whether modal is visible
 * @param {function} handleClose - function to close modal
 * @returns {JSX.Element} Login modal JSX
 */
export const LoginModal = ({ show, handleClose }) => {
  // Local state to hold form input values
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  /** 
   * Handle login action
   * Checks credentials in localStorage, updates Redux & localStorage if valid
   */
  const handleLogin = () => {
    const users = JSON.parse(localStorage.getItem("Users")) || [];

    // Find user with matching email and password
    const existingUser = users.find(
      (u) => u.email === loginData.email && u.password === loginData.password
    );

    if (existingUser) {
      dispatch(login({ email: loginData.email, password: loginData.password })); // correct payload
      alert("Login successful!");
      handleClose();                // close modal
      navigate("/dashboard");       // redirect to dashboard
    } else {
      alert("Invalid email or password!");
    }
  };

  return (
  <>
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Login</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              value={loginData.email}
              onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={loginData.password}
              onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
            />
          </Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>Cancel</Button>
        <Button variant="primary" onClick={handleLogin}>Login</Button>
      </Modal.Footer>
    </Modal>
  </>
  );
};

