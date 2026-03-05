import { useState } from "react";
import API from "../services/api";

function ChatArea() {
  const [idea, setIdea] = useState("");
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState("General");
  const [tags, setTags] = useState("");

  const generatePrompt = async () => {
    if (!idea.trim()) return;

    try {
      setLoading(true);

      const { data } = await API.post("/prompts/generate", {
        input: idea,
      });

      setPrompt(data.improved);
    } catch (error) {
      console.error(error);
      alert("Failed to generate prompt");
    } finally {
      setLoading(false);
    }
  };

  const savePrompt = async () => {
    try {
      await API.post("/prompts", {
        title: idea.slice(0, 50),
        improved_prompt: prompt,
        category: category || "General",
        tags: tags || "generated",
      });

      alert("Prompt saved successfully");
    } catch (error) {
      console.error(error);
      alert("Failed to save prompt");
    }
  };

  return (
    <div className="flex-1 bg-background px-8 lg:px-16 py-12 flex flex-col animate-fade-in">
      {/* Section header — editorial typography */}
      <div className="mb-10">
        <h1 className="text-editorial-lg text-textdark">Prompt Generator</h1>
        <div className="w-12 h-0.5 bg-primary mt-3" />
      </div>

      {/* Input area — typewriter/code-editor aesthetic */}
      <div className="max-w-2xl w-full">
        {/* Simulated editor header */}
        <div className="flex items-center gap-2 px-5 py-2.5 border border-b-0 border-surface bg-surface/20"
          style={{ borderRadius: "2px 2px 0 0" }}>
          <span className="font-mono text-xs text-textdark/40 uppercase tracking-wider">
            input.prompt
          </span>
        </div>

        {/* Textarea with line-number gutter feel */}
        <div className="relative border border-surface" style={{ borderRadius: "0 0 2px 2px" }}>
          {/* Gutter stripe — visual cue for code-editor feel */}
          <div className="absolute left-0 top-0 bottom-0 w-10 bg-surface/15 border-r border-surface/30" />
          <textarea
            placeholder="Describe the prompt you want..."
            value={idea}
            onChange={(e) => setIdea(e.target.value)}
            className="textarea-forge w-full pl-14 pr-5"
            rows="8"
          />
        </div>

        <div className="flex justify-start mt-5">
          <button
            onClick={generatePrompt}
            disabled={loading}
            className="btn-primary flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-busy={loading}
          >
            <span className="font-mono text-xs">
              {loading ? "generating..." : "generate →"}
            </span>
          </button>
        </div>
      </div>

      {/* Generated Prompt — editorial manuscript output */}
      {prompt && (
        <div className="max-w-2xl w-full mt-14 animate-slide-in-up">
          {/* Output header */}
          <div className="flex items-center gap-3 mb-4">
            <h2 className="text-editorial-md text-textdark">Generated Prompt</h2>
            <div className="flex-1 h-px bg-surface" />
          </div>

          {/* Manuscript-style output — monospaced, with left border accent */}
          <div className="border-l-2 border-primary pl-6 py-4">
            <p className="font-mono text-sm leading-relaxed text-textdark whitespace-pre-wrap">
              {prompt}
            </p>
          </div>

          {/* Metadata inputs — category and tags */}
          <div className="flex flex-col sm:flex-row gap-6 mt-8">
            <div className="flex-1">
              <label className="font-mono text-xs text-textdark/50 uppercase tracking-wider block mb-2">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="select-forge w-full"
              >
                <option>General</option>
                <option>Education</option>
                <option>Health</option>
                <option>Business</option>
                <option>Creative</option>
                <option>Technology</option>
                <option>Lifestyle</option>
                <option>Career</option>
                <option>Finance</option>
                <option>Entertainment</option>
                <option>Other</option>
              </select>
            </div>

            <div className="flex-1">
              <label className="font-mono text-xs text-textdark/50 uppercase tracking-wider block mb-2">
                Tags
              </label>
              <input
                type="text"
                placeholder="roadmap, react"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                className="input-forge"
              />
            </div>
          </div>

          {/* Action buttons — sharp, purposeful */}
          <div className="flex gap-4 mt-8">
            <button
              onClick={() => {
                navigator.clipboard.writeText(prompt);
                alert("Prompt copied to clipboard!");
              }}
              className="btn-secondary"
            >
              <span className="font-mono text-xs">copy</span>
            </button>
            <button
              onClick={savePrompt}
              className="btn-primary"
            >
              <span className="font-mono text-xs">save prompt</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ChatArea;
