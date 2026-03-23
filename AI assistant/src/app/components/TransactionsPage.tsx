import { useState } from "react";
import { TopBar } from "./TopBar";
import svgPaths from "../../imports/svg-0513icm6wj";

const tabs = ["All transactions", "Online", "Instore", "Acquiring"];

type Status = "Paid" | "Pending" | "Failed" | "Refunded";

interface Transaction {
  id: string;
  cardType: string;
  cardNumber: string;
  status: Status;
  type: string;
  location: string;
  amount: string;
  date: string;
}

const transactions: Transaction[] = [
  { id: "#2456221", cardType: "VISA", cardNumber: "****9382", status: "Paid", type: "Refund", location: "#113239382", amount: "€ 259,00", date: "24/02/25, 21:05" },
  { id: "#2456222", cardType: "VISA", cardNumber: "****9382", status: "Pending", type: "113239383", location: "#113239382", amount: "€ 150,00", date: "25/02/25, 14:30" },
  { id: "#2456223", cardType: "VISA", cardNumber: "****9382", status: "Paid", type: "113239384", location: "#113239382", amount: "€ 320,00", date: "26/02/25, 09:15" },
  { id: "#2456224", cardType: "VISA", cardNumber: "****9382", status: "Failed", type: "113239385", location: "#113239382", amount: "€ 89,00", date: "27/02/25, 11:45" },
  { id: "#2456225", cardType: "VISA", cardNumber: "****9382", status: "Refunded", type: "113239386", location: "#113239382", amount: "€ 120,00", date: "28/02/25, 16:00" },
  { id: "#2456226", cardType: "VISA", cardNumber: "****9382", status: "Paid", type: "113239387", location: "#113239382", amount: "€ 450,00", date: "01/03/25, 18:20" },
  { id: "#2456227", cardType: "VISA", cardNumber: "****9382", status: "Pending", type: "113239388", location: "#113239382", amount: "€ 75,00", date: "02/03/25, 10:10" },
  { id: "#2456228", cardType: "VISA", cardNumber: "****9382", status: "Paid", type: "113239389", location: "#113239382", amount: "€ 200,00", date: "03/03/25, 12:00" },
  { id: "#2456229", cardType: "VISA", cardNumber: "****9382", status: "Failed", type: "113239390", location: "#113239382", amount: "€ 300,00", date: "04/03/25, 14:15" },
  { id: "#2456230", cardType: "VISA", cardNumber: "****9382", status: "Refunded", type: "113239391", location: "#113239382", amount: "€ 180,00", date: "05/03/25, 09:45" },
];

const statusStyles: Record<Status, { bg: string; text: string; dot: string }> = {
  Paid: { bg: "bg-[#ecfdf3]", text: "text-[#027a48]", dot: "bg-[#12b76a]" },
  Pending: { bg: "bg-[#fffaeb]", text: "text-[#b54708]", dot: "bg-[#f79009]" },
  Failed: { bg: "bg-[#fef3f2]", text: "text-[#b42318]", dot: "bg-[#f04438]" },
  Refunded: { bg: "bg-[#f2f4f7]", text: "text-[#344054]", dot: "bg-[#667085]" },
};

function SearchIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
      <path d={svgPaths.p87706f0 || svgPaths.p10b29800} fill="#667085" />
    </svg>
  );
}

function FilterIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
      <path d={svgPaths.p23b8a680} fill="#344054" />
    </svg>
  );
}

function SortIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
      <path d={svgPaths.p362a21f0} fill="#667085" />
    </svg>
  );
}

export function TransactionsPage() {
  const [activeTab, setActiveTab] = useState("All transactions");
  const [currentPage, setCurrentPage] = useState(1);
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const toggleAll = () => {
    if (selected.size === transactions.length) {
      setSelected(new Set());
    } else {
      setSelected(new Set(transactions.map((t) => t.id)));
    }
  };

  const toggleSelect = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div className="w-full">
      <TopBar title="Transactions" />
      <div className="max-w-[1440px] w-full px-[32px] py-[24px]">
        {/* Tabs */}
        <div className="flex gap-[24px] border-b border-[#e6ebeb] mb-[20px]">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-[12px] text-[14px] font-['Inter',sans-serif] font-medium leading-[18px] border-b-2 transition-colors ${
                activeTab === tab
                  ? "border-[#2c6764] text-[#121621]"
                  : "border-transparent text-[#667085] hover:text-[#344054]"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Search & Filters bar */}
        <div className="flex items-center justify-between mb-[16px]">
          <div className="flex items-center gap-[12px]">
            {/* Search */}
            <div className="flex items-center gap-[8px] bg-white border border-[#d0d5dd] rounded-[8px] px-[14px] py-[10px] w-[280px]">
              <SearchIcon />
              <input
                type="text"
                placeholder="Search"
                className="bg-transparent outline-none text-[14px] font-['Inter',sans-serif] w-full placeholder:text-[#667085]"
              />
            </div>
            {/* Filters */}
            <button className="flex items-center gap-[8px] text-[14px] font-['Inter',sans-serif] font-medium text-[#344054] border border-[#d0d5dd] rounded-[8px] px-[16px] py-[10px] bg-white hover:bg-[#f9fafb]">
              <FilterIcon />
              Filters
            </button>
          </div>
          {/* Export */}
          <button className="flex items-center gap-[8px] text-[14px] font-['Inter',sans-serif] font-medium text-white bg-[#2c6764] rounded-[8px] px-[16px] py-[10px] hover:bg-[#245553]">
            Export
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
          </button>
        </div>

        {/* Table */}
        <div className="bg-white rounded-[12px] border border-[#e6ebeb] overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#eaecf0] bg-[#f9fafb]">
                <th className="w-[44px] px-[16px] py-[12px]">
                  <input
                    type="checkbox"
                    checked={selected.size === transactions.length}
                    onChange={toggleAll}
                    className="accent-[#2c6764] w-[16px] h-[16px]"
                  />
                </th>
                <th className="text-left px-[16px] py-[12px] text-[12px] text-[#667085] font-['Inter',sans-serif] font-medium leading-[18px]">
                  Transaction ID
                </th>
                <th className="text-left px-[16px] py-[12px] text-[12px] text-[#667085] font-['Inter',sans-serif] font-medium leading-[18px]">
                  Cardnumber
                </th>
                <th className="text-left px-[16px] py-[12px] text-[12px] text-[#667085] font-['Inter',sans-serif] font-medium leading-[18px]">
                  Status
                </th>
                <th className="text-left px-[16px] py-[12px] text-[12px] text-[#667085] font-['Inter',sans-serif] font-medium leading-[18px]">
                  Type
                </th>
                <th className="text-left px-[16px] py-[12px] text-[12px] text-[#667085] font-['Inter',sans-serif] font-medium leading-[18px]">
                  Location
                </th>
                <th className="text-left px-[16px] py-[12px] text-[12px] text-[#667085] font-['Inter',sans-serif] font-medium leading-[18px]">
                  Amount
                </th>
                <th className="text-left px-[16px] py-[12px] text-[12px] text-[#667085] font-['Inter',sans-serif] font-medium leading-[18px]">
                  <span className="flex items-center gap-[4px]">
                    Date
                    <SortIcon />
                  </span>
                </th>
                <th className="w-[44px] px-[16px] py-[12px]"></th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((t) => {
                const s = statusStyles[t.status];
                return (
                  <tr key={t.id} className="border-b border-[#eaecf0] hover:bg-[#f9fafb] transition-colors">
                    <td className="px-[16px] py-[16px]">
                      <input
                        type="checkbox"
                        checked={selected.has(t.id)}
                        onChange={() => toggleSelect(t.id)}
                        className="accent-[#2c6764] w-[16px] h-[16px]"
                      />
                    </td>
                    <td className="px-[16px] py-[16px] text-[14px] text-[#101828] font-['Inter',sans-serif] font-medium">
                      {t.id}
                    </td>
                    <td className="px-[16px] py-[16px]">
                      <span className="flex items-center gap-[8px]">
                        <span className="bg-[#1a1f71] text-white text-[9px] font-['Inter',sans-serif] font-medium px-[6px] py-[2px] rounded-[2px] tracking-wider">
                          VISA
                        </span>
                        <span className="text-[14px] text-[#667085] font-['Inter',sans-serif]">{t.cardNumber}</span>
                      </span>
                    </td>
                    <td className="px-[16px] py-[16px]">
                      <span className={`inline-flex items-center gap-[6px] px-[8px] py-[2px] rounded-[16px] text-[12px] font-['Inter',sans-serif] font-medium ${s.bg} ${s.text}`}>
                        <span className={`w-[6px] h-[6px] rounded-full ${s.dot}`} />
                        {t.status}
                      </span>
                    </td>
                    <td className="px-[16px] py-[16px] text-[14px] text-[#667085] font-['Inter',sans-serif]">{t.type}</td>
                    <td className="px-[16px] py-[16px] text-[14px] text-[#667085] font-['Inter',sans-serif]">{t.location}</td>
                    <td className="px-[16px] py-[16px] text-[14px] text-[#101828] font-['Inter',sans-serif] font-medium">{t.amount}</td>
                    <td className="px-[16px] py-[16px] text-[14px] text-[#667085] font-['Inter',sans-serif]">{t.date}</td>
                    <td className="px-[16px] py-[16px]">
                      <button className="text-[#667085] hover:text-[#344054] text-[18px] leading-none">&#x22EE;</button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="flex items-center justify-between px-[16px] py-[12px] border-t border-[#eaecf0]">
            <span className="text-[14px] text-[#667085] font-['Inter',sans-serif]">Page 1 of 16</span>
            <div className="flex items-center gap-[4px]">
              <button className="w-[32px] h-[32px] flex items-center justify-center rounded-[6px] border border-[#d0d5dd] bg-white hover:bg-[#f9fafb] text-[14px] text-[#344054]">
                &laquo;
              </button>
              <button className="w-[32px] h-[32px] flex items-center justify-center rounded-[6px] border border-[#d0d5dd] bg-white hover:bg-[#f9fafb] text-[14px] text-[#344054]">
                &lsaquo;
              </button>
              {[1, 2, 3].map((p) => (
                <button
                  key={p}
                  onClick={() => setCurrentPage(p)}
                  className={`w-[32px] h-[32px] flex items-center justify-center rounded-[6px] text-[14px] font-['Inter',sans-serif] ${
                    currentPage === p
                      ? "bg-[#2c6764] text-white"
                      : "border border-[#d0d5dd] bg-white hover:bg-[#f9fafb] text-[#344054]"
                  }`}
                >
                  {p}
                </button>
              ))}
              <span className="text-[14px] text-[#667085] px-[4px]">...</span>
              <button className="w-[32px] h-[32px] flex items-center justify-center rounded-[6px] border border-[#d0d5dd] bg-white hover:bg-[#f9fafb] text-[14px] text-[#344054]">
                16
              </button>
              <button className="w-[32px] h-[32px] flex items-center justify-center rounded-[6px] border border-[#d0d5dd] bg-white hover:bg-[#f9fafb] text-[14px] text-[#344054]">
                &rsaquo;
              </button>
              <button className="w-[32px] h-[32px] flex items-center justify-center rounded-[6px] border border-[#d0d5dd] bg-white hover:bg-[#f9fafb] text-[14px] text-[#344054]">
                &raquo;
              </button>
            </div>
            <div className="flex items-center gap-[8px]">
              <span className="text-[14px] text-[#667085] font-['Inter',sans-serif]">View:</span>
              <select className="border border-[#d0d5dd] rounded-[6px] px-[8px] py-[4px] bg-white text-[14px] font-['Inter',sans-serif] text-[#344054]">
                <option>10</option>
                <option>25</option>
                <option>50</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
