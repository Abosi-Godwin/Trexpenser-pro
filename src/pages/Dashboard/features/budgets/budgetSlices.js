import { createSlice } from "@reduxjs/toolkit";

const budgetsSlice = createSlice({
    name: "budgets",
    initialState: [
        {
            category: "Shopping",
            amount: 1000,
            startDate: "2024-07-25",
            endDate: "2024-08-05",
            Id: 1
        },
        {
            category: "Entertainment",
            amount: 500,
            startDate: "2024-07-01",
            endDate: "2024-08-15",
            Id: 0
        }
    ],
    reducers: {
        budgetAdded(state, action) {
            state.push({
                id: action.payload.id,
                text: action.payload.text,
                completed: false
            });
        }
    }
});

export const { budgetAdded } = budgetsSlice.actions;
export default budgetsSlice.reducer;
