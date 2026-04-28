import { useState } from "react";

import Budgets from "../features/budgets/Budgets";
import EmptyDashboard from "../ui/EmptyDashboard";
import { useBudgets } from "../Hooks/useBudgets";
import { useCurrency } from "../hooks/useCurrency";
import BudgetForm from "../features/budgets/BudgetForm";
import Button from "../features/Form/Button";
 

function BudgetPlanning() {
  const { budgets, spendingLimit, spentPercent, totalSpent } = useBudgets();
 const { format } = useCurrency();
  const [openForm, setOpenForm] = useState(false);

  const handleOpenForm = () => setOpenForm((prev) => !prev);

  return (
    <div className="bg-light-background dark:bg-dark-cardBackground dark:text-dark-text rounded-md p-4">
      <div className="w-full flex justify-between items-center">
        <h2 className="uppercase text-2xl font-bold">Budget {<br />} Planning</h2>
        <Button
          text="Create budget"
          className="flex justify-start items-center p-2
                     text-md gap-2 inline font-bold bg-light-primaryCTA
                     text-white
                     rounded-md"
          onButtonClick={handleOpenForm}
        />
        {openForm && <BudgetForm onCloseForm={handleOpenForm} />}
      </div>
      {budgets.length >= 1 ? (
        <>
          <div className="flejustify-start justify-center flex-col">
            <h1 className="font-bold">Limit amount: {format(spendingLimit)}</h1>
            <h1 className="font-bold">Spent amount: {format(totalSpent)}</h1>
            <h1 className="font-bold">Percentage: {spentPercent}%</h1>
          </div>
           <Budgets showAction={true} />
        </>
      ) : (
        <EmptyDashboard
          link="Set a budget"
          imgSrc="/undraw_wallet_diag.svg"
          destination="budgets"
          description=" No budget set. Create one to track your
                    spending flow."
          showBTn={false}
        />
      )}
    </div>
  );
}

export default BudgetPlanning;
