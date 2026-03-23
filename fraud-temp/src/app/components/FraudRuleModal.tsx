import { useState, useEffect, useRef, useMemo } from "react";
import {
  X, Search, Check, ChevronDown, ChevronLeft, ChevronRight,
  Wifi, Mail, Landmark, Globe, CreditCard, MapPin, DollarSign,
  Banknote, Plus, Store,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

export type BlacklistType =
  | "ip" | "email" | "iban" | "card_country"
  | "pan" | "shipping" | "amount" | "currency";

export interface FraudRule {
  id: string;
  type: BlacklistType;
  entries: string[];
  shops: string[];
  createdAt: Date;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

export const BLACKLIST_TYPES = [
  { id: "ip" as BlacklistType,           label: "IP Address",           description: "Block specific IP addresses",       icon: <Wifi size={18} />,        color: "#2563EB", bg: "#EFF6FF", border: "#BFDBFE" },
  { id: "email" as BlacklistType,        label: "Email Address",        description: "Block by email address",           icon: <Mail size={18} />,        color: "#7C3AED", bg: "#F5F3FF", border: "#DDD6FE" },
  { id: "iban" as BlacklistType,         label: "IBAN",                 description: "Block bank account numbers",       icon: <Landmark size={18} />,    color: "#059669", bg: "#ECFDF5", border: "#A7F3D0" },
  { id: "card_country" as BlacklistType, label: "Card Issuing Country", description: "Block cards from countries",       icon: <Globe size={18} />,       color: "#D97706", bg: "#FFFBEB", border: "#FDE68A" },
  { id: "pan" as BlacklistType,          label: "Card Number (PAN)",    description: "Block specific card numbers",      icon: <CreditCard size={18} />,  color: "#DC2626", bg: "#FEF2F2", border: "#FECACA" },
  { id: "shipping" as BlacklistType,     label: "Shipping Address",     description: "Block shipping destinations",      icon: <MapPin size={18} />,      color: "#0891B2", bg: "#ECFEFF", border: "#A5F3FC" },
  { id: "amount" as BlacklistType,       label: "Transaction Amount",   description: "Block by transaction value",       icon: <DollarSign size={18} />,  color: "#CA8A04", bg: "#FEFCE8", border: "#FEF08A" },
  { id: "currency" as BlacklistType,     label: "Currency",             description: "Block specific currencies",        icon: <Banknote size={18} />,    color: "#4F46E5", bg: "#EEF2FF", border: "#C7D2FE" },
];

export const COUNTRIES = [
  { code: "AF", name: "Afghanistan" }, { code: "AL", name: "Albania" }, { code: "DZ", name: "Algeria" },
  { code: "AD", name: "Andorra" }, { code: "AO", name: "Angola" }, { code: "AG", name: "Antigua and Barbuda" },
  { code: "AR", name: "Argentina" }, { code: "AM", name: "Armenia" }, { code: "AU", name: "Australia" },
  { code: "AT", name: "Austria" }, { code: "AZ", name: "Azerbaijan" }, { code: "BS", name: "Bahamas" },
  { code: "BH", name: "Bahrain" }, { code: "BD", name: "Bangladesh" }, { code: "BB", name: "Barbados" },
  { code: "BY", name: "Belarus" }, { code: "BE", name: "Belgium" }, { code: "BZ", name: "Belize" },
  { code: "BJ", name: "Benin" }, { code: "BT", name: "Bhutan" }, { code: "BO", name: "Bolivia" },
  { code: "BA", name: "Bosnia and Herzegovina" }, { code: "BW", name: "Botswana" }, { code: "BR", name: "Brazil" },
  { code: "BN", name: "Brunei" }, { code: "BG", name: "Bulgaria" }, { code: "BF", name: "Burkina Faso" },
  { code: "BI", name: "Burundi" }, { code: "CV", name: "Cape Verde" }, { code: "KH", name: "Cambodia" },
  { code: "CM", name: "Cameroon" }, { code: "CA", name: "Canada" }, { code: "CF", name: "Central African Republic" },
  { code: "TD", name: "Chad" }, { code: "CL", name: "Chile" }, { code: "CN", name: "China" },
  { code: "CO", name: "Colombia" }, { code: "KM", name: "Comoros" }, { code: "CG", name: "Congo" },
  { code: "CD", name: "Congo, DR" }, { code: "CR", name: "Costa Rica" }, { code: "HR", name: "Croatia" },
  { code: "CU", name: "Cuba" }, { code: "CY", name: "Cyprus" }, { code: "CZ", name: "Czech Republic" },
  { code: "DK", name: "Denmark" }, { code: "DJ", name: "Djibouti" }, { code: "DM", name: "Dominica" },
  { code: "DO", name: "Dominican Republic" }, { code: "EC", name: "Ecuador" }, { code: "EG", name: "Egypt" },
  { code: "SV", name: "El Salvador" }, { code: "GQ", name: "Equatorial Guinea" }, { code: "ER", name: "Eritrea" },
  { code: "EE", name: "Estonia" }, { code: "SZ", name: "Eswatini" }, { code: "ET", name: "Ethiopia" },
  { code: "FJ", name: "Fiji" }, { code: "FI", name: "Finland" }, { code: "FR", name: "France" },
  { code: "GA", name: "Gabon" }, { code: "GM", name: "Gambia" }, { code: "GE", name: "Georgia" },
  { code: "DE", name: "Germany" }, { code: "GH", name: "Ghana" }, { code: "GR", name: "Greece" },
  { code: "GD", name: "Grenada" }, { code: "GT", name: "Guatemala" }, { code: "GN", name: "Guinea" },
  { code: "GW", name: "Guinea-Bissau" }, { code: "GY", name: "Guyana" }, { code: "HT", name: "Haiti" },
  { code: "HN", name: "Honduras" }, { code: "HU", name: "Hungary" }, { code: "IS", name: "Iceland" },
  { code: "IN", name: "India" }, { code: "ID", name: "Indonesia" }, { code: "IR", name: "Iran" },
  { code: "IQ", name: "Iraq" }, { code: "IE", name: "Ireland" }, { code: "IL", name: "Israel" },
  { code: "IT", name: "Italy" }, { code: "JM", name: "Jamaica" }, { code: "JP", name: "Japan" },
  { code: "JO", name: "Jordan" }, { code: "KZ", name: "Kazakhstan" }, { code: "KE", name: "Kenya" },
  { code: "KI", name: "Kiribati" }, { code: "KP", name: "North Korea" }, { code: "KR", name: "South Korea" },
  { code: "KW", name: "Kuwait" }, { code: "KG", name: "Kyrgyzstan" }, { code: "LA", name: "Laos" },
  { code: "LV", name: "Latvia" }, { code: "LB", name: "Lebanon" }, { code: "LS", name: "Lesotho" },
  { code: "LR", name: "Liberia" }, { code: "LY", name: "Libya" }, { code: "LI", name: "Liechtenstein" },
  { code: "LT", name: "Lithuania" }, { code: "LU", name: "Luxembourg" }, { code: "MG", name: "Madagascar" },
  { code: "MW", name: "Malawi" }, { code: "MY", name: "Malaysia" }, { code: "MV", name: "Maldives" },
  { code: "ML", name: "Mali" }, { code: "MT", name: "Malta" }, { code: "MH", name: "Marshall Islands" },
  { code: "MR", name: "Mauritania" }, { code: "MU", name: "Mauritius" }, { code: "MX", name: "Mexico" },
  { code: "MD", name: "Moldova" }, { code: "MC", name: "Monaco" }, { code: "MN", name: "Mongolia" },
  { code: "ME", name: "Montenegro" }, { code: "MA", name: "Morocco" }, { code: "MZ", name: "Mozambique" },
  { code: "MM", name: "Myanmar" }, { code: "NA", name: "Namibia" }, { code: "NR", name: "Nauru" },
  { code: "NP", name: "Nepal" }, { code: "NL", name: "Netherlands" }, { code: "NZ", name: "New Zealand" },
  { code: "NI", name: "Nicaragua" }, { code: "NE", name: "Niger" }, { code: "NG", name: "Nigeria" },
  { code: "MK", name: "North Macedonia" }, { code: "NO", name: "Norway" }, { code: "OM", name: "Oman" },
  { code: "PK", name: "Pakistan" }, { code: "PW", name: "Palau" }, { code: "PA", name: "Panama" },
  { code: "PG", name: "Papua New Guinea" }, { code: "PY", name: "Paraguay" }, { code: "PE", name: "Peru" },
  { code: "PH", name: "Philippines" }, { code: "PL", name: "Poland" }, { code: "PT", name: "Portugal" },
  { code: "QA", name: "Qatar" }, { code: "RO", name: "Romania" }, { code: "RU", name: "Russia" },
  { code: "RW", name: "Rwanda" }, { code: "KN", name: "Saint Kitts and Nevis" }, { code: "LC", name: "Saint Lucia" },
  { code: "VC", name: "Saint Vincent" }, { code: "WS", name: "Samoa" }, { code: "SM", name: "San Marino" },
  { code: "ST", name: "São Tomé and Príncipe" }, { code: "SA", name: "Saudi Arabia" }, { code: "SN", name: "Senegal" },
  { code: "RS", name: "Serbia" }, { code: "SC", name: "Seychelles" }, { code: "SL", name: "Sierra Leone" },
  { code: "SG", name: "Singapore" }, { code: "SK", name: "Slovakia" }, { code: "SI", name: "Slovenia" },
  { code: "SB", name: "Solomon Islands" }, { code: "SO", name: "Somalia" }, { code: "ZA", name: "South Africa" },
  { code: "SS", name: "South Sudan" }, { code: "ES", name: "Spain" }, { code: "LK", name: "Sri Lanka" },
  { code: "SD", name: "Sudan" }, { code: "SR", name: "Suriname" }, { code: "SE", name: "Sweden" },
  { code: "CH", name: "Switzerland" }, { code: "SY", name: "Syria" }, { code: "TW", name: "Taiwan" },
  { code: "TJ", name: "Tajikistan" }, { code: "TZ", name: "Tanzania" }, { code: "TH", name: "Thailand" },
  { code: "TL", name: "Timor-Leste" }, { code: "TG", name: "Togo" }, { code: "TO", name: "Tonga" },
  { code: "TT", name: "Trinidad and Tobago" }, { code: "TN", name: "Tunisia" }, { code: "TR", name: "Turkey" },
  { code: "TM", name: "Turkmenistan" }, { code: "TV", name: "Tuvalu" }, { code: "UG", name: "Uganda" },
  { code: "UA", name: "Ukraine" }, { code: "AE", name: "United Arab Emirates" }, { code: "GB", name: "United Kingdom" },
  { code: "US", name: "United States" }, { code: "UY", name: "Uruguay" }, { code: "UZ", name: "Uzbekistan" },
  { code: "VU", name: "Vanuatu" }, { code: "VE", name: "Venezuela" }, { code: "VN", name: "Vietnam" },
  { code: "YE", name: "Yemen" }, { code: "ZM", name: "Zambia" }, { code: "ZW", name: "Zimbabwe" },
];

export const CURRENCIES = [
  { code: "AED", name: "UAE Dirham" }, { code: "AUD", name: "Australian Dollar" },
  { code: "BGN", name: "Bulgarian Lev" }, { code: "BRL", name: "Brazilian Real" },
  { code: "CAD", name: "Canadian Dollar" }, { code: "CHF", name: "Swiss Franc" },
  { code: "CNY", name: "Chinese Yuan" }, { code: "CZK", name: "Czech Koruna" },
  { code: "DKK", name: "Danish Krone" }, { code: "EUR", name: "Euro" },
  { code: "GBP", name: "British Pound" }, { code: "HKD", name: "Hong Kong Dollar" },
  { code: "HUF", name: "Hungarian Forint" }, { code: "IDR", name: "Indonesian Rupiah" },
  { code: "ILS", name: "Israeli Shekel" }, { code: "INR", name: "Indian Rupee" },
  { code: "JPY", name: "Japanese Yen" }, { code: "KRW", name: "South Korean Won" },
  { code: "MXN", name: "Mexican Peso" }, { code: "MYR", name: "Malaysian Ringgit" },
  { code: "NOK", name: "Norwegian Krone" }, { code: "NZD", name: "New Zealand Dollar" },
  { code: "PHP", name: "Philippine Peso" }, { code: "PLN", name: "Polish Zloty" },
  { code: "RON", name: "Romanian Leu" }, { code: "RUB", name: "Russian Ruble" },
  { code: "SAR", name: "Saudi Riyal" }, { code: "SEK", name: "Swedish Krona" },
  { code: "SGD", name: "Singapore Dollar" }, { code: "THB", name: "Thai Baht" },
  { code: "TRY", name: "Turkish Lira" }, { code: "TWD", name: "Taiwan Dollar" },
  { code: "UAH", name: "Ukrainian Hryvnia" }, { code: "USD", name: "US Dollar" },
  { code: "VND", name: "Vietnamese Dong" }, { code: "ZAR", name: "South African Rand" },
];

export const MOCK_SHOPS = [
  { id: "all",      name: "All shops" },
  { id: "eu_store", name: "European Store" },
  { id: "us_store", name: "US Online Store" },
  { id: "b2b",      name: "B2B Portal" },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

export function formatEntry(type: BlacklistType, entry: string): string {
  if (type === "card_country") {
    return COUNTRIES.find(c => c.code === entry)?.name ?? entry;
  }
  if (type === "currency") {
    const cur = CURRENCIES.find(c => c.code === entry);
    return cur ? `${cur.code} — ${cur.name}` : entry;
  }
  return entry;
}

export function getTypeConfig(type: BlacklistType) {
  return BLACKLIST_TYPES.find(t => t.id === type)!;
}

function getStep2Placeholder(type: BlacklistType): string {
  switch (type) {
    case "ip":       return "e.g. 192.168.1.1";
    case "email":    return "e.g. spammer@example.com";
    case "iban":     return "e.g. NL91ABNA0417164300";
    case "pan":      return "e.g. 4111 1111 1111 1111";
    case "shipping": return "e.g. 123 High Risk Street";
    default:         return "Add entry…";
  }
}

// ─── Tag Badge ────────────────────────────────────────────────────────────────

function TagBadge({ label, onRemove }: { label: string; onRemove: () => void }) {
  return (
    <span className="inline-flex items-center gap-[5px] bg-[#F3F4F6] border border-[#E5E7EB] rounded-full pl-[10px] pr-[6px] py-[4px] text-[12px] text-[#374151] font-['Inter',sans-serif]">
      {label}
      <button
        type="button"
        onClick={onRemove}
        className="flex items-center justify-center w-[16px] h-[16px] rounded-full hover:bg-[#E5E7EB] transition-colors text-[#9CA3AF] hover:text-[#374151]"
      >
        <X size={10} strokeWidth={2.5} />
      </button>
    </span>
  );
}

// ─── Searchable Tag Selector (countries / currencies) ────────────────────────

function SearchableTagSelector({
  dataset,
  entries,
  onChange,
  placeholder,
}: {
  dataset: { code: string; name: string }[];
  entries: string[];
  onChange: (entries: string[]) => void;
  placeholder: string;
}) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  const filtered = useMemo(() =>
    query.trim().length === 0
      ? []
      : dataset
          .filter(
            item =>
              item.name.toLowerCase().includes(query.toLowerCase()) ||
              item.code.toLowerCase().includes(query.toLowerCase())
          )
          .slice(0, 8),
    [query, dataset]
  );

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  function add(code: string) {
    if (!entries.includes(code)) onChange([...entries, code]);
    setQuery("");
    setOpen(false);
  }

  function remove(code: string) {
    onChange(entries.filter(e => e !== code));
  }

  return (
    <div className="flex flex-col gap-[12px]">
      <div ref={wrapRef} className="relative">
        <div className="relative">
          <Search size={14} className="absolute left-[12px] top-1/2 -translate-y-1/2 text-[#9CA3AF]" />
          <input
            type="text"
            value={query}
            onChange={e => { setQuery(e.target.value); setOpen(true); }}
            onFocus={() => setOpen(true)}
            placeholder={placeholder}
            className="w-full pl-[36px] pr-[12px] py-[10px] border border-[#E5E7EB] rounded-[8px] text-[14px] text-[#111827] font-['Inter',sans-serif] outline-none focus:border-[#6366F1] focus:ring-2 focus:ring-[#6366F1]/10 transition-all"
          />
        </div>
        {open && filtered.length > 0 && (
          <div className="absolute z-20 left-0 right-0 top-full mt-[4px] bg-white border border-[#E5E7EB] rounded-[8px] shadow-lg overflow-hidden">
            {filtered.map(item => {
              const selected = entries.includes(item.code);
              return (
                <button
                  key={item.code}
                  type="button"
                  onClick={() => add(item.code)}
                  className="w-full flex items-center justify-between px-[12px] py-[9px] text-left hover:bg-[#F9FAFB] transition-colors"
                >
                  <span className="text-[13px] text-[#111827] font-['Inter',sans-serif]">{item.name}</span>
                  <div className="flex items-center gap-[8px]">
                    <span className="text-[11px] text-[#9CA3AF] font-['Inter',sans-serif]">{item.code}</span>
                    {selected && <Check size={13} className="text-[#6366F1]" strokeWidth={2.5} />}
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {entries.length > 0 && (
        <div className="flex flex-wrap gap-[6px]">
          {entries.map(code => (
            <TagBadge
              key={code}
              label={dataset.find(d => d.code === code)?.name ?? code}
              onRemove={() => remove(code)}
            />
          ))}
        </div>
      )}
      {entries.length === 0 && (
        <p className="text-[12px] text-[#9CA3AF] font-['Inter',sans-serif]">Search and select items above to add them to the block list.</p>
      )}
    </div>
  );
}

// ─── Text Tag Input (IP, email, IBAN, PAN, shipping) ─────────────────────────

function TextTagInput({
  entries,
  onChange,
  placeholder,
}: {
  entries: string[];
  onChange: (entries: string[]) => void;
  placeholder: string;
}) {
  const [value, setValue] = useState("");

  function add() {
    const v = value.trim();
    if (v && !entries.includes(v)) {
      onChange([...entries, v]);
      setValue("");
    }
  }

  function handleKey(e: React.KeyboardEvent) {
    if (e.key === "Enter") { e.preventDefault(); add(); }
  }

  function remove(entry: string) {
    onChange(entries.filter(e => e !== entry));
  }

  return (
    <div className="flex flex-col gap-[12px]">
      <div className="flex gap-[8px]">
        <input
          type="text"
          value={value}
          onChange={e => setValue(e.target.value)}
          onKeyDown={handleKey}
          placeholder={placeholder}
          className="flex-1 px-[12px] py-[10px] border border-[#E5E7EB] rounded-[8px] text-[14px] text-[#111827] font-['Inter',sans-serif] outline-none focus:border-[#6366F1] focus:ring-2 focus:ring-[#6366F1]/10 transition-all"
        />
        <button
          type="button"
          onClick={add}
          disabled={!value.trim()}
          className="flex items-center gap-[6px] px-[14px] py-[10px] rounded-[8px] text-[13px] font-medium font-['Inter',sans-serif] transition-all disabled:opacity-40"
          style={{ background: "#111827", color: "white" }}
        >
          <Plus size={14} strokeWidth={2.2} />
          Add
        </button>
      </div>

      {entries.length > 0 ? (
        <div className="flex flex-wrap gap-[6px]">
          {entries.map(entry => (
            <TagBadge key={entry} label={entry} onRemove={() => remove(entry)} />
          ))}
        </div>
      ) : (
        <p className="text-[12px] text-[#9CA3AF] font-['Inter',sans-serif]">Type an entry and press Enter or click Add.</p>
      )}
    </div>
  );
}

// ─── Amount Input ─────────────────────────────────────────────────────────────

function AmountInput({
  entries,
  onChange,
}: {
  entries: string[];
  onChange: (entries: string[]) => void;
}) {
  const [operator, setOperator] = useState(">");
  const [value, setValue] = useState("");
  const [value2, setValue2] = useState("");

  function add() {
    const v = parseFloat(value);
    if (isNaN(v)) return;
    let entry = "";
    if (operator === "between") {
      const v2 = parseFloat(value2);
      if (isNaN(v2)) return;
      entry = `€${v.toFixed(2)} – €${v2.toFixed(2)}`;
    } else {
      const labels: Record<string, string> = { ">": "greater than", "<": "less than", "=": "equal to" };
      entry = `${labels[operator]} €${v.toFixed(2)}`;
    }
    if (!entries.includes(entry)) onChange([...entries, entry]);
    setValue(""); setValue2("");
  }

  return (
    <div className="flex flex-col gap-[14px]">
      <div className="flex flex-col gap-[8px]">
        <label className="text-[12px] font-medium text-[#6B7280] font-['Inter',sans-serif]">Condition</label>
        <select
          value={operator}
          onChange={e => setOperator(e.target.value)}
          className="px-[12px] py-[10px] border border-[#E5E7EB] rounded-[8px] text-[14px] text-[#111827] font-['Inter',sans-serif] outline-none focus:border-[#6366F1] bg-white"
        >
          <option value=">">Is greater than</option>
          <option value="<">Is less than</option>
          <option value="=">Is equal to</option>
          <option value="between">Is between</option>
        </select>
      </div>

      <div className="flex gap-[8px] items-end">
        <div className="flex flex-col gap-[8px] flex-1">
          <label className="text-[12px] font-medium text-[#6B7280] font-['Inter',sans-serif]">
            {operator === "between" ? "From (€)" : "Amount (€)"}
          </label>
          <input
            type="number"
            min="0"
            step="0.01"
            value={value}
            onChange={e => setValue(e.target.value)}
            placeholder="0.00"
            className="px-[12px] py-[10px] border border-[#E5E7EB] rounded-[8px] text-[14px] text-[#111827] font-['Inter',sans-serif] outline-none focus:border-[#6366F1] focus:ring-2 focus:ring-[#6366F1]/10"
          />
        </div>
        {operator === "between" && (
          <div className="flex flex-col gap-[8px] flex-1">
            <label className="text-[12px] font-medium text-[#6B7280] font-['Inter',sans-serif]">To (€)</label>
            <input
              type="number"
              min="0"
              step="0.01"
              value={value2}
              onChange={e => setValue2(e.target.value)}
              placeholder="0.00"
              className="px-[12px] py-[10px] border border-[#E5E7EB] rounded-[8px] text-[14px] text-[#111827] font-['Inter',sans-serif] outline-none focus:border-[#6366F1] focus:ring-2 focus:ring-[#6366F1]/10"
            />
          </div>
        )}
        <button
          type="button"
          onClick={add}
          disabled={!value || (operator === "between" && !value2)}
          className="flex items-center gap-[6px] px-[14px] py-[10px] rounded-[8px] text-[13px] font-medium font-['Inter',sans-serif] transition-all disabled:opacity-40 self-end"
          style={{ background: "#111827", color: "white" }}
        >
          <Plus size={14} strokeWidth={2.2} />
          Add
        </button>
      </div>

      {entries.length > 0 ? (
        <div className="flex flex-wrap gap-[6px]">
          {entries.map(e => (
            <TagBadge key={e} label={e} onRemove={() => onChange(entries.filter(x => x !== e))} />
          ))}
        </div>
      ) : (
        <p className="text-[12px] text-[#9CA3AF] font-['Inter',sans-serif]">Set a condition and click Add to define a block threshold.</p>
      )}
    </div>
  );
}

// ─── Shop Selector ────────────────────────────────────────────────────────────

function ShopSelector({
  selected,
  onChange,
}: {
  selected: string[];
  onChange: (shops: string[]) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  function toggle(id: string) {
    if (id === "all") {
      onChange(["all"]);
    } else {
      const without = selected.filter(s => s !== "all");
      if (without.includes(id)) {
        const next = without.filter(s => s !== id);
        onChange(next.length === 0 ? ["all"] : next);
      } else {
        onChange([...without, id]);
      }
    }
  }

  const displayText = selected.includes("all")
    ? "All shops"
    : MOCK_SHOPS.filter(s => s.id !== "all" && selected.includes(s.id))
        .map(s => s.name)
        .join(", ") || "All shops";

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between px-[12px] py-[10px] border border-[#E5E7EB] rounded-[8px] text-[14px] text-[#111827] bg-white hover:border-[#6366F1] transition-colors font-['Inter',sans-serif]"
      >
        <div className="flex items-center gap-[8px]">
          <Store size={14} className="text-[#6B7280]" />
          <span>{displayText}</span>
        </div>
        <ChevronDown size={14} className={`text-[#9CA3AF] transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className="absolute bottom-full left-0 right-0 mb-[6px] bg-white border border-[#E5E7EB] rounded-[8px] shadow-xl overflow-hidden z-20">
          {MOCK_SHOPS.map(shop => {
            const checked = selected.includes(shop.id);
            return (
              <button
                key={shop.id}
                type="button"
                onClick={() => toggle(shop.id)}
                className="w-full flex items-center gap-[10px] px-[12px] py-[10px] hover:bg-[#F9FAFB] transition-colors text-left"
              >
                <div className={`w-[16px] h-[16px] rounded-[4px] border flex-shrink-0 flex items-center justify-center transition-colors ${checked ? "bg-[#6366F1] border-[#6366F1]" : "border-[#D1D5DB]"}`}>
                  {checked && <Check size={10} className="text-white" strokeWidth={3} />}
                </div>
                <span className="text-[13px] text-[#374151] font-['Inter',sans-serif]">{shop.name}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ─── Step Progress ────────────────────────────────────────────────────────────

function StepDots({ step }: { step: number }) {
  return (
    <div className="flex items-center gap-[6px]">
      {[1, 2, 3].map(s => (
        <div
          key={s}
          className="transition-all duration-300 rounded-full"
          style={{
            width: s === step ? 20 : 6,
            height: 6,
            background: s === step ? "#111827" : s < step ? "#6B7280" : "#E5E7EB",
          }}
        />
      ))}
    </div>
  );
}

// ─── Main Modal ───────────────────────────────────────────────────────────────

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onPublish: (data: { type: BlacklistType; entries: string[]; shops: string[] }) => void;
  editRule?: FraudRule;
}

const STEP_TITLES = ["Choose rule type", "Add entries", "Review & publish"];

export function FraudRuleModal({ isOpen, onClose, onPublish, editRule }: Props) {
  const [step, setStep] = useState(1);
  const [selectedType, setSelectedType] = useState<BlacklistType | null>(null);
  const [entries, setEntries] = useState<string[]>([]);
  const [shops, setShops] = useState<string[]>(["all"]);

  // Reset on open
  useEffect(() => {
    if (isOpen) {
      if (editRule) {
        setStep(1);
        setSelectedType(editRule.type);
        setEntries([...editRule.entries]);
        setShops([...editRule.shops]);
      } else {
        setStep(1);
        setSelectedType(null);
        setEntries([]);
        setShops(["all"]);
      }
    }
  }, [isOpen]);

  const canProceedStep1 = selectedType !== null;
  const canProceedStep2 = entries.length > 0;

  function handleNext() {
    if (step < 3) setStep(s => s + 1);
  }

  function handleBack() {
    if (step > 1) setStep(s => s - 1);
  }

  function handlePublish() {
    if (!selectedType) return;
    onPublish({ type: selectedType, entries, shops });
    onClose();
  }

  const typeConfig = selectedType ? getTypeConfig(selectedType) : null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-[90] transition-opacity duration-300"
        style={{
          background: "rgba(0,0,0,0.35)",
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? "all" : "none",
        }}
        onClick={onClose}
      />

      {/* Panel */}
      <div
        className="fixed right-0 top-0 h-full z-[100] flex flex-col bg-white shadow-2xl transition-transform duration-300 ease-in-out"
        style={{
          width: 460,
          transform: isOpen ? "translateX(0)" : "translateX(100%)",
        }}
      >
        {/* ── Header ── */}
        <div className="flex items-center justify-between px-[28px] py-[20px] border-b border-[#F3F4F6]">
          <div>
            <div className="flex items-center gap-[10px] mb-[4px]">
              <StepDots step={step} />
              <span className="text-[11px] text-[#9CA3AF] font-['Inter',sans-serif]">Step {step} of 3</span>
            </div>
            <p className="font-['Inter',sans-serif] font-semibold text-[16px] text-[#111827]">
              {STEP_TITLES[step - 1]}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex items-center justify-center w-[32px] h-[32px] rounded-full hover:bg-[#F3F4F6] text-[#6B7280] hover:text-[#111827] transition-colors"
          >
            <X size={16} strokeWidth={2} />
          </button>
        </div>

        {/* ── Body ── */}
        <div className="flex-1 overflow-y-auto px-[28px] py-[24px]">

          {/* ─ Step 1: Type selection ─ */}
          {step === 1 && (
            <div className="flex flex-col gap-[16px]">
              <p className="text-[13px] text-[#6B7280] font-['Inter',sans-serif] leading-[20px]">
                Select the attribute you want to use to identify and block fraudulent transactions.
              </p>
              <div className="grid grid-cols-2 gap-[10px]">
                {BLACKLIST_TYPES.map(type => {
                  const active = selectedType === type.id;
                  return (
                    <button
                      key={type.id}
                      type="button"
                      onClick={() => setSelectedType(type.id)}
                      className="flex flex-col items-start gap-[10px] p-[14px] rounded-[10px] border text-left transition-all duration-150"
                      style={{
                        borderColor: active ? type.color : "#E5E7EB",
                        background: active ? type.bg : "white",
                        boxShadow: active ? `0 0 0 2px ${type.color}22` : "none",
                      }}
                    >
                      <div
                        className="flex items-center justify-center w-[34px] h-[34px] rounded-[8px]"
                        style={{ background: type.bg, color: type.color }}
                      >
                        {type.icon}
                      </div>
                      <div>
                        <p className="font-['Inter',sans-serif] font-medium text-[13px] text-[#111827] leading-[18px]">
                          {type.label}
                        </p>
                        <p className="font-['Inter',sans-serif] text-[11px] text-[#9CA3AF] leading-[16px] mt-[2px]">
                          {type.description}
                        </p>
                      </div>
                      {active && (
                        <div
                          className="absolute top-[10px] right-[10px] w-[18px] h-[18px] rounded-full flex items-center justify-center"
                          style={{ background: type.color }}
                        >
                          <Check size={10} className="text-white" strokeWidth={3} />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* ─ Step 2: Entries ─ */}
          {step === 2 && typeConfig && (
            <div className="flex flex-col gap-[20px]">
              {/* Rule type badge */}
              <div
                className="inline-flex items-center gap-[8px] px-[12px] py-[8px] rounded-[8px] self-start"
                style={{ background: typeConfig.bg, border: `1px solid ${typeConfig.border}` }}
              >
                <span style={{ color: typeConfig.color }}>{typeConfig.icon}</span>
                <span className="font-['Inter',sans-serif] font-medium text-[13px]" style={{ color: typeConfig.color }}>
                  {typeConfig.label}
                </span>
              </div>

              <div>
                <p className="font-['Inter',sans-serif] font-medium text-[14px] text-[#111827] mb-[6px]">
                  {selectedType === "card_country" ? "Select countries to block" :
                   selectedType === "currency" ? "Select currencies to block" :
                   selectedType === "amount" ? "Define amount conditions" :
                   "Add entries to block"}
                </p>
                <p className="font-['Inter',sans-serif] text-[13px] text-[#6B7280] mb-[16px]">
                  {selectedType === "card_country"
                    ? "Any card issued in the selected countries will be blocked at checkout."
                    : selectedType === "currency"
                    ? "Transactions attempted in these currencies will be declined."
                    : selectedType === "amount"
                    ? "Transactions matching these amount conditions will be blocked."
                    : `All transactions matching these ${typeConfig.label.toLowerCase()} values will be blocked.`}
                </p>

                {(selectedType === "card_country") && (
                  <SearchableTagSelector
                    dataset={COUNTRIES}
                    entries={entries}
                    onChange={setEntries}
                    placeholder="Search countries…"
                  />
                )}
                {(selectedType === "currency") && (
                  <SearchableTagSelector
                    dataset={CURRENCIES}
                    entries={entries}
                    onChange={setEntries}
                    placeholder="Search currencies…"
                  />
                )}
                {(selectedType === "amount") && (
                  <AmountInput entries={entries} onChange={setEntries} />
                )}
                {(selectedType !== "card_country" && selectedType !== "currency" && selectedType !== "amount") && (
                  <TextTagInput
                    entries={entries}
                    onChange={setEntries}
                    placeholder={getStep2Placeholder(selectedType!)}
                  />
                )}
              </div>
            </div>
          )}

          {/* ─ Step 3: Review ─ */}
          {step === 3 && typeConfig && (
            <div className="flex flex-col gap-[20px]">
              <p className="text-[13px] text-[#6B7280] font-['Inter',sans-serif] leading-[20px]">
                Review your rule before publishing. Once active, it will immediately start blocking matching transactions.
              </p>

              {/* Rule summary card */}
              <div
                className="rounded-[10px] border p-[16px] flex flex-col gap-[14px]"
                style={{ background: typeConfig.bg, borderColor: typeConfig.border }}
              >
                {/* Type */}
                <div className="flex items-center gap-[10px]">
                  <div
                    className="flex items-center justify-center w-[36px] h-[36px] rounded-[9px]"
                    style={{ background: "white", color: typeConfig.color, border: `1px solid ${typeConfig.border}` }}
                  >
                    {typeConfig.icon}
                  </div>
                  <div>
                    <p className="font-['Inter',sans-serif] font-semibold text-[14px] text-[#111827]">
                      {typeConfig.label}
                    </p>
                    <p className="font-['Inter',sans-serif] text-[12px] text-[#6B7280]">
                      {entries.length} {entries.length === 1 ? "entry" : "entries"} will be blocked
                    </p>
                  </div>
                </div>

                {/* Divider */}
                <div className="border-t" style={{ borderColor: typeConfig.border }} />

                {/* Entries */}
                <div>
                  <p className="font-['Inter',sans-serif] text-[11px] font-medium text-[#9CA3AF] uppercase tracking-wide mb-[8px]">
                    Blocked entries
                  </p>
                  <div className="flex flex-wrap gap-[6px]">
                    {entries.slice(0, 8).map(entry => (
                      <span
                        key={entry}
                        className="inline-flex items-center px-[10px] py-[4px] rounded-full text-[12px] font-['Inter',sans-serif] font-medium"
                        style={{ background: "white", color: typeConfig.color, border: `1px solid ${typeConfig.border}` }}
                      >
                        {formatEntry(selectedType!, entry)}
                      </span>
                    ))}
                    {entries.length > 8 && (
                      <span className="inline-flex items-center px-[10px] py-[4px] rounded-full text-[12px] font-['Inter',sans-serif] text-[#6B7280] bg-white border border-[#E5E7EB]">
                        +{entries.length - 8} more
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Shop selector */}
              <div>
                <p className="font-['Inter',sans-serif] font-medium text-[13px] text-[#6B7280] mb-[6px] uppercase tracking-wide text-[11px]">
                  Protect my shop
                </p>
                <p className="font-['Inter',sans-serif] text-[12px] text-[#9CA3AF] mb-[10px]">
                  Select which shops this rule applies to.
                </p>
                <ShopSelector selected={shops} onChange={setShops} />
              </div>

              {/* Active state notice */}
              <div className="flex items-start gap-[10px] bg-[#F0FDF4] border border-[#BBF7D0] rounded-[8px] px-[14px] py-[12px]">
                <div className="w-[18px] h-[18px] rounded-full bg-[#22C55E] flex items-center justify-center flex-shrink-0 mt-[1px]">
                  <Check size={10} className="text-white" strokeWidth={3} />
                </div>
                <p className="font-['Inter',sans-serif] text-[12px] text-[#166534] leading-[18px]">
                  This rule will be set to <span className="font-semibold">Active</span> immediately upon publishing and will start protecting your store in real time.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* ── Footer ── */}
        <div className="border-t border-[#F3F4F6] px-[28px] py-[18px] flex items-center justify-between gap-[12px]">
          {step > 1 ? (
            <button
              type="button"
              onClick={handleBack}
              className="flex items-center gap-[6px] px-[16px] py-[10px] rounded-[8px] border border-[#E5E7EB] text-[13px] font-medium text-[#374151] font-['Inter',sans-serif] hover:bg-[#F9FAFB] transition-colors"
            >
              <ChevronLeft size={14} strokeWidth={2.2} />
              Back
            </button>
          ) : (
            <div />
          )}

          {step < 3 ? (
            <button
              type="button"
              onClick={handleNext}
              disabled={step === 1 ? !canProceedStep1 : !canProceedStep2}
              className="flex items-center gap-[6px] px-[20px] py-[10px] rounded-[8px] text-[13px] font-medium text-white font-['Inter',sans-serif] transition-all disabled:opacity-40"
              style={{ background: "linear-gradient(135deg, #111827 0%, #1F2937 100%)" }}
            >
              Continue
              <ChevronRight size={14} strokeWidth={2.2} />
            </button>
          ) : (
            <button
              type="button"
              onClick={handlePublish}
              className="flex items-center gap-[6px] px-[20px] py-[10px] rounded-[8px] text-[13px] font-medium text-white font-['Inter',sans-serif] transition-all hover:opacity-90"
              style={{ background: "linear-gradient(135deg, #6366F1 0%, #4F46E5 100%)", boxShadow: "0 4px 12px rgba(99,102,241,0.35)" }}
            >
              <Check size={14} strokeWidth={2.5} />
              Publish rule
            </button>
          )}
        </div>
      </div>
    </>
  );
}
