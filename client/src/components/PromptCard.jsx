import { useState } from "react";
import { ChevronDown, ChevronUp, Copy, Trash2 } from "lucide-react";

const PromptCard = ({ prompt, deletePrompt }) => {
  const [expanded, setExpanded] = useState(false);

  const PREVIEW_LENGTH = 150;
  const isLong = prompt.improved_prompt.length > PREVIEW_LENGTH;

  const displayText = expanded
    ? prompt.improved_prompt
    : prompt.improved_prompt.slice(0, PREVIEW_LENGTH) + (isLong ? "..." : "");

  return (
    <div className="bg-surface p-5 rounded-lg shadow transition-all duration-300">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-lg font-semibold text-textdark">
            {prompt.title}
          </h2>
          <p className="text-sm text-textdark/70 mt-1">
            Category: {prompt.category}
          </p>
          <p className="text-sm text-textdark/70">
            Tags: {prompt.tags}
          </p>
        </div>

        {isLong && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-primary hover:text-sidebar transition-colors p-1"
            title={expanded ? "Collapse" : "Expand"}
          >
            {expanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </button>
        )}
      </div>

      {/* Prompt Content */}
      <div
        className={`mt-3 text-textdark whitespace-pre-wrap overflow-hidden transition-all duration-300
          ${expanded ? "max-h-[2000px]" : "max-h-28"}`}
      >
        <p>{displayText}</p>
      </div>

      {/* Expand/Collapse Text Toggle */}
      {isLong && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-sm text-primary hover:text-sidebar mt-2 transition-colors font-medium"
        >
          {expanded ? "Show less" : "Show more"}
        </button>
      )}

      {/* Actions */}
      <div className="flex justify-start mt-4 gap-4">
        <button
          onClick={() => {
            navigator.clipboard.writeText(prompt.improved_prompt);
            alert("Prompt copied to clipboard!");
          }}
          className="bg-sidebar text-white px-4 py-2 rounded hover:bg-textdark/80 transition-colors flex items-center gap-2"
        >
          <Copy size={16} />
          Copy
        </button>
        <button
          onClick={() => deletePrompt(prompt.id)}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors flex items-center gap-2"
        >
          <Trash2 size={16} />
          Delete
        </button>
      </div>
    </div>
  );
};

export default PromptCard;