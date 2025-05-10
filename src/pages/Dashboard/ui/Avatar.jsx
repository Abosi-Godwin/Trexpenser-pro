import { useAuth } from "../../../contexts/AuthContext";

const Avatar = () => {
    const { user } = useAuth();
    const userName = user?.user?.user_metadata?.userName;
    const userEmail = user?.user?.user_metadata?.email;

    return (
        <div className="w-full flex gap-2">
            <img src="/avatar.png" className="w-12 h-12 rounded-full"
            alt="user profile" />
            <div className="flex flex-col">
                <h1 className="font-bold">{userName}</h1>
                <h3>{userEmail}</h3>
            </div>
        </div>
    );
};

export default Avatar;
