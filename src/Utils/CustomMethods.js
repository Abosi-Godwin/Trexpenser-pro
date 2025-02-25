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

export const roundDownPrice = array => {
    return array.reduce((ac, ini) => ac + ini, 0);
};

export const formatDate = date => {
    const currentDate = new Date();
    return new Date(date).toDateString();
};
