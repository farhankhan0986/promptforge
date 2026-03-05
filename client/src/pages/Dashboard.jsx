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
    <div className="flex-1 bg-background px-8 lg:px-16 py-12 animate-fade-in">
      {/* Page header — editorial typography */}
      <h1 className="text-editorial-lg text-textdark mb-2">Dashboard</h1>
      <div className="w-12 h-0.5 bg-primary mb-10" />

      {/* Stats — typography-driven, no card+shadow pattern */}
      <div className="flex gap-12 mb-12">
        <div className="animate-fade-in stagger-1">
          <p className="font-mono text-xs text-textdark/50 uppercase tracking-wider mb-1">
            Total Prompts
          </p>
          {/* Large number for visual weight — display font */}
          <p className="font-display text-4xl font-bold text-textdark">
            {prompts.length}
          </p>
        </div>

        <div className="animate-fade-in stagger-2">
          <p className="font-mono text-xs text-textdark/50 uppercase tracking-wider mb-1">
            Categories Used
          </p>
          <p className="font-display text-4xl font-bold text-primary">
            {categories.size}
          </p>
        </div>
      </div>

      {/* Chart section — minimal container */}
      <div className="max-w-3xl mb-12 animate-fade-in stagger-3">
        <h2 className="font-display text-lg font-semibold text-textdark mb-1">
          Prompt Categories
        </h2>
        <div className="w-8 h-px bg-primary mb-6" />

        <div className="border border-surface p-6" style={{ borderRadius: "2px" }}>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={categoryData}>
              <XAxis
                dataKey="category"
                tick={{ fontFamily: '"IBM Plex Mono"', fontSize: 11, fill: '#4A4A4A' }}
                axisLine={{ stroke: '#CBCBCB' }}
                tickLine={false}
              />
              <YAxis
                tick={{ fontFamily: '"IBM Plex Mono"', fontSize: 11, fill: '#4A4A4A' }}
                axisLine={{ stroke: '#CBCBCB' }}
                tickLine={false}
              />
              <Tooltip
                contentStyle={{
                  fontFamily: '"IBM Plex Mono"',
                  fontSize: '12px',
                  backgroundColor: '#FFFFE3',
                  border: '1px solid #CBCBCB',
                  borderRadius: '2px',
                }}
              />
              {/* Sharp-edged bars — no rounded corners */}
              <Bar dataKey="count" fill="#6D8196" radius={0} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Top Tags — inline mono labels */}
      <div className="max-w-3xl mb-12 animate-fade-in stagger-4">
        <h2 className="font-display text-lg font-semibold text-textdark mb-1">
          Top Tags
        </h2>
        <div className="w-8 h-px bg-primary mb-6" />

        <div className="flex flex-wrap gap-3">
          {tagData.map((tag) => (
            <div
              key={tag.tag}
              className="font-mono text-xs tracking-wide px-4 py-2
                border border-primary text-primary
                transition-colors duration-200 hover:bg-primary hover:text-white"
              style={{ borderRadius: "2px" }}
            >
              {tag.tag} ({tag.count})
            </div>
          ))}
        </div>
      </div>

      {/* Recent Prompts — list with thin separators */}
      <div className="max-w-3xl mb-12 animate-fade-in stagger-5">
        <h2 className="font-display text-lg font-semibold text-textdark mb-1">
          Recent Prompts
        </h2>
        <div className="w-8 h-px bg-primary mb-6" />

        {recentPrompts.map((prompt) => (
          <div
            key={prompt.id}
            className="py-3 border-b border-surface cursor-pointer
              font-mono text-sm text-textdark/80
              hover:text-textdark hover:pl-2
              transition-all duration-200"
            onClick={() => navigate("/chats")}
          >
            {prompt.title}
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="flex gap-4">
        <button onClick={() => navigate("/")} className="btn-primary">
          <span className="font-mono text-xs">generate prompt</span>
        </button>
        <button onClick={() => navigate("/chats")} className="btn-secondary">
          <span className="font-mono text-xs">view prompts</span>
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
