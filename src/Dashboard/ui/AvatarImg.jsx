import { useUser } from "../Hooks/useUser";

const AvatarImg = ({ className = "w-12 h-12 rounded-full" }) => {
    const { userImage } = useUser();

    return <img src={userImage} className={className} alt="user profile" />;
};

export default AvatarImg;
