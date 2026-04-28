import { useGetSavings } from "../../Hooks/useGetSavings";
import { useCurrency } from "../../hooks/useCurrency";
import Saving from "./Saving";

import EmptyDashboard from "../../ui/EmptyDashboard";

function SavingGoals({ showTitle, showAction }) {
    const { savings = [], totalSaved } = useGetSavings();
    const { format } = useCurrency();
    return (
        <div
            className="bg-light-cardBackground rounded-md p-2
      dark:bg-dark-cardBackground dark:text-dark-text"
        >
            {showTitle && (
                <>
                    <h2 className="text-2xl font-bold">Savings Goals</h2>
                    <p className="text-2xl font-bold mt-2">
                        {format(totalSaved)}
                    </p>
                    <p className="text-sm pb-2">Saved towards your goals.</p>
                    <hr />
                </>
            )}

            {savings.length > 0 ? (
                <div className="grid grid-cols-1 gap-4 divide-y-2 divide-light-divider">
                    {savings.map(saving => (
                        <Saving key={saving.id} savingsData={saving}>
                            <Saving.Header>
                                {showAction && <Saving.Action />}
                            </Saving.Header>
                            <Saving.Info />
                            <Saving.Form />
                        </Saving>
                    ))}
                </div>
            ) : (
                <EmptyDashboard
                    link="Create a savings goal"
                    imgSrc="/undraw_saving-notes_wp71.svg"
                    destination="savings"
                    description="Start saving towards your goals."
                    showBtn={true}
                />
            )}
        </div>
    );
}

export default SavingGoals;
