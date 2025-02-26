import { useReducer, useState, useEffect } from "react";
import { FaEyeSlash, FaEye } from "react-icons/fa6";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../contexts/AuthContext.jsx";
import { supabase } from "../Utils/Supabase";

const SignupPage = () => {
    const navigate = useNavigate();
    const { registered, users } = useAuth();
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();

    const [hidePassword, setHidePassword] = useState("true");
    const [user, setUser] = useState(null);

    const onSubmit = async userInputs => {
        console.log(userInputs);
        const { data, error } = await supabase
            .from("Users")
            .insert([{ ...userInputs }])
            .select();
        setUser(data);
        console.log(data);
        alert("Hello");
    };

    useEffect(() => {
        if (user) {
            navigate("/login", { replace: true });
        }
    }, [user, navigate]);

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

                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex flex-col gap-1 py-3">
                        <div className="flex flex-col gap-1 pb-2">
                            <label className="text-md font-bold">
                                Username
                            </label>

                            <input
                                type="text"
                                required
                                placeholder="Enter your username..."
                                className="p-3 rounded-md outline-0 border"
                                {...register("userName")}
                            />
                        </div>
                        {errors.userName && <span>This field is required</span>}
                        <div className="flex flex-col gap-1">
                            <label className="text-md font-bold">Email</label>

                            <input
                                type="email"
                                required
                                placeholder="Enter your email..."
                                className="p-3 rounded-md outline-0 border"
                                {...register("userEmail", { required: true })}
                            />
                            {errors.userEmail && (
                                <span>This field is required</span>
                            )}
                        </div>

                        <div className="flex flex-col gap-1 pt-3">
                            <div
                                className="flex justify-between items-center
                            pr-2"
                            >
                                <label className="text-md font-bold">
                                    Password
                                </label>
                                <div className="p-2" onClick={!hidePassword}>
                                    {!hidePassword ? <FaEyeSlash /> : <FaEye />}
                                </div>
                            </div>
                            <input
                                type={hidePassword ? "password" : "text"}
                                required
                                placeholder="Enter your password..."
                                className="p-3 rounded-md outline-0 border"
                                {...register("userPassword", {
                                    required: true
                                })}
                            />
                            {errors.userPassword && (
                                <span>This field is required</span>
                            )}
                        </div>
                    </div>

                    <div className="py-2">
                        <div className="py-5">
                            <input
                                type="Submit"
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
