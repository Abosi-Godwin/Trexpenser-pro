import { createContext, useState, useEffect, useContext } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import {
    userSignUp,
    userLogIn,
    userLogOut,
    getCurrentUser,
    getUserTransactions,
    getUserBudgets,
    insertTransaction,
    deleteTransacationApi,
    getInsightsAPI,
    getSavingsApi,
    updateSavingsApi,
    addSavingsApi
} from "../Utils/CustomMethods";

const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
    const [incomes, setIncomes] = useState();
    const [expenses, setExpenses] = useState();
    const [userId, setUserId] = useState(null);
    const queryClient = useQueryClient();

    //_______AUTHENTICATION START_______
    const {
        data: user,
        error: userError,
        isError: isUserError,
        isPending: isUserLoading
    } = useQuery({
        queryKey: ["user"],
        queryFn: getCurrentUser
    });

    const {
        mutate: signUp,
        isPending: isSigningUp,
        isError: signUpIsError,
        isSuccess: signedUpSuccess,
        error: signUpError
    } = useMutation({
        mutationFn: userSignUp,
        onError: err => {
            toast.error(`Failed, ${err.message}`);
        }
    });

    const {
        mutate: logIn,
        isPending: logInIsPending,
        error: logInError,
        isError: logInIsError
    } = useMutation({
        mutationFn: userLogIn,
        onSuccess: () => {
            queryClient.invalidateQueries();
        },
        onError: error => {
            toast(error.message);
        }
    });

    const {
        mutate: logOut,
        isPending: isLoggingOut,
        isSuccess: loggedOut
    } = useMutation({
        mutationFn: userLogOut,
        onSuccess: () => {
            queryClient.removeQueries();
        }
    });

    //_______TRANSACTIONS START ____\\

    //_______GET TRANSACTIONS_____\\
    const {
        data: transactions,
        error: transactionsError,
        isError: istransactionsError,
        isPending: istransactionsLoading
    } = useQuery({
        queryKey: ["transactions"],
        queryFn: () => getUserTransactions(userId),
        enabled: !!userId
    });

    //_______ADD TRANSACTIONS_____
    const {
        mutate: addTransaction,
        data: addedTransaction,
        isPending: isAddingTransaction,
        isError: isAddingTransactionError,
        isSuccess: isAddingTransactionSucces
    } = useMutation({
        mutationFn: insertTransaction,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["transactions"],
                userId
            });
            toast.success("Transaction successfully added!");
        },
        onError: () => {
            toast.error("Unable to add transaction.");
        }
    });

    //_______DELETE TRANSACTIONS_____
    const {
        mutate: deleteTransaction,
        data: deletedTransaction,
        isPending: isdeletingTransaction,
        isError: isDeletingTransactionError,
        isSuccess: isDeletingTransactionSucces
    } = useMutation({
        mutationFn: deleteTransacationApi,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["transactions"],
                userId
            });
            toast.success("Transaction successfully deleted!");
        },
        onError: () => {
            toast.error("Unable to delete transaction.");
        }
    });

    const {
        data: savings,
        error: savingsError,
        isError: isSavingsError,
        isPending: isSavingsLoading
    } = useQuery({
        queryKey: ["savings"],
        queryFn: () => getSavingsApi(userId),
        enabled: !!userId
    });

    const {
        mutate: updateSavings,
        isPending: isUpdatingSavings,
        isSuccess: updatedSavings
    } = useMutation({
        mutationFn:  updateSavingsApi,

        onSuccess: data => {
            queryClient.invalidateQueries({
                queryKey: ["savings"]
            });
            toast.success(`${data[0].title} savings updated.`);
        }
    });
    /*const {
        mutate: updateSavings,
        isPending: isUpdatingSavings,
        isSuccess: updatedSavings
    } = useMutation({
        mutationFn: ({ amountToSave, savingsId }) =>
            updateSavingsApi(amountToSave, savingsId),

        onSuccess: data => {
            queryClient.invalidateQueries({
                queryKey: ["savings"]
            });
            toast.success(`${data[0].title} savings updated.`);
        }
    });*/
    const {
        mutate: createSavings,
        isPending: isCreatingSavings,
        isSuccess: createdSavings
    } = useMutation({
        mutationFn: 
            addSavingsApi
        ,

        onSuccess: data => {
            queryClient.invalidateQueries({
                queryKey: ["savings"]
            });
            toast.success(`savings created successfully.`);
            //  toast.success(`${data[0].title} savings updated.`);
        }
    });

    const {
        data: budgets,
        error: budgetsError,
        isError: isBudgetsError,
        isPending: isBudgetsLoading
    } = useQuery({
        queryKey: ["budgets"],
        queryFn: () => getUserBudgets(userId),
        enabled: !!userId
    });
    //  console.log("Context", budgets);

    useEffect(() => {
        if (transactions) {
            setIncomes(
                transactions.filter(
                    transaction => transaction.type === "income"
                )
            );
            setExpenses(
                transactions.filter(
                    transaction => transaction.type === "expense"
                )
            );
        }
    }, [transactions]);

    useEffect(() => {
        if (user && !isUserLoading) {
            const UId = user?.user?.id;
            setUserId(UId);
        }
    }, [user, isUserLoading]);

    return (
        <AuthContext.Provider
            value={{
                //FUNCTIONS
                signUp,
                logIn,
                logOut,
                addTransaction,
                deleteTransaction,
                updateSavings,
                createSavings,
                //getInsights,
                getInsightsAPI,
                //DATAS
                user,
                transactions,
                budgets,
                incomes,
                expenses,
                addedTransaction,
                savings,
                //insights,
                //loginInfos,

                //Loading /\ STATUS
                isUserLoading,
                isSigningUp,
                signUpIsError,
                signedUpSuccess,
                istransactionsLoading,
                logInIsPending,
                logInIsError,
                isLoggingOut,
                loggedOut,
                istransactionsError,
                isUserError,
                isAddingTransaction,
                isAddingTransactionError,
                isAddingTransactionSucces,
                isdeletingTransaction,
                isUpdatingSavings,
                updatedSavings,
                isCreatingSavings,
                //Errosrs
                userError,
                logInError,
                signUpError,
                transactionsError
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

function useAuth() {
    return useContext(AuthContext);
}

export { AuthProvider, useAuth };
