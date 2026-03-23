import { Outlet } from "react-router";
import { Sidebar } from "./Sidebar";
import { AIAssistantPanel } from "./AIAssistantPanel";
import { AIAssistantProvider } from "./AIAssistantContext";

function LayoutInner() {
  return (
    <div className="flex h-screen w-full overflow-hidden bg-[#2c6764] relative">
      {/* Background gradient blob */}
      <div className="absolute left-[-260px] top-[-476px] size-[1192px] pointer-events-none">
        <svg className="block size-full" fill="none" viewBox="0 0 1192 1192">
          <circle
            cx="596"
            cy="596"
            fill="url(#bgGrad)"
            fillOpacity="0.5"
            r="596"
            style={{ mixBlendMode: "soft-light" }}
          />
          <defs>
            <radialGradient
              cx="0"
              cy="0"
              gradientTransform="translate(596 596) rotate(90) scale(596)"
              gradientUnits="userSpaceOnUse"
              id="bgGrad"
              r="1"
            >
              <stop stopColor="white" />
              <stop offset="1" stopColor="white" stopOpacity="0" />
            </radialGradient>
          </defs>
        </svg>
      </div>

      <Sidebar />

      {/* Right section: main content + AI panel side-by-side */}
      <div className="flex flex-1 min-w-0 h-full">
        {/* Page content */}
        <div className="flex-1 min-w-0 h-full sticky top-0">
          <div className="flex flex-col justify-center size-full">
            <div className="content-stretch flex flex-col items-start justify-center pr-[12px] py-[12px] relative size-full">
              <div
                className="flex-1 min-h-0 w-full rounded-[6px] relative overflow-hidden"
                style={{
                  backgroundImage:
                    "linear-gradient(113.914deg, rgb(246, 250, 250) 1.0316%, rgb(255, 255, 255) 86.138%)",
                }}
              >
                <div className="absolute border border-[#e6ebeb] inset-0 pointer-events-none rounded-[6px] shadow-[-10px_0px_24px_0px_rgba(0,0,0,0.1)]" />
                <div className="flex flex-col items-center overflow-auto size-full">
                  <Outlet />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* AI Assistant Panel — slides in, pushes main content left */}
        <AIAssistantPanel />
      </div>
    </div>
  );
}

export function Layout() {
  return (
    <AIAssistantProvider>
      <LayoutInner />
    </AIAssistantProvider>
  );
}