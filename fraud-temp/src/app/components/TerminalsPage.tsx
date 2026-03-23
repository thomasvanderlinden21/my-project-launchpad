import { useState } from "react";
import { TopBar } from "./TopBar";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import svgPaths from "../../imports/svg-0513icm6wj";

const terminalImg = "https://images.unsplash.com/photo-1726066012768-9aee2dc59e5f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXltZW50JTIwdGVybWluYWwlMjBQT1MlMjBkZXZpY2V8ZW58MXx8fHwxNzczODIzNTcwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";

type TerminalStatus = "Active" | "Inactive" | "New update" | "Shipped";

interface Terminal {
  id: string;
  name: string;
  serial: string;
  locationLabel?: string;
  locationValue?: string;
  trackingLabel?: string;
  trackingValue?: string;
  status: TerminalStatus;
}

const terminals: Terminal[] = [
  { id: "1", name: "Outside #1", serial: "#98465342", locationLabel: "Location", locationValue: "Cycle shop 2", status: "Active" },
  { id: "2", name: "Outside #2", serial: "#98465342", locationLabel: "Location", locationValue: "Cycle shop 2", status: "Active" },
  { id: "3", name: "Outside #3", serial: "#98465342", locationLabel: "Location", locationValue: "Cycle shop 2", status: "New update" },
  { id: "4", name: "Saturn 1000F2", serial: "#98465342", trackingLabel: "Tracking number", trackingValue: "#dhl1234567", status: "Shipped" },
  { id: "5", name: "Internal #2", serial: "#98465342", locationLabel: "Location", locationValue: "Cycle shop 2", status: "Inactive" },
];

const statusStyles: Record<TerminalStatus, { bg: string; text: string; dot: string }> = {
  Active: { bg: "bg-[#ecfdf3]", text: "text-[#027a48]", dot: "bg-[#12b76a]" },
  Inactive: { bg: "bg-[#fef3f2]", text: "text-[#b42318]", dot: "bg-[#f04438]" },
  "New update": { bg: "bg-[#fffaeb]", text: "text-[#b54708]", dot: "bg-[#f79009]" },
  Shipped: { bg: "bg-[#ecfdf3]", text: "text-[#027a48]", dot: "bg-[#12b76a]" },
};

export function TerminalsPage() {
  const [activeTab, setActiveTab] = useState("Terminals");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  return (
    <div className="w-full">
      <TopBar title="Terminals" />
      <div className="max-w-[1440px] w-full px-[32px] py-[24px]">
        {/* Tabs */}
        <div className="flex gap-[24px] border-b border-[#e6ebeb] mb-[20px]">
          {["Terminals", "Accessoires"].map((tab) => (
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

        {/* Search, Filters, View toggle, Settings, Order */}
        <div className="flex items-center justify-between mb-[20px]">
          <div className="flex items-center gap-[12px]">
            <div className="flex items-center gap-[8px] bg-white border border-[#d0d5dd] rounded-[8px] px-[14px] py-[10px] w-[280px]">
              <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
                <path d={svgPaths.p87706f0 || svgPaths.p10b29800} fill="#667085" />
              </svg>
              <input
                type="text"
                placeholder="Search"
                className="bg-transparent outline-none text-[14px] font-['Inter',sans-serif] w-full placeholder:text-[#667085]"
              />
            </div>
            <button className="flex items-center gap-[8px] text-[14px] font-['Inter',sans-serif] font-medium text-[#344054] border border-[#d0d5dd] rounded-[8px] px-[16px] py-[10px] bg-white hover:bg-[#f9fafb]">
              <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
                <path d={svgPaths.p23b8a680} fill="#344054" />
              </svg>
              Filters
            </button>
          </div>
          <div className="flex items-center gap-[12px]">
            {/* View toggle */}
            <div className="flex border border-[#d0d5dd] rounded-[8px] overflow-hidden bg-white">
              <button
                onClick={() => setViewMode("list")}
                className={`p-[8px] ${viewMode === "list" ? "bg-[#f2f4f7]" : "hover:bg-[#f9fafb]"}`}
              >
                <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                  <path d={svgPaths.p3bee7700} fill="#344054" />
                </svg>
              </button>
              <button
                onClick={() => setViewMode("grid")}
                className={`p-[8px] border-l border-[#d0d5dd] ${viewMode === "grid" ? "bg-[#f2f4f7]" : "hover:bg-[#f9fafb]"}`}
              >
                <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                  <path d={svgPaths.p1249ad00} fill="#344054" />
                </svg>
              </button>
            </div>
            {/* Settings */}
            <button className="text-[14px] font-['Inter',sans-serif] font-medium text-[#344054] border border-[#d0d5dd] rounded-[8px] px-[16px] py-[10px] bg-white hover:bg-[#f9fafb]">
              Settings
            </button>
            {/* Order terminal */}
            <button className="text-[14px] font-['Inter',sans-serif] font-medium text-white bg-[#2c6764] rounded-[8px] px-[16px] py-[10px] hover:bg-[#245553]">
              Order terminal
            </button>
          </div>
        </div>

        {/* Terminal cards grid */}
        <div className="grid grid-cols-4 gap-[16px]">
          {terminals.map((terminal) => {
            const s = statusStyles[terminal.status];
            return (
              <div
                key={terminal.id}
                className="bg-white rounded-[12px] border border-[#e6ebeb] p-[16px] flex flex-col hover:shadow-sm transition-shadow"
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-[4px]">
                  <div>
                    <div className="flex items-center gap-[8px]">
                      {terminal.status === "Active" && (
                        <span className="w-[8px] h-[8px] rounded-full bg-[#12b76a] inline-block" />
                      )}
                      <span className="text-[14px] text-[#101828] font-['Inter',sans-serif] font-medium leading-[20px]">
                        {terminal.name}
                      </span>
                    </div>
                    <span className="text-[12px] text-[#667085] font-['Inter',sans-serif] leading-[18px]">
                      {terminal.serial}
                    </span>
                  </div>
                  <input type="checkbox" className="accent-[#2c6764] w-[16px] h-[16px] mt-[2px]" />
                </div>

                {/* Image */}
                <div className="flex-1 flex items-center justify-center py-[16px]">
                  <ImageWithFallback
                    src={terminalImg}
                    alt={terminal.name}
                    className="h-[120px] w-auto object-contain rounded-[6px]"
                  />
                </div>

                {/* Footer */}
                <div className="flex items-end justify-between mt-[8px]">
                  <div>
                    <span className="text-[11px] text-[#667085] font-['Inter',sans-serif] block leading-[16px]">
                      {terminal.trackingLabel || terminal.locationLabel}
                    </span>
                    <span className="text-[13px] text-[#101828] font-['Inter',sans-serif] font-medium leading-[20px]">
                      {terminal.trackingValue || terminal.locationValue}
                    </span>
                  </div>
                  <span className={`inline-flex items-center gap-[6px] px-[8px] py-[2px] rounded-[16px] text-[12px] font-['Inter',sans-serif] font-medium ${s.bg} ${s.text}`}>
                    <span className={`w-[6px] h-[6px] rounded-full ${s.dot}`} />
                    {terminal.status}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
