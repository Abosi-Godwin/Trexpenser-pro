import { createContext, useContext, useReducer } from "react";
import { loginDatas } from "../data/data.js";
const AuthContext = createContext({});
const useAuth = () => useContext(AuthContext);

const userVals = {
    user: null,
    users: [...loginDatas],
    registered: false,
    isAuthenticated: true
};

const reducer = (state, action) => {
    switch (action.type) {
        case "signup":
            return {
                ...state,
                users: [...state.users, action.payLoad],
                registered: true
            };
        case "login":
            return {
                ...state,
                user: action.payLoad,
                isAuthenticated: true
            };
        case "logout":
            return {
                ...state,
                user: null,
                isAuthenticated: false
            };

        default:
            throw new Error("Action was used outside the environment");
    }
};

const AuthProvider = ({ children }) => {
    const [{ user, users, isAuthenticated, registered }, dispatch] = useReducer(
        reducer,
        userVals
    );

    const logIn = (email, password) => {
        const info = loginDatas.find(
            data => data.email === email && data.password === password
        );

        if (info) {
            dispatch({ type: "login", payLoad: info });
        }
    };

    const signUp = data => {
      console.log(data)
        dispatch({ type: "signup", payLoad: data });
        console.log(users);
    };

    const logOut = () => {
        dispatch({ type: "logout" });
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                users,
                isAuthenticated,
                registered,
                logIn,
                signUp,
                logOut
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export { AuthProvider, useAuth };
