import { useEffect, useState } from "react";
import axios from "axios";
import { Bar, Pie } from "react-chartjs-2";
import { SubHeadingText } from "../components/typography";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend);

const ENV = import.meta.env;

interface User {
  _id: string;
  name: string;
}

export function InsightsPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [aggregated, setAggregated] = useState<Record<string, number>>({});
  const [selectedUser, setSelectedUser] = useState<string>("all");
  const [chartType, setChartType] = useState<"bar" | "pie">("bar");

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    fetchAggregated();
  }, [selectedUser]);

  const fetchUsers = async () => {
    try {
      const res = await axios.get(`${ENV.VITE_API_URL}/api/user`, { withCredentials: true });
      setUsers(res.data.users);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchAggregated = async () => {
    try {
      const res = await axios.get(
        `${ENV.VITE_API_URL}/api/analytics?userId=${selectedUser}`,
        { withCredentials: true }
      );
      setAggregated(res.data.aggregated);
    } catch (err) {
      console.error(err);
    }
  };

  const chartData = {
    labels: Object.keys(aggregated),
    datasets: [
      {
        label: "Amount",
        data: Object.values(aggregated),
        backgroundColor: Object.keys(aggregated).map(
          () => "#" + Math.floor(Math.random() * 16777215).toString(16)
        ),
      },
    ],
  };

  return (
    <div className="min-h-screen p-6 text-white">
      <SubHeadingText className="text-yellow-400 mb-4">Analytics / Insights</SubHeadingText>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <select
          value={selectedUser}
          onChange={(e) => setSelectedUser(e.target.value)}
          className="px-3 py-2 rounded-lg bg-neutral-700 border border-yellow-400 text-white"
        >
          <option value="all">All Users</option>
          {users.map((u) => (
            <option key={u._id} value={u._id}>
              {u.name}
            </option>
          ))}
        </select>

        <select
          value={chartType}
          onChange={(e) => setChartType(e.target.value as "bar" | "pie")}
          className="px-3 py-2 rounded-lg bg-neutral-700 border border-yellow-400 text-white"
        >
          <option value="bar">Bar Chart</option>
          <option value="pie">Pie Chart</option>
        </select>
      </div>

      <div className="bg-neutral-800 p-5 rounded-xl shadow-md" style={{ height: "80vh" }}>
        {chartType === "bar" ? (
          <Bar data={chartData} options={{ responsive: true, maintainAspectRatio: false }} />
        ) : (
          <Pie data={chartData} options={{ responsive: true, maintainAspectRatio: false }} />
        )}
      </div>
    </div>
  );
}