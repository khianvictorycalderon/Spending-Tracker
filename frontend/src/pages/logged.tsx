import axios from "axios";
import type { Pages } from "../App";

interface LoggedPageProps {
  setPage: React.Dispatch<React.SetStateAction<Pages>>;
}

export default function LoggedPage({ setPage }: LoggedPageProps) {
  const handleLogout = async () => {
    try {
      const res = await axios.delete(`${import.meta.env.VITE_API_URL}/api/logout`, {
        withCredentials: true
      });
      alert(`Logged out! New OTP: ${res.data.otp}`);
      setPage("verify");
    } catch (err: unknown) {
      alert(
        axios.isAxiosError(err)
          ? err.response?.data?.message || `Request failed (${err.response?.status})`
          : err instanceof Error
            ? err.message
            : "Unknown error"
      );
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <h1 className="text-2xl font-bold text-green-400">You are logged in!</h1>
      <button
        onClick={handleLogout}
        className="mt-4 px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
      >
        Logout
      </button>
    </div>
  );
}
