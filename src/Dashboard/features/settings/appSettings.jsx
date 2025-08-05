import { useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { FaGoogle } from "react-icons/fa6";

import AvaterImg from "../../ui/AvatarImg";
import Button from "../Form/Button";
import Input from "../Form/Input";

import { useUser } from "../../Hooks/useUser";
import { supabase, supabaseUrl } from "../../Services/Supabase";
import { formatDate } from "../../Utils/formatDate";
import { useSignUp } from "../../Hooks/useSignUp";
import { useUpdatePic } from "../../Hooks/useUpdateProfilePic";

const AppSettings = () => {
    const { user, userName, userEmail } = useUser();

    const { signUp, isSigningUp, signUpIsError, signUpError } = useSignUp();

    const {
        register,
        reset,
        handleSubmit,
        watch,
        formState: { errors }
    } = useForm({ mode: "all" });

    const newProfileImg = watch("profileImg");
    const image = newProfileImg?.[0];

    const imageName = `${Math.random()}-${newProfileImg?.[0]?.name}`
        .replaceAll("/", "")
        .trim();

    const imagePath = `${supabaseUrl}/storage/v1/object/public/avatars//${imageName}`;

    const updateImage = Boolean(newProfileImg);

    if (updateImage) {
        // useUpdatePic(imageName, image);
        reset();
    }

    const submitFunc = userInputs => {
        signUp({ ...userInputs });
    };

    return (
        <div className="bg-light-cardBackground flex-col rounded-md p-3">
            <h1 className="text-2xl font-bold">App settings.</h1>
 
        </div>
    );
};
export default AppSettings;
