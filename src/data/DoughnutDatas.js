
export default function expenesArray(datas, category) {
    const expenesArray = datas
        .filter(data => data.type === category)
        .reduce((acc, item) => {
            if (!acc[item.category]) {
                acc[item.category] = [];
            }
            acc[item.category].push(item);
            return acc;
        }, []);


    const dgn = Object.entries(expenesArray).flat();

    const expenseDatas = dgn
        .filter(item => typeof item === "object");

    return {
        amounts: expenseDatas.map(data =>
            data.map(dt => dt.amount).reduce((acc, ini) => acc + ini)
        ),

        titles: dgn.flat().filter(item => typeof item === "string")
    };
}