export const sortData = data =>
    data.sort((a, b) => new Date(b.date) - new Date(a.date));
