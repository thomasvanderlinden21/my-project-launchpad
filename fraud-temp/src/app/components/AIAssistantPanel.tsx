import {
  useEffect,
  useRef,
  useState,
  useCallback,
  KeyboardEvent,
} from "react";
import { useLocation, useNavigate } from "react-router";
import { X, Send, Plus } from "lucide-react";
import svgPaths from "../../imports/svg-sv7j3znt9j";
import { useAIAssistant, getPageSuggestions, Message } from "./AIAssistantContext";

// ─────────────────────────────────────────────────────────────
// Sparkle icon — matches the sidebar AI button exactly
// ─────────────────────────────────────────────────────────────
function SparkleIcon({ color = "white", size = 16 }: { color?: string; size?: number }) {
  const d = (svgPaths as Record<string, string>)["p2b07bc80"];
  if (!d) return null;
  return (
    <svg width={size} height={size} viewBox="0 0 18.1667 18.1667" fill="none" className="block shrink-0">
      <path d={d} stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────
function formatTime(date: Date): string {
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

/**
 * Render markdown-ish assistant message content:
 * - \n\n splits into paragraphs
 * - Lines starting with "- " become bullet items
 * - Lines matching "N. " become numbered items
 * - Blocks starting with ``` become code blocks
 * - **bold** → <strong>
 * - [text](path) → clickable nav link
 */
function parseContent(
  raw: string,
  onNavigate: (path: string) => void
): React.ReactNode {
  const blocks = raw.split(/\n\n+/);

  return (
    <div className="space-y-[6px]">
      {blocks.map((block, bi) => {
        // Code block
        if (block.startsWith("```")) {
          const code = block.replace(/^```[\w]*\n?/, "").replace(/\n?```$/, "");
          return (
            <pre
              key={bi}
              className="bg-black/10 rounded-[6px] px-[10px] py-[8px] text-[11px] font-mono overflow-x-auto whitespace-pre-wrap leading-[1.6]"
            >
              {code}
            </pre>
          );
        }

        const lines = block.split("\n");

        // All bullet lines
        const allBullets = lines.every((l) => l.trim().startsWith("- ") || l.trim() === "");
        if (allBullets && lines.some((l) => l.trim().startsWith("- "))) {
          return (
            <ul key={bi} className="space-y-[4px] pl-[2px]">
              {lines
                .filter((l) => l.trim().startsWith("- "))
                .map((line, i) => (
                  <li key={i} className="flex gap-[8px] items-start">
                    <span className="mt-[7px] w-[4px] h-[4px] rounded-full bg-current shrink-0 opacity-50" />
                    <span>{renderInline(line.replace(/^-\s+/, ""), onNavigate)}</span>
                  </li>
                ))}
            </ul>
          );
        }

        // All numbered lines
        const allNumbered = lines.every(
          (l) => /^\d+\.\s/.test(l.trim()) || l.trim() === ""
        );
        if (allNumbered && lines.some((l) => /^\d+\.\s/.test(l.trim()))) {
          return (
            <ol key={bi} className="space-y-[4px] pl-[2px]">
              {lines
                .filter((l) => /^\d+\.\s/.test(l.trim()))
                .map((line, i) => (
                  <li key={i} className="flex gap-[8px] items-start">
                    <span className="shrink-0 opacity-60 min-w-[16px]">{i + 1}.</span>
                    <span>{renderInline(line.replace(/^\d+\.\s+/, ""), onNavigate)}</span>
                  </li>
                ))}
            </ol>
          );
        }

        // Mixed or single line
        if (lines.length > 1) {
          return (
            <div key={bi} className="space-y-[2px]">
              {lines.map((line, li) => {
                if (line.trim().startsWith("- ")) {
                  return (
                    <div key={li} className="flex gap-[8px] items-start">
                      <span className="mt-[7px] w-[4px] h-[4px] rounded-full bg-current shrink-0 opacity-50" />
                      <span>{renderInline(line.replace(/^-\s+/, ""), onNavigate)}</span>
                    </div>
                  );
                }
                if (/^\d+\.\s/.test(line.trim())) {
                  const num = line.match(/^(\d+)\./)?.[1];
                  return (
                    <div key={li} className="flex gap-[8px] items-start">
                      <span className="shrink-0 opacity-60 min-w-[16px]">{num}.</span>
                      <span>{renderInline(line.replace(/^\d+\.\s+/, ""), onNavigate)}</span>
                    </div>
                  );
                }
                return <p key={li}>{renderInline(line, onNavigate)}</p>;
              })}
            </div>
          );
        }

        return <p key={bi}>{renderInline(block, onNavigate)}</p>;
      })}
    </div>
  );
}

function renderInline(
  text: string,
  onNavigate: (path: string) => void
): React.ReactNode {
  const parts: React.ReactNode[] = [];
  const regex = /(\*\*(.+?)\*\*|\[([^\]]+)\]\(([^)]+)\))/g;
  let last = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > last) {
      parts.push(<span key={`t${match.index}`}>{text.slice(last, match.index)}</span>);
    }
    if (match[0].startsWith("**")) {
      parts.push(<strong key={`b${match.index}`}>{match[2]}</strong>);
    } else {
      const linkText = match[3];
      const linkPath = match[4];
      parts.push(
        <button
          key={`l${match.index}`}
          onClick={() => onNavigate(linkPath)}
          className="underline decoration-[#2c6764]/60 font-medium text-[#2c6764] hover:opacity-70 transition-opacity"
        >
          {linkText}
        </button>
      );
    }
    last = match.index + match[0].length;
  }
  if (last < text.length) {
    parts.push(<span key="tail">{text.slice(last)}</span>);
  }
  return parts.length === 0 ? text : <>{parts}</>;
}

// ─────────────────────────────────────────────────────────────
// Typing indicator — three animated dots
// ─────────────────────────────────────────────────────────────
function TypingIndicator() {
  return (
    <div className="flex items-center gap-[5px] py-[2px] px-[2px]">
      {[0, 150, 300].map((delay) => (
        <span
          key={delay}
          className="inline-block w-[7px] h-[7px] rounded-full bg-[#2c6764] animate-bounce"
          style={{ animationDelay: `${delay}ms`, animationDuration: "1.1s" }}
        />
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Message bubble
// ─────────────────────────────────────────────────────────────
function MessageBubble({
  message,
  onNavigate,
  isFirstInGroup,
}: {
  message: Message;
  onNavigate: (path: string) => void;
  isFirstInGroup: boolean;
}) {
  if (message.role === "user") {
    return (
      <div className="flex flex-col items-end gap-[3px] px-[16px]">
        <div className="max-w-[82%] rounded-[12px] rounded-tr-[3px] px-[12px] py-[9px] bg-[#2c6764]">
          <p className="text-[13px] text-white leading-[1.5] break-words">{message.content}</p>
        </div>
        <span className="text-[10px] text-[#94a8a8] leading-none pr-[2px]">
          {formatTime(message.timestamp)}
        </span>
      </div>
    );
  }

  return (
    <div className="flex items-start gap-[8px] px-[16px]">
      {isFirstInGroup ? (
        <div className="shrink-0 w-[28px] h-[28px] rounded-full bg-[#e4eeed] flex items-center justify-center mt-[2px]">
          <SparkleIcon size={14} color="#2c6764" />
        </div>
      ) : (
        <div className="shrink-0 w-[28px]" />
      )}
      <div className="flex flex-col gap-[3px] min-w-0 flex-1">
        <div className="rounded-[12px] rounded-tl-[3px] px-[12px] py-[9px] bg-[#eef3f3]">
          <div className="text-[13px] text-[#1a2424] leading-[1.55]">
            {parseContent(message.content, onNavigate)}
          </div>
        </div>
        <span className="text-[10px] text-[#94a8a8] leading-none pl-[2px]">
          {formatTime(message.timestamp)}
        </span>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Welcome / empty state
// ─────────────────────────────────────────────────────────────
function WelcomeState({
  currentPath,
  onSuggestion,
}: {
  currentPath: string;
  onSuggestion: (text: string) => void;
}) {
  const suggestions = getPageSuggestions(currentPath);
  return (
    <div className="flex flex-col items-start gap-[16px] px-[16px] py-[4px]">
      {/* Greeting bubble */}
      <div className="flex items-start gap-[8px]">
        <div className="shrink-0 w-[28px] h-[28px] rounded-full bg-[#e4eeed] flex items-center justify-center mt-[2px]">
          <SparkleIcon size={14} color="#2c6764" />
        </div>
        <div className="flex flex-col gap-[4px]">
          <div className="rounded-[12px] rounded-tl-[3px] px-[12px] py-[9px] bg-[#eef3f3]">
            <p className="text-[13px] text-[#1a2424] leading-[1.55]">
              Hi Olivia, I'm your AI assistant. I can help you navigate the portal, answer questions about your data, and more.{" "}
              <span className="text-[#2c6764] font-medium">What can I help you with?</span>
            </p>
          </div>
          <span className="text-[10px] text-[#94a8a8] leading-none pl-[2px]">Just now</span>
        </div>
      </div>

      {/* Contextual suggestion chips */}
      <div className="flex flex-col gap-[7px] w-full pl-[36px]">
        {suggestions.map((s) => (
          <button
            key={s}
            onClick={() => onSuggestion(s)}
            className="text-left text-[12px] text-[#2c6764] font-['Inter',sans-serif] font-medium bg-white border border-[#2c6764]/25 hover:border-[#2c6764]/70 hover:bg-[#f0f5f5] rounded-[8px] px-[12px] py-[8px] transition-colors leading-[1.4] shadow-[0_1px_2px_rgba(0,0,0,0.04)]"
          >
            {s}
          </button>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Inner panel UI (shared between push and overlay modes)
// ─────────────────────────────────────────────────────────────
function PanelContent({
  messages,
  isTyping,
  showWelcome,
  conversationVersion,
  inputValue,
  textareaRef,
  messagesEndRef,
  currentPath,
  onInput,
  onSend,
  onSendDirect,
  onKeyDown,
  onNavigate,
  onClose,
  onNewConversation,
}: {
  messages: Message[];
  isTyping: boolean;
  showWelcome: boolean;
  conversationVersion: number;
  inputValue: string;
  textareaRef: React.RefObject<HTMLTextAreaElement | null>;
  messagesEndRef: React.RefObject<HTMLDivElement | null>;
  currentPath: string;
  onInput: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onSend: () => void;
  onSendDirect: (text: string) => void;
  onKeyDown: (e: KeyboardEvent<HTMLTextAreaElement>) => void;
  onNavigate: (path: string) => void;
  onClose: () => void;
  onNewConversation: () => void;
}) {
  return (
    <>
      {/* ── Header ─────────────────────────────────────────── */}
      <div className="shrink-0 flex items-center justify-between px-[16px] py-[11px] border-b border-[#e6ebeb] bg-white">
        <div className="flex items-center gap-[8px]">
          <div className="w-[22px] h-[22px] rounded-full bg-[#2c6764] flex items-center justify-center">
            <SparkleIcon />
          </div>
          <span className="text-[13px] font-['Inter',sans-serif] font-medium text-[#121621] leading-none">
            AI assistant
          </span>
        </div>
        <div className="flex items-center gap-[2px]">
          <button
            onClick={onNewConversation}
            title="Start new conversation"
            className="flex items-center gap-[4px] px-[8px] py-[5px] rounded-[6px] text-[11px] text-[#607070] font-['Inter',sans-serif] font-medium hover:bg-[#eef3f3] hover:text-[#2c6764] transition-colors"
          >
            <Plus size={12} strokeWidth={2.2} />
            New
          </button>
          <button
            onClick={onClose}
            className="p-[6px] rounded-[6px] text-[#607070] hover:bg-[#eef3f3] hover:text-[#2c6764] transition-colors"
            title="Close AI assistant"
          >
            <X size={15} strokeWidth={2} />
          </button>
        </div>
      </div>

      {/* ── Conversation area ───────────────────────────────── */}
      <div className="flex-1 min-h-0 overflow-y-auto py-[14px] flex flex-col gap-[10px]">
        {showWelcome ? (
          <WelcomeState
            key={conversationVersion}
            currentPath={currentPath}
            onSuggestion={onSendDirect}
          />
        ) : (
          messages.map((msg, idx) => {
            const prev = messages[idx - 1];
            const isFirstInGroup = !prev || prev.role !== msg.role;
            return (
              <div
                key={msg.id}
                style={{
                  animation: "fadeSlideIn 0.25s ease-out both",
                }}
              >
                <MessageBubble
                  message={msg}
                  onNavigate={onNavigate}
                  isFirstInGroup={isFirstInGroup}
                />
              </div>
            );
          })
        )}

        {/* Typing indicator */}
        {isTyping && (
          <div
            className="flex items-start gap-[8px] px-[16px]"
            style={{ animation: "fadeSlideIn 0.2s ease-out both" }}
          >
            <div className="shrink-0 w-[28px] h-[28px] rounded-full bg-[#e4eeed] flex items-center justify-center">
              <SparkleIcon size={14} color="#2c6764" />
            </div>
            <div className="rounded-[12px] rounded-tl-[3px] px-[12px] py-[11px] bg-[#eef3f3]">
              <TypingIndicator />
            </div>
          </div>
        )}

        <div ref={messagesEndRef} className="h-[1px]" />
      </div>

      {/* ── Input area ─────────────────────────────────────── */}
      <div className="shrink-0 px-[12px] pb-[12px] pt-[8px] border-t border-[#e6ebeb] bg-white">
        <div className="flex items-end gap-[8px] bg-[#f4f8f8] border border-[#dce8e8] rounded-[10px] px-[12px] py-[8px] focus-within:border-[#2c6764]/40 focus-within:bg-white transition-colors">
          <textarea
            ref={textareaRef}
            value={inputValue}
            onChange={onInput}
            onKeyDown={onKeyDown}
            rows={1}
            placeholder="Add your prompt"
            className="flex-1 resize-none bg-transparent text-[13px] text-[#121621] placeholder-[#94a8a8] font-['Inter',sans-serif] leading-[22px] outline-none min-h-[22px] max-h-[88px] overflow-y-auto"
            style={{ scrollbarWidth: "none" }}
          />
          <button
            onClick={onSend}
            disabled={!inputValue.trim()}
            className={`shrink-0 w-[26px] h-[26px] rounded-full flex items-center justify-center transition-all duration-200 mb-[1px] ${
              inputValue.trim()
                ? "bg-[#2c6764] text-white cursor-pointer hover:bg-[#245957] scale-100"
                : "bg-[#dce8e8] text-[#94a8a8] cursor-not-allowed scale-95 opacity-60"
            }`}
          >
            <Send size={12} strokeWidth={2} />
          </button>
        </div>
        <p className="text-[10px] text-[#aababa] font-['Inter',sans-serif] mt-[5px] text-center leading-none">
          Enter to send · Shift+Enter for new line
        </p>
      </div>
    </>
  );
}

// ─────────────────────────────────────────────────────────────
// Main exported panel component
// ─────────────────────────────────────────────────────────────
export function AIAssistantPanel() {
  const {
    isOpen,
    closePanel,
    messages,
    isTyping,
    conversationVersion,
    sendMessage,
    startNewConversation,
  } = useAIAssistant();

  const location = useLocation();
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Determine if we're in narrow (overlay) mode
  const [isNarrow, setIsNarrow] = useState(
    typeof window !== "undefined" && window.innerWidth < 1024
  );
  useEffect(() => {
    const handler = () => setIsNarrow(window.innerWidth < 1024);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);

  // Auto-scroll on new messages / typing
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  // Scroll to bottom when panel opens
  useEffect(() => {
    if (isOpen) {
      const t = setTimeout(
        () => messagesEndRef.current?.scrollIntoView({ behavior: "instant" }),
        320
      );
      return () => clearTimeout(t);
    }
  }, [isOpen]);

  // Auto-resize textarea
  const handleInput = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
    const el = e.target;
    el.style.height = "auto";
    el.style.height = Math.min(el.scrollHeight, 88) + "px";
  }, []);

  const handleSend = useCallback(() => {
    const trimmed = inputValue.trim();
    if (!trimmed) return;
    setInputValue("");
    if (textareaRef.current) textareaRef.current.style.height = "auto";
    sendMessage(trimmed, location.pathname);
  }, [inputValue, sendMessage, location.pathname]);

  const handleSendDirect = useCallback(
    (text: string) => sendMessage(text, location.pathname),
    [sendMessage, location.pathname]
  );

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        handleSend();
      }
    },
    [handleSend]
  );

  const handleNavigate = useCallback((path: string) => navigate(path), [navigate]);

  const showWelcome = messages.length === 0 && !isTyping;

  const sharedProps = {
    messages,
    isTyping,
    showWelcome,
    conversationVersion,
    inputValue,
    textareaRef,
    messagesEndRef,
    currentPath: location.pathname,
    onInput: handleInput,
    onSend: handleSend,
    onSendDirect: handleSendDirect,
    onKeyDown: handleKeyDown,
    onNavigate: handleNavigate,
    onClose: closePanel,
    onNewConversation: startNewConversation,
  };

  // ── Overlay mode (< 1024px) — slides over content ────────
  if (isNarrow) {
    return (
      <>
        <div
          className="fixed inset-0 z-40 bg-black/25 transition-opacity duration-300"
          style={{
            opacity: isOpen ? 1 : 0,
            pointerEvents: isOpen ? "auto" : "none",
          }}
          onClick={closePanel}
        />
        <div
          className="fixed top-0 right-0 bottom-0 z-50 w-[320px] flex flex-col bg-white shadow-2xl transition-transform duration-300 ease-in-out"
          style={{ transform: isOpen ? "translateX(0)" : "translateX(100%)" }}
        >
          <PanelContent {...sharedProps} />
        </div>
      </>
    );
  }

  // ── Push mode (≥ 1024px) — compresses main content ───────
  return (
    <div
      className="h-full shrink-0 overflow-hidden transition-[width] duration-300 ease-in-out"
      style={{ width: isOpen ? "360px" : "0px" }}
    >
      <div className="w-[360px] h-full flex flex-col bg-white border-l border-[#dde6e6] shadow-[-6px_0_20px_rgba(0,0,0,0.05)]">
        <PanelContent {...sharedProps} />
      </div>
    </div>
  );
}