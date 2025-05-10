import { useAuth } from "../../../../contexts/AuthContext";

import Saving from "./Saving";


function SavingGoals({ showTitle }) {
    const { savings } = useAuth();

    return (
        <>
            {showTitle && (
                <div>
                    <h1 className="text-2xl font-bold">Savings goals</h1>
                </div>
            )}
            <div
                className="grid grid-cols-1 gap-4 divide-y-2
            divide-light-divider"
            >
                {savings?.reverse()?.map(saving => (
                    <Saving key={saving.id} savingsData={saving} />
                ))}
            </div>
        </>
    );
}

export default SavingGoals;
