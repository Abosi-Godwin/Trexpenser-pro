import { useState } from "react";


import AvaterImg from "../../ui/AvatarImg";
import Button from "../Form/Button";
import Input from "../Form/Input";
import UpdatePicForm from "../Form/UpdatePicForm";
import UpdatePasswordForm from "../Form/UpdatePasswordForm";

import { useUser } from "../../Hooks/useUser";
import { formatDate } from "../../Utils/formatDate";

const UserSettings = () => {
    const [openForm, setOpenForm] = useState(false);
    const { user, userName, userEmail } = useUser();

    const handleFormOpen = () => setOpenForm(prev => !prev);

    return (
        <>
            {openForm && <UpdatePicForm onClose={handleFormOpen} />}

            <div className="bg-light-cardBackground flex-col rounded-md p-3">
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
                <UpdatePasswordForm />
            </div>
        </>
    );
};
export default UserSettings;
