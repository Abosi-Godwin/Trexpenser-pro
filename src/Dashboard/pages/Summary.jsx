import useAI from "../Apis/Ai/getInsights";

import MiniLoader from "../ui/MiniLoader";

import { useUser } from "../Hooks/useUser";
import { useTransactions } from "../Hooks/useTransactions";
import { useBudgets } from "../Hooks/useBudgets";
import { useGetSavings } from "../Hooks/useGetSavings";
import { buildTrexpenserPrompt } from "../Utils/promptBuilder";
import { previewCards, encouragement } from "../data/data";

const Summary = () => {
    const { getInsight, insight, gettingInsights } = useAI();
    const { userName } = useUser();

    const {
        budgets,
        startDate,
        endDate,
        categories,
        spendingLimit,
        spentPercent,
        totalSpent,
        minMaxDate
    } = useBudgets();

    const { savings, totalSaved } = useGetSavings();

    const {
        currentUserTransactions,
        incomes,
        expenses,
        incomePrices,
        expensePrices,
        totalIncome,
        totalExpenses,
        totalBalance,
        expenseCategories
    } = useTransactions();

    const handleClick = () => {
        const userData = {
            userName,
            transactions: {
                currentUserTransactions,
                incomes,
                expenses,
                incomePrices,
                expensePrices,
                totalIncome,
                totalExpenses,
                totalBalance,
                expenseCategories
            },
            savings: { savings, totalSaved },
            budgets: {
                budgets,
                startDate,
                endDate,
                categories,
                spendingLimit,
                spentPercent,
                totalSpent,
                minMaxDate
            }
        };
        const prompt = buildTrexpenserPrompt(userData);
        getInsight(prompt);
    };
    
    const RocketIcon = encouragement.icon;
    return (
        <div className="bg-light-background dark:bg-dark-cardBackground dark:text-dark-text rounded-md p-4">
            <h1 className="text-2xl font-bold mb-2">Your Financial Insights</h1>
            <p className="text-gray-600 mb-6">
                Get a clear overview of your income, expenses, budgets, and
                savings goals in one tap.
            </p>

            <div className="py-4">
                <button
                    onClick={handleClick}
                    className="w-full py-3 rounded-xl bg-indigo-600 text-white
                    flex items-center justify-center gap-3
                    font-semibold shadow-md hover:bg-indigo-700
                    disabled:opacity-60"
                    disabled={gettingInsights}
                >
                    {gettingInsights ? (
                        <>
                            <MiniLoader /> Analyzing your finances…
                        </>
                    ) : (
                        "Generate My Summary"
                    )}
                </button>
            </div>

            <div className="space-y-4 mb-6 grid grid-cols-1 md:grid-cols-2 gap-2">
                {previewCards.map((card, index) => {
                    const Icon = card.icon;
                    return (
                        <div
                            key={index}
                            className="p-4 border rounded-xl shadow-sm gap-3"
                        >
                            <div className="flex items-center gap-2">
                                <h1
                                    className="flex items-center
                        justify-center p-2 rounded-md bg-light-mainBackground
        text-light-text dark:bg-dark-mainBackground dark:text-dark-text"
                                >
                                    <Icon className="text-indigo-600 w-6 h-6" />
                                </h1>
                                <h2 className="font-semibold text-xl">
                                    {card.title}
                                </h2>
                            </div>
                            <div className="py-5">
                                {!insight ? (
                                    <p className="text-gray-600 p-3">
                                        {card.text}
                                    </p>
                                ) : (
                                    <ul
                                        className="list-disc list-inside flex
                                flex-col gap-3"
                                    >
                                        {insight[card.title.toLowerCase()].map(
                                            (item, index) => {
                                                const itsHeading =
                                                    !item.includes(" ");

                                                return itsHeading ? (
                                                    <h1
                                                        key={index}
                                                        className="font-bold"
                                                    >
                                                        {item}
                                                    </h1>
                                                ) : (
                                                    <li key={index}>{item}</li>
                                                );
                                            }
                                        )}
                                    </ul>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>

            <div
                className="p-6 border rounded-md flex flex-col items-cenjter
                justify-center shadow-sm"
            >
                <div className="flex items-center gap-2">
                    <h1
                        className="flex items-center
                        justify-center p-2 rounded-md bg-light-mainBackground
        text-light-text dark:bg-dark-mainBackground dark:text-dark-text"
                    >
                        <RocketIcon className="text-indigo-600 w-6 h-6" />
                    </h1>
                    <h2 className="font-semibold text-xl">
                        {encouragement.title}
                    </h2>
                </div>
                <p className="py-5">
                    {insight?.encouragement ||
                        insight?.conclusion ||
                        encouragement.text}
                </p>
            </div>
        </div>
    );
};
export default Summary;
