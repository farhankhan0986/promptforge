import { useEffect, useState } from "react";
import API from "../services/api";
import { Search, Plus } from "lucide-react";
import PromptCard from "../components/PromptCard";
import PromptFormModal from "../components/PromptFormModal";
import { toast } from "sonner";

const Chats = () => {
  const [prompts, setPrompts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  // Modal state
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editingPrompt, setEditingPrompt] = useState(null);

  const filteredPrompts = prompts.filter((prompt) =>
    (prompt.title + (prompt.category ?? "") + (prompt.tags ?? "") + prompt.improved_prompt)
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

  // Add a brand-new prompt manually
  const handleAddPrompt = async (form) => {
    try {
      await API.post("/prompts", form);
      toast.success("Prompt added!");
      fetchPrompts();
    } catch (error) {
      console.error(error);
      toast.error("Failed to add prompt");
      throw error; // keep modal open on failure
    }
  };

  // Open edit modal for a specific prompt
  const handleOpenEdit = (prompt) => {
    setEditingPrompt(prompt);
    setEditModalOpen(true);
  };

  // Save edits to existing prompt
  const handleEditPrompt = async (form) => {
    try {
      await API.put(`/prompts/${editingPrompt.id}`, form);
      toast.success("Prompt updated!");
      fetchPrompts();
    } catch (error) {
      console.error(error);
      toast.error("Failed to update prompt");
      throw error; // keep modal open on failure
    }
  };

  return (
    <div className="flex-1 bg-background px-8 lg:px-16 py-12 overflow-auto animate-fade-in">
      {/* Page header */}
      <div className="flex items-start justify-between mb-2">
        <h1 className="text-editorial-lg text-textdark">Saved Prompts</h1>
        {/* Add Prompt button */}
        <button
          id="add-prompt-btn"
          onClick={() => setAddModalOpen(true)}
          className="btn-primary flex items-center gap-2 mt-1"
        >
          <Plus size={15} />
          <span className="font-mono text-xs">add prompt</span>
        </button>
      </div>
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
            onEdit={handleOpenEdit}
          />
        ))}
        {!loading && filteredPrompts.length === 0 && (
          <div className="py-16 text-center">
            <p className="font-mono text-sm text-textdark/40 mb-4">
              No prompts found
            </p>
            <button
              onClick={() => setAddModalOpen(true)}
              className="btn-primary flex items-center gap-2 mx-auto"
            >
              <Plus size={15} />
              <span className="font-mono text-xs">add your first prompt</span>
            </button>
          </div>
        )}
      </div>

      {/* Add Prompt Modal */}
      <PromptFormModal
        isOpen={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        onSubmit={handleAddPrompt}
      />

      {/* Edit Prompt Modal */}
      <PromptFormModal
        isOpen={editModalOpen}
        onClose={() => { setEditModalOpen(false); setEditingPrompt(null); }}
        onSubmit={handleEditPrompt}
        initialData={editingPrompt}
      />
    </div>
  );
};

export default Chats;
