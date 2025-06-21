import { useState } from "react";
import { useForm } from "react-hook-form";
import { format, addDays, isAfter, formatDistanceStrict } from "date-fns";

import { supabaseUrl } from "../../Services/Supabase";

import Modal from "../../ui/Modal";
import Button from "./Button";
import AvatarImg from "../../ui/AvatarImg";

const UpdatePicForm = ({ user, onClose }) => {
    const updatedAt = format(user?.updated_at, "PPpp");

    const [imgSrc, setImgSrc] = useState(user?.user_metadata?.picture);

    const nextUpdate = format(addDays(new Date(user.updated_at), 7), "PPpp");

    const canUpdate = isAfter(nextUpdate, updatedAt);

    const { register, reset, handleSubmit } = useForm({ mode: "all" });

    const handleImageUpload = data => {
        const { profileImg } = data;
        console.log(profileImg);
    };
    return (
        <Modal>
            <form onSubmit={handleSubmit(handleImageUpload)}>
                <div className="p-3 rounded-md bg-light-cardBackground w-4/5">
                    <div className="bg-ambrer-600 flex flex-col items-center justify-center gap-2 p-2 rounded-md bg-light-sidebarHeaderBackground">
                        <AvatarImg
                            className="w-20 h-20 rounded-full"
                            src={imgSrc}
                        />
                        <div>
                            {!canUpdate ? (
                                <div>
                                    <p className="text-sm">
                                        This current picture was last updated on
                                        {updatedAt}, and the next possible
                                        update will be on {nextUpdate}.
                                    </p>
                                </div>
                            ) : (
                                <>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        name="profileImg"
                                        id="profileImg"
                                        {...register("profileImg")}
                                    />

                                    <label
                                        htmlFor="profileImg"
                                        className=" p-1.5
                       rounded-md
                        font-bold text-md bg-light-sectionBackground"
                                    >
                                        update
                                    </label>
                                </>
                            )}
                        </div>
                    </div>
                    <div className="flex py-3 gap-3">
                        <Button
                            text="Close"
                            type="submt"
                            onButtonClick={onClose}
                            className="bg-light-sectionBackground font-extrabold
                            rounded-md p-2 uppercase w-full flex items-center
                            justify-center"
                        />
                        {canUpdate && (
                            <Button
                                text="Save"
                                type="submt"
                                disabled={canUpdate}
                                onButtonClick={handleSubmit}
                                className="bg-light-primaryCTA text-white font-extrabold
                            rounded-md p-2 uppercase w-full flex items-center
                            justify-center"
                            />
                        )}
                    </div>
                </div>
            </form>
        </Modal>
    );
};

export default UpdatePicForm;
