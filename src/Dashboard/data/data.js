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

export const datas = [
    {
        id: 1,
        type: "income",
        description: "Salary",
        amount: 1500.0,
        date: "2024-07-03",
        category: "Job"
    },
    {
        id: 2,
        type: "expense",
        description: "Groceries",
        amount: 200.0,
        date: "2024-07-03",
        category: "Food"
    },
    {
        id: 3,
        type: "income",
        description: "Freelance Project",
        amount: 1200.0,
        date: "2024-07-04",
        category: "Freelance"
    },
    {
        id: 4,
        type: "expense",
        description: "Electricity Bill",
        amount: 150.0,
        date: "2024-07-05",
        category: "Utilities"
    },
    {
        id: 5,
        type: "expense",
        description: "Internet Subscription",
        amount: 100.0,
        date: "2024-07-06",
        category: "Utilities"
    },
    {
        id: 6,
        type: "income",
        description: "Investment Dividends",
        amount: 300.0,
        date: "2024-07-07",
        category: "Investments"
    },
    {
        id: 7,
        type: "expense",
        description: "Dinner at Restaurant",
        amount: 100.0,
        date: "2024-07-08",
        category: "Food"
    },
    {
        id: 8,
        type: "expense",
        description: "Gym Membership",
        amount: 75.0,
        date: "2024-07-09",
        category: "Health"
    },
    {
        id: 9,
        type: "income",
        description: "Gift from Family",
        amount: 250.0,
        date: "2024-07-10",
        category: "Gifts"
    },
    {
        id: 10,
        type: "expense",
        description: "Movie Tickets",
        amount: 50.0,
        date: "2024-07-11",
        category: "Entertainment"
    },
    {
        id: 11,
        type: "expense",
        description: "Monthly Subscription",
        amount: 25.0,
        date: "2024-07-12",
        category: "Entertainment"
    },
    {
        id: 12,
        type: "income",
        description: "Stock Sale",
        amount: 600.0,
        date: "2024-07-13",
        category: "Investments"
    },
    {
        id: 13,
        type: "expense",
        description: "Clothing",
        amount: 150.0,
        date: "2024-07-14",
        category: "Shopping"
    },
    {
        id: 14,
        type: "expense",
        description: "Coffee",
        amount: 15.0,
        date: "2024-07-15",
        category: "Food"
    },
    {
        id: 15,
        type: "income",
        description: "Bonus",
        amount: 800.0,
        date: "2024-07-16",
        category: "Job"
    },
    {
        id: 16,
        type: "expense",
        description: "Books",
        amount: 50.0,
        date: "2024-07-17",
        category: "Education"
    },
    {
        id: 17,
        type: "expense",
        description: "Gasoline",
        amount: 80.0,
        date: "2024-07-18",
        category: "Transportation"
    },
    {
        id: 18,
        type: "income",
        description: "Consulting Fee",
        amount: 900.0,
        date: "2024-07-19",
        category: "Freelance"
    },
    {
        id: 19,
        type: "expense",
        description: "Office Supplies",
        amount: 30.0,
        date: "2024-07-20",
        category: "Office"
    },
    {
        id: 20,
        type: "income",
        description: "Refund",
        amount: 100.0,
        date: "2024-07-21",
        category: "Miscellaneous"
    },
    {
        id: 21,
        type: "expense",
        description: "Parking",
        amount: 15.0,
        date: "2024-07-22",
        category: "Transportation"
    },
    {
        id: 22,
        type: "expense",
        description: "Pet Supplies",
        amount: 40.0,
        date: "2024-07-23",
        category: "Miscellaneous"
    },
    {
        id: 23,
        type: "income",
        description: "Rental Income",
        amount: 500.0,
        date: "2024-07-24",
        category: "Investments"
    },
    {
        id: 24,
        type: "expense",
        description: "Car Repair",
        amount: 200.0,
        date: "2024-07-25",
        category: "Transportation"
    },
    {
        id: 25,
        type: "income",
        description: "Side Business",
        amount: 450.0,
        date: "2024-07-26",
        category: "Freelance"
    },
    {
        id: 26,
        type: "expense",
        description: "Medical Expenses",
        amount: 100.0,
        date: "2024-07-27",
        category: "Health"
    },
    {
        id: 27,
        type: "income",
        description: "Interest Earned",
        amount: 50.0,
        date: "2024-07-28",
        category: "Investments"
    },
    {
        id: 28,
        type: "expense",
        description: "Travel",
        amount: 300.0,
        date: "2024-07-29",
        category: "Entertainment"
    },
    {
        id: 29,
        type: "expense",
        description: "Dining Out",
        amount: 60.0,
        date: "2024-07-30",
        category: "Food"
    },
    {
        id: 30,
        type: "income",
        description: "Lottery Winnings",
        amount: 200.0,
        date: "2024-07-31",
        category: "Miscellaneous"
    },
    {
        id: 31,
        type: "expense",
        description: "New Phone",
        amount: 800.0,
        date: "2024-08-01",
        category: "Shopping"
    },
    {
        id: 32,
        type: "expense",
        description: "Haircut",
        amount: 25.0,
        date: "2024-08-02",
        category: "Miscellaneous"
    }
];

export const budgets = [
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
];
export const savingsGoals = [
    {
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
    }
];

export const incomeCategories = [
    "Select",
    "Job",
    "Freelance",
    "Investments",
    "Gifts",
    "Business",
    "Refunds",
    "Bonuses",
    "Other"
];

export const expenseCategories = [
    "Select",
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

export const expenseTypes = ["Select","Income", "Expense"];


export const loginDatas = [
    { email: "johndoe@example.com", password: "password123" },
    { email: "bbnl6060@gmail.com", password: "060620" },
    { email: "mike123@example.com", password: "mikePass789" },
    { email: "sarah_t@example.com", password: "sarahT@2024" },
    { email: "emmaW@example.com", password: "emmaW!456" },
    { email: "user007@example.com", password: "agent007secure" },
    { email: "peter_p@example.com", password: "peter2024P" },
    { email: "lucy99@example.com", password: "lucy#99" },
    { email: "alexC@example.com", password: "alexC!2024" },
    { email: "lauraB@example.com", password: "lauraB123" }
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
