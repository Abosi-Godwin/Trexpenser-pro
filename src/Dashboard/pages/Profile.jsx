import UserSettings from "../features/settings/userSettings";
import AppSettings from "../features/settings/appSettings";
import { useUser } from "../Hooks/useUser";
const Profile = () => {
    const { user } = useUser();

    return (
        <div className="grid grid-cols-1 gap-3">
            <UserSettings />
            <AppSettings />
        </div>
    );
};

export default Profile;
