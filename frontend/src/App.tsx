import { useState, useEffect } from "react";
import VerifyPage from "./pages/verify";
import LoggedPage from "./pages/logged";
import axios from "axios";

export type Pages = "verify" | "logged";

const ENV = import.meta.env;

export default function App() {
  const [page, setPage] = useState<Pages>("verify");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const res = await axios.get(
          `${ENV.VITE_API_URL}/api/check-session`,
          { withCredentials: true }
        );

        if (res.data.loggedIn) {
          setPage("logged");
        }

      } catch (err: unknown) {
        // 401 = not logged in (NORMAL)
        if (axios.isAxiosError(err) && err.response?.status === 401) {
          setPage("verify");
        } else {
          console.error("Session check failed:", err);
        }
      } finally {
        setLoading(false);
      }
    };

    checkSession();
  }, []);


  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Checking session...
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-neutral-900 text-neutral-50 flex items-center justify-center">
      {page === "verify" && <VerifyPage setPage={setPage} />}
      {page === "logged" && <LoggedPage setPage={setPage} />}
    </div>
  );
}