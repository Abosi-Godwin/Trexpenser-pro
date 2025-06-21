import { createSlice } from "@reduxjs/toolkit";

const savingsSlices = createSlice({
    name: "saving",
    initialState: [  {
        id: 1,
        name: "Emergency Fund",
        targetAmount: 3000.0,
        currentAmount: 500.0,
        savingsType: "manual",
        startDate: "2024-08-01",
        endDate: "2025-08-01"
    },
    {
        id: 2,
        name: "Vacation Fund",
        targetAmount: 2000.0,
        currentAmount: 300.0,
        savingsType: "automatic",
        frequency: "monthly",
        percentage: 5,
        startDate: "2024-08-05",
        endDate: "2024-12-01"
    },
    {
        id: 3,
        name: "Car Down Payment",
        targetAmount: 5000.0,
        currentAmount: 1000.0,
        savingsType: "manual",
        startDate: "2024-08-10",
        endDate: "2025-05-01"
    },
    {
        id: 4,
        name: "Home Renovation",
        targetAmount: 10000.0,
        currentAmount: 5500.0,
        savingsType: "automatic",
        frequency: "bi-weekly",
        percentage: 10,
        startDate: "2024-08-15",
        endDate: "2025-12-01"
    }],
    reducers: {
        savingsAdded(state, action) {
            state.push({});
        }
    }
});

export const { savingsAdded } = savingsSlices.actions;
export default savingsSlices.reducer;
