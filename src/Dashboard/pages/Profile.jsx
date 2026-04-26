// Profile.jsx
import UserSettings from "../features/settings/userSettings";
import AppSettings from "../features/settings/appSettings";

const Profile = () => {
  return (
    <div className="grid grid-cols-1 gap-3">
      <UserSettings />
      <AppSettings />
    </div>
  );
};

export default Profile;