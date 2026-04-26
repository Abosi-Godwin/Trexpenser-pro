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
  const { getInsight, insight, gettingInsights, isFromCache } = useAI();
  const { userName } = useUser();
  const [openEmptyModal, setOpenEmptyModal] = useState(false);

  const {
    budgets, startDate, endDate, categories,
    spendingLimit, spentPercent, totalSpent, minMaxDate,
  } = useBudgets();

  const { savings, totalSaved } = useGetSavings();

  const {
    currentUserTransactions, incomes, expenses,
    incomePrices, expensePrices, totalIncome,
    totalExpenses, totalBalance, expenseCategories,
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
        currentUserTransactions, incomes, expenses,
        incomePrices, expensePrices, totalIncome,
        totalExpenses, totalBalance, expenseCategories,
      },
      savings: { savings, totalSaved },
      budgets: {
        budgets, startDate, endDate, categories,
        spendingLimit, spentPercent, totalSpent, minMaxDate,
      },
    };

    getInsight(buildTrexpenserPrompt(userData));
  };

  const RocketIcon = encouragement.icon;
  const hasInsight = !!insight;

  return (
    <div className="bg-light-background dark:bg-dark-cardBackground 
      dark:text-dark-text rounded-md p-4 space-y-6">

      {openEmptyModal && (
        <EmptySummary onCloseModal={() => setOpenEmptyModal(false)} />
      )}

      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold mb-1">Your Financial Insights</h2>
        <p className="text-gray-600 dark:text-gray-400 text-sm">
          Get a clear overview of your income, expenses, budgets, and
          savings goals in one tap.
        </p>
      </div>

      {/* Introduction from AI */}
      {insight?.introduction && (
        <div className="bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 
          dark:border-indigo-800 rounded-xl p-4">
          <p className="text-sm text-indigo-800 dark:text-indigo-300 leading-relaxed">
            {insight.introduction}
          </p>
        </div>
      )}

      {/* Generate button */}
      <div className="flex flex-col items-center gap-2">
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
          ) : hasInsight ? (
            "Regenerate Summary"
          ) : (
            "Generate My Summary"
          )}
        </button>

        {isFromCache && (
          <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
            <span>⚡</span>
            Showing cached summary — refreshes every hour
          </p>
        )}
      </div>

      {/* Preview cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {previewCards.map((card) => {
          const Icon = card.icon;
          const insightKey = card.title.toLowerCase();
          const insightItems = insight?.[insightKey];

          return (
            <div
              key={card.title}
              className="p-4 border border-light-dividers dark:border-dark-dividers 
                rounded-xl shadow-sm dark:bg-dark-sectionBackground 
                transition-all"
            >
              {/* Card header */}
              <div className="flex items-center gap-2 mb-3">
                <div className="flex items-center justify-center p-2 rounded-md 
                  bg-light-mainBackground dark:bg-dark-mainBackground">
                  <Icon className="text-indigo-600 w-5 h-5" />
                </div>
                <h3 className="font-semibold text-lg">{card.title}</h3>
              </div>

              {/* Card content */}
              {!insightItems ? (
                <p className="text-gray-500 dark:text-gray-400 text-sm p-2">
                  {card.text}
                </p>
              ) : (
                <ul className="flex flex-col gap-2">
                  {insightItems.map((item, i) => {
                    const isHeading =
                      item.startsWith("**") ||
                      item.trim().split(" ").length <= 2;

                    return isHeading ? (
                      <h4 key={i} className="font-bold text-sm mt-1">
                        {item.replaceAll("*", "")}
                      </h4>
                    ) : (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-sm 
                          text-gray-700 dark:text-gray-300"
                      >
                        <span className="text-indigo-500 mt-0.5 flex-shrink-0">
                          •
                        </span>
                        {item}
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          );
        })}
      </div>

      {/* Encouragement card */}
      <div className="p-5 border border-light-dividers dark:border-dark-dividers 
        rounded-xl shadow-sm bg-gradient-to-br from-indigo-50 to-white 
        dark:from-indigo-900/10 dark:to-dark-sectionBackground">
        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center justify-center p-2 rounded-md 
            bg-light-mainBackground dark:bg-dark-mainBackground">
            <RocketIcon className="text-indigo-600 w-5 h-5" />
          </div>
          <h3 className="font-semibold text-lg">{encouragement.title}</h3>
        </div>
        <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
          {insight?.encouragement ?? encouragement.text}
        </p>
      </div>
    </div>
  );
};

export default Summary;