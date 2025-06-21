import BudgetSummary from "../features/budgets/BudgetSummary";
import Budgets from "../features/budgets/Budgets";

function BudgetPlanning() {
    return (
        <div className="bg-light-background rounded-md p-4">
            <BudgetSummary />
            <Budgets />
        </div>
    );
}

export default BudgetPlanning;