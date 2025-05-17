import ProgressBar from "@ramonak/react-progress-bar";
import EdithAndDelBtn from "../../ui/EdithAndDelBtn";
import { useAuth } from "../../../../contexts/AuthContext";
import { formatCurrency } from "../../../../Utils/CustomMethods";
function Budget({ budget, onFormEditOpen, onFormDeleteOpen }) {
    const { transactions } = useAuth();
    console.log(budget);
    const allExpenses = transactions.filter(
        transaction =>
            transaction.type === "expense" &&
            transaction.category === budget.category
    );

    const trackingCategory = budget.category;

    const startDate = budget.start_date;

    const endDate = budget.end_date;

    const spendingLimit = budget.amount;

    const totalSpent = allExpenses
        .filter(budget => budget.date >= startDate && budget.date <= endDate)
        .filter(data => trackingCategory.includes(data.category))
        .map(data => data.amount)
        .reduce((acc, ini) => acc + ini, 0);

    const spentPercent = (totalSpent / spendingLimit) * 100;

    return (
        <li className="list-none flex items-center justify-between rounded-md p-2">
            <div>
                <h1 className="text-xl">{budget.category}</h1>
                <p>{budget.notes}</p>
                <h1 className="font-extrabold mt-2">
                    {formatCurrency(budget.amount)}
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
                    {startDate.replace(/-/g, "/")} -{" "}
                    {endDate.replace(/-/g, "/")}
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
{
    /*
<div className="pt-4">
    <h1 className="text-color-7 font-bold text-xl">Active expenses tracking</h1>{" "}
    <div>
        <div>
            <ul className="flex flex-col gap-4">
                {allBudgets.map(budget => {
                    return (
                        <Budget
                            budget={budget}
                            expenses={allExpenses}
                            key={budget.Id}
                            onCurrencyFormat={onCurrencyFormat}
                            onFormEditOpen={handleOpenBudgetEditForm}
                            onFormDeleteOpen={handleOpenBudgetDelForm}
                        />
                    );
                })}
            </ul>
        </div>
    </div>
</div>;
*/
}
