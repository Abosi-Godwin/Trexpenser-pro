import { useBudgets } from "../../Hooks/useBudgets";
import Budget from "./Budget";

const Budgets = ({ showAction }) => {
    const { budgets } = useBudgets();
    return (
        <div className="mt-5 flex flex-col gap-2 divide-y-2 divide-light-divider rounded-md">
            {budgets?.map(budget => {
                return (
                    <Budget budget={budget} key={budget.id}>
                  
                        <div className="flex justify-between items-cent6er">
                            <Budget.Infos />
                            <div className="flex gap-3 h-fit">
                                <Budget.Status />
                                {showAction && <Budget.Action />}
                            </div>
                        </div>

                        <Budget.Duration />
                        <Budget.Progress />
                    </Budget>
                );
            })}
        </div>
    );
};

export default Budgets;
