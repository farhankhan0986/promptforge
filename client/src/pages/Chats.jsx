import { useEffect, useState } from "react";
import API from "../services/api";
import { Search } from "lucide-react";
import PromptCard from "../components/PromptCard";
import { toast } from "sonner";

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
      toast.error("Failed to load prompts");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPrompts();
  }, []);

  const confirmDelete = (id) => {
    toast("Delete this prompt?", {
      description: "This action cannot be undone.",
      action: {
        label: "Delete",
        onClick: () => deletePrompt(id),
      },
      cancel: {
        label: "Cancel",
      },
    });
  };

  const deletePrompt = async (id) => {
    try {
      await API.delete(`/prompts/${id}`);

      toast.success("Prompt deleted");

      fetchPrompts();
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete prompt");
    }
  };

  return (
    <div className="flex-1 bg-background px-8 lg:px-16 py-12 overflow-auto animate-fade-in">
      {/* Page header */}
      <h1 className="text-editorial-lg text-textdark mb-2">Saved Prompts</h1>
      <div className="w-12 h-0.5 bg-primary mb-8" />

      {/* Search input — custom styled, underline only */}
      <div
        className="flex items-center max-w-md mb-8 border-b-2 border-surface
        focus-within:border-primary transition-colors duration-200"
      >
        <Search size={16} className="text-primary/40 mr-3 shrink-0" />
        <input
          type="text"
          placeholder="Search prompts..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full py-2.5 font-mono text-sm bg-transparent
            text-textdark placeholder-textdark/30 outline-none"
        />
      </div>

      {loading && (
        <p className="font-mono text-sm text-textdark/50">Loading prompts...</p>
      )}

      <div className="max-w-3xl">
        {filteredPrompts.map((prompt) => (
          <PromptCard
            key={prompt.id}
            prompt={prompt}
            deletePrompt={confirmDelete}
          />
        ))}
        {!loading && filteredPrompts.length === 0 && (
          <p className="font-mono text-sm text-textdark/40 py-8">
            No prompts found
          </p>
        )}
      </div>
    </div>
  );
};

export default Chats;
