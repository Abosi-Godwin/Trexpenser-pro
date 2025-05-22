import { useAuth } from "../../../../contexts/AuthContext";
import Saving from "./Saving";

function SavingGoals({ showTitle }) {
    const { savings } = useAuth();

    return (
        <>
            {showTitle && (
              
                    <h1 className="text-2xl font-bold mb-3">Savings goals</h1>
                
            )}
            <div
                className="grid grid-cols-1 gap-4 divide-y-2
            divide-light-divider border-y-2 border-light-divider"
            >
                {savings?.map(saving => (
                    <Saving key={saving.id} savingsData={saving} />
                ))}
            </div>
        </>
    );
}

export default SavingGoals;
