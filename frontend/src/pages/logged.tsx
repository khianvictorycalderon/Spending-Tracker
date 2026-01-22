import axios from "axios";
import type { Pages } from "../App";
import { useState } from "react";
import { NavBar } from "../components/navbar";
import { MessagePopUp } from "../components/pop-up";
import { AccountPage } from "./account";
import { TrackPage } from "./track";
import { InsightsPage } from "./insights";
import Footer from "../components/footer";
import GeneralFooter from "../components/general-footer";

interface LoggedPageProps {
  setPage: React.Dispatch<React.SetStateAction<Pages>>;
}

// Sub pages of logged page
type LoggedPages = "account" | "track" | "insights";

export default function LoggedPage({ setPage }: LoggedPageProps) {
  const [loggedPage, setLoggedPage] = useState<LoggedPages>("track");
  const [popupMessage, setPopupMessage] = useState<string | null>(null);

  const handleLogout = async () => {
    try {
      const res = await axios.delete(`${import.meta.env.VITE_API_URL}/api/logout`, {
        withCredentials: true
      });
      setPopupMessage(`Logged out! New OTP: ${res.data.otp}`);
    } catch (err: unknown) {
      const msg = axios.isAxiosError(err)
        ? err.response?.data?.message || `Request failed (${err.response?.status})`
        : err instanceof Error
        ? err.message
        : "Unknown error";

      setPopupMessage(msg);
    }
  };

  const buttonClassNames =
    "px-3 mx-1 py-2 my-2 hover:bg-neutral-700 transition duration-300 cursor-pointer";
  const navbarButtons = [
    { label: "Account", action: () => setLoggedPage("account"), className: buttonClassNames },
    { label: "Track", action: () => setLoggedPage("track"), className: buttonClassNames },
    { label: "Insights", action: () => setLoggedPage("insights"), className: buttonClassNames },
    { label: "Logout", action: handleLogout, className: buttonClassNames }
  ];

  let pageContent;
  switch (loggedPage) {
    case "account":
      pageContent = <AccountPage />;
      break;
    case "track":
      pageContent = <TrackPage />;
      break;
    case "insights":
      pageContent = <InsightsPage />;
      break;
  }

  return (
    <>
      <NavBar className="bg-neutral-800" title="Spending Tracker" buttons={navbarButtons} />
      <div className="min-h-screen pt-20">{pageContent}</div>

      {popupMessage && (
        <MessagePopUp
          message={popupMessage}
          theme="dark"
          onClose={() => {
            if (popupMessage.includes("New OTP")) setPage("verify");
            setPopupMessage(null);
          }}
        />
      )}
    </>
  );
}
