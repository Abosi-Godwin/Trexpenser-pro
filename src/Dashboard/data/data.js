import {
    FaChartPie,
    FaPiggyBank,
    FaCoins,
    FaHouse,
    FaMoneyBillTransfer,
    FaUserGear,
    FaChartLine,
    FaCalendarCheck,
    FaPersonCircleCheck,
    FaDollarSign,
    FaMoneyCheckDollar,
    FaSackDollar,
    FaChartBar,
    FaUserShield,
    FaChartSimple,
    FaAccessibleIcon
} from "react-icons/fa6";

export const savingsGoals = [];

export const incomeCategories = [
    { label: "Select", value: "select" },
    { label: "Job", value: "job" },
    { label: "Freelance", value: "freelance" },
    { label: "Investments", value: "investments" },
    { label: "Gifts", value: "gifts" },
    { label: "Business", value: "business" },
    { label: "Refunds", value: "refunds" },
    { label: "Bonuses", value: "bonuses" },
    { label: "Other", value: "other" }
];

export const expenseCategories = [
    { label: "Select", value: "select" },
    { label: "Food", value: "food" },
    { label: "Housing", value: "housing" },
    { label: "Utilities", value: "utilities" },
    { label: "Transportation", value: "transportation" },
    { label: "Health", value: "health" },
    { label: "Entertainment", value: "entertainment" },
    { label: "Shopping", value: "shopping" },
    { label: "Education", value: "education" },
    { label: "Insurance", value: "insurance" },
    { label: "Savings", value: "savings" },
    { label: "Debt Payments", value: "debt-payments" },
    { label: "Travel", value: "travel" },
    { label: "Office Supplies", value: "office-supplies" },
    { label: "Miscellaneous", value: "miscellaneous" }
];
export const expenseTypes = [
    { label: "Select", value: "select" },
    { label: "Income", value: "income" },
    { label: "Expense", value: "expense" }
];
export const sideBarItems = [
    { icon: FaHouse, text: "Home", dest: "/dashboard" },
    {
        icon: FaMoneyBillTransfer,
        text: "Transa..",
        dest: "/dashboard/transactions"
    },
    { icon: FaPiggyBank, text: "Savings", dest: "/dashboard/savings" },
    { icon: FaChartPie, text: "Budgets", dest: "/dashboard/budgets" },
    { icon: FaChartSimple, text: "Summary", dest: "/dashboard/summary" },
    { icon: FaUserGear, text: "Settings", dest: "/dashboard/Profile" }
];

export const transactionSortOptions = [
    { label: "Default (Newest)", value: "date_desc" },
    { label: "Date (Oldest first)", value: "date_asc" },
    { label: "Amount (Highest first)", value: "amount_desc" },
    { label: "Amount (Lowest first)", value: "amount_asc" },
    { label: "Category (A → Z)", value: "category_asc" },
    { label: "Category (Z → A)", value: "category_desc" },
    { label: "Type (Income first)", value: "type_income_first" },
    { label: "Type (Expense first)", value: "type_expense_first" }
];
export const transactionFilterOptions = [
    { label: "All", value: "all" },
    { label: "Income", value: "income" },
    { label: "Expense", value: "expense" }
];
