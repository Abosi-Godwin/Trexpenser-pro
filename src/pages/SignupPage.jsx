import { useReducer, useEffect } from "react";
import { FaEyeSlash, FaEye } from "react-icons/fa6";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../contexts/AuthContext.jsx";

const initialVal = {
    userName: "",
    userEmail: "",
    userPass: "",
    errorMessage: "",
    hidePass: true,
    showError: false
};
const reducer = (state, action) => {
    switch (action.type) {
        case "name":
            return { ...state, userName: action.payLoad };
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
const SignupPage = () => {
    const navigate = useNavigate();
    const { signUp, registered, users } = useAuth();

    const [
        { userName, userEmail, userPass, errorMessage, hidePass, showError },
        dispatch
    ] = useReducer(reducer, initialVal);

    const handleForm = e => {
        e.preventDefault();
        if (!userName || !userEmail || !userPass) {
            dispatch({ type: "showError", payLoad: "Fill all inputs" });
            return;
        }
        const userData = {
            name: userName,
            email: userEmail,
            password: userPass
        };
        const checkUser = (userData, users) => {
            const theresUser = users.find(
                user => user.email === userData.email
            );
            //  console.log(theresUser);
            if (theresUser) {
                dispatch({ type: "showError", payLoad: "Email already used" });
            } else {
                signUp(userData);
            }
        };
        checkUser(userData, users);
    };

    useEffect(() => {
        if (registered) {
            navigate("/login", { replace: true });
        }
    }, [registered, navigate]);

    return (
        <div
            className="bg-color-1 flex items-center justify-center h-screen
            max-h-dvh
        w-screen overflow-hidden"
        >
            <div className="p-4 rounded-md bg-white hadow-md shadow-color-2">
                <div className="py-4">
                    <h1 className="font-extrabold text-2xl">
                        Sign-up for an account
                    </h1>
                </div>

                <form>
                    <div className="flex flex-col gap-1 py-3">
                        <div className="flex flex-col gap-1 pb-2">
                            <label className="text-md font-bold">
                                Username
                            </label>

                            <input
                                type="text"
                                required
                                placeholder="Enter your username..."
                                value={userName}
                                onChange={e =>
                                    dispatch({
                                        type: "name",
                                        payLoad: e.target.value
                                    })
                                }
                                className="p-3 rounded-md outline-0 border"
                            />
                        </div>

                        <div className="flex flex-col gap-1">
                            <label className="text-md font-bold">Email</label>

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
                                    Password
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
                        <div className="py-5">
                            <input
                                type="Submit"
                                onClick={e => handleForm(e)}
                                className="bg-color-8 text-color-2 font-extrabold
                            rounded-md p-2 uppercase w-full"
                            />
                        </div>
                        <div className="flex items-center gap-3">
                            <p>Already a member?</p>
                            <Link
                                to="/login"
                                className="text-color-8 font-bold"
                            >
                                Login
                            </Link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};
export default SignupPage;
