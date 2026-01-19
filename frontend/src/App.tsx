import { useState } from "react";
import VerifyPage from "./pages/verify";

type Pages = "verify";

export default function App() {

    const [page, setPage] = useState<Pages>("verify");

    return (
      <>
        {page === "verify" && (
          <VerifyPage/>
        )}
      </>
    );
}