import { useState } from "react";
import { FaEyeSlash, FaEye } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAuth } from "../contexts/AuthContext";
import { motion } from "framer-motion";
import { slideUpVariant } from "../Utils/AnimationVariants";
import MiniLoader from "./Dashboard/ui/MiniLoader.jsx";
const LoginPage = () => {
    const { logIn, logInError, logInIsError, logInIsPending } = useAuth();

    const { register, handleSubmit } = useForm();
    const [hidePass, setHidePass] = useState(true);

    const handleLogin = enteredInfos => logIn(enteredInfos);

    return (
        <div
            className="bg-light-sectionBackground flex items-center justify-center h-screen
        max-h-dvh w-screen  overflow-hidden"
        >
            <motion.div
                variants={slideUpVariant}
                initial="hidden"
                animate="visible"
                viewport={{ once: true, amount: 0.1 }}
                className="p-4 rounded-md bg-white hadow-md shadow-color-2"
            >
                <div className="py-4">
                    <h1 className="font-extrabold text-2xl capitalize">
                        Sign into your account
                    </h1>
                </div>

                <form onSubmit={handleSubmit(handleLogin)}>
                    <div className="flex flex-col gap-1 py-3">
                        <div className="flex flex-col gap-1">
                            <label className="text-md font-bold">
                                Your Email
                            </label>

                            <input
                                type="email"
                                required
                                placeholder="Enter your email..."
                                className="p-3 rounded-md outline-0 border"
                                disabled={logInIsPending}
                                {...register("userEmail")}
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
                                    onClick={() => setHidePass(prev => !prev)}
                                >
                                    {!hidePass ? <FaEyeSlash /> : <FaEye />}
                                </div>
                            </div>
                            <input
                                type={hidePass ? "password" : "text"}
                                required
                                placeholder="Enter your password..."
                                disabled={logInIsPending}
                                className="p-3 rounded-md outline-0 border"
                                {...register("userPassword")}
                            />
                            {logInIsError && (
                                <p className="text-red-500 pt-3">
                                    {logInError.message.split(":")[1]}
                                </p>
                            )}
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
                            <button
                                type="submit"
                                className="bg-light-primaryCTA text-white font-extrabold
                            rounded-md p-2 uppercase w-full flex items-center
                            justify-center"
                                disabled={logInIsPending}
                            >
                                {logInIsPending ? (
                                    <MiniLoader />
                                ) : (
                                    "Login"
                                )}
                            </button>
                        </div>
                        <div>
                            <p>Not intentional about your budget yet?</p>
                            <Link
                                to="/signup"
                                className="text-light-primaryCTA font-bold"
                            >
                                Join us
                            </Link>
                        </div>
                    </div>
                </form>
            </motion.div>
        </div>
    );
};
export default LoginPage;
