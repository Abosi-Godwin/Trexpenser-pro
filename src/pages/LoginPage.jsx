import { useState } from "react";
import { FaEyeSlash, FaEye } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAuth } from "../contexts/AuthContext";
import { motion } from "framer-motion";
import { slideUpVariant } from "../Utils/AnimationVariants";
import MiniLoader from "./Dashboard/ui/MiniLoader";

import Input from "./Dashboard/ui/Input";
import Button from "./Dashboard/ui/Button";

const LoginPage = () => {
    const { logIn, logInError, logInIsError, logInIsPending } = useAuth();

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();
    const [hidePassword, setHidePassword] = useState(true);

    const handleLogin = enteredInfos => {
        logIn(enteredInfos);
    };
    const handleHidePassword = () => {
        setHidePassword(prev => !prev);
    };
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
                    <div className="flex flex-col gap-3 py-3">
                        <Input
                            label="email"
                            inputType="email"
                            placeholder="Enter your email..."
                            className="p-3 rounded-md outline-0 border"
                            disable={logInIsPending}
                            register={register}
                            error={errors}
                            rules={{ required: "Enter your email" }}
                        />

                        <Input
                            inputType={hidePassword ? "password" : "text"}
                            placeholder="Enter your password..."
                            label="password"
                            className="p-3 rounded-md outline-0 border"
                            disable={logInIsPending}
                            register={register}
                            error={errors}
                            rules={{
                                required: "Password is required"
                            }}
                            onHidePassword={handleHidePassword}
                            toggle={hidePassword}
                        />

                        <Button
                            text="Login"
                            type="submit"
                            className="bg-light-primaryCTA text-white font-extrabold
                            rounded-md p-2 uppercase w-full flex items-center
                            justify-center"
                            disabled={logInIsPending}
                            loader={logInIsPending}
                            onButtonClick={handleSubmit}
                        />
                    </div>

                    <div className="py-2">
                        <div className="flex justify-between font-bold py-2">
                            <div className="flex gap-2">
                                <input type="checkbox" />
                                <p>Remember me</p>
                            </div>
                            <div>
                                <h1 className="text-color-8">Lost password?</h1>
                            </div>
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
