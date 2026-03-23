import { NavLink, useLocation, useNavigate } from "react-router";
import svgPaths from "../../imports/svg-sv7j3znt9j";
import { useAIAssistant } from "./AIAssistantContext";

// ─── Nav data ────────────────────────────────────────────────────────────────

const mainNavItems = [
  { label: "Home",              path: "/",            icon: "p2d3f6570", vb: "0 0 20 20" },
  { label: "Sales",             path: "/sales",       icon: "pb070100",  vb: "0 0 20 20" },
  { label: "Terminals",         path: "/terminals",   icon: "p5de6200",  vb: "0 0 21 20" },
  { label: "Payments",          path: "/payments",    icon: "p5724e00",  vb: "0 0 20 20" },
  { label: "Product catalogue", path: "/products",    icon: "p68c1500",  vb: "0 0 20 20" },
  { label: "My business",       path: "/business",    icon: "p3e5e2cc0", vb: "0 0 20 20" },
  { label: "card Issuing",      path: "/card-issuing",icon: "pb070100",  vb: "0 0 20 20" },
  { label: "Cash advance",      path: "/cash-advance",icon: "p1cfdee00", vb: "0 0 20 20" },
];

const salesSubItems = [
  { label: "Transactions", path: "/sales/transactions" },
  { label: "Orders",       path: "/sales/orders" },
  { label: "Invoices",     path: "/sales/invoices" },
  { label: "Reports",      path: "/sales/reports" },
  { label: "Disputes",     path: "/sales/disputes" },
];

const settingsCompanyItems = [
  { label: "Overview",         path: "/settings" },
  { label: "Users",            path: "/settings/users" },
  { label: "Company details",  path: "/settings/company" },
  { label: "E-comm",           path: "/settings/ecomm" },
  { label: "Fraud",            path: "/settings/fraud" },
  { label: "Your branding",    path: "/settings/branding" },
  { label: "Terminals",        path: "/settings/terminals" },
  { label: "Bank accounts",    path: "/settings/bank-accounts" },
  { label: "Contracts",        path: "/settings/contracts" },
];

const settingsPersonalItems = [
  { label: "Personal details", path: "/settings/personal" },
  { label: "Preferences",      path: "/settings/preferences" },
];

const bottomItems = [
  { label: "Settings",      icon: "p1f1c2c80", vb: "0 0 20 20", stroke: false },
  { label: "Notifications", icon: "p16b7500",  vb: "0 0 20 20", stroke: false },
  { label: "Help",          icon: "pbf4fb00",  vb: "0 0 20 20", stroke: false },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function NavIconSvg({ pathKey, vb }: { pathKey: string; vb: string }) {
  const d = (svgPaths as Record<string, string>)[pathKey];
  if (!d) return null;
  return (
    <svg className="block shrink-0" fill="none" viewBox={vb} width={20} height={20}>
      <path d={d} fill="white" />
    </svg>
  );
}

function AiIconSvg() {
  const d = (svgPaths as Record<string, string>)["p2b07bc80"];
  if (!d) return null;
  return (
    <svg className="block shrink-0" fill="none" viewBox="0 0 18.1667 18.1667" width={20} height={20}>
      <path d={d} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
    </svg>
  );
}

/** Full WORLDLINE wordmark — 120×12 inside a 52px-tall row, left-[12px] */
function LogoLarge() {
  return (
    <div className="h-[52px] overflow-clip relative shrink-0 w-full" data-name="Logo large">
      <div className="-translate-y-1/2 absolute h-[12px] left-[12px] top-1/2 w-[120px]">
        {/* Wave symbol — right portion */}
        <div className="absolute inset-[24.24%_15.27%_1.52%_80.44%]"><svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5.14003 8.90909"><path d={svgPaths.p16e83d80} fill="white" /></svg></div>
        <div className="absolute inset-[43.94%_17.91%_1.52%_78.96%]"><svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 3.75617 6.54546"><path d={svgPaths.pce88780} fill="white" /></svg></div>
        <div className="absolute inset-[71.21%_20.55%_1.52%_78.14%]"><svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1.58155 3.27273"><path d={svgPaths.p21f46440} fill="white" /></svg></div>
        <div className="absolute inset-[1.52%_6.21%_1.52%_82.42%]"><svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.6409 11.6364"><path d={svgPaths.p14b3600} fill="white" /></svg></div>
        <div className="absolute inset-[31.82%_4.57%_1.52%_91.81%]"><svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4.34927 8"><path d={svgPaths.pc93fc00} fill="white" /></svg></div>
        <div className="absolute inset-[51.52%_3.08%_1.52%_94.45%]"><svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2.9654 5.63636"><path d={svgPaths.p1a3f39e0} fill="white" /></svg></div>
        <div className="absolute inset-[81.82%_2.26%_1.52%_97.08%]"><svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 0.790772 2"><path d={svgPaths.p1e7ec580} fill="white" /></svg></div>
        {/* Word letters */}
        <div className="absolute inset-[3.03%_60.63%_3.03%_33.61%]"><svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6.91927 11.2727"><path d={svgPaths.p2ef50600} fill="white" /></svg></div>
        <div className="absolute inset-[3.03%_44.48%_3.03%_50.41%]"><svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6.1285 11.2727"><path d={svgPaths.p7ce6200} fill="white" /></svg></div>
        <div className="absolute inset-[3.03%_42.83%_3.03%_56.34%]"><svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 0.988473 11.2727"><path d={svgPaths.p6eb7a40} fill="white" /></svg></div>
        <div className="absolute inset-[3.03%_25.86%_3.03%_68.7%]"><svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6.52389 11.2727"><path d={svgPaths.p34d7ba20} fill="white" /></svg></div>
        <div className="absolute inset-[3.03%_33.11%_3.03%_59.14%]"><svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.2916 11.2727"><path d={svgPaths.p2a55f280} fill="white" /></svg></div>
        <div className="absolute inset-[3.03%_86.66%_3.03%_0]"><svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16.0132 11.2727"><path d={svgPaths.p1e2f00} fill="white" /></svg></div>
        <div className="absolute inset-[1.52%_51.07%_1.52%_40.36%]"><svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10.2801 11.6364"><path d={svgPaths.p28f01f00} fill="white" /></svg></div>
        <div className="absolute inset-[0_76.44%_0_13.34%]"><svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12.257 12"><path d={svgPaths.p128992c0} fill="white" /></svg></div>
        <div className="absolute inset-[1.52%_67.22%_3.03%_24.55%]"><svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.88468 11.4545"><path d={svgPaths.p2812b000} fill="white" /></svg></div>
      </div>
    </div>
  );
}

/** Small 36×36 logo circle with wave mark — used in the icon strip on Sales pages */
function LogoSmall() {
  return (
    <div
      className="overflow-clip relative rounded-[8px] shrink-0 size-[36px]"
      style={{ background: "rgba(255,255,255,0.12)" }}
    >
      {/* Wave mark (p14b3600 = main W-wave), positioned inside 36×36 at left-6 top-11, 24×12 */}
      <div className="absolute h-[12px] left-[6px] top-[12px] w-[24px]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.6409 11.6364">
          <path d={svgPaths.p14b3600} fill="white" />
        </svg>
      </div>
    </div>
  );
}

// ─── Main Sidebar ─────────────────────────────────────────────────────────────

export function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const isSalesActive = location.pathname.startsWith("/sales");
  const isSettingsActive = location.pathname.startsWith("/settings");
  const { isOpen: aiOpen, togglePanel: toggleAI } = useAIAssistant();

  function handleSalesClick() {
    if (!isSalesActive) navigate("/sales/transactions");
  }

  // ── Active-state helpers ─────────────────────────────────────────────────
  const activeItemCls =
    "backdrop-blur-[2px] bg-[rgba(255,255,255,0.12)] relative rounded-[4px]";
  const inactiveItemCls = "relative rounded-[4px]";
  const border = (
    <div
      aria-hidden="true"
      className="absolute border border-[rgba(255,255,255,0.08)] border-solid inset-0 pointer-events-none rounded-[4px]"
    />
  );

  // ── Non-Sales view: full icon+text nav ──────────────────────────────────
  const FullNav = (
    <div className="absolute inset-0 flex flex-col py-[12px]">
      <LogoLarge />

      {/* Nav items */}
      <div className="flex-1 flex flex-col gap-[8px] items-start px-[8px] overflow-auto">
        {mainNavItems.map((item) => {
          const isActive =
            item.path === "/"
              ? location.pathname === "/"
              : location.pathname.startsWith(item.path);
          const isSales = item.label === "Sales";

          const inner = (
            <div className="flex gap-[8px] items-center p-[8px] w-full">
              <div className="flex flex-col items-center justify-center p-[4px] shrink-0 size-[20px]">
                <NavIconSvg pathKey={item.icon} vb={item.vb} />
              </div>
              <div className="flex flex-col font-['Inter',sans-serif] font-medium justify-center leading-[0] shrink-0 text-[14px] text-white whitespace-nowrap">
                <p className="leading-[18px]">{item.label}</p>
              </div>
            </div>
          );

          if (isSales) {
            return (
              <button
                key={item.label}
                onClick={handleSalesClick}
                className={`${isActive ? activeItemCls : inactiveItemCls} w-full text-left`}
              >
                {isActive && border}
                {inner}
              </button>
            );
          }

          return (
            <NavLink
              key={item.label}
              to={item.path}
              end={item.path === "/"}
              className={({ isActive: a }) => `${a ? activeItemCls : inactiveItemCls} w-full block`}
            >
              {({ isActive: a }) => (
                <>
                  {a && border}
                  {inner}
                </>
              )}
            </NavLink>
          );
        })}
      </div>

      {/* Bottom: 2×2 grid with icon + label */}
      <div className="shrink-0 w-full">
        <div className="flex items-center justify-between px-[12px] py-[8px]">
          {bottomItems.map(({ label, icon, vb }) => (
            <button
              key={label}
              title={label}
              onClick={label === "Settings" ? () => navigate("/settings") : undefined}
              className={`flex flex-1 flex-col items-center justify-center pb-[2px] ${
                label === "Settings" && isSettingsActive ? "opacity-100" : ""
              }`}
            >
              <div
                className={`flex flex-col items-center justify-center p-[8px] rounded-[4px] hover:bg-[rgba(255,255,255,0.08)] transition-colors ${
                  label === "Settings" && isSettingsActive
                    ? "backdrop-blur-[2px] bg-[rgba(255,255,255,0.12)]"
                    : ""
                }`}
              >
                <div className="flex flex-col items-center justify-center overflow-clip p-[4px] size-[20px]">
                  <NavIconSvg pathKey={icon} vb={vb} />
                </div>
              </div>
              <p className="font-['Inter',sans-serif] font-medium leading-[18px] text-[10px] text-center text-white whitespace-nowrap">
                {label}
              </p>
            </button>
          ))}
          {/* AI assistant */}
          <button
            title="AI assistant"
            onClick={toggleAI}
            className={`flex flex-1 flex-col items-center justify-center pb-[2px]`}
          >
            <div className={`flex flex-col items-center justify-center p-[8px] rounded-[4px] transition-colors ${aiOpen ? "bg-[rgba(255,255,255,0.18)]" : "hover:bg-[rgba(255,255,255,0.08)]"}`}>
              <div className="flex flex-col items-center justify-center overflow-clip p-[4px] size-[20px]">
                <AiIconSvg />
              </div>
            </div>
            <p className="font-['Inter',sans-serif] font-medium leading-[18px] text-[10px] text-center text-white whitespace-nowrap">
              AI assistant
            </p>
          </button>
        </div>
      </div>
    </div>
  );

  // ── Sales view: 52px icon strip + 220px text sub-nav ───────────────────
  const SalesView = (
    <>
      {/* Left icon strip — 52px */}
      <div className="absolute top-0 bottom-0 left-0 w-[52px] flex flex-col py-[12px]">
        {/* Small logo in 52px×52px container */}
        <div className="flex h-[52px] items-center justify-center overflow-clip p-[3px] shrink-0 w-[52px]">
          <LogoSmall />
        </div>

        {/* Icon-only nav items */}
        <div className="flex-1 flex flex-col gap-[8px] items-center px-[3px] overflow-auto">
          {mainNavItems.map((item) => {
            const isActive =
              item.path === "/"
                ? location.pathname === "/"
                : location.pathname.startsWith(item.path);
            const isSales = item.label === "Sales";

            const btnCls = `flex flex-col items-center justify-center p-[8px] rounded-[4px] transition-colors w-full ${
              isActive
                ? "backdrop-blur-[2px] bg-[rgba(255,255,255,0.12)]"
                : "hover:bg-[rgba(255,255,255,0.08)]"
            }`;

            return isSales ? (
              <button key={item.label} onClick={handleSalesClick} className={btnCls}>
                {isActive && (
                  <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.08)] border-solid inset-0 pointer-events-none rounded-[4px]" />
                )}
                <div className="flex flex-col items-center justify-center overflow-clip p-[4px] size-[20px]">
                  <NavIconSvg pathKey={item.icon} vb={item.vb} />
                </div>
              </button>
            ) : (
              <NavLink
                key={item.label}
                to={item.path}
                end={item.path === "/"}
                className={({ isActive: a }) =>
                  `flex flex-col items-center justify-center p-[8px] rounded-[4px] transition-colors w-full ${
                    a ? "backdrop-blur-[2px] bg-[rgba(255,255,255,0.12)]" : "hover:bg-[rgba(255,255,255,0.08)]"
                  }`
                }
              >
                <div className="flex flex-col items-center justify-center overflow-clip p-[4px] size-[20px]">
                  <NavIconSvg pathKey={item.icon} vb={item.vb} />
                </div>
              </NavLink>
            );
          })}
        </div>

        {/* Icon-only bottom */}
        <div className="flex flex-col gap-[8px] items-center px-[3px] pb-[0px] shrink-0">
          {bottomItems.map(({ label, icon, vb }) => (
            <button key={label} title={label} className="flex flex-col items-center justify-center p-[8px] rounded-[4px] hover:bg-[rgba(255,255,255,0.08)] transition-colors w-full">
              <div className="flex flex-col items-center justify-center overflow-clip p-[4px] size-[20px]">
                <NavIconSvg pathKey={icon} vb={vb} />
              </div>
            </button>
          ))}
          <button
            title="AI assistant"
            onClick={toggleAI}
            className={`flex flex-col items-center justify-center p-[8px] rounded-[4px] transition-colors w-full ${aiOpen ? "bg-[rgba(255,255,255,0.18)]" : "hover:bg-[rgba(255,255,255,0.08)]"}`}
          >
            <div className="flex flex-col items-center justify-center overflow-clip p-[4px] size-[20px]">
              <AiIconSvg />
            </div>
          </button>
        </div>
      </div>

      {/* Right text sub-nav — from 52px to 272px = 220px wide */}
      <div
        className="absolute top-0 bottom-0 flex flex-col py-[12px] border-l border-[rgba(255,255,255,0.08)]"
        style={{ left: 52, right: 0 }}
      >
        {/* "Sales" header aligned to logo height */}
        <div className="h-[52px] flex items-center px-[8px] shrink-0">
          <p className="font-['Inter',sans-serif] font-medium text-[14px] text-white leading-[18px]">
            Sales
          </p>
        </div>

        {/* Text-only sub-items */}
        <div className="flex flex-col gap-[8px] px-[8px]">
          {salesSubItems.map((sub) => (
            <NavLink
              key={sub.path}
              to={sub.path}
              className={({ isActive }) =>
                `${isActive ? activeItemCls : inactiveItemCls} w-full`
              }
            >
              {({ isActive }) => (
                <>
                  {isActive && border}
                  <div className="flex items-center px-[8px] py-[9px]">
                    <p className="font-['Inter',sans-serif] font-medium text-[14px] text-white leading-[18px] whitespace-nowrap">
                      {sub.label}
                    </p>
                  </div>
                </>
              )}
            </NavLink>
          ))}
        </div>
      </div>
    </>
  );

  // ── Settings view: 52px icon strip + 220px settings sub-nav ────────────
  const SettingsView = (
    <>
      {/* Left icon strip — 52px */}
      <div className="absolute top-0 bottom-0 left-0 w-[52px] flex flex-col py-[12px]">
        {/* Small logo */}
        <div className="flex h-[52px] items-center justify-center overflow-clip p-[3px] shrink-0 w-[52px]">
          <LogoSmall />
        </div>

        {/* Icon-only nav items */}
        <div className="flex-1 flex flex-col gap-[8px] items-center px-[3px] overflow-auto">
          {mainNavItems.map((item) => {
            const isActive =
              item.path === "/"
                ? location.pathname === "/"
                : location.pathname.startsWith(item.path);

            const btnCls = `flex flex-col items-center justify-center p-[8px] rounded-[4px] transition-colors w-full ${
              isActive
                ? "backdrop-blur-[2px] bg-[rgba(255,255,255,0.12)]"
                : "hover:bg-[rgba(255,255,255,0.08)]"
            }`;

            return (
              <button key={item.label} onClick={() => navigate(item.path)} className={btnCls}>
                <div className="flex flex-col items-center justify-center overflow-clip p-[4px] size-[20px]">
                  <NavIconSvg pathKey={item.icon} vb={item.vb} />
                </div>
              </button>
            );
          })}
        </div>

        {/* Icon-only bottom */}
        <div className="flex flex-col gap-[8px] items-center px-[3px] pb-[0px] shrink-0">
          {bottomItems.map(({ label, icon, vb }) => (
            <button
              key={label}
              title={label}
              onClick={label === "Settings" ? () => navigate("/settings") : undefined}
              className={`flex flex-col items-center justify-center p-[8px] rounded-[4px] transition-colors w-full ${
                label === "Settings"
                  ? "backdrop-blur-[2px] bg-[rgba(255,255,255,0.12)]"
                  : "hover:bg-[rgba(255,255,255,0.08)]"
              }`}
            >
              <div className="flex flex-col items-center justify-center overflow-clip p-[4px] size-[20px]">
                <NavIconSvg pathKey={icon} vb={vb} />
              </div>
            </button>
          ))}
          <button
            title="AI assistant"
            onClick={toggleAI}
            className={`flex flex-col items-center justify-center p-[8px] rounded-[4px] transition-colors w-full ${aiOpen ? "bg-[rgba(255,255,255,0.18)]" : "hover:bg-[rgba(255,255,255,0.08)]"}`}
          >
            <div className="flex flex-col items-center justify-center overflow-clip p-[4px] size-[20px]">
              <AiIconSvg />
            </div>
          </button>
        </div>
      </div>

      {/* Right text sub-nav — 220px */}
      <div
        className="absolute top-0 bottom-0 flex flex-col py-[12px] border-l border-[rgba(255,255,255,0.08)] overflow-y-auto"
        style={{ left: 52, right: 0 }}
      >
        {/* "Settings" header */}
        <div className="h-[52px] flex items-center px-[8px] shrink-0">
          <p className="font-['Inter',sans-serif] font-medium text-[14px] text-white leading-[18px]">
            Settings
          </p>
        </div>

        {/* Company sub-items */}
        <div className="flex flex-col px-[8px] gap-[0px]">
          {settingsCompanyItems.map((sub) => {
            const isActive =
              sub.path === "/settings"
                ? location.pathname === "/settings"
                : location.pathname === sub.path;
            return (
              <button
                key={sub.path}
                onClick={() => navigate(sub.path)}
                className={`${isActive ? activeItemCls : inactiveItemCls} w-full text-left`}
              >
                {isActive && border}
                <div className="flex items-center px-[8px] py-[9px]">
                  <p className="font-['Inter',sans-serif] font-medium text-[14px] text-white leading-[18px] whitespace-nowrap">
                    {sub.label}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Separator */}
        <div className="mx-[8px] my-[8px] h-px bg-[rgba(255,255,255,0.08)] shrink-0" />

        {/* Personal sub-items */}
        <div className="flex flex-col px-[8px] gap-[0px]">
          {settingsPersonalItems.map((sub) => {
            const isActive = location.pathname === sub.path;
            return (
              <button
                key={sub.path}
                onClick={() => navigate(sub.path)}
                className={`${isActive ? activeItemCls : inactiveItemCls} w-full text-left`}
              >
                {isActive && border}
                <div className="flex items-center px-[8px] py-[9px]">
                  <p className="font-['Inter',sans-serif] font-medium text-[14px] text-white leading-[18px] whitespace-nowrap">
                    {sub.label}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </>
  );

  return (
    <div
      className="h-full overflow-hidden shrink-0 sticky top-0 bg-[#2c6764] relative z-10"
      style={{ width: 272 }}
    >
      {isSalesActive ? SalesView : isSettingsActive ? SettingsView : FullNav}
    </div>
  );
}