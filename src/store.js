import { configureStore } from "@reduxjs/toolkit";
import budgetsReducer from "./pages/Dashboard/features/budgets/budgetSlices";
import savingsReducer from "./pages/Dashboard/features/savings/savingsSlices";

export const store = configureStore({
    reducer: {
        budgets: budgetsReducer,
        savings: savingsReducer
    }
});
