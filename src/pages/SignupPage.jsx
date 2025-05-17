import { useState } from "react";

import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { slideUpVariant } from "../Utils/AnimationVariants";
import { useAuth } from "../contexts/AuthContext";

import Button from "./Dashboard/ui/Button";

/*
 Component starts
*/

import Input from "./Dashboard/ui/Input";
const SignupPage = () => {
    const { signUp, isSigningUp, signUpIsError, signUpError, signedUpSuccess } =
        useAuth();

    const {
        register,
        reset,
        getValues,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm({ mode: "all" });

    const [hidePassword, setHidePassword] = useState(true);

    const handleHidePassword = () => {
        setHidePassword(prev => !prev);
    };

    const submitFunc = userInputs => {
       
        signUp({...userInputs});

        if (signedUpSuccess) reset();
    };
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
                        <Input
                            label="userName"
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

                    <div className="py-2">
                        <Button
                            text="Sign up"
                            type="submit"
                            loader={isSigningUp}
                            className="bg-light-primaryCTA text-white flex
                            items-center justify-center
                                font-extrabold rounded-md p-2 uppercase w-full
                                hover:bg-light-secondaryAccent"
                            disable={isSigningUp}
                            onButtonClick={handleSubmit}
                        />

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
