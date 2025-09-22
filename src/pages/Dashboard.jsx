import React, { useState } from "react";
import { Container, Button } from "react-bootstrap";
import { ExpenseForm } from "../components/ExpenseForm";
import { ExpenseList } from "../components/ExpenseList";
import { ExpenseSummary } from "../components/ExpenseSummary";

/**
 * Dashboard Component
 * Displays user's expense summary, list of expenses, and form to add new expenses
 * @returns {JSX.Element} Dashboard page JSX
 */
export const Dashboard = () => {
  // State to toggle visibility of the ExpenseForm modal
  const [showForm, setShowForm] = useState(false);

  return (
  <>
    <Container className="main-container py-4" fluid>
      {/* Display user's summary of expenses */}
      <ExpenseSummary />

      {/* Button to toggle the ExpenseForm */}
      <Button
        variant="primary"
        className="mb-3"
        onClick={() => setShowForm(!showForm)} // Toggle showForm state
        style={{ backgroundColor: "#001f54", border: "none" }}
      >
        {showForm ? "Close Form" : "Add Expense"} {/* Button text can be dynamic if needed */}
      </Button>

      {/* Show ExpenseForm component only if showForm is true */}
      {showForm && <ExpenseForm onClose={() => setShowForm(false)} />}

      {/* Display the list of user's expenses */}
      <ExpenseList />
    </Container>
  </>
  );
};
