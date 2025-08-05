import { useEffect, useState } from "react";

export const useToday = () => {
    const [today, setToday] = useState();
    useEffect(() => {
        const todayDate = new Date().toISOString().split("T")[0];
        setToday(todayDate);
    }, [setToday]);

    return { today };
};
