import { useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { FaGoogle } from "react-icons/fa6";

import AvaterImg from "../../ui/AvatarImg";
import Button from "../Form/Button";
import Input from "../Form/Input";
import UpdatePicForm from "../Form/UpdatePicForm";

import { useUser } from "../../Hooks/useUser";
import { supabaseUrl } from "../../Services/Supabase";
import { formatDate } from "../../Utils/formatDate";
import { useSignUp } from "../../Hooks/useSignUp";

const UserSettings = () => {
    const [openForm, setOpenForm] = useState(false);
    const { user, userName, userEmail } = useUser();
    
    const { signUp, isSigningUp, signUpIsError, signUpError } = useSignUp();

    const {
        register,
        reset,
        handleSubmit,
        watch,
        formState: { errors }
    } = useForm({ mode: "all" });

    const handleFormOpen = () => setOpenForm(prev => !prev);

    const submitFunc = userInputs => {
        signUp({ ...userInputs });
    };

    return (
        <div className="bg-light-cardBackground flex-col rounded-md p-3">
            {openForm && <UpdatePicForm user={user} onClose={handleFormOpen} />}
            <h1 className="text-2xl font-bold">User settings.</h1>

            <div className="flex items-center gap-4 py-5">
                <div className="flex flex-col gap-3 items-center">
                    <AvaterImg className="w-14 h-14 rounded-full" />
                    <Button
                        onButtonClick={handleFormOpen}
                        text="update"
                        className="p-1
                        bg-light-secondaryAccent rounded text-white
                        font-bold text-md"
                    />
                </div>
                <div>
                    <p className="font-bold">Hi, {userName}</p>
                    <p>{userEmail}</p>
                    <p>Joined on {formatDate(user.confirmed_at)}</p>
                </div>
            </div>

            <form
                onSubmit={handleSubmit(submitFunc)}
                className="flex flex-col gap-3 py-3"
            >
                <h1 className="font-bold text-xl">Change password</h1>
                <Input
                    inputType="password"
                    placeholder="Enter your current password..."
                    label="current password"
                    className="p-3 rounded-md outline-0 border"
                    disable={isSigningUp}
                    register={register}
                    error={errors}
                    rules={{
                        required: "Password is required",
                        minLength: {
                            value: 6,
                            message: "Password must be at least 6 characters"
                        }
                    }}
                />
                <Input
                    inputType="password"
                    placeholder="Enter your new password..."
                    label="new password"
                    className="p-3 rounded-md outline-0 border"
                    disable={isSigningUp}
                    register={register}
                    error={errors}
                    rules={{
                        required: "Password is required",
                        minLength: {
                            value: 6,
                            message: "Password must be at least 6 characters"
                        }
                    }}
                />
                <Input
                    inputType="password"
                    placeholder="Confirm your new password..."
                    label="confirm password"
                    className="p-3 rounded-md outline-0 border"
                    disable={isSigningUp}
                    register={register}
                    error={errors}
                    rules={{
                        required: "Password is required",
                        minLength: {
                            value: 6,
                            message: "Password must be at least 6 characters"
                        }
                    }}
                />
            </form>
        </div>
    );
};
export default UserSettings;
