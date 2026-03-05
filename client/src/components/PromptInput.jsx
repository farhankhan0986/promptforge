import { useState } from "react";

function PromptInput() {
  const [idea, setIdea] = useState("");

  const handleGenerate = () => {
    console.log("User idea:", idea);
  };

  return (
    <div className="border-t border-surface p-4 flex gap-3">

      <input
        type="text"
        placeholder="I want a prompt for..."
        value={idea}
        onChange={(e) => setIdea(e.target.value)}
        className="flex-1 bg-surface p-3 py-10 rounded text-textdark placeholder-primary/60 outline-none focus:ring-2 focus:ring-primary"
      />


      <button
        onClick={handleGenerate}
        className="bg-primary px-6 rounded text-white hover:bg-sidebar transition-colors font-medium"
      >
        Generate
      </button>
    </div>
  );
}

export default PromptInput;