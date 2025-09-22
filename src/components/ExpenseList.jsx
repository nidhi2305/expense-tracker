import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Table, Form, Row, Col } from "react-bootstrap";

/**
 * ExpenseList component
 * Displays the list of expenses with category and date filters
 * @returns {JSX.Element} Table of expenses with filters
 */
export const ExpenseList = () => {
  const currentUser = useSelector((state) => state.user.currentUser); // Get current user from Redux

  const [categoryFilter, setCategoryFilter] = useState("all"); // Track selected category filter
  const [dateFilter, setDateFilter] = useState(""); // Track selected date filter

  const expenses = currentUser?.expenses || []; // Get expenses or empty array

  // Show message if no expenses added
  if (expenses.length === 0)
    return (
    <>
      <Row className="justify-content-center align-items-center vh-50 m-5">
        <Col
          xs={12}
          md={6}
          lg={6}
          className="text-center p-4 border rounded shadow-sm bg-light"
        >
          <h5 className="fw-bold text-secondary">No expenses added yet.</h5>
          <p className="text-muted">Click on Add Expense button to add expenses.</p>
        </Col>
      </Row>
    </>
    );

  // List of categories including "All" for filter dropdown
  const categories = [
    "All",
    "Food",
    "Bills",
    "Shopping",
    "Entertainment",
    "Health",
    "Travel",
    "Other",
  ];

  // Apply filters to expenses
  const filteredExpenses = expenses.filter((e) => {
    const categoryMatch =
      categoryFilter === "all" || e.category.toLowerCase() === categoryFilter;

    const dateMatch = dateFilter
      ? new Date(e.date).toISOString().slice(0, 10) === dateFilter
      : true;

    return categoryMatch && dateMatch; // Return expenses matching both filters
  });

  return (
    <>
      <Table striped bordered hover>
        <thead style={{ backgroundColor: "#001f54", color: "#fff" }}>
          <tr>
            {/* Category Column with filter dropdown */}
            <th>
              <div className="d-flex justify-content-between align-items-center">
                <span>Category</span>
                <Form.Select
                  size="sm"
                  style={{ width: "120px" }}
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat.toLowerCase()}>
                      {cat}
                    </option>
                  ))}
                </Form.Select>
              </div>
            </th>

            {/* Amount Column */}
            <th>Amount</th>

            {/* Date Column with date filter */}
            <th>
              <div className="d-flex justify-content-between align-items-center">
                <span>Date</span>
                <Form.Control
                  type="date"
                  size="sm"
                  style={{ width: "150px" }}
                  value={dateFilter}
                  onChange={(e) => setDateFilter(e.target.value)}
                />
              </div>
            </th>
          </tr>
        </thead>

        <tbody>
          {filteredExpenses.map((exp, idx) => (
            <tr key={idx}>
              <td>{exp.category}</td>
              <td>₹ {exp.amount}</td>
              <td>{exp.date}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};
