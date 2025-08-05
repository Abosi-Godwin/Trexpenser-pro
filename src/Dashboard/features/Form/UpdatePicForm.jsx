import { useForm } from "react-hook-form";
import { format, addDays, isAfter } from "date-fns";

import { supabaseUrl } from "../../Services/Supabase";
import { useUser } from "../../Hooks/useUser";
import { useUpdatePic } from "../../Hooks/useUpdateProfilePic";

import Modal from "../../ui/Modal";
import Button from "./Button";
import AvatarImg from "../../ui/AvatarImg";

const UpdatePicForm = ({ onClose }) => {
    const { user } = useUser();
    const { updatePic, updatedPic } = useUpdatePic();
    const { register, reset, handleSubmit } = useForm({ mode: "all" });

    const updatedAt = format(user?.updated_at, "PPpp");
    const nextUpdate = format(addDays(new Date(user.updated_at), 7), "PPpp");
    const canUpdate = isAfter(nextUpdate, updatedAt);

    const handleImageUpload = data => {
        const { profileImg } = data;
        const newImage = profileImg?.[0];

        if (!newImage) return;

        const imagePath = `${supabaseUrl}`;
        const imageName = `${Math.random()}-${newImage.name}`;

        updatePic({ imagePath, imageName, newImage });
        console.log(updatedPic)
        reset();
    };

    return (
        <Modal>
            <form
                onSubmit={handleSubmit(handleImageUpload)}
                className="w-full h-4/5 flex items-center justify-center"
            >
                <div className="p-3 rounded-md bg-light-cardBackground w-4/5">
                    <div
                        className="flex flex-col items-center justify-center
                    gap-5 p-2 rounded-md bg-light-sidebarHeaderBackground"
                    >
                        <AvatarImg className="w-20 h-20 rounded-full" />

                        {!canUpdate ? (
                            <div>
                                <p className="text-sm">
                                    This current picture was last updated on
                                    {updatedAt}, and the next possible update
                                    will be on {nextUpdate}.
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
                                    Select
                                </label>
                            </>
                        )}
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
