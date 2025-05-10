import { useState } from "react";
import { FaEyeSlash, FaEye } from "react-icons/fa6";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { slideUpVariant } from "../Utils/AnimationVariants";
import { useAuth } from "../contexts/AuthContext";
/*
 Component starts
*/
const SignupPage = () => {
    const { signUp, isSigningUp, signUpIsError, signUpError } = useAuth();

    const { register, handleSubmit } = useForm();
    const [hidePassword, setHidePassword] = useState(true);

    const handleHidePassword = () => {
        setHidePassword(prev => !prev);
    };

    const submitFunc = userInputs => signUp({ ...userInputs });

    return (
        <div
            className="bg-light-sectionBackground flex items-center justify-center h-screen
            max-h-dvh w-screen text-light-text overflow-hidden"
        >
            <motion.div
                variants={slideUpVariant}
                initial="hidden"
                animate="visible"
                viewport={{ once: true, amount: 0.1 }}
                className="p-4 rounded-md bg-white hadow-md shadow-color-2"
            >
                <div className="py-4">
                    <h1 className="font-extrabold text-2xl">
                        Sign-up for an account
                    </h1>
                </div>

                <form onSubmit={handleSubmit(submitFunc)}>
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

                        <div className="flex flex-col gap-1">
                            <label className="text-md font-bold">Email</label>

                            <input
                                type="email"
                                required
                                placeholder="Enter your email..."
                                className="p-3 rounded-md outline-0 border"
                                disabled={isSigningUp}
                                {...register("userEmail", { required: true })}
                            />

                            {signUpIsError && (
                                <p className="text-red-500 pt-3">
                                    {signUpError.message.split(":")[1]}
                                </p>
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
                                <div
                                    className="p-2"
                                    disabled={isSigningUp}
                                    onClick={handleHidePassword}
                                >
                                    {!hidePassword ? <FaEyeSlash /> : <FaEye />}
                                </div>
                            </div>
                            <input
                                type={hidePassword ? "password" : "text"}
                                required
                                placeholder="Enter your password..."
                                className="p-3 rounded-md outline-0 border"
                                disabled={isSigningUp}
                                {...register("userPassword", {
                                    required: true
                                })}
                            />
                        </div>
                    </div>

                    <div className="py-2">
                        <div className="py-5">
                            <button
                                type="submit"
                                className="bg-light-primaryCTA text-white
                                font-extrabold rounded-md p-2 uppercase w-full
                                hover:bg-light-secondaryAccent"
                                disabled={isSigningUp}
                            >
                                {!isSigningUp ? "Submit" : "Submitting..."}
                            </button>
                        </div>
                        <div className="flex items-center gap-3">
                            <p>Already a member?</p>
                            <Link
                                to="/login"
                                className="text-light-primaryCTA font-bold"
                            >
                                Login
                            </Link>
                        </div>
                    </div>
                </form>
            </motion.div>
        </div>
    );
};
export default SignupPage;
