import { formatCurrency } from "../utils/formatCurrency";
import { useUser } from "../hooks/useUser";

export const useCurrency = () => {
    const { user } = useUser();
    const currency = user?.user_metadata?.currency ?? "NGN";

    const format = amount => formatCurrency(amount, currency);

    return { currency, format };
};
