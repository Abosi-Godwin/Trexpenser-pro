import { useMutation } from "@tanstack/react-query";

import { getSummary } from "./getSummary";

const useAI = () => {
    const {
        mutate: getInsight,
        data: insight,
        error: insightError,
        isPending: gettingInsights,
        isError: isInsightError
    } = useMutation({
        mutationFn: getSummary
    });
    
const introduction = insight?.introduction
const encouragement = insight?.encouragement

    return {
        getInsight,
        insight,
        insightError,
        isInsightError,
        gettingInsights
    };
};

export default useAI;
