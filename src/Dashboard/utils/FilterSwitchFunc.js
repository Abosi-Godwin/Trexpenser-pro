export const filterSwitchFunc = (filterParams, currentUserTransactions) => {
    let transaction = [];
    switch (filterParams) {
        case "income":
            transaction = currentUserTransactions.filter(
                item => item.type === "income"
            );
            break;
        case "expense":
            transaction = currentUserTransactions.filter(
                item => item.type === "expense"
            );
            break;
        default:
            transaction = currentUserTransactions;
    }
    return transaction;
};
