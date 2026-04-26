 import { useState } from "react";

import AvatarImg from "../../ui/AvatarImg";
import Button from "../Form/Button";
import UpdatePicForm from "../Form/UpdatePicForm";
import UpdatePasswordForm from "../Form/UpdatePasswordForm";

import { useUser } from "../../Hooks/useUser";
import { formatDate } from "../../Utils/formatDate";

const getMemberDuration = (date) => {
  if (!date) return null;
  const months = Math.floor(
    (new Date() - new Date(date)) / (1000 * 60 * 60 * 24 * 30)
  );
  if (months < 1) return "Less than a month";
  if (months < 12) return `${months} month${months > 1 ? "s" : ""}`;
  const years = Math.floor(months / 12);
  return `${years} year${years > 1 ? "s" : ""}`;
};

const UserSettings = () => {
  const [openPicForm, setOpenPicForm] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const { user, userName, userEmail } = useUser();

  if (!user) return null; // or a skeleton

  const joinedDate = user?.confirmed_at;
  const memberDuration = getMemberDuration(joinedDate);

  return (
    <>
      {openPicForm && <UpdatePicForm onClose={() => setOpenPicForm(false)} />}

      <div className="bg-light-cardBackground dark:bg-dark-cardBackground
        dark:text-dark-text rounded-md p-3 flex flex-col gap-4">

        <h2 className="text-2xl font-bold">User Settings</h2>

        {/* Avatar + info */}
        <div className="flex items-center gap-4">
          <div className="flex flex-col gap-2 items-center">
            <AvatarImg className="w-14 h-14 rounded-full object-cover" />
            <button
              onClick={() => setOpenPicForm(true)}
              className="text-xs text-light-secondaryAccent 
                dark:text-dark-secondaryAccent underline whitespace-nowrap"
            >
              Update photo
            </button>
          </div>

          <div className="flex flex-col gap-1">
            <p className="font-bold text-lg">{userName}</p>
            <p className="text-sm text-light-subtext dark:text-dark-subtext">
              {userEmail}
            </p>
            {joinedDate && (
              <>
                <p className="text-sm text-light-subtext dark:text-dark-subtext">
                  Joined {formatDate(joinedDate)}
                </p>
                <span className="text-xs w-fit bg-light-primaryCTA/10 
                  text-light-primaryCTA dark:text-dark-primaryCTA 
                  px-2 py-0.5 rounded-full font-medium">
                  Member for {memberDuration}
                </span>
              </>
            )}
          </div>
        </div>

        <hr className="border-light-dividers dark:border-dark-dividers" />

        {/* Password */}
        <UpdatePasswordForm />

        <hr className="border-light-dividers dark:border-dark-dividers" />

        {/* Danger zone */}
        <div className="border border-red-400 rounded-md p-3">
          <h3 className="font-bold text-red-500 mb-1">Danger Zone</h3>
          <p className="text-sm text-light-subtext dark:text-dark-subtext mb-3">
            Permanently delete your account and all your data. This cannot be undone.
          </p>

          {!showDeleteConfirm ? (
            <Button
              text="Delete account"
              onButtonClick={() => setShowDeleteConfirm(true)}
              className="bg-red-500 hover:bg-red-600 text-white px-3 
                py-1.5 rounded-md font-bold text-sm transition-colors"
            />
          ) : (
            <div className="flex items-center gap-3">
              <p className="text-sm font-semibold text-red-500">Are you sure?</p>
              <Button
                text="Yes, delete"
                className="bg-red-500 text-white px-3 py-1.5 
                  rounded-md font-bold text-sm"
                // onButtonClick={handleDeleteAccount} — wire when ready
              />
              <Button
                text="Cancel"
                onButtonClick={() => setShowDeleteConfirm(false)}
                className="bg-light-sectionBackground dark:bg-dark-sectionBackground 
                  px-3 py-1.5 rounded-md font-bold text-sm"
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default UserSettings;