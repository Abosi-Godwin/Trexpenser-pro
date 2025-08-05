import { useState } from "react";
import ProgressBar from "@ramonak/react-progress-bar";

import BudgetForm from "./BudgetForm";
import Button from "../../features/Form/Button";
import SimpleRadialBarChart from "../Charts/SimpleRadialBarChart";
import { useBudgetsData } from "../../Hooks/useBudgetsData";
import { formatCurrency } from "../../Utils/formatCurrency";

const BudgetSummary = () => {
    const {
        budgets,
        startDate,
        endDate,
        categories,
        spendingLimit,
        spentPercent,
        totalSpent
    } = useBudgetsData();
  
    const [openForm, setOpenForm] = useState(false);

    const handleOpenForm = () => setOpenForm(prev => !prev);

    return (
        <>
            <div className="w-full flex justify-between items-center">
                <h2 className="uppercase text-2xl font-bold">
                    Budget {<br />} Planning
                </h2>
                <Button text="Add new" onButtonClick={handleOpenForm} />
                {openForm && <BudgetForm onClose={handleOpenForm} />}
            </div>

            <div className="flex items-center justify-center w-full py-3">
                <div
                    className="h-0.5 w-full rounded-md
                bg-light-sectionBackground"
                ></div>
            </div>
            <div className="flejustify-start justify-center flex-col">
                <h1 className="font-bold">
                    Limit amount: {formatCurrency(spendingLimit)}
                </h1>
                <h1 className="font-bold">
                    Spent amount: {formatCurrency(totalSpent)}
                </h1>
                <h1 className="font-bold">Percentage: {spentPercent}%</h1>
            </div>

            <div className="flex items-center justify-center w-full py-3">
                <div
                    className="h-0.5 w-full rounded-md
                bg-light-sectionBackground"
                ></div>
            </div>
        </>
    );
};

export default BudgetSummary;
