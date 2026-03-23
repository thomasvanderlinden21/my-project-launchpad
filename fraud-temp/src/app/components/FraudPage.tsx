import { useState } from "react";
import {
  Shield, SlidersHorizontal, Sparkles, ChevronRight, Zap, Lock,
  Plus, Pencil, Trash2, CheckCircle2,
} from "lucide-react";
import { TopBar } from "./TopBar";
import {
  FraudRuleModal,
  FraudRule,
  BlacklistType,
  BLACKLIST_TYPES,
  MOCK_SHOPS,
  formatEntry,
  getTypeConfig,
} from "./FraudRuleModal";

// ─── Sentinel Illustration ────────────────────────────────────────────────────

function SentinelIllustration() {
  return (
    <div
      className="flex items-center justify-center w-[72px] h-[72px] rounded-[20px] mx-auto mb-[24px]"
      style={{ background: "linear-gradient(135deg, #EDE9FE 0%, #DDD6FE 100%)" }}
    >
      <svg width="38" height="38" viewBox="0 0 38 38" fill="none">
        <path d="M19 5 L30 9 L30 20 Q30 29 19 33 Q8 29 8 20 L8 9 Z" fill="url(#shieldGrad)" opacity="0.9" />
        <path d="M14 19.5 L17.5 23 L24 16" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M29 6 L29.7 8 L31.5 8 L30.1 9.2 L30.6 11 L29 10 L27.4 11 L27.9 9.2 L26.5 8 L28.3 8 Z" fill="#A78BFA" />
        <path d="M32 14 L32.4 15.2 L33.6 15.2 L32.7 16 L33 17.2 L32 16.6 L31 17.2 L31.3 16 L30.4 15.2 L31.6 15.2 Z" fill="#C4B5FD" />
        <defs>
          <linearGradient id="shieldGrad" x1="19" y1="5" x2="19" y2="33" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#818CF8" />
            <stop offset="100%" stopColor="#6366F1" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

// ─── Empty state (no rules) ───────────────────────────────────────────────────

function ManualRulesEmpty({ onOpen }: { onOpen: () => void }) {
  return (
    <div className="bg-white rounded-[12px] border border-[#E5E7EB] p-[32px] flex flex-col items-center text-center">
      {/* Decorative icon */}
      <div className="flex items-center justify-center w-[64px] h-[64px] rounded-[18px] bg-[#F3F4F6] mb-[20px]">
        <svg width="34" height="34" viewBox="0 0 34 34" fill="none">
          <rect x="5" y="7" width="24" height="3" rx="1.5" fill="#D1D5DB" />
          <rect x="9" y="13" width="16" height="3" rx="1.5" fill="#D1D5DB" />
          <rect x="13" y="19" width="8" height="3" rx="1.5" fill="#D1D5DB" />
        </svg>
      </div>

      <p className="font-['Inter',sans-serif] font-semibold text-[18px] leading-[26px] text-[#111827] mb-[8px]">
        Manual rules
      </p>
      <p className="font-['Inter',sans-serif] text-[14px] leading-[22px] text-[#6B7280] mb-[24px] max-w-[360px]">
        You have no rules set up. Create custom fraud rules to automatically block suspicious
        transactions based on your own conditions.
      </p>

      <button
        onClick={onOpen}
        className="inline-flex items-center gap-[8px] px-[24px] py-[12px] rounded-[8px] font-['Inter',sans-serif] font-medium text-[14px] text-white transition-all duration-150 hover:opacity-90 active:scale-95"
        style={{
          background: "linear-gradient(135deg, #111827 0%, #1F2937 100%)",
          boxShadow: "0 1px 3px rgba(17,24,39,0.18)",
        }}
      >
        <SlidersHorizontal size={15} strokeWidth={2.2} />
        Set up your first fraud rule
      </button>
    </div>
  );
}

// ─── Single rule card row ─────────────────────────────────────────────────────

function RuleCard({
  rule,
  onEdit,
  onDelete,
}: {
  rule: FraudRule;
  onEdit: () => void;
  onDelete: () => void;
}) {
  const cfg = getTypeConfig(rule.type);
  const shopLabel = rule.shops.includes("all")
    ? "All shops"
    : MOCK_SHOPS.filter(s => s.id !== "all" && rule.shops.includes(s.id))
        .map(s => s.name)
        .join(", ") || "All shops";

  const displayEntries = rule.entries.slice(0, 4);
  const extra = rule.entries.length - displayEntries.length;

  return (
    <div className="bg-white rounded-[10px] border border-[#E5E7EB] p-[16px] flex flex-col gap-[12px] transition-shadow hover:shadow-sm">
      {/* Top row */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-[10px]">
          <div
            className="flex items-center justify-center w-[34px] h-[34px] rounded-[8px] flex-shrink-0"
            style={{ background: cfg.bg, color: cfg.color }}
          >
            {cfg.icon}
          </div>
          <div>
            <p className="font-['Inter',sans-serif] font-semibold text-[13px] text-[#111827]">
              {cfg.label}
            </p>
            <p className="font-['Inter',sans-serif] text-[11px] text-[#9CA3AF]">
              {rule.entries.length} {rule.entries.length === 1 ? "entry" : "entries"} blocked · {shopLabel}
            </p>
          </div>
        </div>

        {/* Active badge + actions */}
        <div className="flex items-center gap-[8px]">
          <div className="flex items-center gap-[5px] bg-[#F0FDF4] border border-[#BBF7D0] rounded-full px-[8px] py-[3px]">
            <div className="w-[6px] h-[6px] rounded-full bg-[#22C55E]" />
            <span className="font-['Inter',sans-serif] text-[11px] font-medium text-[#166534]">Active</span>
          </div>
          <button
            onClick={onEdit}
            className="flex items-center justify-center w-[28px] h-[28px] rounded-[6px] text-[#6B7280] hover:bg-[#F3F4F6] hover:text-[#111827] transition-colors"
            title="Edit rule"
          >
            <Pencil size={13} strokeWidth={2} />
          </button>
          <button
            onClick={onDelete}
            className="flex items-center justify-center w-[28px] h-[28px] rounded-[6px] text-[#6B7280] hover:bg-[#FEF2F2] hover:text-[#EF4444] transition-colors"
            title="Delete rule"
          >
            <Trash2 size={13} strokeWidth={2} />
          </button>
        </div>
      </div>

      {/* Entry tags */}
      <div className="flex flex-wrap gap-[5px]">
        {displayEntries.map(entry => (
          <span
            key={entry}
            className="inline-flex items-center px-[8px] py-[3px] rounded-full text-[11px] font-['Inter',sans-serif]"
            style={{ background: cfg.bg, color: cfg.color, border: `1px solid ${cfg.border}` }}
          >
            {formatEntry(rule.type, entry)}
          </span>
        ))}
        {extra > 0 && (
          <span className="inline-flex items-center px-[8px] py-[3px] rounded-full text-[11px] font-['Inter',sans-serif] bg-[#F3F4F6] text-[#6B7280] border border-[#E5E7EB]">
            +{extra} more
          </span>
        )}
      </div>
    </div>
  );
}

// ─── Rules list (has rules) ───────────────────────────────────────────────────

function ManualRulesWithData({
  rules,
  onCreateRule,
  onEditRule,
  onDeleteRule,
}: {
  rules: FraudRule[];
  onCreateRule: () => void;
  onEditRule: (rule: FraudRule) => void;
  onDeleteRule: (id: string) => void;
}) {
  return (
    <div className="bg-white rounded-[12px] border border-[#E5E7EB] overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-[24px] py-[16px] border-b border-[#F3F4F6]">
        <div className="flex items-center gap-[10px]">
          <p className="font-['Inter',sans-serif] font-semibold text-[15px] text-[#111827]">Manual rules</p>
          <span className="flex items-center justify-center bg-[#F3F4F6] border border-[#E5E7EB] rounded-full w-[22px] h-[22px] text-[11px] font-medium text-[#374151] font-['Inter',sans-serif]">
            {rules.length}
          </span>
        </div>
        <button
          onClick={onCreateRule}
          className="inline-flex items-center gap-[6px] px-[14px] py-[8px] rounded-[8px] text-[13px] font-medium text-white font-['Inter',sans-serif] transition-all hover:opacity-90 active:scale-95"
          style={{ background: "linear-gradient(135deg, #111827 0%, #1F2937 100%)" }}
        >
          <Plus size={14} strokeWidth={2.5} />
          Create new rule
        </button>
      </div>

      {/* Rules list */}
      <div className="flex flex-col gap-[0px] divide-y divide-[#F3F4F6]">
        {rules.map(rule => (
          <div key={rule.id} className="px-[16px] py-[12px]">
            <RuleCard
              rule={rule}
              onEdit={() => onEditRule(rule)}
              onDelete={() => onDeleteRule(rule.id)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Feature row ─────────────────────────────────────────────────────────────

function FeatureRow({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex items-center gap-[10px]">
      <div className="flex items-center justify-center w-[28px] h-[28px] rounded-[7px] bg-[#EDE9FE] shrink-0">
        {icon}
      </div>
      <span className="font-['Inter',sans-serif] text-[13px] text-[#374151] leading-[18px]">{label}</span>
    </div>
  );
}

// ─── Card 2: Fraud Sentinel Upsell ───────────────────────────────────────────

function FraudSentinelCard() {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="rounded-[12px] p-[32px] flex flex-col items-center text-center relative overflow-hidden"
      style={{
        background: "linear-gradient(145deg, #FAFAFA 0%, #F5F3FF 60%, #EDE9FE 100%)",
        border: "1px solid #DDD6FE",
      }}
    >
      <div
        className="absolute -top-[60px] -right-[60px] w-[220px] h-[220px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(99,102,241,0.08) 0%, transparent 70%)" }}
      />

      {/* Premium badge */}
      <div className="inline-flex items-center gap-[5px] bg-[#EDE9FE] border border-[#DDD6FE] rounded-full px-[10px] py-[4px] mb-[20px] self-center">
        <Sparkles size={12} className="text-[#7C3AED]" strokeWidth={2.5} />
        <span className="font-['Inter',sans-serif] font-medium text-[11px] text-[#7C3AED] tracking-wide uppercase">Premium</span>
      </div>

      <SentinelIllustration />

      <p className="font-['Inter',sans-serif] font-semibold text-[18px] leading-[26px] text-[#111827] mb-[8px]">
        Fraud Sentinel
      </p>
      <p className="font-['Inter',sans-serif] text-[14px] leading-[22px] text-[#6B7280] mb-[28px] max-w-[480px]">
        Upgrade to unlock advanced rules and AI fraud detection, protecting your business from
        fraudulent activities with real-time transaction scoring and adaptive machine learning.
        <br />
        <span className="font-bold">for €0,02 per screened transaction</span>
      </p>

      <div className="grid grid-cols-2 gap-x-[24px] gap-y-[12px] mb-[28px] w-full max-w-[400px]">
        <FeatureRow icon={<Zap size={14} className="text-[#6366F1]" strokeWidth={2.2} />} label="Real-time scoring" />
        <FeatureRow icon={<Shield size={14} className="text-[#6366F1]" strokeWidth={2.2} />} label="Adaptive ML model" />
        <FeatureRow icon={<Lock size={14} className="text-[#6366F1]" strokeWidth={2.2} />} label="3DS2 risk engine" />
        <FeatureRow icon={<SlidersHorizontal size={14} className="text-[#6366F1]" strokeWidth={2.2} />} label="Custom rule builder" />
      </div>

      <button
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="inline-flex items-center gap-[8px] px-[24px] py-[12px] rounded-[8px] font-['Inter',sans-serif] font-medium text-[14px] transition-all duration-150"
        style={{
          border: "1.5px solid #6366F1",
          color: hovered ? "white" : "#6366F1",
          background: hovered ? "linear-gradient(135deg, #6366F1 0%, #4F46E5 100%)" : "transparent",
          boxShadow: hovered ? "0 4px 14px rgba(99,102,241,0.35)" : "none",
          transform: hovered ? "translateY(-1px)" : "translateY(0)",
        }}
      >
        Learn more
        <ChevronRight size={15} strokeWidth={2.2} />
      </button>

      <div className="flex items-center gap-[6px] mt-[14px]">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <circle cx="7" cy="7" r="6.5" stroke="#A78BFA" strokeWidth="1" />
          <path d="M4.5 7.2 L6.2 8.9 L9.5 5.5" stroke="#A78BFA" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span className="font-['Inter',sans-serif] text-[12px] text-[#7C3AED]">
          Includes a <span className="font-semibold">30-day free trial</span> — cancel at any moment
        </span>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export function FraudPage() {
  const [rules, setRules] = useState<FraudRule[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingRule, setEditingRule] = useState<FraudRule | undefined>(undefined);

  function openCreateModal() {
    setEditingRule(undefined);
    setModalOpen(true);
  }

  function openEditModal(rule: FraudRule) {
    setEditingRule(rule);
    setModalOpen(true);
  }

  function handlePublish(data: { type: BlacklistType; entries: string[]; shops: string[] }) {
    if (editingRule) {
      // Update existing rule
      setRules(prev =>
        prev.map(r => r.id === editingRule.id ? { ...editingRule, ...data } : r)
      );
    } else {
      // Create new rule
      const newRule: FraudRule = {
        id: crypto.randomUUID(),
        createdAt: new Date(),
        ...data,
      };
      setRules(prev => [...prev, newRule]);
    }
    setEditingRule(undefined);
  }

  function handleDelete(id: string) {
    setRules(prev => prev.filter(r => r.id !== id));
  }

  return (
    <div className="w-full min-h-full" style={{ background: "#F9FAFB" }}>
      <TopBar title="Settings" />

      <div className="w-full px-[32px] py-[32px] flex flex-col items-center">
        {/* Page heading */}
        <div className="w-full max-w-[640px] mb-[32px]">
          <div className="flex items-center gap-[6px] mb-[12px]">
            <span className="font-['Inter',sans-serif] text-[12px] text-[#9CA3AF]">Settings</span>
            <ChevronRight size={12} className="text-[#D1D5DB]" strokeWidth={2} />
            <span className="font-['Inter',sans-serif] text-[12px] text-[#6B7280]">Fraud prevention</span>
          </div>
          <div className="flex items-center gap-[12px]">
            <div
              className="flex items-center justify-center w-[40px] h-[40px] rounded-[10px]"
              style={{ background: "linear-gradient(135deg, #FEE2E2 0%, #FECACA 100%)" }}
            >
              <Shield size={20} className="text-[#EF4444]" strokeWidth={2} />
            </div>
            <div>
              <h1 className="font-['Inter',sans-serif] font-bold text-[22px] leading-[30px] text-[#111827]">
                Fraud prevention
              </h1>
              <p className="font-['Inter',sans-serif] text-[13px] text-[#9CA3AF] leading-[18px] mt-[1px]">
                Protect your business from suspicious and fraudulent transactions
              </p>
            </div>
          </div>
        </div>

        {/* Cards */}
        <div className="w-full max-w-[640px] flex flex-col gap-[20px]">
          {rules.length === 0 ? (
            <ManualRulesEmpty onOpen={openCreateModal} />
          ) : (
            <ManualRulesWithData
              rules={rules}
              onCreateRule={openCreateModal}
              onEditRule={openEditModal}
              onDeleteRule={handleDelete}
            />
          )}
          <FraudSentinelCard />
        </div>
      </div>

      {/* Modal */}
      <FraudRuleModal
        isOpen={modalOpen}
        onClose={() => { setModalOpen(false); setEditingRule(undefined); }}
        onPublish={handlePublish}
        editRule={editingRule}
      />
    </div>
  );
}
