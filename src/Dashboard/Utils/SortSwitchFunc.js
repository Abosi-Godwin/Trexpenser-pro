export const sortingSwitchFunc = (sortParams, currentUserTransactions) => {
    
    const arr = [...currentUserTransactions];

    switch (sortParams) {
        case "date_desc":
            return arr.sort((a, b) => new Date(b.date) - new Date(a.date));

        case "date_asc":
            return arr.sort((a, b) => new Date(a.date) - new Date(b.date));

        case "amount_desc":
            return arr.sort((a, b) => +b.amount - +a.amount);

        case "amount_asc":
            return arr.sort((a, b) => +a.amount - +b.amount);

        case "category_asc":
            return arr.sort((a, b) =>
                a.category.toLowerCase().localeCompare(b.category.toLowerCase())
            );

        case "category_desc":
            return arr.sort((a, b) =>
                b.category.toLowerCase().localeCompare(a.category.toLowerCase())
            );

        case "type_income_first":
            return arr.sort((a, b) => {
                if (a.type === b.type) return 0;
                return a.type === "income" ? -1 : 1;
            });

        case "type_expense_first":
            return arr.sort((a, b) => {
                if (a.type === b.type) return 0;
                return a.type === "expense" ? -1 : 1;
            });

        default:
            return arr;
    }
};
