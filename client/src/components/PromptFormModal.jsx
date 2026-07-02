import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { X, Sparkles, Tag, FolderOpen, Type, AlignLeft } from "lucide-react";

const CATEGORIES = [
  "General",
  "Writing",
  "Coding",
  "Marketing",
  "Education",
  "Research",
  "Creative",
  "Business",
  "Science",
  "Other",
];

const PromptFormModal = ({ isOpen, onClose, onSubmit, initialData = null }) => {
  const isEdit = !!initialData;

  const [form, setForm] = useState({
    title: "",
    improved_prompt: "",
    category: "General",
    tags: "",
  });
  const [loading, setLoading] = useState(false);
  const overlayRef = useRef(null);
  const titleRef = useRef(null);

  // Sync form when initialData changes (e.g. opening edit modal)
  useEffect(() => {
    if (isOpen) {
      setForm({
        title: initialData?.title ?? "",
        improved_prompt: initialData?.improved_prompt ?? "",
        category: initialData?.category ?? "General",
        tags: initialData?.tags ?? "",
      });
      setTimeout(() => titleRef.current?.focus(), 80);
    }
  }, [isOpen, initialData]);

  // Close on Escape + lock body scroll
  useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handler);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleChange = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.improved_prompt.trim()) return;
    setLoading(true);
    try {
      await onSubmit(form);
      onClose();
    } finally {
      setLoading(false);
    }
  };

  // Portal renders directly into document.body — escapes all stacking contexts
  return createPortal(
    <div
      ref={overlayRef}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(74,74,74,0.6)",
      }}
      onClick={(e) => { if (e.target === overlayRef.current) onClose(); }}
    >
      {/* Modal panel */}
      <div
        className="animate-fade-in"
        style={{
          position: "relative",
          backgroundColor: "#FFFFE3",
          width: "100%",
          maxWidth: "672px",
          margin: "0 16px",
          border: "1.5px solid #CBCBCB",
          borderRadius: "3px",
          boxShadow: "6px 6px 0px #CBCBCB",
          maxHeight: "90vh",
          overflowY: "auto",
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-5 border-b border-surface">
          <div className="flex items-center gap-3">
            <Sparkles size={16} className="text-primary" />
            <h2 className="font-display text-lg font-semibold text-textdark">
              {isEdit ? "Edit Prompt" : "Add Prompt Manually"}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-textdark/40 hover:text-textdark transition-colors duration-200 p-1"
            title="Close"
          >
            <X size={18} />
          </button>
        </div>

        {/* Form body */}
        <form onSubmit={handleSubmit} className="px-8 py-6 space-y-6">
          {/* Title */}
          <div>
            <label className="flex items-center gap-2 font-mono text-xs text-textdark/50 uppercase tracking-wider mb-2">
              <Type size={12} />
              Title
            </label>
            <input
              ref={titleRef}
              type="text"
              value={form.title}
              onChange={handleChange("title")}
              placeholder="e.g. Senior React Developer"
              className="input-forge w-full"
              required
            />
          </div>

          {/* Category + Tags row */}
          <div className="grid grid-cols-2 gap-6">
            {/* Category */}
            <div>
              <label className="flex items-center gap-2 font-mono text-xs text-textdark/50 uppercase tracking-wider mb-2">
                <FolderOpen size={12} />
                Category
              </label>
              <select
                value={form.category}
                onChange={handleChange("category")}
                className="select-forge w-full"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            {/* Tags */}
            <div>
              <label className="flex items-center gap-2 font-mono text-xs text-textdark/50 uppercase tracking-wider mb-2">
                <Tag size={12} />
                Tags
                <span className="text-textdark/30 normal-case font-normal">(comma-separated)</span>
              </label>
              <input
                type="text"
                value={form.tags}
                onChange={handleChange("tags")}
                placeholder="e.g. react, frontend, senior"
                className="input-forge w-full"
              />
            </div>
          </div>

          {/* Prompt content */}
          <div>
            <label className="flex items-center gap-2 font-mono text-xs text-textdark/50 uppercase tracking-wider mb-2">
              <AlignLeft size={12} />
              Prompt Content
            </label>
            <textarea
              value={form.improved_prompt}
              onChange={handleChange("improved_prompt")}
              placeholder="Enter your prompt text here…"
              className="textarea-forge w-full"
              rows={8}
              required
            />
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <button type="button" onClick={onClose} className="btn-secondary">
              <span className="font-mono text-xs">cancel</span>
            </button>
            <button
              type="submit"
              className="btn-primary flex items-center gap-2"
              disabled={loading || !form.title.trim() || !form.improved_prompt.trim()}
              style={{ opacity: (loading || !form.title.trim() || !form.improved_prompt.trim()) ? 0.6 : 1 }}
            >
              <Sparkles size={14} />
              <span className="font-mono text-xs">
                {loading ? (isEdit ? "saving…" : "adding…") : isEdit ? "save changes" : "add prompt"}
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
};

export default PromptFormModal;
