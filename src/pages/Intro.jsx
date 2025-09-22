import React, { useState } from "react";
import { Container, Button } from "react-bootstrap";
import { LoginModal } from "../components/LogInModal";
import { RegisterModal } from "../components/RegisterModal";

/**
 * Intro Component
 * Landing page of the ExpenseTracker app
 * Provides buttons for Login and Create Account
 * @returns {JSX.Element} Intro page JSX
 */
export const Intro = () => {
  // State to control visibility of Login modal
  const [showLogin, setShowLogin] = useState(false);

  // State to control visibility of Register modal
  const [showRegister, setShowRegister] = useState(false);

  return (
  <>
    <div
      className="intro-section"
      style={{
        backgroundColor: '#f5f6fa',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center'
      }}
    >
      <Container className="text-center py-5">
        {/* Main Heading */}
        <h1 style={{ fontWeight: 'bold', fontSize: '3.2rem', color: '#001f54' }}>
          Welcome to <span style={{ color: '#ff6b6b' }}>ExpenseTracker</span>
        </h1>

        {/* Subtitle */}
        <p style={{ fontSize: '1.25rem', color: '#333' }}>
          Take control of your spending and make every rupee count!
        </p>

        {/* Description */}
        <p
          className="intro-desc"
          style={{ fontSize: "1rem", color: "#555", maxWidth: "700px", margin: "0 auto" }}
        >
          With <strong>ExpenseTracker</strong>, quickly add and categorize your expenses, track total spending per category, 
          and analyze your habits over time. Filter by <strong>week</strong>, <strong>month</strong>, <strong>quarter</strong>, or <strong>year</strong>, 
          and visualize your spending with clear charts and statistics.
        </p>

        {/* Call-to-action buttons */}
        <div className="cta-buttons mt-4">
          {/* Open Login Modal */}
          <Button
            variant="primary"
            className="me-2 px-4 py-2"
            onClick={() => setShowLogin(true)}
          >
            Login
          </Button>

          {/* Open Register Modal */}
          <Button
            variant="outline-primary"
            className="px-4 py-2"
            onClick={() => setShowRegister(true)}
          >
            Create Account
          </Button>
        </div>
      </Container>

      {/* Login Modal Component */}
      <LoginModal show={showLogin} handleClose={() => setShowLogin(false)} />

      {/* Register Modal Component */}
      <RegisterModal show={showRegister} handleClose={() => setShowRegister(false)} />
    </div>
  </>
  );
};
