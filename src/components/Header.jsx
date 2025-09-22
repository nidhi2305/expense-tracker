import React, { useState } from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/UserSlice";

/**
 * Header component
 * Displays navigation links based on user login status
 * @returns {JSX.Element} Navbar JSX
 */
export const Header = () => {
  const currentUser = useSelector((state) => state.user.currentUser); // Get current user from Redux
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Track Navbar collapse state for mobile/hamburger menu
  const [expanded, setExpanded] = useState(false);

  /**
   * Handle user logout
   * Clears current user from Redux & navigates to Intro page
   */
  const handleLogout = () => {
    dispatch(logout());       // remove current user from Redux and localStorage
    navigate("/");            // navigate to Intro page
    setExpanded(false);       // close hamburger menu if open
  };

  /**
   * Handle navigation click
   * Navigates to a route and closes menu
   * @param {string} path - Path to navigate
   */
  const handleNavClick = (path) => {
    navigate(path);
    setExpanded(false);       // close menu after navigation
  };

  return (
  <>
    <Navbar expanded={expanded} fixed="top" expand="lg" style={{ backgroundColor: '#dbdbe7ff' }}>
      <Container>
        {/* Brand Name */}
        <Navbar.Brand style={{ color: '#001f54', fontSize: '2rem', fontWeight: 'bold' }}>
          ExpenseTracker
        </Navbar.Brand>

        {/* Hamburger toggle button for mobile */}
        <Navbar.Toggle 
          aria-controls="basic-navbar-nav"
          onClick={() => setExpanded(!expanded)} // toggle open/close
        />

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {currentUser && (
              <>
                {/* Dashboard link */}
                <Nav.Link 
                  className="mx-3 nav-link-custom" 
                  style={{fontSize:'18px'}}
                  onClick={() => handleNavClick("/dashboard")}
                >
                  Dashboard
                </Nav.Link>

                {/* Statistics link */}
                <Nav.Link 
                  className="mx-3 nav-link-custom" 
                  style={{fontSize:'18px',color:'#001f54'}}
                  onClick={() => handleNavClick("/statistics")}
                >
                  Statistics
                </Nav.Link>

                {/* Logout link */}
                <Nav.Link 
                  className="mx-3 nav-link-custom" 
                  style={{fontSize:'18px'}}
                  onClick={handleLogout}
                >
                  Logout
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  </>
  );
};
