import { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [prompts, setPrompts] = useState([]);
  const navigate = useNavigate();

  const fetchPrompts = async () => {
    try {
      const { data } = await API.get("/prompts");
      setPrompts(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchPrompts();
  }, []);

  const categoryData = Object.values(
    prompts.reduce((acc, prompt) => {
      if (!acc[prompt.category]) {
        acc[prompt.category] = {
          category: prompt.category,
          count: 0,
        };
      }

      acc[prompt.category].count += 1;

      return acc;
    }, {}),
  );

  const tagData = Object.entries(
    prompts.reduce((acc, prompt) => {
      if (!prompt.tags) return acc;

      const tags = prompt.tags.split(",");

      tags.forEach((tag) => {
        const trimmed = tag.trim().toLowerCase();
      

        if (!acc[trimmed]) {
          acc[trimmed] = 0;
        }

        acc[trimmed] += 1;
      });

      return acc;
    }, {}),
  )
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  const recentPrompts = prompts.slice(0, 5);

  const categories = new Set(prompts.map((p) => p.category));

  return (
    <div className="flex-1 bg-[#FFFFE3] p-8">
      <h1 className="text-3xl font-bold text-[#4A4A4A] mb-6">Dashboard</h1>

      {/* Stats */}
      <div className="flex gap-6 mb-8">
        <div className="bg-[#CBCBCB] p-6 rounded shadow">
          <p className="text-gray-600">Total Prompts</p>
          <p className="text-2xl font-bold">{prompts.length}</p>
        </div>

        <div className="bg-[#CBCBCB] p-6 rounded shadow">
          <p className="text-gray-600">Categories Used</p>
          <p className="text-2xl font-bold">{categories.size}</p>
        </div>
      </div>

      <div className="bg-[#CBCBCB] p-6 rounded shadow mb-8 max-w-3xl">
        <h2 className="text-xl font-semibold mb-4 text-[#4A4A4A]">
          Prompt Categories
        </h2>

        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={categoryData}>
            <XAxis dataKey="category" />
            <YAxis />

            <Tooltip />

            <Bar dataKey="count" fill="#6D8196" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-[#CBCBCB] p-6 rounded shadow mb-8 max-w-3xl">
        <h2 className="text-xl font-semibold mb-4 text-[#4A4A4A]">Top Tags</h2>

        <div className="flex flex-wrap gap-3">
          {tagData.map((tag) => (
            <div
              key={tag.tag}
              className="bg-[#6D8196] text-white px-4 py-2 rounded"
            >
              {tag.tag} ({tag.count})
            </div>
          ))}
        </div>
      </div>


      {/* Recent Prompts */}
      <div className="bg-[#CBCBCB] p-6 rounded shadow mb-6">
        <h2 className="text-xl font-semibold mb-4">Recent Prompts</h2>

        {recentPrompts.map((prompt) => (
          <div
            key={prompt.id}
            className="p-2 border-b border-gray-400 cursor-pointer"
            onClick={() => navigate("/chats")}
          >
            {prompt.title}
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="flex gap-4">
        <button
          onClick={() => navigate("/")}
          className="bg-[#6D8196] text-white px-6 py-2 rounded"
        >
          Generate Prompt
        </button>

        <button
          onClick={() => navigate("/chats")}
          className="bg-[#4A4A4A] text-white px-6 py-2 rounded"
        >
          View Prompts
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
