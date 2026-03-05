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
    /* Typography-driven layout — thin border-bottom separator instead of card shadows */
    <div className="border-b border-surface py-6 transition-all duration-200 animate-fade-in">
      {/* Header row */}
      <div className="flex justify-between items-start">
        <div>
          <h2 className="font-display text-lg font-semibold text-textdark">
            {prompt.title}
          </h2>
          {/* Metadata in monospaced small type */}
          <div className="flex gap-4 mt-1.5">
            <span className="font-mono text-xs text-textdark/50 uppercase tracking-wider">
              {prompt.category}
            </span>
            <span className="font-mono text-xs text-primary/60">
              {prompt.tags}
            </span>
          </div>
        </div>

        {isLong && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-primary hover:text-textdark transition-colors duration-200 p-1"
            title={expanded ? "Collapse" : "Expand"}
          >
            {expanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </button>
        )}
      </div>

      {/* Prompt content — monospaced text with left border accent */}
      <div
        className={`mt-4 overflow-hidden transition-all duration-300
          ${expanded ? "max-h-[2000px]" : "max-h-28"}`}
      >
        <div className="border-l-2 border-surface pl-4">
          <p className="font-mono text-sm leading-relaxed text-textdark/80 whitespace-pre-wrap">
            {displayText}
          </p>
        </div>
      </div>

      {/* Expand/collapse text toggle */}
      {isLong && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="font-mono text-xs text-primary hover:text-textdark mt-2
            transition-colors duration-200 hover-underline"
        >
          {expanded ? "show less" : "show more"}
        </button>
      )}

      {/* Actions — sharp buttons */}
      <div className="flex gap-3 mt-4">
        <button
          onClick={() => {
            navigator.clipboard.writeText(prompt.improved_prompt);
            alert("Prompt copied to clipboard!");
          }}
          className="btn-secondary flex items-center gap-2 py-1.5 px-3"
        >
          <Copy size={14} />
          <span className="font-mono text-xs">copy</span>
        </button>
        <button
          onClick={() => deletePrompt(prompt.id)}
          className="btn-danger flex items-center gap-2 py-1.5 px-3"
        >
          <Trash2 size={14} />
          <span className="font-mono text-xs">delete</span>
        </button>
      </div>
    </div>
  );
};

export default PromptCard;