import { useAuth } from "../../../../contexts/AuthContext";
import Budget from "./Budget";
const Budgets = () => {
    const { budgets } = useAuth();
    return (
        <div className="mt-5">
            {budgets?.map(budget => {
              
                return <Budget budget={budget} key={budget.id} />;
            })}
        </div>
    );
};

export default Budgets;
