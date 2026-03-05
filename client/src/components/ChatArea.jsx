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
    <div className="flex-1 bg-[#FFFFE3] p-8 flex flex-col items-center overflow-auto">
      {/* Page Title */}
      <h1 className="text-3xl font-bold text-[#4A4A4A] mb-6">
        Prompt Generator
      </h1>

      {/* Prompt Input */}
      <div className="bg-[#CBCBCB] p-6 rounded-lg shadow-md w-[600px]">
        <textarea
          placeholder="Describe the prompt you want..."
          value={idea}
          onChange={(e) => setIdea(e.target.value)}
          className="w-full p-3 rounded border border-gray-400 focus:outline-none resize-none"
          rows="6"
        />
        <div className="flex justify-center">
          <button
            onClick={generatePrompt}
            className="mt-4 bg-[#6D8196] text-white px-6 py-2 flex justify-center rounded hover:opacity-90"
          >
            {loading ? "Generating..." : "Generate Prompt"}
          </button>
        </div>
      </div>

      {/* Generated Prompt */}
      {prompt && (
        <div className="bg-[#CBCBCB] p-6 rounded-lg shadow-md w-[600px] mt-6">
          <h2 className="text-xl font-semibold text-[#4A4A4A] mb-3">
            Generated Prompt
          </h2>

          <p className="whitespace-pre-wrap text-[#4A4A4A]">{prompt}</p>

          <div className="flex flex-col gap-3 mt-6">
            <div className="flex justify-center gap-10">
              <div className="mb-4">
                <label className="block text-[#4A4A4A] mb-1">Category</label>

                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full p-2 rounded border border-gray-400"
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

              <div className="mb-4">
                <label className="block text-[#4A4A4A] mb-1">Tags</label>

                <input
                  type="text"
                  placeholder="example: roadmap, react"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  className="w-full p-2 rounded border border-gray-400"
                />
              </div>
            </div>

            <div className="flex justify-center gap-10">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(prompt);
                  alert("Prompt copied to clipboard!");
                }}
                className="bg-[#4A4A4A] text-white px-4 py-2 rounded hover:opacity-90"
              >
                Copy
              </button>
              <button
                onClick={savePrompt}
                className="bg-[#6D8196] text-white px-4 py-2 rounded hover:opacity-90"
              >
                Save Prompt
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ChatArea;
