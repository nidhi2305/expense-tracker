import React, { useState, useMemo } from "react";
import { useSelector } from "react-redux";
import { Container, Card, Row, Col, ButtonGroup, Button, Table } from "react-bootstrap";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

/**
 * Statistics component
 * Displays expense statistics for the current user
 * Includes filter options, table summary, and a doughnut chart
 * @returns {JSX.Element|null} Statistics page JSX or null if no user
 */
export const Statistics = () => {
  // Get current logged-in user from Redux
  const currentUser = useSelector((state) => state.user.currentUser);

  // Filter state: determines which time range to show
  const [filter, setFilter] = useState("all"); // options: all, weekly, monthly, quarterly, yearly

  // If no user is logged in, don't render anything
  if (!currentUser) return null;

  const expenses = currentUser.expenses || [];

  /**
   * Filter expenses based on selected period
   * useMemo for performance optimization: recalculates only when expenses or filter changes
   */
  const filteredExpenses = useMemo(() => {
    const now = new Date();
    return expenses.filter((exp) => {
      const expDate = new Date(exp.date);

      switch (filter) {
        case "weekly":
          // Calculate start of week (Sunday)
          const startOfWeek = new Date(now);
          startOfWeek.setDate(now.getDate() - now.getDay());
          return expDate >= startOfWeek && expDate <= now;

        case "monthly":
          return expDate.getMonth() === now.getMonth() && expDate.getFullYear() === now.getFullYear();

        case "quarterly":
          const quarter = Math.floor(now.getMonth() / 3); // current quarter
          return Math.floor(expDate.getMonth() / 3) === quarter && expDate.getFullYear() === now.getFullYear();

        case "yearly":
          return expDate.getFullYear() === now.getFullYear();

        default:
          return true; // "all" filter
      }
    });
  }, [expenses, filter]);

  // Categories of expenses
  const categories = ["Food", "Bills", "Shopping", "Entertainment", "Health", "Travel", "Other"];

  /**
   * Calculate total expense amount for each category
   * Maps each category to its total amount in filtered expenses
   */
  const totalByCategory = categories.map(
    (cat) =>
      filteredExpenses
        .filter((e) => e.category.toLowerCase() === cat.toLowerCase())
        .reduce((sum, e) => sum + e.amount, 0)
  );

  // Chart.js data structure for doughnut chart
  const chartData = {
    labels: categories,
    datasets: [
      {
        label: "Expenses by Category",
        data: totalByCategory,
        backgroundColor: [
          "#001f54",
          "#003366",
          "#00509e",
          "#0077b6",
          "#0096c7",
          "#00b4d8",
          "#48cae4",
        ],
      },
    ],
  };

  return (
  <>
    <Container className="py-4" style={{ marginTop: "80px" }} fluid>
      <h3 className="mb-3" style={{ color: "#001f54" }}>Expense Statistics</h3>

      {/* Filter Buttons */}
      <ButtonGroup className="mb-4">
        {["all", "weekly", "monthly", "quarterly", "yearly"].map((f) => (
          <Button
            key={f}
            onClick={() => setFilter(f)}
            style={{
              backgroundColor: filter === f ? "#001f54" : "#fff",
              color: filter === f ? "#fff" : "#001f54",
              border: "1px solid #001f54",
            }}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </Button>
        ))}
      </ButtonGroup>

      <Row>
        {/* Table displaying total per category */}
        <Col xs={12} md={6} lg={8}>
          <Card className="p-3 mb-3">
            <h5 style={{ color: "#001f54" }}>Total Expenses by Category</h5>
            <Table striped bordered hover>
              <thead style={{ backgroundColor: "#001f54", color: "#fff" }}>
                <tr>
                  <th>Category</th>
                  <th>Amount (₹)</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((category, index) => (
                  <tr key={category}>
                    <td>{category}</td>
                    <td>{totalByCategory[index]}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card>
        </Col>
      </Row>

      {/* Doughnut Chart */}
      <Row>
        <Col xs={12} md={6} lg={8}>
          <Card className="p-3 mb-3 d-flex justify-content-center align-items-center">
            <h5 className="mb-3" style={{ color: "#001f54" }}>Expenses Distribution</h5>
            <div style={{ width: "250px", height: "450px" }}>
              <Doughnut data={chartData} options={{ responsive: true, maintainAspectRatio: false }} />
            </div>
          </Card>
        </Col>
      </Row>
    </Container>
  </>
  );
};
