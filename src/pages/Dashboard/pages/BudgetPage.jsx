

import { FaPen } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa6";
import { FaTimes } from "react-icons/fa";
import { FaDeleteLeft } from "react-icons/fa6";
 
import BudgetSummary from "../features/budgets/BudgetSummary";

import Budgets from "../features/budgets/Budgets"
function BudgetPlanning() {
    return (
        <div className="bg-light-background rounded-md p-4">
            <BudgetSummary />
            <Budgets />
        </div>
    );
}

export default BudgetPlanning;

/*


            <div className="p-2 rounded-md">
                <h1 className="text-md font-bold uppercase my-1">
                    {budget.category}
                </h1>
                <p>
                    <strong>Limit:</strong>
                    {" " + formatCurrency(limitAmount)}
                </p>
                <p>
                    <strong>Spent:</strong>
                    {" " + formatCurrency(spentAmount)}
                </p>
                <p className="text-sm">
                    <strong>Duration:</strong>
                    {` ${format(budget.startDate, "MMM, dd, yyyy")} - ${format(
                        budget.endDate,
                        "MMM, dd, yyyy"
                    )}`}
                </p>
                <ProgressBar
                    completed={+spentAmount}
                    maxCompleted={+limitAmount}
                    bgColor="#7c74e0"
                    baseBgColor="#e4e7fb"
                    height={15}
                    margin="5px 0"
                />
            </div>

*/
