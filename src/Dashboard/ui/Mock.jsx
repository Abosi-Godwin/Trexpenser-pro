// services/supabase.js (or wherever your supabase client is initialized and exported)
import { createClient } from '@supabase/supabase-js';
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL; // Use environment variables
const supabaseKey = process.env.REACT_APP_SUPAPBASE_ANON_KEY;
export const supabase = createClient(supabaseUrl, supabaseKey); // Export it

// utils/CustomMethods.js (or wherever updateUserPic is defined)
import { supabase } from '../services/supabase'; // Import the client

export const updateUserPic = async (imageName, imageFile) => {
    console.log("Attempting to upload:", imageName);

    const { data, error } = await supabase.storage
        .from("profile-pictures") // Ensure this bucket exists and has correct RLS policies
        .upload(`public/${imageName}`, imageFile, { // Store in 'public' subfolder
            contentType: imageFile.type,
            upsert: true // Optionally overwrite if name clashes
        });

    if (error) {
        console.error("Error uploading image:", error.message);
        throw new Error("Image upload failed: " + error.message);
    }

    // Get the public URL after successful upload
    const { data: publicUrlData } = supabase.storage
        .from("profile-pictures")
        .getPublicUrl(`public/${imageName}`); // Use the same path here

    if (publicUrlData.error) {
        console.error("Error getting public URL:", publicUrlData.error.message);
        throw new Error("Failed to get public URL: " + publicUrlData.error.message);
    }

    return publicUrlData.publicUrl; // Return the full public URL
};


// UserSettings.jsx
import { useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { FaGoogle } from "react-icons/fa6";

import AvaterImg from "../../ui/AvatarImg";
import Button from "../Form/Button";
import Input from "../Form/Input";

import { useUser } from "../../Hooks/useUser";
// import { supabaseUrl } from "../../Services/Supabase"; // No longer needed here directly for imagePath
import { formatDate } from "../../Utils/formatDate";
import { useSignUp } from "../../Hooks/useSignUp";
import { updateUserPic } from "../../Utils/CustomMethods"; // Ensure correct import path

const UserSettings = () => {
    const { user, userName, userEmail } = useUser();
    const { signUp, isSigningUp, signUpIsError, signUpError } = useSignUp();

    const [isUploadingImage, setIsUploadingImage] = useState(false);
    const [uploadError, setUploadError] = useState(null);
    const [uploadSuccess, setUploadSuccess] = useState(false);

    const {
        register,
        reset,
        handleSubmit,
        watch,
        setValue, // For programmatically setting form values if needed
        formState: { errors }
    } = useForm({ mode: "all" });

    const newProfileImg = watch("profileImg");
    const imageFile = newProfileImg?.[0]; // Renamed for clarity

    // Only generate image name when a file is selected
    const imageName = imageFile ? `${Math.random()}-${imageFile.name}`.replaceAll("/", "").trim() : null;

    const handleImageUpload = async () => {
        if (!imageFile) {
            setUploadError("No image selected.");
            return;
        }

        setIsUploadingImage(true);
        setUploadError(null);
        setUploadSuccess(false);

        try {
            const publicUrl = await updateUserPic(imageName, imageFile);
            console.log('Image uploaded successfully:', publicUrl);
            setUploadSuccess(true);
            // TODO: Here, you should update the user's profile in your database
            // with the new `publicUrl`. This usually involves another Supabase call
            // e.g., await supabase.from('profiles').update({ avatar_url: publicUrl }).eq('id', user.id);
            // After successful update, you might want to re-fetch user data to update the UI
            // or directly update the state of AvaterImg.
            setValue("profileImg", null); // Clear the file input visually
            // reset({ profileImg: null }); // Can also use reset for specific fields
        } catch (error) {
            console.error("Failed to upload image:", error.message);
            setUploadError(error.message);
            setUploadSuccess(false);
        } finally {
            setIsUploadingImage(false);
        }
    };

    const submitFunc = userInputs => {
        // This handles password changes, not profile picture
        signUp({ ...userInputs });
    };

    return (
        <div className="bg-light-cardBackground flex-col rounded-md p-3">
            <h1 className="text-2xl font-bold">User settings.</h1>

            <div className="flex items-center gap-4 py-5">
                <div className="flex flex-col gap-3 items-center">
                    {/* AvaterImg should probably accept a prop for the current avatar URL */}
                    <AvaterImg src={user?.user_metadata?.avatar_url || '/default-avatar.png'} /> 
                    <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        id="profileImg"
                        {...register("profileImg")}
                        onChange={() => {
                            // Clear previous upload status when new file is selected
                            setUploadError(null);
                            setUploadSuccess(false);
                        }}
                    />
                    <label
                        htmlFor="profileImg"
                        className="p-1 bg-light-secondaryAccent rounded text-white font-bold text-md cursor-pointer"
                    >
                        {imageFile ? "Change Selected" : "Select New Image"}
                    </label>
                    {imageFile && ( // Only show "Upload" button if an image is selected
                        <Button
                            onClick={handleImageUpload}
                            disabled={isUploadingImage || isSigningUp}
                            className={`p-1 rounded text-white font-bold text-md ${isUploadingImage ? 'bg-gray-400' : 'bg-blue-600'}`}
                        >
                            {isUploadingImage ? "Uploading..." : "Upload Profile Picture"}
                        </Button>
                    )}

                    {uploadError && <p className="text-red-500 text-sm">{uploadError}</p>}
                    {uploadSuccess && <p className="text-green-500 text-sm">Upload successful!</p>}
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
                {/* ... Password inputs ... */}
                <Input
                    inputType="password"
                    placeholder="Enter your current password..."
                    label="current password"
                    className="p-3 rounded-md outline-0 border"
                    disable={isSigningUp}
                    register={register}
                    error={errors}
                    rules={{
                        // Make these rules conditional if password change is optional
                        // For example: if watch('new_password') has a value, then current_password is required
                        required: false, // Default to not required for overall form submission
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
                        required: false, // Default to not required
                        minLength: {
                            value: 6,
                            message: "Password must be at least 6 characters"
                        },
                        // Conditional validation: require if current password is provided
                        validate: (value) => {
                            const currentPassword = watch('current password'); // Use the actual name from register
                            if (currentPassword && !value) {
                                return 'New password is required if current password is provided.';
                            }
                            return true;
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
                        required: false, // Default to not required
                        validate: (value) => {
                            const newPassword = watch('new password'); // Use the actual name from register
                            if (newPassword && value !== newPassword) {
                                return 'Passwords do not match.';
                            }
                            return true;
                        }
                    }}
                />
                 <Button type="submit" disabled={isSigningUp}>
                    {isSigningUp ? "Updating..." : "Update Password"}
                </Button>
                {signUpIsError && <p className="text-red-500 text-sm">{signUpError?.message || "Password update failed."}</p>}
            </form>
        </div>
    );
};
export default UserSettings;
