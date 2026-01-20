import { useState } from "react";
import { InputLabel } from "../components/input-label";
import { HeadingText } from "../components/typography";

export default function VerifyPage() {
  const [password, setPassword] = useState<string>("");
  const [otp, setOTP] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ password, otp });
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-neutral-900 p-4">
      <div className="w-full max-w-md p-8 bg-neutral-800 rounded-xl shadow-lg flex flex-col gap-6">

        <HeadingText className="text-center text-yellow-400 text-2xl">
          Login Account
        </HeadingText>

        <form
          className="flex flex-col gap-4"
          onSubmit={handleSubmit}
        >

          <InputLabel
            label="Password"
            value={password}
            setValue={setPassword}
            type="text"
            className="
              bg-transparent
              text-white
              border-yellow-400
              focus:ring-yellow-400
              focus:border-yellow-400
              w-full
            "
          />

          <InputLabel
            label="OTP"
            value={otp}
            setValue={setOTP}
            type="text"
            className="
              bg-transparent
              text-white
              border-yellow-400
              focus:ring-yellow-400
              focus:border-yellow-400
              w-full
            "
          />

          <button
            type="submit"
            className="
              mt-4 w-full py-2 rounded-lg bg-yellow-400 text-neutral-900
              font-semibold text-sm transition hover:bg-yellow-500
              focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-1
            "
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
