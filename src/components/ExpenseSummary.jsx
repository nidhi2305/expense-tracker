import React from "react";
import { useSelector } from "react-redux";
import { Card, Row, Col } from "react-bootstrap";

/**
 * ExpenseSummary component
 * Shows total expenses and current month expenses for the logged-in user
 * @returns {JSX.Element} Expense summary cards
 */
export const ExpenseSummary = () => {
  const currentUser = useSelector((state) => state.user.currentUser); // Get current user from Redux
  if (!currentUser) return null; // If no user logged in, return nothing

  const expenses = currentUser?.expenses || []; // Get all expenses or empty array
  const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0); // Sum of all expenses

  // Get current month index (0 = January, 11 = December)
  const currentMonthIndex = new Date().getMonth();

  // Map month index to month name
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const currentMonthName = monthNames[currentMonthIndex]; // Get current month name
  const currentMonthExpense = currentUser.monthlyTotal?.[currentMonthIndex] || 0; // Expense in current month

  return (
  <>
    <Row className="mb-4 g-3">
      {/* Total Expenses Card */}
      <Col sm={12} md={4}>
        <Card className="p-3" style={{ backgroundColor: "#001f54", color: "#fff" }}>
          <h5>Total Expenses</h5>
          <p>₹ {totalExpenses}</p>
        </Card>
      </Col>

      {/* Current Month Expenses Card */}
      <Col sm={12} md={6}>
        <Card className="p-3" style={{ backgroundColor: "#001f54", color: "#fff" }}>
          <h5>Current Month Expenses</h5>
          <p>{currentMonthName}: ₹ {currentMonthExpense}</p>
        </Card>
      </Col>
    </Row>
  </>
  );
};
