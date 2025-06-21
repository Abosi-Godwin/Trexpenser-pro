export const sortData = data =>
    data.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));