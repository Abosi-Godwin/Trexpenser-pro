import { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { Toaster } from "react-hot-toast";

import Input from "../Form/Input";
import Button from "../Form/Button";
import GoogleBtn from "../Form/GoogleBtn";
import { useLogIn } from "../../hooks/useLogIn";
import { slideUpVariant } from "../../utils/AnimationVariants";

const LoginPage = () => {
    const { logIn, logInIsPending } = useLogIn();

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();

    const [showPassword, setShowPassword] = useState(false);

    const handleLogin = data => {
        logIn(data);
    };

    return (
        <div className="flex items-center justify-center max-h-dvh w-screen overflow-hidden">
            <Toaster />

            <motion.div
                variants={slideUpVariant}
                initial="hidden"
                animate="visible"
                className="p-4 rounded-md bg-white shadow-md shadow-color-2"
            >
                <h1 className="font-extrabold text-2xl py-4">
                    Sign into your account
                </h1>

                <form onSubmit={handleSubmit(handleLogin)}>
                    <div className="flex flex-col gap-3 py-3">
                        <Input
                            name="email"
                            label="Email"
                            inputType="email"
                            placeholder="Enter your email..."
                            disabled={logInIsPending}
                            register={register}
                            autoComplete="email"
                            error={errors}
                            rules={{ required: "Enter your email" }}
                        />

                        <Input
                            name="password"
                            label="Password"
                            inputType={showPassword ? "text" : "password"}
                            placeholder="Enter your password..."
                            disabled={logInIsPending}
                            register={register}
                              autoComplete="current-password"
                            error={errors}
                            rules={{ required: "Password is required" }}
                            isPassword
                            toggle={showPassword}
                            onHidePassword={() =>
                                setShowPassword(prev => !prev)
                            }
                        />

                        <Button
                            text="Login"
                            type="submit"
                            className="bg-light-primaryCTA text-white font-extrabold rounded-md p-2 uppercase w-full flex items-center justify-center"
                            disabled={logInIsPending}
                            loader={logInIsPending}
                        />
                    </div>

                    <div className="flex justify-between py-2">
                        <label className="flex gap-2 font-bold items-center">
                            <input type="checkbox" {...register("remember")} />
                            Remember me
                        </label>

                        <Link to="/forgot-password">Lost password?</Link>
                    </div>
                </form>

                <div className="py-4 flex flex-col gap-3">
                    <div className="flex gap-3 items-center justify-between">
                        <div className="h-0.5 w-20 bg-light-dividers" />
                        <span>OR</span>
                        <div className="h-0.5 w-20 bg-light-dividers" />
                    </div>

                    <GoogleBtn />

                    <div className="flex gap-3 items-center">
                        <p>Not a member yet?</p>
                        <Link
                            to="/signup"
                            className="text-light-primaryCTA font-bold"
                        >
                            Join us
                        </Link>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default LoginPage;
