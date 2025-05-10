import { faker } from "@faker-js/faker";
import { supabase } from "./Supabase.js"; // Adjust path if necessary

// Define transaction categories
const incomeCategories = [
    "Job",
    "Freelance",
    "Investments",
    "Gifts",
    "Business",
    "Refunds",
    "Bonuses",
    "Other"
];
const expenseCategories = [
    "Food",
    "Housing",
    "Utilities",
    "Transportation",
    "Health",
    "Entertainment",
    "Shopping",
    "Education",
    "Insurance",
    "Savings",
    "Debt Payments",
    "Travel",
    "Office Supplies",
    "Miscellaneous"
];

const generateFakeTransactions = async (userId, count = 93) => {
    if (!userId) {
        console.error("No user ID provided!");
        return;
    }

    let transactions = [];
    let currentDate = new Date(); // Start with today

    for (let i = 0; i < count; i++) {
        const isIncome = faker.datatype.boolean();
        const type = isIncome ? "income" : "expense";
        const category = isIncome
            ? faker.helpers.arrayElement(incomeCategories)
            : faker.helpers.arrayElement(expenseCategories);
        const amount = isIncome
            ? faker.finance.amount(500, 5000, 2)
            : faker.finance.amount(10, 500, 2);

        // Ensure dates are sequential
        currentDate.setDate(
            currentDate.getDate() - faker.number.int({ min: 1, max: 5 })
        );

        transactions.push({
            user_id : 21,
            type,
            category,
            amount: parseFloat(amount),
            date: currentDate.toISOString(),
            description: `${category} payment`
        });
    }

    // Insert transactions into Supabase
    const { error } = await supabase.from("transactions").insert(transactions);

    if (error) {
        console.error("Error inserting transactions:", error);
    } else {
        console.log("✅ Fake transactions added successfully");
    }
};
 
//generateFakeTransactions("5a2fd116-e03d-4de4-b9aa-0c9edd4b9d0a", 93);
