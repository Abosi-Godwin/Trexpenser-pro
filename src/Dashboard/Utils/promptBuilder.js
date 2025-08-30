export const buildTrexpenserPrompt = userData => {
    const {
        transactions = {},
        budgets = {},
        savings = {},
        userName = "User"
    } = userData;

    const tone = "friendly, motivating, and easy to understand";

    const formatList = (arr, mapper = x => JSON.stringify(x)) =>
        arr && arr.length ? arr.map(mapper).join("\n") : "None";

    // --- Transactions ---
    const transactionsText = formatList(
        transactions.currentUserTransactions || [],
        i =>
            `- Type > ${
                i.type
            }: category: ${i.category?.toLowerCase()} amount: ${i.amount}
        date: (${i.date})${i.description ? ` — ${i.description}` : ""}`
    );

    // --- Budgets ---
    const budgetsText = formatList(
        budgets.budgets || [],
        b => `- ${b.category?.toLowerCase()}: limit ${b.amount}, from
        ${b.start_date} to
        ${b.end_date}`
    );

    // --- Savings with progress percentage ---
    const savingsText = formatList(savings.savings || [], s => {
        const progress = s.target_amount
            ? ((s.amount_saved / s.target_amount) * 100).toFixed(0)
            : 0;
        return `- ${s.title}: target ${s.target_amount}, saved ${s.amount_saved} (${progress}% progress),
        start date ${s.start_date}, end date ${s.end_date}, method ${s.method}, is active ${s.is_active},
        funded by ${s.funded_by}`;
    });

    // --- Dynamic encouragement ---
    const encouragement =
        transactions.totalIncome > transactions.totalExpenses
            ? "Great job maintaining a positive cash flow — keep it up!"
            : "Don't worry about the shortfall — small adjustments will get you back on track!";

    // --- Final Prompt ---
    return `
You are Trexpenser’s Financial Insights Assistant. Analyze the following financial data for ${userName} and present the analysis in the structured format requested below. Keep the tone ${tone}.

--- USER DATA ---
 Total Balance:
${transactions.totalBalance || 0}
 Total Expenses:
${transactions.totalExpenses || 0}
 Total Income:
${transactions.totalIncome || 0}
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

List (if the savings method is manual, forget about the funded_by and percentage):
${savingsText}
--- END USER DATA ---

Deliver the output exactly in this structure:

1. SUMMARY
- Short overview of total income, total expenses, net cash flow (income - expenses).
- Key expense categories and whether budgets were exceeded.
- Progress percentages for each savings goal.

2. REVIEW
- Strengths (2–3 bullet points).
- Weaknesses / risks (2–3 bullet points).

3. SUGGESTIONS
- 3–5 actionable and prioritized suggestions for better tracking and budget control (short bullets).
- If applicable, suggest how to reallocate income, automate savings, or tweak budgets.

4. ADVICE
- 3 practical, friendly pieces of financial advice for short-term and long-term improvement (bulleted).
- If user is overspending, include at least one immediate step they can take this week.
- If income is unstable, include at least one suggestion to increase income stability.

Keep each section concise (3–6 short bullets), use numbers or bullets, and avoid jargon. When referencing monetary values, echo the values provided. End with this encouragement: ${encouragement}

Respond now using the user's data above and return something like this in a
clean JSON.
{
introduction: "string of introduction"
  review:  [array of your reviews],
  summary:  [array of your summary points],
  suggestions:  [array of your suggestions],
  advice:  [array of your advice],
}.
`.trim();
};
 