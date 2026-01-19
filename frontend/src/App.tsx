import { useState } from "react";
import VerifyPage from "./pages/verify";

type Pages = "verify";

export default function App() {

    const [page, setPage] = useState<Pages>("verify");

    return (
      <div className="min-h-screen w-full bg-neutral-900 text-neutral-50">
        {page === "verify" && (
          <VerifyPage/>
        )}
      </div>
    );
}