import { useGetSavings } from "../../Hooks/useGetSavings";
import Saving from "./Saving";
import EmptyDashboard from "../../ui/EmptyDashboard";
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
                    <p className="text-sm">Save towards your goals .</p>
                    <div className="py-3"></div>
                </>
            )}
            {savings?.length >= 1 ? (
                <div
                    className="grid grid-cols-1 gap-4 divide-y-2
            divide-light-divider"
                >
                    <h1 className="text-2xl font-bold">
                        {formatCurrency(totalSaved)}
                    </h1>
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
