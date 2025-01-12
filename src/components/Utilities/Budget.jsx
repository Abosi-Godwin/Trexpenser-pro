import ProgressBar from "@ramonak/react-progress-bar";
import EdithAndDelBtn from "./EdithAndDelBtn.jsx";

function Budget({
    budget,
    expenses,
    onCurrencyFormat,
    onFormEditOpen,
    onFormDeleteOpen
}) { 
    const allExpenses = expenses.filter(
        expense => expense.category === budget.category
    );

    const trackingCategory = budget.category;

    const startDate = budget.startDate;

    const endDate = budget.endDate;

    const spendingLimit = budget.amount;

    const totalSpent = allExpenses
        .filter(budget => budget.date >= startDate && budget.date <= endDate)
        .filter(data => trackingCategory.includes(data.category))
        .map(data => data.amount)
        .reduce((acc, ini) => acc + ini, 0);

    const spentPercent = (totalSpent / spendingLimit) * 100;
   
    return (
        <li className="list-none flex items-center justify-between border bg-color-6 text-color-2 rounded-md p-2">
            <div>
                <h1 className="text-xl">{budget.category}</h1>
                <h1 className="font-extrabold">
                    {onCurrencyFormat(budget.amount)}
                </h1>
                <ProgressBar
                    completed={totalSpent}
                    maxCompleted={spendingLimit}
                    bgColor="#9190e9"
                    baseBgColor="#f0f2fd"
                    customLabel={`${Math.trunc(spentPercent)}%`}
                    height={10}
                    labelSize={10}
                />
                <p>
                    {budget.startDate.replace(/-/g, "/")} -{" "}
                    {budget.endDate.replace(/-/g, "/")}
                </p>
            </div>
            <EdithAndDelBtn
                onDataEdit={onFormEditOpen}
                onDataDelete={onFormDeleteOpen}
                data={budget}
            />
        </li>
    );
}
export default Budget;
