import ChatArea from "../components/ChatArea";
import { ChevronDown } from "lucide-react";

const HomePage = () => {
  return (
    <div className="bg-background text-textdark">
      {/* ============================================================
          HERO SECTION — Full-viewport editorial splash
          Asymmetric split: oversized typography left, animated prompt right
          ============================================================ */}
      <section className="min-h-screen flex flex-col relative">
        <div className="flex-1 flex flex-col lg:flex-row items-center px-8 lg:px-16 py-16 gap-8">
          {/* Left column: dramatic display typography with asymmetric margins */}
          <div className="flex-1 flex flex-col justify-center lg:pr-12 animate-fade-in">
            {/* Oversized editorial words — scale contrast is the design */}
            <div className="text-editorial-xl text-textdark mb-2">Craft.</div>
            <div className="text-editorial-xl text-primary mb-2 stagger-1 animate-fade-in">
              Refine.
            </div>
            <div className="text-editorial-xl text-textdark stagger-2 animate-fade-in">
              Generate.
            </div>

            {/* Subheading in mono — contrasts with the display type above */}
            <p className="font-mono text-sm text-textdark/60 mt-8 max-w-md leading-relaxed stagger-3 animate-fade-in">
              A precision instrument for prompt engineering.
              <br />
              Describe your intent — we refine it into something powerful.
            </p>
          </div>

          {/* Right column: animated prompt preview — typewriter aesthetic */}
          <div className="flex-1 flex items-center justify-center w-full max-w-lg stagger-4 animate-fade-in">
            <div className="w-full border border-surface p-6" style={{ borderRadius: "2px" }}>
              {/* Simulated terminal/typewriter header */}
              <div className="flex items-center gap-2 mb-4 pb-3 border-b border-surface">
                <div className="w-2 h-2 bg-primary/40" style={{ borderRadius: "1px" }} />
                <div className="w-2 h-2 bg-surface" style={{ borderRadius: "1px" }} />
                <div className="w-2 h-2 bg-surface" style={{ borderRadius: "1px" }} />
                <span className="font-mono text-xs text-textdark/40 ml-2">prompt_preview.txt</span>
              </div>

              {/* Typing animation lines */}
              <div className="font-mono text-sm text-textdark/80 space-y-3">
                <div className="flex">
                  <span className="text-primary/40 mr-3 select-none">01</span>
                  <span className="typing-line">
                    Write a comprehensive guide on
                  </span>
                </div>
                <div className="flex">
                  <span className="text-primary/40 mr-3 select-none">02</span>
                  <span className="typing-line-delayed">
                    building scalable AI systems...
                  </span>
                </div>
                <div className="flex mt-4">
                  <span className="text-primary/40 mr-3 select-none">03</span>
                  <span className="text-primary/60 font-mono text-xs">
                    ▸ enhanced by PromptForge
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator — anchored at bottom center */}
        <div className="flex justify-center pb-8 animate-scroll-bounce">
          <a
            href="#workspace"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("workspace")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="text-primary/40 hover:text-primary transition-colors duration-200"
            aria-label="Scroll to workspace"
          >
            <ChevronDown size={24} />
          </a>
        </div>
      </section>

      {/* ============================================================
          WORKSPACE — ChatArea as the main working area below the hero
          ============================================================ */}
      <section id="workspace" className="min-h-screen">
        <ChatArea />
      </section>
    </div>
  );
};

export default HomePage;
