import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addExpense } from "../store/UserSlice";
import { Form, Button, Card, Row, Col } from "react-bootstrap";

/**
 * ExpenseForm component
 * Form for adding a new expense with amount, category, and date
 * 
 * @param {function} onClose - Callback to close the form after submission
 * @returns {JSX.Element} Expense form JSX
 */
export const ExpenseForm = ({ onClose }) => {
  const [expense, setExpense] = useState({
    amount: "",
    category: "Food",
    date: "",
  }); // Track form fields

  const dispatch = useDispatch(); // Redux dispatch to update store

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation: all fields required
    if (!expense.amount || !expense.date) {
      alert("Please fill all fields!");
      return;
    }

    // Validation: date cannot be in the future
    const today = new Date().toISOString().split("T")[0]; // format YYYY-MM-DD
    if (expense.date > today) {
      alert("Date cannot be in the future!");
      return;
    }

    // Dispatch addExpense action to Redux store
    dispatch(addExpense({ ...expense, amount: Number(expense.amount) }));

    // Reset form fields
    setExpense({ amount: "", category: "Food", date: "" });

    // Close form after submission
    onClose();
  };

  return (
  <>
    <Row>
      <Col xs={12} md={6} lg={8}>
        <Card className="p-3 mb-4" style={{ backgroundColor: "#001f54", color: "#fff" }}>
          <h5>Add Expense</h5>
          <Form onSubmit={handleSubmit}>
            {/* Amount input */}
            <Form.Group className="mb-2">
              <Form.Label>Amount</Form.Label>
              <Form.Control
                type="number"
                value={expense.amount}
                onChange={(e) => setExpense({ ...expense, amount: e.target.value })}
              />
            </Form.Group>

            {/* Category select */}
            <Form.Group className="mb-2">
              <Form.Label>Category</Form.Label>
              <Form.Select
                value={expense.category}
                onChange={(e) => setExpense({ ...expense, category: e.target.value })}
              >
                <option value="Food">Food</option>
                <option value="Bills">Bills</option>
                <option value="Shopping">Shopping</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Health">Health</option>
                <option value="Travel">Travel</option>
                <option value="Other">Other</option>
              </Form.Select>
            </Form.Group>

            {/* Date input */}
            <Form.Group className="mb-2">
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                value={expense.date}
                onChange={(e) => setExpense({ ...expense, date: e.target.value })}
              />
            </Form.Group>

            {/* Submit button */}
            <Button type="submit" variant="light">
              Add Expense
            </Button>
          </Form>
        </Card>
      </Col>
    </Row>
  </>
  );
};
