/*
export const buildTrexpenserPrompt = userData => {
    const {
        transactions = {},
        budgets = {},
        savings = {},
        userName = "User"
    } = userData;

    const tone = "friendly, motivating, and easy to understand";

    const formatList = (arr, mapper) =>
        arr?.length ? arr.map(mapper).join("\n") : "None";

    const transactionsText = formatList(
        transactions.currentUserTransactions,
        i =>
            `- Type > ${i.type}: category: ${i.category?.toLowerCase()} amount: ${i.amount} date: (${i.date})${i.description ? ` — ${i.description}` : ""}`
    );

    const budgetsText = formatList(
        budgets.budgets,
        b =>
            `- ${b.category?.toLowerCase()}: limit ${b.amount}, from ${b.start_date} to ${b.end_date}`
    );

    const savingsText = formatList(savings.savings, s => {
        const progress = s.target_amount
            ? ((s.amount_saved / s.target_amount) * 100).toFixed(0)
            : 0;
        return `- ${s.title}: target ${s.target_amount}, saved ${s.amount_saved} (${progress}% progress), start date ${s.start_date}, end date ${s.end_date}, method ${s.method}, is active ${s.is_active}, funded by ${s.funded_by}`;
    });

    const encouragementLine =
        transactions.totalIncome > transactions.totalExpenses
            ? "Great job maintaining a positive cash flow — keep it up!"
            : "Don't worry about the shortfall — small adjustments will get you back on track!";

    return `
You are Trexpenser's Financial Insights Assistant. Analyze the following financial data for ${userName} and present the analysis in the structured format requested below. Keep the tone ${tone}.

--- USER DATA ---
Total Balance: ${transactions.totalBalance || 0}
Total Expenses: ${transactions.totalExpenses || 0}
Total Income: ${transactions.totalIncome || 0}

Transactions:
${transactionsText}

Budgets:
Currently tracked: ${budgets.categories || "None"}
Spending limit: ${budgets.spendingLimit || 0}
Spent already: ${budgets.totalSpent || 0}
Spent rate: ${budgets.spentPercent || 0}
List:
${budgetsText}

Savings Goals:
Total saved: ${savings.totalSaved || 0}
List (if savings method is manual, ignore funded_by and percentage):
${savingsText}
--- END USER DATA ---

Deliver output in exactly this JSON structure. Do not include markdown or code fences.

{
  "introduction": "A short friendly intro addressed to ${userName}",
  "summary": ["array of summary bullet points"],
  "review": ["array of review points — strengths and weaknesses"],
  "suggestions": ["array of 3–5 actionable suggestions"],
  "advice": ["array of 3 practical advice points"],
  "encouragement": "${encouragementLine}"
}

Keep each section concise (3–6 short bullets). Use numbers where helpful. Avoid jargon. Echo monetary values as provided.
`.trim();
};
*/


// buildTrexpenserPrompt.js
export const buildTrexpenserPrompt = (userData) => {
  const {
    transactions = {},
    budgets = {},
    savings = {},
    userName = "User",
  } = userData;

  const tone = "friendly, motivating, and easy to understand";

  const formatList = (arr, mapper) =>
    arr?.length ? arr.map(mapper).join("\n") : "None";

  // Limit to last 20 transactions to avoid token overflow
  const recentTransactions = (transactions.currentUserTransactions || []).slice(-20);

  const transactionsText = formatList(
    recentTransactions,
    (i) =>
      `- ${i.type}: ${i.category?.toLowerCase()} | amount: ${i.amount} | date: ${i.date}${
        i.description ? ` | note: ${i.description}` : ""
      }`
  );

  const budgetsText = formatList(
    budgets.budgets,
    (b) =>
      `- ${b.category?.toLowerCase()}: limit ${b.amount}, from ${b.start_date} to ${b.end_date}`
  );

  const savingsText = formatList(savings.savings, (s) => {
    const progress = s.target_amount
      ? ((s.amount_saved / s.target_amount) * 100).toFixed(0)
      : 0;
    return `- ${s.title}: target ${s.target_amount}, saved ${s.amount_saved} (${progress}%), ends ${s.end_date}, method: ${s.method}`;
  });

  const encouragementLine =
    (transactions.totalIncome || 0) > (transactions.totalExpenses || 0)
      ? "Great job maintaining a positive cash flow — keep it up!"
      : "Don't worry about the shortfall — small adjustments will get you back on track!";

  return `
You are TrExpenser's Financial Insights Assistant. Analyze the financial data below for ${userName}. Keep the tone ${tone}. Be concise.

--- USER DATA ---
Total Balance: ${transactions.totalBalance || 0}
Total Income: ${transactions.totalIncome || 0}
Total Expenses: ${transactions.totalExpenses || 0}

Recent Transactions (last 20):
${transactionsText}

Budgets:
Tracked categories: ${budgets.categories || "None"}
Spending limit: ${budgets.spendingLimit || 0}
Total spent: ${budgets.totalSpent || 0}
Spent rate: ${budgets.spentPercent || 0}%
${budgetsText}

Savings Goals:
Total saved: ${savings.totalSaved || 0}
${savingsText}
--- END USER DATA ---

Return ONLY a valid JSON object. No markdown. No code fences. No extra text.

{
  "introduction": "A short friendly 1-2 sentence intro addressed to ${userName}",
  "summary": ["3-5 short bullet points covering income, expenses, and net cash flow"],
  "review": ["2-3 strengths", "2-3 weaknesses or risks"],
  "suggestions": ["3-5 actionable prioritized suggestions"],
  "advice": ["3 practical short-term and long-term financial advice points"],
  "encouragement": "${encouragementLine}"
}
`.trim();
};