import './App.css';
import { Header } from './components/Header';
import { Intro } from './pages/Intro';
import { Dashboard } from './pages/Dashboard';
import { Statistics } from './pages/statistics';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from 'react-redux';

/**
 * Main App component
 * Handles routing and protected routes based on user login state
 * @returns {JSX.Element} The App component with Header and page routes
 */
function App() {
  // Get current logged-in user from Redux store
  const currentUser = useSelector((state) => state.user.currentUser);

  return (
    <>
      <Router>
        {/* Navbar/Header visible on all pages */}
        <Header />

        {/* Route definitions */}
        <Routes>
          {/* Public route: Intro page */}
          <Route path="/" element={<Intro />} />

          {/* Protected routes: only accessible if user is logged in */}
          <Route
            path="/dashboard"
            element={
              currentUser ? (
                <Dashboard />
              ) : (
                <Navigate to="/" /> // Redirect to Intro if not logged in
              )
            }
          />
          <Route
            path="/statistics"
            element={
              currentUser ? (
                <Statistics />
              ) : (
                <Navigate to="/" /> // Redirect to Intro if not logged in
              )
            }
          />

          {/* Logout route: simply navigate back to Intro page */}
          <Route
            path="/logout"
            element={<Intro />}
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
