import { useState } from "react";
import { InputLabel } from "../components/input-label";
import { SubHeadingText } from "../components/typography";
import { MessagePopUp, ConfirmPopUp } from "../components/pop-up";
import axios from "axios";

interface Passwords {
  old_password: string;
  new_password: string;
  confirm_new_password: string;
}

interface Fetchings {
  is_updating_password: boolean;
  is_clearing_data: boolean;
}

const ENV = import.meta.env;

type PopUpType = string | null;

export function AccountPage() {

  const emptyPasswordsFields: Passwords = {
    old_password: "",
    new_password: "",
    confirm_new_password: "",
  }

  const [passwords, setPasswords] = useState<Passwords>(emptyPasswordsFields);

  const [popupMessage, setPopupMessage] = useState<PopUpType>(null);
  const [confirmClear, setConfirmClear] = useState<boolean>(false);

  const [isFetching, setIsFetching] = useState<Fetchings>({
    is_updating_password: false,
    is_clearing_data: false
  });


  const handleUpdatePassword = async () => {
    setIsFetching(prev => ({ ...prev, is_updating_password: true }));

    try {
      
      const res = await axios.post(`${ENV.VITE_API_URL}/api/password/update`, passwords, { withCredentials: true });
      setPopupMessage(res.data.message || "Password updated");

      // Clears the password fields upon success
      setPasswords(emptyPasswordsFields);

    } catch (err: unknown) {
      const msg = axios.isAxiosError(err)
        ? err.response?.data?.message || `Request failed (${err.response?.status})`
        : err instanceof Error
        ? err.message
        : "Unknown error";
      setPopupMessage(msg);
    } finally {
      setIsFetching(prev => ({ ...prev, is_updating_password: false }));
    }
  };

  const handleClearData = () => setConfirmClear(true);

  const handleConfirmClearData = async () => {
    setConfirmClear(false);
    setIsFetching(prev => ({ ...prev, is_clearing_data: true }));

    try {
      const res = await axios.delete(`${ENV.VITE_API_URL}/api/admin/clear`, { withCredentials: true });
      setPopupMessage(res.data.message || "Admin account cleared. Default credentials restored.");
    } catch (err: unknown) {
      const msg = axios.isAxiosError(err)
        ? err.response?.data?.message || `Request failed (${err.response?.status})`
        : err instanceof Error
        ? err.message
        : "Unknown error";
      setPopupMessage(msg);
    } finally {
      setIsFetching(prev => ({ ...prev, is_clearing_data: false }));
    }
  };

  const handleCancelClearData = () => setConfirmClear(false);

  return (
    <div className="min-h-screen p-8 text-white space-y-12">
      
      <div className="bg-neutral-800 p-6 rounded-xl shadow-md space-y-6 max-w-none lg:max-w-1/2 mx-auto">
        <SubHeadingText className="text-yellow-400">Update Password</SubHeadingText>
        
        <form className="flex flex-col gap-4">
          <InputLabel
            label="Old Password"
            type="password"
            value={passwords.old_password}
            setValue={(val) =>
              setPasswords((prev) => ({ ...prev, old_password: val as string }))
            }
            className={`border-yellow-400 focus:ring-yellow-400 ${
              isFetching.is_updating_password ? "opacity-50 cursor-not-allowed" : ""
            }`}
            required
            disabled={isFetching.is_updating_password}
          />
          <InputLabel
            label="New Password"
            type="password"
            value={passwords.new_password}
            setValue={(val) =>
              setPasswords((prev) => ({ ...prev, new_password: val as string }))
            }
            className={`border-yellow-400 focus:ring-yellow-400 ${
              isFetching.is_updating_password ? "opacity-50 cursor-not-allowed" : ""
            }`}
            required
            disabled={isFetching.is_updating_password}
          />
          <InputLabel
            label="Confirm New Password"
            type="password"
            value={passwords.confirm_new_password}
            setValue={(val) =>
              setPasswords((prev) => ({ ...prev, confirm_new_password: val as string }))
            }
            className={`border-yellow-400 focus:ring-yellow-400 ${
              isFetching.is_updating_password ? "opacity-50 cursor-not-allowed" : ""
            }`}
            required
            disabled={isFetching.is_updating_password}
          />
          <button
            type="submit"
            disabled={isFetching.is_updating_password}
            onClick={handleUpdatePassword}
            className={`mt-2 w-full py-2 rounded-lg bg-yellow-400 text-neutral-900 font-semibold hover:bg-yellow-500 transition duration-300 cursor-pointer ${
              isFetching.is_updating_password ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            Update Password
          </button>
        </form>
      </div>

      <div className="bg-neutral-800 p-6 rounded-xl shadow-md space-y-4 max-w-none lg:max-w-1/2 mx-auto">
        <SubHeadingText className="text-yellow-400">Clear Data</SubHeadingText>
        <p className="text-gray-400">
          Warning: This will delete the admin account and reset it to default credentials. This action cannot be undone.
        </p>
        <button
          type="button"
          disabled={isFetching.is_clearing_data}
          onClick={handleClearData}
          className={`mt-2 w-full py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white font-semibold transition duration-300 cursor-pointer ${
            isFetching.is_clearing_data ? "opacity-50 cursor-not-allowed" : ""
          }`}
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
