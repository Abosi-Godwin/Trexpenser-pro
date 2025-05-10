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

export const expenseTypes = ["income", "expense"];

export const features = [
    {
        id: 1,
        title: "Smart Expense Management",
        description:
            "Keep track of every penny. Categorize your spending, monitor trends, and never overspend again with real-time expense tracking.",
        icon: FaChartPie
    },
    {
        id: 2,
        title: "Achieve Your Savings Goals",
        description:
            "Set specific savings goals, whether it’s for a vacation, emergency fund, or new gadget. Track your progress and stay motivated.",
        icon: FaPiggyBank
    },

    {
        id: 3,
        title: "Save Without Thinking",
        description:
            "Automate your savings by setting a percentage to deduct from your income. Focus on your goals while we handle the rest.",
        icon: FaCoins
    },
    {
        id: 4,
        title: "Data-Driven Decisions",
        description:
            "Get clear insights into your finances with visual charts and analytics. Understand where your money is going and make informed decisions.",
        icon: FaChartLine
    },
    {
        id: 5,
        title: "Plan for Tomorrow",
        description:
            "Create budgets for specific timeframes or categories. Stay in control and avoid overspending with ease.",
        icon: FaCalendarCheck
    },
    {
        id: 6,
        title: "Seamless User Experience",
        description:
            "Enjoy a smooth and intuitive interface designed to make managing your finances effortless and enjoyable.",
        icon: FaPersonCircleCheck
    }
];

export const benefits = [
    {
        id: 1,
        title: "Simplified Financial Management",
        description:
            "Trexpenser takes the hassle out of managing your finances, providing an all-in-one platform to track, save, and grow your wealth.",
        icon: FaDollarSign
    },
    {
        id: 2,
        title: "Personalized Budgeting",
        description:
            "Create tailored budgets based on your lifestyle and spending habits, ensuring you stay on track with ease.",
        icon: FaMoneyCheckDollar
    },
    {
        id: 3,
        title: "Goal-Oriented Saving",
        description:
            "Set and achieve your financial goals effortlessly. Whether it’s short-term or long-term, we’ll help you reach them faster.",
        icon: FaSackDollar
    },
    {
        id: 4,
        title: "Data-Driven Insights",
        description:
            "Gain a clear understanding of your financial health with intuitive charts, summaries, and real-time insights.",
        icon: FaChartBar
    },
    {
        id: 5,
        title: "Secure and Reliable",
        description:
            "Your financial data is safe with us. We prioritize security and ensure a seamless experience at all times.",
        icon: FaUserShield
    },
    {
        id: 6,
        title: "Accessible Anywhere",
        description:
            "Enjoy the freedom of managing your finances from any device, whether you're at home or on the go.",
        icon: FaAccessibleIcon
    }
];

export const userReviews = [
    {
        id: 1,
        name: "Sarah T.",
        review: "Trexpenser has completely transformed how I manage my finances. Setting savings goals has never been this easy and fun!",
        rating: 5
    },
    {
        id: 2,
        name: "Michael R.",
        review: "I love how intuitive the app is. The automatic savings feature helps me save consistently without even thinking about it.",
        rating: 4
    },
    {
        id: 3,
        name: "Emily L.",
        review: "The insights and graphs are a game changer. I can see where my money is going and adjust my spending habits instantly.",
        rating: 5
    },
    {
        id: 4,
        name: "David K.",
        review: "Having all my financial data in one place has made budgeting so much easier. Trexpenser is a must-have for everyone!",
        rating: 4
    },
    {
        id: 5,
        name: "Rachel S.",
        review: "Secure, user-friendly, and reliable! Trexpenser has made saving for my dream vacation stress-free and achievable.",
        rating: 5
    },
    {
        id: 6,
        name: "James W.",
        review: "The motivational messages keep me inspired to stick to my goals. Trexpenser truly understands its users' needs.",
        rating: 4
    }
];

export const faqs = [
    {
        question: "How does Trexpenser protect my data?",
        answer: "Your data is secured using industry-standard encryption methods to ensure your financial information remains private and safe."
    },
    {
        question: "Can I set multiple savings goals at once?",
        answer: "Yes, you can set up to 4 active savings goals simultaneously, allowing you to focus on multiple financial priorities."
    },
    {
        question: "How does the automatic savings feature work?",
        answer: "With automatic savings, a percentage of your income is deducted and allocated to your savings goals automatically, ensuring consistent progress toward your financial targets."
    },
    {
        question: "Is Trexpenser free to use?",
        answer: "Absolutely! Trexpenser offers core features for free, with optional premium features available for enhanced functionality."
    },
    {
        question: "Can I access my data on multiple devices?",
        answer: "Yes, Trexpenser is cloud-based, so your data syncs across all your devices. Log in with your account to access your information anywhere."
    },
    {
        question: "How do I edit or delete a savings goal?",
        answer: "You can edit or delete a savings goal by navigating to your dashboard, selecting the goal, and choosing the edit or delete option."
    }
];

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
    { icon: FaUserGear, text: "Settings", dest: "/dashboard/settings" }
];
