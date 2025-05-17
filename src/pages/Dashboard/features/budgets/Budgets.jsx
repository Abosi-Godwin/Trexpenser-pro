import { useAuth } from "../../../../contexts/AuthContext";
import Budget from "./Budget";
const Budgets = () => {
    const { budgets } = useAuth();
    return (
        <div className="border-t-2 border-light-divider mt-5">
          
            {budgets?.map(budget => {
                return <Budget budget={budget} />;
            })}
        </div>
    );
};

export default Budgets;
