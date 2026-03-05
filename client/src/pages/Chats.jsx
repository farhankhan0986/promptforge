import { useEffect, useState } from "react";
import API from "../services/api";
import { Search } from "lucide-react";
import PromptCard from "../components/PromptCard";

const Chats = () => {
  const [prompts, setPrompts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [expandedId, setExpandedId] = useState(null);

  const filteredPrompts = prompts.filter((prompt) =>
    (prompt.title + prompt.category + prompt.tags + prompt.improved_prompt)
      .toLowerCase()
      .includes(search.toLowerCase()),
  );

  const fetchPrompts = async () => {
    try {
      const { data } = await API.get("/prompts");
      setPrompts(data);
    } catch (error) {
      console.error(error);
      alert("Failed to load prompts");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPrompts();
  }, []);

  const deletePrompt = async (id) => {
    if (!window.confirm("Are you sure you want to delete this prompt?")) return;
    try {
      await API.delete(`/prompts/${id}`);
      fetchPrompts(); // Refresh the list of prompts
    } catch (error) {
      console.error(error);
      alert("Failed to delete prompt");
    }
  };

  return (
    <div className="flex-1 bg-[#FFFFE3] p-8 overflow-auto">
      <h1 className="text-3xl font-bold text-[#4A4A4A] mb-6">Saved Prompts</h1>

      <div className="flex items-center border border-gray-400 rounded p-2 max-w-md m-6">
        <Search size={18} className="mr-2 text-gray-500" />

        <input
          type="text"
          placeholder="Search prompts..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full outline-none bg-transparent text-gray-700 placeholder-gray-500"
        />
      </div>

      {loading && <p>Loading prompts...</p>}

      <div className="space-y-4 max-w-4xl">
        {filteredPrompts.map((prompt) => (
  <PromptCard
    key={prompt.id}
    prompt={prompt}
    deletePrompt={deletePrompt}
  />
))}
        {filteredPrompts.length === 0 && (
          <p className="text-gray-600">No prompts found</p>
        )}
      </div>
    </div>
  );
};

export default Chats;
