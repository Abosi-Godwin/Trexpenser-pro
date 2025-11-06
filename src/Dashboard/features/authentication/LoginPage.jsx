import { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { Toaster } from "react-hot-toast";

import Input from "../Form/Input";
import Button from "../Form/Button";
import GoogleBtn from "../Form/GoogleBtn";
//import UpdatePassword from "./updatedPassword";
import { useLogIn } from "../../Hooks/useLogIn";
import { slideUpVariant } from "../../Utils/AnimationVariants";

const LoginPage = () => {
    const { logIn, logInIsPending } = useLogIn();

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();

    const [hidePassword, setHidePassword] = useState(true);
    const [remember, setRemember] = useState(true);

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
            <Toaster />
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
                    <div className="flex justify-between py-2">
                        <div className="flex gap-2 font-bold">
                            <input
                                type="checkbox"
                                name="remember"
                              
                            />
                            <p>Remember me</p>
                        </div>
                        <Link to="/forgotPassword">
                            <h1 className="">Lost password?</h1>
                        </Link>
                    </div>
                </form>
                <div className="py-4 flex flex-col gap-3">
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
                    <GoogleBtn />
                    <div className="flex gap-5 items-center">
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
