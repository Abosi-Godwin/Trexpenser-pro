import useAI from "../Apis/Ai/getInsights";
import { useAuth } from "../contexts/AuthContext";
import {useTransactions } from "../Hooks/useTransactions";
const Summary = () => {
    const { inSight, insightError, gettingInsights, getInsight } = useAI();
    const { savings } = useAuth();

    const amountSaved = savings
        .map(savings => savings.amount_saved)
        .reduce((a, b) => a + b, 0);

    const targetAmount = savings
        .map(savings => savings.target_amount)
        .reduce((a, b) => a + b, 0);
        
    const percentageSaved = Math.round((amountSaved / targetAmount) * 100);
    
    console.log(amountSaved, targetAmount, percentageSaved);

    const handleClick = () => {
        getInsight("What is a noun?");
    };
    return (
        <>
            <button
                className="bg-blue-400 font-bold text-md outline-none p-2
            text-white rounded-md capitalize"
                onClick={handleClick}
            >
                Get insight
            </button>
            <h1>Summary page</h1>
        </>
    );
};
export default Summary;
