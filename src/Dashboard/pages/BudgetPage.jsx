import BudgetSummary from "../features/budgets/BudgetSummary";
import Budgets from "../features/budgets/Budgets";

function BudgetPlanning() {
    return (
        <div className="bg-light-background dark:bg-dark-cardBackground dark:text-dark-text rounded-md p-4">
            <BudgetSummary />
            <Budgets showAction={true} />
        </div>
    );
}

export default BudgetPlanning;