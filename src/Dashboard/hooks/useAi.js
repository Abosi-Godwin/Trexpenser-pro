import { useMutation } from "@tanstack/react-query";
import { getSummary } from "../apis/ai/getSummary";
import toast from "react-hot-toast";

const STORAGE_KEY = "trexpenser_last_insight";

const getLastInsight = () => {
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        return stored ? JSON.parse(stored) : null;
    } catch {
        return null;
    }
};

const saveInsight = data => {
    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ data, timestamp: Date.now() })
    );
};

const isInsightFresh = () => {
    const last = getLastInsight();
    if (!last) return false;
    const oneHour = 1000 * 60 * 60;
    return Date.now() - last.timestamp < oneHour;
};

export const useAI = () => {
    const {
        mutate: getInsight,
        data: freshInsight,
        error: insightError,
        isPending: gettingInsights,
        isError: isInsightError
    } = useMutation({
        mutationFn: getSummary,
        onSuccess: data => {
            saveInsight(data);
            toast.success("Your financial summary is ready!");
        },
        onError: err => {
            console.error("Mutation error:", err);
            toast.error("Could not generate summary. Try again later.");
        }
    });

    const cachedInsight = getLastInsight();
    const insight =
        freshInsight ?? (isInsightFresh() ? cachedInsight?.data : null);

    const handleGetInsight = prompt => {
        if (isInsightFresh()) {
            toast("Using your summary from the last hour.", { icon: "⚡" });
            return;
        }
        getInsight(prompt);
    };

    return {
        getInsight: handleGetInsight,
        insight,
        insightError,
        isInsightError,
        gettingInsights,
        introduction: insight?.introduction,
        encouragement: insight?.encouragement,
        isFromCache: isInsightFresh()
    };
};
