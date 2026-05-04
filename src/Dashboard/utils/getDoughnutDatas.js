export const getDoughnutDatas = (datas, category) => {
    const expenesArray = datas
        .filter(data => data.type === category)
        ?.reduce((acc, item) => {
            if (!acc[item.category.toLowerCase()]) {
                acc[item.category.toLowerCase()] = [];
            }
            acc[item.category.toLowerCase()].push(item);
            return acc;
        }, []);

    const allDatas = Object.entries(expenesArray).flat();

    const amounts = allDatas
        .filter(item => typeof item === "object")
        .map(data => data.map(dt => dt.amount).reduce((acc, ini) => acc + ini));
    const titles = allDatas.flat().filter(item => typeof item === "string");

    return {
        amounts,
        titles
    };
};
