import { useState } from "react";
import { SubHeadingText } from "../components/typography";

interface User {
  _id: string;
  name: string;
}

interface Spending {
  _id: string;
  amount: number;
  category: string;
  note: string;
}

export function TrackPage() {
  const [users] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [spendings] = useState<Spending[]>([]);

  return (
    <div className="min-h-screen p-6 text-white">
      <div className="flex flex-col lg:flex-row gap-6">

        {/* USERS PANEL */}
        <div className="bg-neutral-800 rounded-xl p-5 shadow-md w-full lg:w-1/3 space-y-4">

          <SubHeadingText className="text-yellow-400">
            Users
          </SubHeadingText>

          <button
            className="cursor-pointer w-full py-2 rounded-lg bg-yellow-400 text-neutral-900 font-semibold hover:bg-yellow-500 transition"
          >
            + Add User
          </button>

          <div className="space-y-2">
            {users.length === 0 && (
              <p className="text-gray-400 text-sm">
                No users created yet
              </p>
            )}

            {users.map((user) => (
              <button
                key={user._id}
                onClick={() => setSelectedUser(user)}
                className={`
                  cursor-pointer w-full text-left px-4 py-2 rounded-lg
                  transition
                  ${selectedUser?._id === user._id
                    ? "bg-yellow-400 text-neutral-900"
                    : "bg-neutral-700 hover:bg-neutral-600"}
                `}
              >
                {user.name}
              </button>
            ))}
          </div>
        </div>

        {/* SPENDING PANEL */}
        <div className="bg-neutral-800 rounded-xl p-5 shadow-md w-full lg:w-2/3 space-y-4">

          <SubHeadingText className="text-yellow-400">
            Spendings
          </SubHeadingText>

          {!selectedUser && (
            <p className="text-gray-400">
              Select a user to view spendings
            </p>
          )}

          {selectedUser && (
            <>
              <button
                className="cursor-pointer w-full py-2 rounded-lg bg-yellow-400 text-neutral-900 font-semibold hover:bg-yellow-500 transition"
              >
                + Add Spending
              </button>

              <div className="space-y-3">

                {spendings.length === 0 && (
                  <p className="text-gray-400 text-sm">
                    No spending records
                  </p>
                )}

                {spendings.map((item) => (
                  <div
                    key={item._id}
                    className="bg-neutral-700 p-4 rounded-lg flex justify-between items-center"
                  >
                    <div>
                      <p className="font-semibold">{item.category}</p>
                      <p className="text-sm text-gray-400">{item.note}</p>
                    </div>

                    <p className="text-yellow-400 font-bold">
                      ₱{item.amount}
                    </p>
                  </div>
                ))}

              </div>
            </>
          )}

        </div>
      </div>
    </div>
  );
}