import { useState, useEffect } from "react";
import { SubHeadingText } from "../components/typography";
import axios from "axios";

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

const ENV = import.meta.env;

export function TrackPage() {
  const [state, setState] = useState<{
    users: User[];
    selectedUser: User | null;
    spendings: Spending[];
    newUserName: string;
    newSpending: { amount: number; category: string; note: string };
    editingSpendingId: string | null;
    editingSpending: { amount: number; category: string; note: string };
  }>({
    users: [],
    selectedUser: null,
    spendings: [],
    newUserName: "",
    newSpending: { amount: 0, category: "", note: "" },
    editingSpendingId: null,
    editingSpending: { amount: 0, category: "", note: "" },
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    if (state.selectedUser) {
      fetchSpendings(state.selectedUser._id);
    } else {
      setState(prev => ({ ...prev, spendings: [] }));
    }
  }, [state.selectedUser]);

  // --- Users ---
  const fetchUsers = async () => {
    try {
      const res = await axios.get(`${ENV.VITE_API_URL}/api/user`, { withCredentials: true });
      setState(prev => ({ ...prev, users: res.data.users }));
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!state.newUserName.trim()) return;
    try {
      const res = await axios.post(
        `${ENV.VITE_API_URL}/api/user`,
        { name: state.newUserName },
        { withCredentials: true }
      );
      setState(prev => ({
        ...prev,
        users: [...prev.users, res.data.user],
        newUserName: "",
      }));
    } catch (err) {
      console.error(err);
    }
  };

  // --- Spendings ---
  const fetchSpendings = async (userId: string) => {
    try {
      const res = await axios.get(`${ENV.VITE_API_URL}/api/user/${userId}/spending`, { withCredentials: true });
      setState(prev => ({ ...prev, spendings: res.data.spendings }));
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddSpending = async () => {
    if (!state.selectedUser) return;
    const { amount, category, note } = state.newSpending;
    if (!category || !amount) return;

    try {
      const res = await axios.post(
        `${ENV.VITE_API_URL}/api/user/${state.selectedUser._id}/spending`,
        { amount, category, note },
        { withCredentials: true }
      );
      setState(prev => ({
        ...prev,
        spendings: res.data.spendings,
        newSpending: { amount: 0, category: "", note: "" },
      }));
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteSpending = async (spendingId: string) => {
    if (!state.selectedUser) return;
    try {
      const res = await axios.delete(
        `${ENV.VITE_API_URL}/api/user/${state.selectedUser._id}/spending/${spendingId}`,
        { withCredentials: true }
      );
      setState(prev => ({ ...prev, spendings: res.data.spendings }));
    } catch (err) {
      console.error(err);
    }
  };

  const startEditSpending = (spending: Spending) => {
    setState(prev => ({
      ...prev,
      editingSpendingId: spending._id,
      editingSpending: { amount: spending.amount, category: spending.category, note: spending.note },
    }));
  };

  const cancelEditSpending = () => {
    setState(prev => ({ ...prev, editingSpendingId: null }));
  };

  const saveEditSpending = async () => {
    if (!state.selectedUser || !state.editingSpendingId) return;
    const { amount, category, note } = state.editingSpending;

    try {
      const res = await axios.put(
        `${ENV.VITE_API_URL}/api/user/${state.selectedUser._id}/spending/${state.editingSpendingId}`,
        { amount, category, note },
        { withCredentials: true }
      );
      setState(prev => ({
        ...prev,
        spendings: res.data.spendings,
        editingSpendingId: null,
        editingSpending: { amount: 0, category: "", note: "" },
      }));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen p-6 text-white">
      <div className="flex flex-col lg:flex-row gap-6">

        <div className="bg-neutral-800 rounded-xl p-5 shadow-md w-full lg:w-1/3 space-y-4">
          <SubHeadingText className="text-yellow-400">Users</SubHeadingText>
          <form className="flex gap-2" onSubmit={handleAddUser}>
            <input
              type="text"
              placeholder="New user name"
              value={state.newUserName}
              onChange={e => setState(prev => ({ ...prev, newUserName: e.target.value }))}
              className="flex-1 px-3 py-2 rounded-lg bg-neutral-700 text-white border border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
            <button
              type="submit"
              className="cursor-pointer px-4 py-2 rounded-lg bg-yellow-400 text-neutral-900 font-semibold hover:bg-yellow-500 transition"
            >
              + Add
            </button>
          </form>
          <div className="space-y-2">
            {state.users.length === 0 && <p className="text-gray-400 text-sm">No users created yet</p>}
            {state.users.map((user) => (
              <button
                key={user._id}
                onClick={() => setState(prev => ({ ...prev, selectedUser: user }))}
                className={`cursor-pointer w-full text-left px-4 py-2 rounded-lg transition
                  ${state.selectedUser?._id === user._id ? "bg-yellow-400 text-neutral-900" : "bg-neutral-700 hover:bg-neutral-600"}`}
              >
                {user.name}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-neutral-800 rounded-xl p-5 shadow-md w-full lg:w-2/3 space-y-4">
          <SubHeadingText className="text-yellow-400">Spendings</SubHeadingText>
          {!state.selectedUser && <p className="text-gray-400">Select a user to view spendings</p>}

          {state.selectedUser && (
            <>
              <div className="flex flex-col lg:flex-row gap-2">
                <input
                  type="number"
                  placeholder="Amount"
                  value={state.newSpending.amount || ""}
                  onChange={e => setState(prev => ({ ...prev, newSpending: { ...prev.newSpending, amount: Number(e.target.value) } }))}
                  className="flex-1 px-3 py-2 rounded-lg bg-neutral-700 text-white border border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
                <input
                  type="text"
                  placeholder="Category"
                  value={state.newSpending.category}
                  onChange={e => setState(prev => ({ ...prev, newSpending: { ...prev.newSpending, category: e.target.value } }))}
                  className="flex-1 px-3 py-2 rounded-lg bg-neutral-700 text-white border border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
                <input
                  type="text"
                  placeholder="Note"
                  value={state.newSpending.note}
                  onChange={e => setState(prev => ({ ...prev, newSpending: { ...prev.newSpending, note: e.target.value } }))}
                  className="flex-1 px-3 py-2 rounded-lg bg-neutral-700 text-white border border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
                <button
                  onClick={handleAddSpending}
                  className="cursor-pointer px-4 py-2 rounded-lg bg-yellow-400 text-neutral-900 font-semibold hover:bg-yellow-500 transition"
                >
                  + Add Spending
                </button>
              </div>

              <div className="space-y-3 mt-4">
                {state.spendings.length === 0 && <p className="text-gray-400 text-sm">No spending records</p>}

                {state.spendings.map((item) => (
                  <div key={item._id} className="bg-neutral-700 p-4 rounded-lg flex justify-between items-center">
                    {state.editingSpendingId === item._id ? (
                      <div className="flex flex-1 gap-2">
                        <input
                          type="number"
                          value={state.editingSpending.amount}
                          onChange={e => setState(prev => ({ ...prev, editingSpending: { ...prev.editingSpending, amount: Number(e.target.value) } }))}
                          className="flex-1 px-2 py-1 rounded-lg bg-neutral-600 text-white border border-yellow-400"
                        />
                        <input
                          type="text"
                          value={state.editingSpending.category}
                          onChange={e => setState(prev => ({ ...prev, editingSpending: { ...prev.editingSpending, category: e.target.value } }))}
                          className="flex-1 px-2 py-1 rounded-lg bg-neutral-600 text-white border border-yellow-400"
                        />
                        <input
                          type="text"
                          value={state.editingSpending.note}
                          onChange={e => setState(prev => ({ ...prev, editingSpending: { ...prev.editingSpending, note: e.target.value } }))}
                          className="flex-1 px-2 py-1 rounded-lg bg-neutral-600 text-white border border-yellow-400"
                        />
                        <button
                          onClick={saveEditSpending}
                          className="cursor-pointer px-2 py-1 bg-green-600 rounded-lg text-white hover:bg-green-700 transition"
                        >
                          Save
                        </button>
                        <button
                          onClick={cancelEditSpending}
                          className="cursor-pointer px-2 py-1 bg-gray-600 rounded-lg text-white hover:bg-gray-700 transition"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <div className="flex justify-between flex-1 items-center">
                        <div>
                          <p className="font-semibold">{item.category}</p>
                          <p className="text-sm text-gray-400">{item.note}</p>
                        </div>
                        <div className="flex items-center gap-4">
                          <p className="text-yellow-400 font-bold">₱{item.amount}</p>
                          <button
                            onClick={() => startEditSpending(item)}
                            className="cursor-pointer px-2 py-1 bg-blue-600 rounded-lg text-white text-sm hover:bg-blue-700 transition"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteSpending(item._id)}
                            className="cursor-pointer px-2 py-1 bg-red-600 rounded-lg text-white text-sm hover:bg-red-700 transition"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    )}
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