export const formatCurrency = number => {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD"
    }).format(number);
};
export const roundTotalPrice = array => {
    return array.reduce(
        (ac, ini) =>
            ini.type === "income" ? ac + ini.amount : ac - ini.amount,
        0
    );
};
export const roundTotalIncomePrice = array => {
    return array.reduce((ac, ini) => ac + ini, 0);
};
export const roundTotalExpensesPrice = array => {
    return array.reduce((ac, ini) => ac + ini, 0);
};
