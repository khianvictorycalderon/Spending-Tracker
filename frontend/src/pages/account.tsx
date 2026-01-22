import { useState } from "react";
import { InputLabel } from "../components/input-label";
import { SubHeadingText } from "../components/typography";
import { MessagePopUp, ConfirmPopUp } from "../components/pop-up";

interface Passwords {
  old_password: string;
  new_password: string;
  confirm_new_password: string;
}

type PopUpType = string | null;

export function AccountPage() {
  const [passwords, setPasswords] = useState<Passwords>({
    old_password: "",
    new_password: "",
    confirm_new_password: "",
  });

  const [popupMessage, setPopupMessage] = useState<PopUpType>(null);
  const [confirmClear, setConfirmClear] = useState<boolean>(false);

  const handleUpdatePassword = (): void => {
    setPopupMessage("Password update functionality coming soon!");
  };

  const handleClearData = (): void => {
    setConfirmClear(true);
  };

  const handleConfirmClearData = (): void => {
    setConfirmClear(false);
    setPopupMessage("Clear data functionality coming soon!");
  };

  const handleCancelClearData = (): void => {
    setConfirmClear(false);
  };

  return (
    <div className="min-h-screen p-8 text-white space-y-12">
      
      <div className="bg-neutral-800 p-6 rounded-xl shadow-md space-y-6 max-w-none lg:max-w-1/2 mx-auto">
        <SubHeadingText className="text-yellow-400">Update Password</SubHeadingText>
        
        <div className="flex flex-col gap-4">
          <InputLabel
            label="Old Password"
            type="password"
            value={passwords.old_password}
            setValue={(val) =>
              setPasswords((prev) => ({ ...prev, old_password: val as string}))
            }
            className="border-yellow-400 focus:ring-yellow-400"
          />
          <InputLabel
            label="New Password"
            type="password"
            value={passwords.new_password}
            setValue={(val) =>
              setPasswords((prev) => ({ ...prev, new_password: val as string}))
            }
            className="border-yellow-400 focus:ring-yellow-400"
          />
          <InputLabel
            label="Confirm New Password"
            type="password"
            value={passwords.confirm_new_password}
            setValue={(val) =>
              setPasswords((prev) => ({ ...prev, confirm_new_password: val as string}))
            }
            className="border-yellow-400 focus:ring-yellow-400"
          />

          <button
            type="button"
            onClick={handleUpdatePassword}
            className="mt-2 w-full py-2 rounded-lg bg-yellow-400 text-neutral-900 font-semibold hover:bg-yellow-500 transition duration-300 cursor-pointer"
          >
            Update Password
          </button>
        </div>
      </div>

      <div className="bg-neutral-800 p-6 rounded-xl shadow-md space-y-4 max-w-none lg:max-w-1/2 mx-auto">
        <SubHeadingText className="text-yellow-400">Clear Data</SubHeadingText>
        <p className="text-gray-400">
          Warning: This will delete the admin account and reset it to default credentials. This action cannot be undone.
        </p>
        <button
          type="button"
          onClick={handleClearData}
          className="mt-2 w-full py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white font-semibold transition duration-300 cursor-pointer"
        >
          Clear Data
        </button>
      </div>

      {popupMessage && (
        <MessagePopUp
          message={popupMessage}
          theme="dark"
          onClose={() => setPopupMessage(null)}
        />
      )}

      {confirmClear && (
        <ConfirmPopUp
          message="Are you sure you want to clear all data? This will reset the admin account."
          theme="dark"
          onConfirm={handleConfirmClearData}
          onCancel={handleCancelClearData}
        />
      )}
    </div>
  );
}
