import { useAuth } from "../../contexts/AuthContext";
import Saving from "./Saving";

function SavingGoals({ showTitle, showAction }) {
    const { savings } = useAuth();
  
    return (
        <div className="bg-light-cardBackground rounded-md p-2">
            {showTitle && (
                <>
                    <h1 className="text-2xl font-bold">Savings goals</h1>
                    <p>Your active savings goals.</p>
                </>
            )}
            <div
                className="grid grid-cols-1 gap-4 divide-y-2
            divide-light-divider"
            >
                {savings?.map(saving => (
                    <Saving key={saving.id} savingsData={saving}>
                        <Saving.Header>
                            {showAction && <Saving.Action />}
                        </Saving.Header>
                        <Saving.Info />
                        <Saving.Form />
                    </Saving>
                ))}
            </div>
        </div>
    );
}

export default SavingGoals;
