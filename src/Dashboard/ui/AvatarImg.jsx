
import { useUser } from "../Hooks/useUser";

const AvatarImg = ({ className = "w-12 h-12 rounded-full" }) => {
    const { user } = useUser();
    const userImage = user?.user_metadata?.picture;
    return <img src={userImage} className={className} alt="user profile" />;
};

export default AvatarImg;
