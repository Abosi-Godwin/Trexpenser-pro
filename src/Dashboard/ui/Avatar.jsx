import {  memo } from "react";
import { useUser } from "../Hooks/useUser";
import AvatarImg from "./AvatarImg";
const Avatar = () => {
    const { user } = useUser();

    const userName = user?.user_metadata?.userName;
    const userEmail = user?.user_metadata?.email;

    return (
        <div className="w-full flex gap-2">
            <AvatarImg />
            <div className="flex flex-col">
                <h1 className="font-bold">{userName}</h1>
                <h3>{userEmail}</h3>
            </div>
        </div>
    );
};

export default memo(Avatar);
