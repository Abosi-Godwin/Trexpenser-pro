import { useReducer, useEffect } from "react";
import { FaEyeSlash, FaEye } from "react-icons/fa6";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../contexts/AuthContext.jsx";

const initialVal = {
    userEmail: "bbnl6060@gmail.com",
    userPass: "060620",
    errorMessage: "",
    hidePass: true,
    showError: false
};
const reducer = (state, action) => {
    switch (action.type) {
        case "email":
            return { ...state, userEmail: action.payLoad };
        case "pass":
            return { ...state, userPass: action.payLoad };
        case "showError":
            return {
                ...state,
                showError: !state.showError,
                errorMessage: action.payLoad
            };
        case "hidePass":
            return { ...state, hidePass: !state.hidePass };
        default:
            throw new Error("Unknown action");
    }
};
const Login = () => {
    const navigate = useNavigate();
    const { login, isAuthenticated, user } = useAuth();
    const [
        { userEmail, userPass, errorMessage, hidePass, showError },
        dispatch
    ] = useReducer(reducer, initialVal);

    const handleForm = e => {
        e.preventDefault();
        if (!userEmail || !userPass) return;
        login(userEmail, userPass);
    };

    useEffect(() => {
        if (isAuthenticated) {
            navigate("/dashboard", { replace: true });
        }

        if (!user) {
            dispatch({ type: "showError", payLoad: "User not found" });
        }
    }, [isAuthenticated, navigate, user, dispatch]);

    return (
        <div className="bg-color-1 flex items-center justify-center h-screen w-screen overflow-hidden">
            <div className="p-4 rounded-md bg-white hadow-md shadow-color-2">
                <div className="py-4">
                    <h1 className="font-extrabold text-2xl capitalize">
                        Sign into your account
                    </h1>
                </div>

                <form>
                    <div className="flex flex-col gap-1 py-3">
                        <div className="flex flex-col gap-1">
                            <label className="text-md font-bold">
                                Your Email
                            </label>

                            <input
                                type="email"
                                required
                                placeholder="Enter your email..."
                                value={userEmail}
                                onChange={e =>
                                    dispatch({
                                        type: "email",
                                        payLoad: e.target.value
                                    })
                                }
                                className="p-3 rounded-md outline-0 border"
                            />
                        </div>

                        <div className="flex flex-col gap-1 pt-3">
                            <div
                                className="flex justify-between items-center
                            pr-2"
                            >
                                <label className="text-md font-bold">
                                    Your Password
                                </label>
                                <div
                                    className="p-2"
                                    onClick={() =>
                                        dispatch({ type: "hidePass" })
                                    }
                                >
                                    {!hidePass ? <FaEyeSlash /> : <FaEye />}
                                </div>
                            </div>
                            <input
                                type={hidePass ? "password" : "text"}
                                required
                                placeholder="Enter your password..."
                                value={userPass}
                                onChange={e =>
                                    dispatch({
                                        type: "pass",
                                        payLoad: e.target.value
                                    })
                                }
                                className="p-3 rounded-md outline-0 border"
                            />
                            <p
                                className={`text-red-500 pt-1 ${
                                    !showError && "hidden"
                                }`}
                            >
                                {errorMessage}
                            </p>
                        </div>
                    </div>
                    <div className="py-2">
                        <div className="flex justify-between font-bold">
                            <div className="flex gap-2">
                                <input type="checkbox" />
                                <p>Remember me</p>
                            </div>
                            <div>
                                <h1 className="text-color-8">Lost password?</h1>
                            </div>
                        </div>
                        <div className="py-5">
                            <input
                                type="submit"
                                onClick={e => handleForm(e)}
                                className="bg-color-8 text-color-2 font-extrabold
                            rounded-md p-2 uppercase w-full"
                            />
                        </div>
                        <div>
                            <p>Not intentional about your budget yet?</p>
                            <Link to="/" className="text-color-8 font-bold">
                                Join us
                            </Link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};
export default Login;
