import { useState } from "react";

import { useAI } from "../hooks/useAi";
import EmptySummary from "../ui/EmptySummaryModal";
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
    const [openEmptyModal, setOpenEmptyModal] = useState(false);

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
        const emptySlate =
            currentUserTransactions.length < 1 &&
            savings.length < 1 &&
            budgets.length < 1;

        if (emptySlate) {
            setOpenEmptyModal(true);
            return;
        }

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
        console.log(userData);
         getInsight(buildTrexpenserPrompt(userData));
    };

    const RocketIcon = encouragement.icon;

    return (
        <div
            className="bg-light-background dark:bg-dark-cardBackground 
      dark:text-dark-text rounded-md p-4"
        >
            {openEmptyModal && (
                <EmptySummary onCloseModal={() => setOpenEmptyModal(false)} />
            )}

            <h2 className="text-2xl font-bold mb-2">Your Financial Insights</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
                Get a clear overview of your income, expenses, budgets, and
                savings goals in one tap.
            </p>

            <div className="py-4">
                <button
                    onClick={handleClick}
                    disabled={gettingInsights}
                    className="w-full py-3 rounded-xl bg-indigo-600 text-white
            flex items-center justify-center gap-3 font-semibold 
            shadow-md hover:bg-indigo-700 disabled:opacity-60 
            transition-colors"
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

            {/* Preview cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {previewCards.map(card => {
                    const Icon = card.icon;
                    const insightKey = card.title.toLowerCase();
                    const insightItems = insight?.[insightKey];

                    return (
                        <div
                            key={card.title}
                            className="p-4 border rounded-xl shadow-sm"
                        >
                            <div className="flex items-center gap-2 mb-2">
                                <div
                                    className="flex items-center justify-center p-2 
                  rounded-md bg-light-mainBackground text-light-text 
                  dark:bg-dark-mainBackground dark:text-dark-text"
                                >
                                    <Icon className="text-indigo-600 w-6 h-6" />
                                </div>
                                <h3 className="font-semibold text-xl">
                                    {card.title}
                                </h3>
                            </div>

                            <div className="py-3">
                                {!insightItems ? (
                                    <p className="text-gray-600 dark:text-gray-400 p-3">
                                        {card.text}
                                    </p>
                                ) : (
                                    <ul className="list-disc list-inside flex flex-col gap-3">
                                        {insightItems.map((item, i) => {
                                            const isHeading =
                                                item.startsWith("**") ||
                                                item.trim().split(" ").length <=
                                                    2;

                                            return isHeading ? (
                                                <h4
                                                    key={i}
                                                    className="font-bold"
                                                >
                                                    {item.replaceAll("*", "")}
                                                </h4>
                                            ) : (
                                                <li key={i}>{item}</li>
                                            );
                                        })}
                                    </ul>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Encouragement card */}
            <div className="p-6 border rounded-md flex flex-col shadow-sm">
                <div className="flex items-center gap-2 mb-2">
                    <div
                        className="flex items-center justify-center p-2 rounded-md 
            bg-light-mainBackground text-light-text 
            dark:bg-dark-mainBackground dark:text-dark-text"
                    >
                        <RocketIcon className="text-indigo-600 w-6 h-6" />
                    </div>
                    <h3 className="font-semibold text-xl">
                        {encouragement.title}
                    </h3>
                </div>
                <p className="py-3 text-gray-700 dark:text-gray-300">
                    {insight?.encouragement ?? encouragement.text}
                </p>
            </div>
        </div>
    );
};

export default Summary;
