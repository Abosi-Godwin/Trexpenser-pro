import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import { slideUpVariant } from "../../Utils/AnimationVariants";
import { useSignUp } from "../../Hooks/useSignUp";

import Button from "../Form/Button";
import GoogleBtn from "../Form/GoogleBtn";
import Input from "../Form/Input";

const SignupPage = () => {
    const { signUp, isSigningUp, emailSent } = useSignUp();

    let email = "";

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors }
    } = useForm();

    const [visibility, setVisibility] = useState({
        password: false,
        confirmPassword: false
    });

    const toggleVisibility = field => {
        setVisibility(prev => ({
            ...prev,
            [field]: !prev[field]
        }));
    };

    const submitFunc = data => {
        email = data.email;
        signUp(data);
    };

    if (emailSent) {
        return (
            <div>
                <h2>Check your email</h2>
                <p>
                    We sent a confirmation link to <strong>{email}</strong>
                </p>
                <p>Click the link to activate your account.</p>
            </div>
        );
    }
    return (
        <div className="bg-light-sectionBackground flex items-center justify-center h-screen max-h-dvh w-screen text-light-text overflow-hidden">
            <motion.div
                variants={slideUpVariant}
                initial="hidden"
                animate="visible"
                className="p-4 rounded-md bg-white shadow-md shadow-color-2"
            >
                <h1 className="font-extrabold text-2xl py-4">
                    Sign up for an account
                </h1>

                <form onSubmit={handleSubmit(submitFunc)}>
                    <div className="flex flex-col gap-2 py-3">
                        <Input
                            name="name"
                            label="Name"
                            inputType="text"
                            disabled={isSigningUp}
                            placeholder="Enter your username..."
                            register={register}
                            error={errors}
                            rules={{ required: "Username can't be empty" }}
                        />

                        <Input
                            name="email"
                            label="Email"
                            inputType="email"
                            disabled={isSigningUp}
                            placeholder="Enter your email..."
                            register={register}
                            error={errors}
                            rules={{ required: "Email is required" }}
                        />

                        <Input
                            name="password"
                            label="Password"
                            inputType={
                                visibility.password ? "text" : "password"
                            }
                            disabled={isSigningUp}
                            placeholder="Enter your password..."
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
                            onHidePassword={() => toggleVisibility("password")}
                            toggle={visibility.password}
                        />

                        <Input
                            name="confirmPassword"
                            label="Confirm Password"
                            inputType={
                                visibility.confirmPassword ? "text" : "password"
                            }
                            disabled={isSigningUp}
                            placeholder="Confirm your password..."
                            register={register}
                            error={errors}
                            rules={{
                                required: "Please confirm your password",
                                validate: value =>
                                    value === watch("password") ||
                                    "Passwords do not match"
                            }}
                            onHidePassword={() =>
                                toggleVisibility("confirmPassword")
                            }
                            toggle={visibility.confirmPassword}
                        />
                    </div>

                    <Button
                        text="Sign up"
                        loader={isSigningUp}
                        className="bg-light-primaryCTA text-white flex items-center justify-center font-extrabold rounded-md p-2 uppercase w-full hover:bg-light-secondaryAccent"
                        disabled={isSigningUp}
                        type="submit"
                    />
                </form>

                <div className="py-4 flex flex-col gap-3">
                    <div className="flex gap-3 items-center justify-between">
                        <div className="h-0.5 w-20 bg-light-dividers" />
                        <span>OR</span>
                        <div className="h-0.5 w-20 bg-light-dividers" />
                    </div>

                    <GoogleBtn />

                    <div className="flex items-center gap-2">
                        <p>Already a member?</p>
                        <Link
                            to="/login"
                            className="text-light-primaryCTA font-bold"
                        >
                            Login
                        </Link>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default SignupPage;
