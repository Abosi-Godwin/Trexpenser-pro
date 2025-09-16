export const sortingSwitchFunc = (sortParams, currentUserTransactions) => {
    console.log(sortParams);
    let transaction = [];

    switch (sortParams) {
        case "date_desc":
            transaction = currentUserTransactions.sort(
                (a, b) => new Date(b.date) - new Date(a.date)
            );
            break;
        case "date_asc":
            transaction = currentUserTransactions.sort(
                (a, b) => new Date(a.date) - new Date(b.date)
            );
            break;
        case "amount_desc":
            transaction = currentUserTransactions.sort(
                (a, b) => +b.amount - +a.amount
            );
            break;
        case "amount_asc":
            transaction = currentUserTransactions.sort(
                (a, b) => +a.amount - +b.amount
            );
            break;
        case "category_asc":
            transaction = currentUserTransactions.sort(
                (a, b) => a.category.toLowerCase() - b.category.toLowerCase()
            );
            break;
        case "category_desc":
            transaction = currentUserTransactions.sort((a, b) => a - b);
            break;
        case "type_income_first":
            transaction = currentUserTransactions.sort(
                (a, b) => new Date(b.date) - new Date(a.date)
            );
            break;
        case "type_expense_first":
            transaction = currentUserTransactions.sort(
                (a, b) => new Date(a.date) - new Date(b.date)
            );
            break;
        default:
            transaction = currentUserTransactions;
    }
    return transaction;
};

/*


export const sortingSwitchFunc = (sortParams, currentUserTransactions) => {
    let transaction = [];
    switch (sortParams) {
        case "date_desc":
            transaction = currentUserTransactions.sort(
                (a, b) => new Date(b.date) - new Date(a.date)
            );
            break;
        case "date_asc":
            transaction = currentUserTransactions.sort(
                (a, b) => new Date(a.date) - new Date(b.date)
            );
            break;
        case "amount_desc":
            transaction = currentUserTransactions.sort(
                (a, b) => +b.amount - +a.amount
            );
            break;
        case "amount_asc":
            transaction = currentUserTransactions.sort(
                (a, b) => +a.amount - +b.amount
            );
            break;
        case "category_desc":
            transaction = currentUserTransactions.sort((a, b) => {
                console.log(a.category, b.category);
                return b.category.split("")[0] - a.category.split("")[0];
            });
            break;
        case "category_asc":
            transaction = currentUserTransactions.sort(
                (a, b) => a.category - b.category
            );
            break;
        case "type_income_first":
            transaction = currentUserTransactions.sort(
                (a, b) => new Date(b.date) - new Date(a.date)
            );
            break;
        case "type_expense_first":
            transaction = currentUserTransactions.sort(
                (a, b) => new Date(a.date) - new Date(b.date)
            );
            break;
        default:
            transaction = currentUserTransactions;
    }
    return transaction;
};


*/
