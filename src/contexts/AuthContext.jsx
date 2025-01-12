import { createContext, useContext, useReducer } from "react";
import { loginDatas } from "../data/data.js";
const AuthContext = createContext({});
const useAuth = () => useContext(AuthContext);

const userVals = { user: null, isAuthenticated: false };

const reducer = (state, action) => {
    switch (action.type) {
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
    const [{ user, isAuthenticated }, dispatch] = useReducer(reducer, userVals);

    const login = (email, password) => {
        const info = loginDatas.find(
            data => data.email === email && data.password === password
        );

        if (info) {
            dispatch({ type: "login", payLoad: info });
        }
    };

    const logout = () => {
        dispatch({ type: "logout" });
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                isAuthenticated,
                login,
                logout
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export { AuthProvider, useAuth };
