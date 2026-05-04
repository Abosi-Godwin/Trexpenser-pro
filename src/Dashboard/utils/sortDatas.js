export const sortData = data =>
    data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
   
   // data.sort((a, b) => new Date(b.date) - new Date(a.date));
