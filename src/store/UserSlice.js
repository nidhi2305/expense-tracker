import { createSlice } from "@reduxjs/toolkit";

/**
 * Initial state for the user slice
 * Loads currentUser from localStorage if available
 */
const initialState = {
  currentUser: JSON.parse(localStorage.getItem("CurrentUser")) || null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    /**
     * Set current user manually
     * @param {object} state - current Redux state
     * @param {object} action - Redux action containing payload: user object
     */
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
      localStorage.setItem("CurrentUser", JSON.stringify(state.currentUser));
    },

    /**
     * Register a new user
     * @param {object} state - current Redux state
     * @param {object} action - Redux action containing payload: {name, email, password}
     */
    register: (state, action) => {
      const users = JSON.parse(localStorage.getItem("Users")) || [];

      // Check if user already exists
      const existingUser = users.find(u => u.email === action.payload.email);
      if (existingUser) {
        alert("User with this email already exists!");
        return;
      }

      // Create new user object with default expenses and monthlyTotal
      const newUser = { ...action.payload, expenses: [], monthlyTotal: {} };
      users.push(newUser);

      // Save updated users to localStorage
      localStorage.setItem("Users", JSON.stringify(users));
      localStorage.setItem("CurrentUser", JSON.stringify(newUser));

      // Set the new user as current user
      state.currentUser = newUser;
    },

    /**
     * Login user
     * @param {object} state - current Redux state
     * @param {object} action - Redux action containing payload: {email, password}
     */
    login: (state, action) => {
      const users = JSON.parse(localStorage.getItem("Users")) || [];

      // Find matching user
      const existingUser = users.find(
        (u) => u.email === action.payload.email && u.password === action.payload.password
      );
      if (!existingUser) {
        alert("User not found or incorrect credentials!");
        return;
      }

      state.currentUser = existingUser;
      localStorage.setItem("CurrentUser", JSON.stringify(existingUser));
    },

    /**
     * Logout user
     * Clears currentUser from state and localStorage
     * @param {object} state - current Redux state
     */
    logout: (state) => {
      state.currentUser = null;
      localStorage.removeItem("CurrentUser");
    },

    /**
     * Add a new expense to current user
     * @param {object} state - current Redux state
     * @param {object} action - Redux action containing payload: {amount, category, date}
     */
    addExpense: (state, action) => {
      // Initialize expenses array if undefined
      if (!state.currentUser.expenses) state.currentUser.expenses = [];

      // Add new expense
      state.currentUser.expenses.push(action.payload);

      // Update monthly total for reporting
      const month = new Date(action.payload.date).getMonth();
      if (!state.currentUser.monthlyTotal) state.currentUser.monthlyTotal = {};
      state.currentUser.monthlyTotal[month] =
        (state.currentUser.monthlyTotal[month] || 0) + action.payload.amount;

      // Update currentUser in localStorage
      localStorage.setItem("CurrentUser", JSON.stringify(state.currentUser));

      // Update the corresponding user in Users array in localStorage
      const users = JSON.parse(localStorage.getItem("Users")) || [];
      const index = users.findIndex(u => u.email === state.currentUser.email);
      if (index !== -1) {
        users[index] = state.currentUser;
        localStorage.setItem("Users", JSON.stringify(users));
      }
    },
  },
});

// Export actions
export const { setCurrentUser, register, login, logout, addExpense } = userSlice.actions;
export default userSlice.reducer;
