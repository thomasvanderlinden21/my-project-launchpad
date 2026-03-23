import svgPaths from "../../imports/svg-sv7j3znt9j";

export function TopBar({ title }: { title: string }) {
  return (
    <div className="shrink-0 sticky top-0 w-full z-10 bg-white/80 backdrop-blur-sm">
      <div className="absolute border-[#e6ebeb] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex items-center justify-between px-[16px] py-[8px] w-full">
        {/* Left: Page title */}
        <div className="flex-1">
          <span className="text-[14px] text-[#121621] font-['Inter',sans-serif] font-medium leading-[18px]">
            {title}
          </span>
        </div>

        {/* Right: Search, Shop selector, Avatar */}
        <div className="flex items-center gap-[12px]">
          {/* Search */}
          <div className="flex gap-[4px] h-[32px] items-center pl-[4px] pr-[8px] rounded-[6px] cursor-pointer hover:bg-black/5">
            <div className="relative shrink-0 size-[24px]">
              <svg className="block size-full" fill="none" viewBox="0 0 24 24">
                <path d={svgPaths.p10b29800} fill="#121621" />
              </svg>
            </div>
            <span className="text-[14px] text-[#121621] font-['Inter',sans-serif] font-medium leading-[18px]">
              Search
            </span>
          </div>

          {/* Shop selector */}
          <div className="flex gap-[4px] h-[32px] items-center pl-[8px] pr-[4px] rounded-[6px] cursor-pointer hover:bg-black/5">
            <span className="text-[14px] text-[#121621] font-['Inter',sans-serif] font-medium leading-[18px]">
              Cycle shop #2
            </span>
            <div className="relative shrink-0 size-[24px]">
              <svg className="block size-full" fill="none" viewBox="0 0 24 24">
                <path d={svgPaths.p362a21f0} fill="#121621" />
              </svg>
            </div>
          </div>

          {/* Avatar */}
          <div
            className="flex items-center justify-center rounded-full size-[32px] overflow-clip"
            style={{ backgroundImage: "linear-gradient(225deg, rgb(83, 189, 164) 0%, rgb(71, 210, 177) 100%)" }}
          >
            <span className="text-[11px] text-white font-['Inter',sans-serif] font-medium leading-[18px]">
              OM
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
