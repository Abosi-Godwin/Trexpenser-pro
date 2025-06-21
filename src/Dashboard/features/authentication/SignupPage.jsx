import { useState } from "react";

import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaGoogle } from "react-icons/fa6";
import { Toaster } from "react-hot-toast";

import { slideUpVariant } from "../../Utils/AnimationVariants";
import { useSignUp } from "../../Hooks/useSignUp";
import { useGoogleSignUp } from "../../Hooks/useGoogleSignUp";

import Button from "../Form/Button";
import GoogleBtn from "../Form/GoogleBtn";
import Input from "../Form/Input";

/*
 Component starts
*/

const SignupPage = () => {
    const { signUp, isSigningUp, signUpIsError, signUpError } = useSignUp();

    const { signUpWithGoogle, signUpWithGoogleIsPending } = useGoogleSignUp();

    const {
        register,
        reset,
        handleSubmit,
        formState: { errors }
    } = useForm({ mode: "all" });

    const [hidePassword, setHidePassword] = useState(true);

    const handleHidePassword = () => {
        setHidePassword(prev => !prev);
    };

    const submitFunc = userInputs => {
        signUp({ ...userInputs });
    };

    const handleGoogleAut = () => {
        signUpWithGoogle();
    };

    return (
        <div
            className="bg-light-sectionBackground flex items-center justify-center h-screen
            max-h-dvh w-screen text-light-text overflow-hidden"
        >
            <Toaster />
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
                        <Input
                            label="name"
                            inputType="text"
                            disable={isSigningUp}
                            placeholder="Enter your username..."
                            className="p-3 rounded-md outline-0 border"
                            register={register}
                            error={errors}
                            rules={{
                                required: "Username can't be empty"
                            }}
                        />

                        <Input
                            inputType="email"
                            placeholder="Enter your email..."
                            label="email"
                            className="p-3 rounded-md outline-0 border"
                            disable={isSigningUp}
                            register={register}
                            error={errors}
                            rules={{
                                required: "Email is required"
                            }}
                        />

                        <Input
                            inputType={hidePassword ? "password" : "text"}
                            placeholder="Enter your password..."
                            label="password"
                            className="p-3 rounded-md outline-0 border"
                            disable={isSigningUp}
                            register={register}
                            error={errors}
                            rules={{
                                required: "Password is required",
                                minLength: {
                                    value: 6,
                                    message:
                                        "Password must be at least 6 characters"
                                }
                            }}
                            onHidePassword={handleHidePassword}
                            toggle={hidePassword}
                        />
                    </div>

                    <div className="py-2 flex flex-col gap-3">
                        <Button
                            text="Sign up"
                            loader={isSigningUp}
                            className="bg-light-primaryCTA text-white flex
                            items-center justify-center
                                font-extrabold rounded-md p-2 uppercase w-full
                                hover:bg-light-secondaryAccent"
                            disable={isSigningUp}
                            onButtonClick={handleSubmit}
                        />

                        <div
                            className="flex gap-3 items-center justify-between
                        "
                        >
                            <div
                                className="h-0.5 rounded-md w-20
                            bg-light-dividers"
                            ></div>
                            <h1>OR</h1>{" "}
                            <div
                                className="h-0.5 rounded-md w-20
                            bg-light-dividers"
                            ></div>
                        </div>

                        <GoogleBtn handleSignUp={handleGoogleAut} />

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
