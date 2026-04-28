import { formatCurrency } from "../Utils/formatCurrency";
import { useUser } from "../Hooks/useUser";

export const useCurrency = () => {
    const { user } = useUser();
    const currency = user?.user_metadata?.currency ?? "NGN";

    const format = amount => formatCurrency(amount, currency);

    return { currency, format };
};
