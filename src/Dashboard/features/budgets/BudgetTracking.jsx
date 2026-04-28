 import { Link } from "react-router-dom";
import Budget from "./Budget";
import Budgets from "./Budgets";
import EmptyDashboard from "../../ui/EmptyDashboard";
import { useBudgets } from "../../Hooks/useBudgets";
import { useCurrency } from "../../hooks/useCurrency";

const BudgetTrackingChart = () => {
  const { budgets, spendingLimit, categories = [], minMaxDate } = useBudgets();
 const { format } = useCurrency();
  const hasBudgets = budgets?.length > 0;

  const formatCategories = (cats) => {
    if (!cats?.length) return "";
    if (cats.length === 1) return `the ${cats[0]} category`;

    // Spread to avoid mutating original array
    const all = [...cats];
    const last = all.pop();
    return all.length > 1
      ? `${all.join(", ")} and ${last}`
      : `${all[0]} and ${last}`;
  };

  return (
    <div className="bg-light-cardBackground rounded-md p-2
      dark:bg-dark-cardBackground dark:text-dark-text">

      <div className="border-b-2 border-b-light-divider">
        <h2 className="text-xl font-extrabold">Budget Analytics</h2>
        <p className="text-xs capitalize mb-2">Track your spending flow.</p>

        {hasBudgets && (
          <p className="whitespace-break-spaces">
            Maximum of{" "}
            <strong>{format(spendingLimit)}</strong>{" "}
            in {formatCategories(categories)}{" "}
            dated from {minMaxDate?.[0]} to {minMaxDate?.[1]}
          </p>
        )}
      </div>

      {hasBudgets ? (
        <Budgets showAction={false} />
      ) : (
        <EmptyDashboard
          link="Set a budget"
          imgSrc="/undraw_wallet_diag.svg"
          destination="budgets"
          description="No budget set. Create one to track your spending flow."
          showBtn={true}
        />
      )}
    </div>
  );
};

export default BudgetTrackingChart;