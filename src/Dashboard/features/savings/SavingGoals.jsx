import { useGetSavings } from "../../Hooks/useGetSavings";
import Saving from "./Saving";
import { formatCurrency, formatDate } from "../../Utils/CustomMethods";
function SavingGoals({ showTitle, showAction }) {
    const { savings, totalSaved } = useGetSavings();

    return (
        <div
            className="bg-light-cardBackground rounded-md p-2
        dark:bg-dark-cardBackground dark:text-dark-text"
        >
            {showTitle && (
                <>
                    <h1 className="text-2xl font-bold">Savings goals</h1>

                    <div className="py-3">
                        <h1 className="text-2xl font-bold">
                            {formatCurrency(totalSaved)}
                        </h1>
                        <p>Saved from your goals .</p>
                    </div>
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
