import svgPaths from "./svg-5ab9o00c8y";
import { imgIcon } from "./svg-tu49x";

function Frame2() {
  return (
    <div className="h-[52px] relative shrink-0 w-full">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center px-[8px] py-[10px] relative size-full">
          <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-center text-white whitespace-nowrap">
            <p className="leading-[18px]">Sales</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Top() {
  return (
    <div className="relative shrink-0 w-full" data-name="Top">
      <div className="flex flex-col justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col gap-[8px] items-start justify-center px-[8px] relative w-full">
          <div className="backdrop-blur-[2px] bg-[rgba(255,255,255,0.12)] relative rounded-[4px] shrink-0 w-full" data-name="menu item">
            <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.08)] border-solid inset-0 pointer-events-none rounded-[4px]" />
            <div className="flex flex-row items-center size-full">
              <div className="content-stretch flex items-center px-[8px] py-[9px] relative w-full">
                <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-center text-white whitespace-nowrap">
                  <p className="leading-[18px]">Transactions</p>
                </div>
              </div>
            </div>
          </div>
          <div className="relative rounded-[4px] shrink-0 w-full" data-name="menu item">
            <div className="flex flex-row items-center size-full">
              <div className="content-stretch flex items-center px-[8px] py-[9px] relative w-full">
                <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-center text-white whitespace-nowrap">
                  <p className="leading-[18px]">Orders</p>
                </div>
              </div>
            </div>
          </div>
          <div className="relative rounded-[4px] shrink-0 w-full" data-name="menu item">
            <div className="flex flex-row items-center size-full">
              <div className="content-stretch flex items-center px-[8px] py-[9px] relative w-full">
                <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-center text-white whitespace-nowrap">
                  <p className="leading-[18px]">Invoices</p>
                </div>
              </div>
            </div>
          </div>
          <div className="relative rounded-[4px] shrink-0 w-full" data-name="menu item">
            <div className="flex flex-row items-center size-full">
              <div className="content-stretch flex items-center px-[8px] py-[9px] relative w-full">
                <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-center text-white whitespace-nowrap">
                  <p className="leading-[18px]">Reports</p>
                </div>
              </div>
            </div>
          </div>
          <div className="relative rounded-[4px] shrink-0 w-full" data-name="menu item">
            <div className="flex flex-row items-center size-full">
              <div className="content-stretch flex items-center px-[8px] py-[9px] relative w-full">
                <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-center text-white whitespace-nowrap">
                  <p className="leading-[18px]">Disputes</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Small() {
  return (
    <div className="absolute h-[12px] left-[6px] top-[11px] w-[24px]" data-name="Small">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 12">
        <g id="worldline-logo-horizontal">
          <path d={svgPaths.p5f67000} fill="var(--fill-0, white)" id="Vector" />
          <path d={svgPaths.p14a93e80} fill="var(--fill-0, white)" id="Vector_2" />
          <path d={svgPaths.p24424ff0} fill="var(--fill-0, white)" id="Vector_3" />
          <path d={svgPaths.p10fc3f00} fill="var(--fill-0, white)" id="Vector_4" />
          <path d={svgPaths.p30bc6e00} fill="var(--fill-0, white)" id="Vector_5" />
          <path d={svgPaths.p30b68280} fill="var(--fill-0, white)" id="Vector_6" />
          <path d={svgPaths.p19cd2c80} fill="var(--fill-0, white)" id="Vector_7" />
        </g>
      </svg>
    </div>
  );
}

function LogoSmall() {
  return (
    <div className="overflow-clip relative rounded-[8px] shrink-0 size-[36px]" data-name="Logo small">
      <Small />
    </div>
  );
}

function Frame3() {
  return (
    <div className="content-stretch flex h-[52px] items-center overflow-clip p-[3px] relative shrink-0 w-[42px]">
      <LogoSmall />
    </div>
  );
}

function Icon() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="icon">
          <mask height="20" id="mask0_1_939" maskUnits="userSpaceOnUse" style={{ maskType: "alpha" }} width="20" x="0" y="0">
            <rect fill="var(--fill-0, #D9D9D9)" height="20" id="Bounding box" width="20" />
          </mask>
          <g mask="url(#mask0_1_939)">
            <path d={svgPaths.p2d3f6570} fill="var(--fill-0, white)" id="home" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Icon1() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="icon">
          <mask height="20" id="mask0_1_999" maskUnits="userSpaceOnUse" style={{ maskType: "alpha" }} width="20" x="0" y="0">
            <rect fill="var(--fill-0, #D9D9D9)" height="20" id="Bounding box" width="20" />
          </mask>
          <g mask="url(#mask0_1_999)">
            <path d={svgPaths.pb070100} fill="var(--fill-0, white)" id="credit_card" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Icon2() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="icon">
          <mask height="20" id="mask0_1_977" maskUnits="userSpaceOnUse" style={{ maskType: "alpha" }} width="20" x="0" y="0">
            <rect fill="var(--fill-0, #D9D9D9)" height="20" id="Bounding box" width="20" />
          </mask>
          <g mask="url(#mask0_1_977)">
            <path d={svgPaths.p5de6200} fill="var(--fill-0, white)" id="storefront" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Icon3() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="icon">
          <mask height="20" id="mask0_1_910" maskUnits="userSpaceOnUse" style={{ maskType: "alpha" }} width="20" x="0" y="0">
            <rect fill="var(--fill-0, #D9D9D9)" height="20" id="Bounding box" width="20" />
          </mask>
          <g mask="url(#mask0_1_910)">
            <path d={svgPaths.p5724e00} fill="var(--fill-0, white)" id="swap_horiz" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Icon4() {
  return (
    <div className="relative size-[20px]" data-name="icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="icon">
          <mask height="20" id="mask0_1_993" maskUnits="userSpaceOnUse" style={{ maskType: "alpha" }} width="20" x="0" y="0">
            <rect fill="var(--fill-0, #D9D9D9)" height="20" id="Bounding box" width="20" />
          </mask>
          <g mask="url(#mask0_1_993)">
            <path d={svgPaths.p68c1500} fill="var(--fill-0, white)" id="sell" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Icon5() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="icon">
          <mask height="20" id="mask0_1_961" maskUnits="userSpaceOnUse" style={{ maskType: "alpha" }} width="20" x="0" y="0">
            <rect fill="var(--fill-0, #D9D9D9)" height="20" id="Bounding box" width="20" />
          </mask>
          <g mask="url(#mask0_1_961)">
            <path d={svgPaths.p3e5e2cc0} fill="var(--fill-0, white)" id="apartment" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Icon6() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="icon">
          <mask height="20" id="mask0_1_999" maskUnits="userSpaceOnUse" style={{ maskType: "alpha" }} width="20" x="0" y="0">
            <rect fill="var(--fill-0, #D9D9D9)" height="20" id="Bounding box" width="20" />
          </mask>
          <g mask="url(#mask0_1_999)">
            <path d={svgPaths.pb070100} fill="var(--fill-0, white)" id="credit_card" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Icon7() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="icon">
          <mask height="20" id="mask0_1_1034" maskUnits="userSpaceOnUse" style={{ maskType: "alpha" }} width="20" x="0" y="0">
            <rect fill="var(--fill-0, #D9D9D9)" height="20" id="Bounding box" width="20" />
          </mask>
          <g mask="url(#mask0_1_1034)">
            <path d={svgPaths.p1cfdee00} fill="var(--fill-0, white)" id="design_services" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Top1() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start justify-center px-[8px] relative shrink-0" data-name="Top">
      <div className="content-stretch flex flex-col items-center justify-center p-[8px] relative rounded-[4px] shrink-0" data-name="menu item">
        <div className="content-stretch flex flex-col gap-[10px] items-center justify-center p-[4px] relative shrink-0 size-[20px]" data-name="variant=home, state=hover">
          <Icon />
        </div>
      </div>
      <div className="backdrop-blur-[2px] bg-[rgba(255,255,255,0.12)] content-stretch flex flex-col items-center justify-center p-[8px] relative rounded-[4px] shrink-0" data-name="menu item">
        <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.08)] border-solid inset-0 pointer-events-none rounded-[4px]" />
        <div className="content-stretch flex flex-col items-center justify-center overflow-clip p-[4px] relative shrink-0 size-[20px]" data-name="variant=transactions, state=default">
          <Icon1 />
        </div>
      </div>
      <div className="content-stretch flex flex-col items-center justify-center p-[8px] relative rounded-[4px] shrink-0" data-name="menu item">
        <div className="content-stretch flex flex-col items-center justify-center overflow-clip p-[4px] relative shrink-0 size-[20px]" data-name="variant=hardware, state=default">
          <Icon2 />
        </div>
      </div>
      <div className="content-stretch flex flex-col items-center justify-center p-[8px] relative rounded-[4px] shrink-0" data-name="menu item">
        <div className="content-stretch flex flex-col items-center justify-center overflow-clip p-[4px] relative shrink-0 size-[20px]" data-name="variant=payment, state=default">
          <Icon3 />
        </div>
      </div>
      <div className="content-stretch flex flex-col items-center justify-center p-[8px] relative rounded-[4px] shrink-0" data-name="menu item">
        <div className="content-stretch flex flex-col items-center justify-center overflow-clip p-[4px] relative shrink-0 size-[20px]" data-name="variant=product, state=default">
          <div className="flex items-center justify-center relative shrink-0">
            <div className="-scale-y-100 flex-none rotate-180">
              <Icon4 />
            </div>
          </div>
        </div>
      </div>
      <div className="content-stretch flex flex-col items-center justify-center p-[8px] relative rounded-[4px] shrink-0" data-name="menu item">
        <div className="content-stretch flex flex-col items-center justify-center overflow-clip p-[4px] relative shrink-0 size-[20px]" data-name="variant=my business, state=default">
          <Icon5 />
        </div>
      </div>
      <div className="content-stretch flex flex-col items-center justify-center p-[8px] relative rounded-[4px] shrink-0" data-name="menu item">
        <div className="content-stretch flex flex-col items-center justify-center overflow-clip p-[4px] relative shrink-0 size-[20px]" data-name="variant=transactions, state=default">
          <Icon6 />
        </div>
      </div>
      <div className="content-stretch flex flex-col items-center justify-center p-[8px] relative rounded-[4px] shrink-0" data-name="menu item">
        <div className="content-stretch flex flex-col items-center justify-center overflow-clip p-[4px] relative shrink-0 size-[20px]" data-name="Frame 3/services">
          <Icon7 />
        </div>
      </div>
    </div>
  );
}

function Icon8() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="icon">
          <mask height="20" id="mask0_1_1005" maskUnits="userSpaceOnUse" style={{ maskType: "alpha" }} width="20" x="0" y="0">
            <rect fill="var(--fill-0, #D9D9D9)" height="20" id="Bounding box" width="20" />
          </mask>
          <g mask="url(#mask0_1_1005)">
            <path d={svgPaths.p1f1c2c80} fill="var(--fill-0, white)" id="settings" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Icon9() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="icon">
          <mask height="20" id="mask0_1_914" maskUnits="userSpaceOnUse" style={{ maskType: "alpha" }} width="20" x="0" y="0">
            <rect fill="var(--fill-0, #D9D9D9)" height="20" id="Bounding box" width="20" />
          </mask>
          <g mask="url(#mask0_1_914)">
            <path d={svgPaths.p16b7500} fill="var(--fill-0, white)" id="notifications_unread" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Icon10() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="icon">
          <mask height="20" id="mask0_1_969" maskUnits="userSpaceOnUse" style={{ maskType: "alpha" }} width="20" x="0" y="0">
            <rect fill="var(--fill-0, #D9D9D9)" height="20" id="Bounding box" width="20" />
          </mask>
          <g mask="url(#mask0_1_969)">
            <path d={svgPaths.pbf4fb00} fill="var(--fill-0, white)" id="help" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Bottom() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start justify-center p-[8px] relative shrink-0" data-name="bottom">
      <div className="content-stretch flex flex-col items-center justify-center p-[8px] relative rounded-[4px] shrink-0" data-name="menu item">
        <div className="content-stretch flex flex-col items-center justify-center overflow-clip p-[4px] relative shrink-0 size-[20px]" data-name="variant=settings, state=default">
          <Icon8 />
        </div>
      </div>
      <div className="content-stretch flex flex-col items-center justify-center p-[8px] relative rounded-[4px] shrink-0" data-name="menu item">
        <div className="content-stretch flex flex-col items-center justify-center overflow-clip p-[4px] relative shrink-0 size-[20px]" data-name="variant=notification, state=default">
          <Icon9 />
        </div>
      </div>
      <div className="content-stretch flex flex-col items-center justify-center p-[8px] relative rounded-[4px] shrink-0" data-name="menu item">
        <div className="content-stretch flex flex-col items-center justify-center overflow-clip p-[4px] relative shrink-0 size-[20px]" data-name="variant=help, state=default">
          <Icon10 />
        </div>
      </div>
      <div className="content-stretch flex flex-col items-center justify-center p-[8px] relative rounded-[4px] shrink-0" data-name="menu item">
        <div className="content-stretch flex flex-col items-center justify-center overflow-clip p-[4px] relative shrink-0 size-[20px]" data-name="variant=ai, state=default">
          <div className="overflow-clip relative shrink-0 size-[20px]" data-name="icon">
            <div className="absolute inset-[8.33%]" data-name="Icon">
              <div className="absolute inset-[-4.5%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18.1667 18.1667">
                  <path d={svgPaths.p2b07bc80} id="Icon" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame5() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start justify-between min-h-px min-w-px relative">
      <Top1 />
      <Bottom />
    </div>
  );
}

function Frame4() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[16px] h-full items-center min-h-px min-w-px relative">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#121621] text-[14px] text-center whitespace-nowrap">
        <p className="leading-[18px]">Transactions</p>
      </div>
    </div>
  );
}

function Search() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="search">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="search">
          <mask height="24" id="mask0_1_989" maskUnits="userSpaceOnUse" style={{ maskType: "alpha" }} width="24" x="0" y="0">
            <rect fill="var(--fill-0, #121621)" height="24" id="Bounding box" width="24" />
          </mask>
          <g mask="url(#mask0_1_989)">
            <path d={svgPaths.p10b29800} fill="var(--fill-0, #121621)" id="search_2" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Frame12() {
  return (
    <div className="content-stretch flex gap-[4px] h-[32px] items-center pl-[4px] pr-[8px] relative rounded-[6px] shrink-0">
      <Search />
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[18px] not-italic relative shrink-0 text-[#121621] text-[14px] whitespace-nowrap">Search</p>
    </div>
  );
}

function UnfoldMore() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="unfold_more">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="unfold_more">
          <mask height="24" id="mask0_1_943" maskUnits="userSpaceOnUse" style={{ maskType: "alpha" }} width="24" x="0" y="0">
            <rect fill="var(--fill-0, #121621)" height="24" id="Bounding box" width="24" />
          </mask>
          <g mask="url(#mask0_1_943)">
            <path d={svgPaths.p362a21f0} fill="var(--fill-0, #121621)" id="unfold_more_2" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Frame9() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center overflow-clip relative rounded-[30px] shrink-0 size-[32px]" style={{ backgroundImage: "linear-gradient(225deg, rgb(83, 189, 164) 0%, rgb(71, 210, 177) 100%)" }}>
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[32px] justify-center leading-[0] not-italic relative shrink-0 text-[11px] text-center text-white w-full">
        <p className="leading-[18px]">OM</p>
      </div>
    </div>
  );
}

function Frame() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0 w-full">
      <div className="flex flex-[1_0_0] flex-row items-center self-stretch">
        <Frame4 />
      </div>
      <div className="content-stretch flex items-center relative shrink-0" data-name="Component 1">
        <Frame12 />
      </div>
      <div className="content-stretch flex gap-[4px] h-[32px] items-center pl-[8px] pr-[4px] relative rounded-[6px] shrink-0" data-name="Component 1">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[18px] not-italic relative shrink-0 text-[#121621] text-[14px] whitespace-nowrap">Cycle shop #2</p>
        <UnfoldMore />
      </div>
      <Frame9 />
    </div>
  );
}

function Frame13() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-full">
      <div aria-hidden="true" className="absolute border-[#e6ebeb] border-b border-solid inset-0 pointer-events-none" />
      <div className="relative shrink-0" data-name="tab">
        <div className="content-stretch flex gap-[8px] items-center justify-center overflow-clip p-[12px] relative rounded-[inherit]">
          <p className="font-['Inter:Medium',sans-serif] font-medium leading-[18px] not-italic relative shrink-0 text-[#121621] text-[14px] whitespace-nowrap">All transactions</p>
        </div>
        <div aria-hidden="true" className="absolute border-[#277777] border-b border-solid inset-0 pointer-events-none" />
      </div>
      <div className="content-stretch flex gap-[8px] items-center p-[12px] relative shrink-0" data-name="tab">
        <div aria-hidden="true" className="absolute border-[#e6ebeb] border-b border-solid inset-0 pointer-events-none" />
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[18px] not-italic relative shrink-0 text-[#525d5d] text-[14px] whitespace-nowrap">Online</p>
      </div>
      <div className="content-stretch flex gap-[8px] items-center p-[12px] relative shrink-0" data-name="tab">
        <div aria-hidden="true" className="absolute border-[#e6ebeb] border-b border-solid inset-0 pointer-events-none" />
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[18px] not-italic relative shrink-0 text-[#525d5d] text-[14px] whitespace-nowrap">Instore</p>
      </div>
      <div className="content-stretch flex gap-[8px] items-center p-[12px] relative shrink-0" data-name="tab">
        <div aria-hidden="true" className="absolute border-[#e6ebeb] border-b border-solid inset-0 pointer-events-none" />
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[18px] not-italic relative shrink-0 text-[#525d5d] text-[14px] whitespace-nowrap">Acquiring</p>
      </div>
    </div>
  );
}

function Search1() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="search">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="search">
          <mask height="20" id="mask0_1_12296" maskUnits="userSpaceOnUse" style={{ maskType: "alpha" }} width="20" x="0" y="0">
            <rect fill="var(--fill-0, #121621)" height="20" id="Bounding box" width="20" />
          </mask>
          <g mask="url(#mask0_1_12296)">
            <path d={svgPaths.p87706f0} fill="var(--fill-0, #121621)" id="search_2" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Frame1() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-center min-h-px min-w-px relative">
      <Search1 />
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[18px] not-italic relative shrink-0 text-[#121621] text-[14px] whitespace-nowrap">Search</p>
    </div>
  );
}

function FilterList() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="filter_list">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="filter_list">
          <mask height="20" id="mask0_1_12274" maskUnits="userSpaceOnUse" style={{ maskType: "alpha" }} width="20" x="0" y="0">
            <rect fill="var(--fill-0, #D9D9D9)" height="20" id="Bounding box" width="20" />
          </mask>
          <g mask="url(#mask0_1_12274)">
            <path d={svgPaths.p23b8a680} fill="var(--fill-0, #121621)" id="filter_list_2" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function MenuItem() {
  return (
    <div className="backdrop-blur-[2px] bg-white content-stretch flex gap-[4px] items-center p-[8px] relative rounded-[6px] shrink-0" data-name="menu item">
      <div aria-hidden="true" className="absolute border border-[#e6ebeb] border-solid inset-0 pointer-events-none rounded-[6px]" />
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#121621] text-[14px] text-center whitespace-nowrap">
        <p className="leading-[18px]">Filters</p>
      </div>
      <FilterList />
    </div>
  );
}

function Frame8() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0">
      <div className="flex flex-row items-center self-stretch">
        <div className="backdrop-blur-[2px] bg-white h-full relative rounded-[6px] shrink-0 w-[281px]" data-name="Global search">
          <div aria-hidden="true" className="absolute border border-[#e6ebeb] border-solid inset-0 pointer-events-none rounded-[6px]" />
          <div className="flex flex-row items-center size-full">
            <div className="content-stretch flex gap-[8px] items-center p-[8px] relative size-full">
              <Frame1 />
            </div>
          </div>
        </div>
      </div>
      <MenuItem />
    </div>
  );
}

function TextPadding() {
  return (
    <div className="content-stretch flex items-center justify-center px-[2px] relative shrink-0" data-name="Text padding">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-center text-white whitespace-nowrap">
        <p className="leading-[18px]">Export</p>
      </div>
    </div>
  );
}

function Button() {
  return (
    <div className="bg-[#277777] h-full relative rounded-[6px] shrink-0" data-name="💠 Button">
      <div className="flex flex-row items-center justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex gap-[4px] h-full items-center justify-center pl-[12px] pr-[8px] py-[8px] relative">
          <TextPadding />
          <div className="relative shrink-0 size-[24px]" data-name="download">
            <div className="absolute inset-[18.75%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-4.5px_-4.5px] mask-size-[24px_24px]" data-name="icon" style={{ maskImage: `url('${imgIcon}')` }}>
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15 15">
                <path d={svgPaths.pbdf500} fill="var(--fill-0, white)" id="icon" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_-2px_0px_0px_rgba(10,13,18,0.05)]" />
      <div aria-hidden="true" className="absolute border border-[rgba(110,162,162,0.4)] border-solid inset-0 pointer-events-none rounded-[6px]" />
    </div>
  );
}

function Frame11() {
  return (
    <div className="content-stretch flex h-full items-center justify-end relative shrink-0 w-[360px]">
      <Button />
    </div>
  );
}

function Frame6() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full">
      <Frame8 />
      <div className="flex flex-row items-center self-stretch">
        <Frame11 />
      </div>
    </div>
  );
}

function AddColumnLeft() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="add_column_left">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="add_column_left">
          <mask height="24" id="mask0_4_11688" maskUnits="userSpaceOnUse" style={{ maskType: "alpha" }} width="24" x="0" y="0">
            <rect fill="var(--fill-0, #121621)" height="24" id="Bounding box" width="24" />
          </mask>
          <g mask="url(#mask0_4_11688)">
            <path d={svgPaths.p3c854200} fill="var(--fill-0, #A4A7AE)" id="add_column_left_2" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Content() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="Content">
      <div className="flex-[1_0_0] h-[48px] max-h-[48px] min-h-px min-w-px relative" data-name="Table header cell">
        <div aria-hidden="true" className="absolute border-[#e6ebeb] border-b border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center max-h-[inherit] size-full">
          <div className="content-stretch flex gap-[12px] items-center max-h-[inherit] px-[16px] py-[8px] relative size-full">
            <div className="content-stretch flex items-start relative shrink-0" data-name="Table cell lead action">
              <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="💠 Checkbox">
                <div className="relative rounded-[4px] shrink-0 size-[16px]" data-name=".checkbox-base">
                  <div aria-hidden="true" className="absolute border border-[#859090] border-solid inset-0 pointer-events-none rounded-[4px]" />
                </div>
              </div>
            </div>
            <div className="content-stretch flex items-center relative shrink-0" data-name="_Table header label">
              <p className="font-['Inter:Medium',sans-serif] font-medium leading-[18px] not-italic relative shrink-0 text-[#525d5d] text-[14px] whitespace-nowrap">Transaction ID</p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex-[1_0_0] h-[48px] max-h-[48px] min-h-px min-w-px relative" data-name="Table header cell">
        <div aria-hidden="true" className="absolute border-[#e6ebeb] border-b border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center max-h-[inherit] size-full">
          <div className="content-stretch flex items-center max-h-[inherit] px-[16px] py-[8px] relative size-full">
            <div className="content-stretch flex items-center relative shrink-0" data-name="_Table header label">
              <p className="font-['Inter:Medium',sans-serif] font-medium leading-[18px] not-italic relative shrink-0 text-[#525d5d] text-[14px] whitespace-nowrap">Cardumber</p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex-[1_0_0] h-[48px] max-h-[48px] min-h-px min-w-px relative" data-name="Table header cell">
        <div aria-hidden="true" className="absolute border-[#e6ebeb] border-b border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center max-h-[inherit] size-full">
          <div className="content-stretch flex items-center max-h-[inherit] px-[16px] py-[8px] relative size-full">
            <div className="content-stretch flex items-center relative shrink-0" data-name="_Table header label">
              <p className="font-['Inter:Medium',sans-serif] font-medium leading-[18px] not-italic relative shrink-0 text-[#525d5d] text-[14px] whitespace-nowrap">Status</p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex-[1_0_0] h-[48px] max-h-[48px] min-h-px min-w-px relative" data-name="Table header cell">
        <div aria-hidden="true" className="absolute border-[#e6ebeb] border-b border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center max-h-[inherit] size-full">
          <div className="content-stretch flex items-center max-h-[inherit] px-[16px] py-[8px] relative size-full">
            <div className="content-stretch flex items-center relative shrink-0" data-name="_Table header label">
              <p className="font-['Inter:Medium',sans-serif] font-medium leading-[18px] not-italic relative shrink-0 text-[#525d5d] text-[14px] whitespace-nowrap">Type</p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex-[1_0_0] h-[48px] max-h-[48px] min-h-px min-w-px relative" data-name="Table header cell">
        <div aria-hidden="true" className="absolute border-[#e6ebeb] border-b border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center max-h-[inherit] size-full">
          <div className="content-stretch flex items-center max-h-[inherit] px-[16px] py-[8px] relative size-full">
            <div className="content-stretch flex items-center relative shrink-0" data-name="_Table header label">
              <p className="font-['Inter:Medium',sans-serif] font-medium leading-[18px] not-italic relative shrink-0 text-[#525d5d] text-[14px] whitespace-nowrap">Location</p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex-[1_0_0] h-[48px] max-h-[48px] min-h-px min-w-px relative" data-name="Table header cell">
        <div aria-hidden="true" className="absolute border-[#e6ebeb] border-b border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center max-h-[inherit] size-full">
          <div className="content-stretch flex items-center max-h-[inherit] px-[16px] py-[8px] relative size-full">
            <div className="content-stretch flex items-center relative shrink-0" data-name="_Table header label">
              <p className="font-['Inter:Medium',sans-serif] font-medium leading-[18px] not-italic relative shrink-0 text-[#525d5d] text-[14px] whitespace-nowrap">Amount</p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex-[1_0_0] h-[48px] max-h-[48px] min-h-px min-w-px relative" data-name="Table header cell">
        <div aria-hidden="true" className="absolute border-[#e6ebeb] border-b border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center max-h-[inherit] size-full">
          <div className="content-stretch flex items-center max-h-[inherit] px-[16px] py-[8px] relative size-full">
            <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-name="_Table header label">
              <p className="font-['Inter:Medium',sans-serif] font-medium leading-[18px] not-italic relative shrink-0 text-[#525d5d] text-[14px] whitespace-nowrap">Date</p>
              <div className="overflow-clip relative shrink-0 size-[12px]" data-name="chevron-selector-vertical">
                <div className="absolute inset-[16.67%_29.17%]" data-name="Icon">
                  <div className="absolute inset-[-9.38%_-15%]">
                    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6.5 9.5">
                      <path d={svgPaths.p12ef3080} id="Icon" stroke="var(--stroke-0, #A4A7AE)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="content-stretch flex items-center justify-center max-h-[48px] px-[16px] py-[8px] relative shrink-0 size-[48px]" data-name="Table header cell">
        <div aria-hidden="true" className="absolute border-[#e6ebeb] border-b border-solid inset-0 pointer-events-none" />
        <AddColumnLeft />
      </div>
    </div>
  );
}

function TextAndSupportingText() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Text and supporting text">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[18px] not-italic relative shrink-0 text-[#121621] text-[14px] whitespace-nowrap">#2456221</p>
    </div>
  );
}

function TextAndSupportingText1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Text and supporting text">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[18px] not-italic relative shrink-0 text-[#121621] text-[14px] whitespace-nowrap">****9382</p>
    </div>
  );
}

function IconAndText() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Icon and text">
      <div className="bg-white h-[24px] relative rounded-[4px] shrink-0 w-[34px]" data-name="Payment method icon">
        <div aria-hidden="true" className="absolute border border-[#e9eaeb] border-solid inset-0 pointer-events-none rounded-[4px]" />
        <div className="absolute inset-[33.75%_15.88%_33.67%_14.12%]" data-name="visa-logo">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 23.8 7.81915">
            <path clipRule="evenodd" d={svgPaths.pdc4b400} fill="var(--fill-0, #172B85)" fillRule="evenodd" id="visa-logo" />
          </svg>
        </div>
      </div>
      <TextAndSupportingText1 />
    </div>
  );
}

function TextAndSupportingText2() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Text and supporting text">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[18px] not-italic relative shrink-0 text-[#121621] text-[14px] whitespace-nowrap">Refund</p>
    </div>
  );
}

function TextAndSupportingText3() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Text and supporting text">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[18px] not-italic relative shrink-0 text-[#121621] text-[14px] whitespace-nowrap">#113239382</p>
    </div>
  );
}

function TextAndSupportingText4() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Text and supporting text">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[18px] not-italic relative shrink-0 text-[#121621] text-[14px] whitespace-nowrap">€ 259,00</p>
    </div>
  );
}

function TextAndSupportingText5() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Text and supporting text">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[18px] not-italic relative shrink-0 text-[#121621] text-[14px] whitespace-nowrap">24/02/25, 21:05</p>
    </div>
  );
}

function TextAndSupportingText6() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Text and supporting text">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[18px] not-italic relative shrink-0 text-[#121621] text-[14px] whitespace-nowrap">#2456222</p>
    </div>
  );
}

function TextAndSupportingText7() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Text and supporting text">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[18px] not-italic relative shrink-0 text-[#121621] text-[14px] whitespace-nowrap">****9382</p>
    </div>
  );
}

function IconAndText1() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Icon and text">
      <div className="bg-white h-[24px] relative rounded-[4px] shrink-0 w-[34px]" data-name="Payment method icon">
        <div aria-hidden="true" className="absolute border border-[#e9eaeb] border-solid inset-0 pointer-events-none rounded-[4px]" />
        <div className="absolute inset-[33.75%_15.88%_33.67%_14.12%]" data-name="visa-logo">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 23.8 7.81915">
            <path clipRule="evenodd" d={svgPaths.pdc4b400} fill="var(--fill-0, #172B85)" fillRule="evenodd" id="visa-logo" />
          </svg>
        </div>
      </div>
      <TextAndSupportingText7 />
    </div>
  );
}

function TextAndSupportingText8() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Text and supporting text">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[18px] not-italic relative shrink-0 text-[#121621] text-[14px] whitespace-nowrap">113239383</p>
    </div>
  );
}

function TextAndSupportingText9() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Text and supporting text">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[18px] not-italic relative shrink-0 text-[#121621] text-[14px] whitespace-nowrap">#113239382</p>
    </div>
  );
}

function TextAndSupportingText10() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Text and supporting text">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[18px] not-italic relative shrink-0 text-[#121621] text-[14px] whitespace-nowrap">€ 150,00</p>
    </div>
  );
}

function TextAndSupportingText11() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Text and supporting text">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[18px] not-italic relative shrink-0 text-[#121621] text-[14px] whitespace-nowrap">25/02/25, 14:30</p>
    </div>
  );
}

function TextAndSupportingText12() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Text and supporting text">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[18px] not-italic relative shrink-0 text-[#121621] text-[14px] whitespace-nowrap">#2456223</p>
    </div>
  );
}

function TextAndSupportingText13() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Text and supporting text">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[18px] not-italic relative shrink-0 text-[#121621] text-[14px] whitespace-nowrap">****9382</p>
    </div>
  );
}

function IconAndText2() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Icon and text">
      <div className="bg-white h-[24px] relative rounded-[4px] shrink-0 w-[34px]" data-name="Payment method icon">
        <div aria-hidden="true" className="absolute border border-[#e9eaeb] border-solid inset-0 pointer-events-none rounded-[4px]" />
        <div className="absolute inset-[33.75%_15.88%_33.67%_14.12%]" data-name="visa-logo">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 23.8 7.81915">
            <path clipRule="evenodd" d={svgPaths.pdc4b400} fill="var(--fill-0, #172B85)" fillRule="evenodd" id="visa-logo" />
          </svg>
        </div>
      </div>
      <TextAndSupportingText13 />
    </div>
  );
}

function TextAndSupportingText14() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Text and supporting text">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[18px] not-italic relative shrink-0 text-[#121621] text-[14px] whitespace-nowrap">113239384</p>
    </div>
  );
}

function TextAndSupportingText15() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Text and supporting text">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[18px] not-italic relative shrink-0 text-[#121621] text-[14px] whitespace-nowrap">#113239382</p>
    </div>
  );
}

function TextAndSupportingText16() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Text and supporting text">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[18px] not-italic relative shrink-0 text-[#121621] text-[14px] whitespace-nowrap">€ 320,00</p>
    </div>
  );
}

function TextAndSupportingText17() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Text and supporting text">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[18px] not-italic relative shrink-0 text-[#121621] text-[14px] whitespace-nowrap">26/02/25, 09:15</p>
    </div>
  );
}

function TextAndSupportingText18() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Text and supporting text">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[18px] not-italic relative shrink-0 text-[#121621] text-[14px] whitespace-nowrap">#2456224</p>
    </div>
  );
}

function TextAndSupportingText19() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Text and supporting text">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[18px] not-italic relative shrink-0 text-[#121621] text-[14px] whitespace-nowrap">****9382</p>
    </div>
  );
}

function IconAndText3() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Icon and text">
      <div className="bg-white h-[24px] relative rounded-[4px] shrink-0 w-[34px]" data-name="Payment method icon">
        <div aria-hidden="true" className="absolute border border-[#e9eaeb] border-solid inset-0 pointer-events-none rounded-[4px]" />
        <div className="absolute inset-[33.75%_15.88%_33.67%_14.12%]" data-name="visa-logo">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 23.8 7.81915">
            <path clipRule="evenodd" d={svgPaths.pdc4b400} fill="var(--fill-0, #172B85)" fillRule="evenodd" id="visa-logo" />
          </svg>
        </div>
      </div>
      <TextAndSupportingText19 />
    </div>
  );
}

function TextAndSupportingText20() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Text and supporting text">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[18px] not-italic relative shrink-0 text-[#121621] text-[14px] whitespace-nowrap">113239385</p>
    </div>
  );
}

function TextAndSupportingText21() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Text and supporting text">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[18px] not-italic relative shrink-0 text-[#121621] text-[14px] whitespace-nowrap">#113239382</p>
    </div>
  );
}

function TextAndSupportingText22() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Text and supporting text">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[18px] not-italic relative shrink-0 text-[#121621] text-[14px] whitespace-nowrap">€ 89,00</p>
    </div>
  );
}

function TextAndSupportingText23() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Text and supporting text">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[18px] not-italic relative shrink-0 text-[#121621] text-[14px] whitespace-nowrap">27/02/25, 11:45</p>
    </div>
  );
}

function TextAndSupportingText24() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Text and supporting text">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[18px] not-italic relative shrink-0 text-[#121621] text-[14px] whitespace-nowrap">#2456225</p>
    </div>
  );
}

function TextAndSupportingText25() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Text and supporting text">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[18px] not-italic relative shrink-0 text-[#121621] text-[14px] whitespace-nowrap">****9382</p>
    </div>
  );
}

function IconAndText4() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Icon and text">
      <div className="bg-white h-[24px] relative rounded-[4px] shrink-0 w-[34px]" data-name="Payment method icon">
        <div aria-hidden="true" className="absolute border border-[#e9eaeb] border-solid inset-0 pointer-events-none rounded-[4px]" />
        <div className="absolute inset-[33.75%_15.88%_33.67%_14.12%]" data-name="visa-logo">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 23.8 7.81915">
            <path clipRule="evenodd" d={svgPaths.pdc4b400} fill="var(--fill-0, #172B85)" fillRule="evenodd" id="visa-logo" />
          </svg>
        </div>
      </div>
      <TextAndSupportingText25 />
    </div>
  );
}

function TextAndSupportingText26() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Text and supporting text">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[18px] not-italic relative shrink-0 text-[#121621] text-[14px] whitespace-nowrap">113239386</p>
    </div>
  );
}

function TextAndSupportingText27() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Text and supporting text">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[18px] not-italic relative shrink-0 text-[#121621] text-[14px] whitespace-nowrap">#113239382</p>
    </div>
  );
}

function TextAndSupportingText28() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Text and supporting text">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[18px] not-italic relative shrink-0 text-[#121621] text-[14px] whitespace-nowrap">€ 120,00</p>
    </div>
  );
}

function TextAndSupportingText29() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Text and supporting text">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[18px] not-italic relative shrink-0 text-[#121621] text-[14px] whitespace-nowrap">28/02/25, 16:00</p>
    </div>
  );
}

function TextAndSupportingText30() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Text and supporting text">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[18px] not-italic relative shrink-0 text-[#121621] text-[14px] whitespace-nowrap">#2456226</p>
    </div>
  );
}

function TextAndSupportingText31() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Text and supporting text">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[18px] not-italic relative shrink-0 text-[#121621] text-[14px] whitespace-nowrap">****9382</p>
    </div>
  );
}

function IconAndText5() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Icon and text">
      <div className="bg-white h-[24px] relative rounded-[4px] shrink-0 w-[34px]" data-name="Payment method icon">
        <div aria-hidden="true" className="absolute border border-[#e9eaeb] border-solid inset-0 pointer-events-none rounded-[4px]" />
        <div className="absolute inset-[33.75%_15.88%_33.67%_14.12%]" data-name="visa-logo">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 23.8 7.81915">
            <path clipRule="evenodd" d={svgPaths.pdc4b400} fill="var(--fill-0, #172B85)" fillRule="evenodd" id="visa-logo" />
          </svg>
        </div>
      </div>
      <TextAndSupportingText31 />
    </div>
  );
}

function TextAndSupportingText32() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Text and supporting text">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[18px] not-italic relative shrink-0 text-[#121621] text-[14px] whitespace-nowrap">113239387</p>
    </div>
  );
}

function TextAndSupportingText33() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Text and supporting text">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[18px] not-italic relative shrink-0 text-[#121621] text-[14px] whitespace-nowrap">#113239382</p>
    </div>
  );
}

function TextAndSupportingText34() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Text and supporting text">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[18px] not-italic relative shrink-0 text-[#121621] text-[14px] whitespace-nowrap">€ 450,00</p>
    </div>
  );
}

function TextAndSupportingText35() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Text and supporting text">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[18px] not-italic relative shrink-0 text-[#121621] text-[14px] whitespace-nowrap">01/03/25, 18:20</p>
    </div>
  );
}

function TextAndSupportingText36() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Text and supporting text">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[18px] not-italic relative shrink-0 text-[#121621] text-[14px] whitespace-nowrap">#2456227</p>
    </div>
  );
}

function TextAndSupportingText37() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Text and supporting text">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[18px] not-italic relative shrink-0 text-[#121621] text-[14px] whitespace-nowrap">****9382</p>
    </div>
  );
}

function IconAndText6() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Icon and text">
      <div className="bg-white h-[24px] relative rounded-[4px] shrink-0 w-[34px]" data-name="Payment method icon">
        <div aria-hidden="true" className="absolute border border-[#e9eaeb] border-solid inset-0 pointer-events-none rounded-[4px]" />
        <div className="absolute inset-[33.75%_15.88%_33.67%_14.12%]" data-name="visa-logo">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 23.8 7.81915">
            <path clipRule="evenodd" d={svgPaths.pdc4b400} fill="var(--fill-0, #172B85)" fillRule="evenodd" id="visa-logo" />
          </svg>
        </div>
      </div>
      <TextAndSupportingText37 />
    </div>
  );
}

function TextAndSupportingText38() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Text and supporting text">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[18px] not-italic relative shrink-0 text-[#121621] text-[14px] whitespace-nowrap">113239388</p>
    </div>
  );
}

function TextAndSupportingText39() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Text and supporting text">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[18px] not-italic relative shrink-0 text-[#121621] text-[14px] whitespace-nowrap">#113239382</p>
    </div>
  );
}

function TextAndSupportingText40() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Text and supporting text">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[18px] not-italic relative shrink-0 text-[#121621] text-[14px] whitespace-nowrap">€ 75,00</p>
    </div>
  );
}

function TextAndSupportingText41() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Text and supporting text">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[18px] not-italic relative shrink-0 text-[#121621] text-[14px] whitespace-nowrap">02/03/25, 10:10</p>
    </div>
  );
}

function TextAndSupportingText42() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Text and supporting text">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[18px] not-italic relative shrink-0 text-[#121621] text-[14px] whitespace-nowrap">#2456228</p>
    </div>
  );
}

function TextAndSupportingText43() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Text and supporting text">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[18px] not-italic relative shrink-0 text-[#121621] text-[14px] whitespace-nowrap">****9382</p>
    </div>
  );
}

function IconAndText7() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Icon and text">
      <div className="bg-white h-[24px] relative rounded-[4px] shrink-0 w-[34px]" data-name="Payment method icon">
        <div aria-hidden="true" className="absolute border border-[#e9eaeb] border-solid inset-0 pointer-events-none rounded-[4px]" />
        <div className="absolute inset-[33.75%_15.88%_33.67%_14.12%]" data-name="visa-logo">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 23.8 7.81915">
            <path clipRule="evenodd" d={svgPaths.pdc4b400} fill="var(--fill-0, #172B85)" fillRule="evenodd" id="visa-logo" />
          </svg>
        </div>
      </div>
      <TextAndSupportingText43 />
    </div>
  );
}

function TextAndSupportingText44() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Text and supporting text">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[18px] not-italic relative shrink-0 text-[#121621] text-[14px] whitespace-nowrap">113239389</p>
    </div>
  );
}

function TextAndSupportingText45() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Text and supporting text">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[18px] not-italic relative shrink-0 text-[#121621] text-[14px] whitespace-nowrap">#113239382</p>
    </div>
  );
}

function TextAndSupportingText46() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Text and supporting text">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[18px] not-italic relative shrink-0 text-[#121621] text-[14px] whitespace-nowrap">€ 200,00</p>
    </div>
  );
}

function TextAndSupportingText47() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Text and supporting text">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[18px] not-italic relative shrink-0 text-[#121621] text-[14px] whitespace-nowrap">03/03/25, 12:00</p>
    </div>
  );
}

function TextAndSupportingText48() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Text and supporting text">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[18px] not-italic relative shrink-0 text-[#121621] text-[14px] whitespace-nowrap">#2456229</p>
    </div>
  );
}

function TextAndSupportingText49() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Text and supporting text">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[18px] not-italic relative shrink-0 text-[#121621] text-[14px] whitespace-nowrap">****9382</p>
    </div>
  );
}

function IconAndText8() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Icon and text">
      <div className="bg-white h-[24px] relative rounded-[4px] shrink-0 w-[34px]" data-name="Payment method icon">
        <div aria-hidden="true" className="absolute border border-[#e9eaeb] border-solid inset-0 pointer-events-none rounded-[4px]" />
        <div className="absolute inset-[33.75%_15.88%_33.67%_14.12%]" data-name="visa-logo">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 23.8 7.81915">
            <path clipRule="evenodd" d={svgPaths.pdc4b400} fill="var(--fill-0, #172B85)" fillRule="evenodd" id="visa-logo" />
          </svg>
        </div>
      </div>
      <TextAndSupportingText49 />
    </div>
  );
}

function TextAndSupportingText50() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Text and supporting text">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[18px] not-italic relative shrink-0 text-[#121621] text-[14px] whitespace-nowrap">113239390</p>
    </div>
  );
}

function TextAndSupportingText51() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Text and supporting text">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[18px] not-italic relative shrink-0 text-[#121621] text-[14px] whitespace-nowrap">#113239382</p>
    </div>
  );
}

function TextAndSupportingText52() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Text and supporting text">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[18px] not-italic relative shrink-0 text-[#121621] text-[14px] whitespace-nowrap">€ 300,00</p>
    </div>
  );
}

function TextAndSupportingText53() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Text and supporting text">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[18px] not-italic relative shrink-0 text-[#121621] text-[14px] whitespace-nowrap">04/03/25, 14:15</p>
    </div>
  );
}

function TextAndSupportingText54() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Text and supporting text">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[18px] not-italic relative shrink-0 text-[#121621] text-[14px] whitespace-nowrap">#2456230</p>
    </div>
  );
}

function TextAndSupportingText55() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Text and supporting text">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[18px] not-italic relative shrink-0 text-[#121621] text-[14px] whitespace-nowrap">****9382</p>
    </div>
  );
}

function IconAndText9() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Icon and text">
      <div className="bg-white h-[24px] relative rounded-[4px] shrink-0 w-[34px]" data-name="Payment method icon">
        <div aria-hidden="true" className="absolute border border-[#e9eaeb] border-solid inset-0 pointer-events-none rounded-[4px]" />
        <div className="absolute inset-[33.75%_15.88%_33.67%_14.12%]" data-name="visa-logo">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 23.8 7.81915">
            <path clipRule="evenodd" d={svgPaths.pdc4b400} fill="var(--fill-0, #172B85)" fillRule="evenodd" id="visa-logo" />
          </svg>
        </div>
      </div>
      <TextAndSupportingText55 />
    </div>
  );
}

function TextAndSupportingText56() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Text and supporting text">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[18px] not-italic relative shrink-0 text-[#121621] text-[14px] whitespace-nowrap">113239391</p>
    </div>
  );
}

function TextAndSupportingText57() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Text and supporting text">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[18px] not-italic relative shrink-0 text-[#121621] text-[14px] whitespace-nowrap">#113239382</p>
    </div>
  );
}

function TextAndSupportingText58() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Text and supporting text">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[18px] not-italic relative shrink-0 text-[#121621] text-[14px] whitespace-nowrap">€ 180,00</p>
    </div>
  );
}

function TextAndSupportingText59() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Text and supporting text">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[18px] not-italic relative shrink-0 text-[#121621] text-[14px] whitespace-nowrap">05/03/25, 09:45</p>
    </div>
  );
}

function ChevronBackward() {
  return (
    <div className="relative shrink-0 size-[23px]" data-name="chevron_backward">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 23 23">
        <g id="chevron_backward">
          <mask height="23" id="mask0_1_12245" maskUnits="userSpaceOnUse" style={{ maskType: "alpha" }} width="23" x="0" y="0">
            <rect fill="var(--fill-0, #D9D9D9)" height="23" id="Bounding box" width="23" />
          </mask>
          <g mask="url(#mask0_1_12245)">
            <path d={svgPaths.p240c5300} fill="var(--fill-0, #525D5D)" id="chevron_backward_2" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function FirstPage() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="first_page">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="first_page">
          <mask height="24" id="mask0_1_12292" maskUnits="userSpaceOnUse" style={{ maskType: "alpha" }} width="24" x="0" y="0">
            <rect fill="var(--fill-0, #D9D9D9)" height="24" id="Bounding box" width="24" />
          </mask>
          <g mask="url(#mask0_1_12292)">
            <path d={svgPaths.p8d04300} fill="var(--fill-0, #525D5D)" id="first_page_2" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Frame14() {
  return (
    <div className="content-stretch flex items-center relative shrink-0">
      <ChevronBackward />
      <FirstPage />
    </div>
  );
}

function PaginationNumber() {
  return (
    <div className="content-stretch flex items-center justify-center min-w-[32px] p-[4px] relative rounded-[4px] shrink-0" data-name="Pagination number">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[22px] not-italic relative shrink-0 text-[#121621] text-[16px] text-center whitespace-nowrap">1</p>
    </div>
  );
}

function PaginationNumber1() {
  return (
    <div className="content-stretch flex items-center justify-center min-w-[32px] p-[4px] relative rounded-[4px] shrink-0" data-name="Pagination number">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[22px] not-italic relative shrink-0 text-[#525d5d] text-[16px] text-center whitespace-nowrap">2</p>
    </div>
  );
}

function PaginationNumber2() {
  return (
    <div className="content-stretch flex items-center justify-center min-w-[32px] p-[4px] relative rounded-[4px] shrink-0" data-name="Pagination number">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[22px] not-italic relative shrink-0 text-[#525d5d] text-[16px] text-center whitespace-nowrap">3</p>
    </div>
  );
}

function PaginationNumber3() {
  return (
    <div className="content-stretch flex items-center justify-center min-w-[32px] p-[4px] relative rounded-[4px] shrink-0" data-name="Pagination number">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[22px] not-italic relative shrink-0 text-[#525d5d] text-[16px] text-center whitespace-nowrap">...</p>
    </div>
  );
}

function PaginationNumber4() {
  return (
    <div className="content-stretch flex items-center justify-center min-w-[32px] p-[4px] relative rounded-[4px] shrink-0" data-name="Pagination number">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[22px] not-italic relative shrink-0 text-[#525d5d] text-[16px] text-center whitespace-nowrap">3</p>
    </div>
  );
}

function PaginationNumber5() {
  return (
    <div className="content-stretch flex items-center justify-center min-w-[32px] p-[4px] relative rounded-[4px] shrink-0" data-name="Pagination number">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[22px] not-italic relative shrink-0 text-[#525d5d] text-[16px] text-center whitespace-nowrap">4</p>
    </div>
  );
}

function PaginationNumber6() {
  return (
    <div className="content-stretch flex items-center justify-center min-w-[32px] p-[4px] relative rounded-[4px] shrink-0" data-name="Pagination number">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[22px] not-italic relative shrink-0 text-[#525d5d] text-[16px] text-center whitespace-nowrap">5</p>
    </div>
  );
}

function PageNumbers() {
  return (
    <div className="content-stretch flex gap-[8px] items-start relative shrink-0" data-name="Page numbers">
      <PaginationNumber />
      <PaginationNumber1 />
      <PaginationNumber2 />
      <PaginationNumber3 />
      <PaginationNumber4 />
      <PaginationNumber5 />
      <PaginationNumber6 />
    </div>
  );
}

function LastPage() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="last_page">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="last_page">
          <mask height="24" id="mask0_1_12241" maskUnits="userSpaceOnUse" style={{ maskType: "alpha" }} width="24" x="0" y="0">
            <rect fill="var(--fill-0, #D9D9D9)" height="24" id="Bounding box" width="24" />
          </mask>
          <g mask="url(#mask0_1_12241)">
            <path d={svgPaths.p2c8aeac0} fill="var(--fill-0, #525D5D)" id="last_page_2" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function KeyboardArrowRight() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="keyboard_arrow_right">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="keyboard_arrow_right">
          <mask height="24" id="mask0_1_12233" maskUnits="userSpaceOnUse" style={{ maskType: "alpha" }} width="24" x="0" y="0">
            <rect fill="var(--fill-0, #D9D9D9)" height="24" id="Bounding box" width="24" />
          </mask>
          <g mask="url(#mask0_1_12233)">
            <path d={svgPaths.p3ecf1680} fill="var(--fill-0, #525D5D)" id="keyboard_arrow_right_2" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Frame15() {
  return (
    <div className="content-stretch flex items-center relative shrink-0">
      <LastPage />
      <KeyboardArrowRight />
    </div>
  );
}

function Pagination() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[16px] h-full items-center justify-center min-h-px min-w-px relative" data-name="Pagination">
      <Frame14 />
      <PageNumbers />
      <Frame15 />
    </div>
  );
}

function KeyboardArrowDown() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="keyboard_arrow_down">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="keyboard_arrow_down">
          <mask height="20" id="mask0_1_12253" maskUnits="userSpaceOnUse" style={{ maskType: "alpha" }} width="20" x="0" y="0">
            <rect fill="var(--fill-0, #D9D9D9)" height="20" id="Bounding box" width="20" />
          </mask>
          <g mask="url(#mask0_1_12253)">
            <path d={svgPaths.pdb0fe80} fill="var(--fill-0, #121621)" id="keyboard_arrow_down_2" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function MenuItem1() {
  return (
    <div className="backdrop-blur-[2px] bg-white content-stretch flex items-center p-[8px] relative rounded-[6px] shrink-0" data-name="menu item">
      <div aria-hidden="true" className="absolute border border-[#e6ebeb] border-solid inset-0 pointer-events-none rounded-[6px]" />
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#121621] text-[14px] text-center w-[32px]">
        <p className="leading-[18px]">10</p>
      </div>
      <KeyboardArrowDown />
    </div>
  );
}

function OfRows() {
  return (
    <div className="content-stretch flex gap-[8px] items-center justify-center relative shrink-0 w-[200px]" data-name="# of rows">
      <div className="flex flex-[1_0_0] flex-col font-['Inter:400',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#525d5d] text-[16px] text-right tracking-[0.002px]">
        <p className="leading-[24px]">View:</p>
      </div>
      <MenuItem1 />
    </div>
  );
}

function Frame10() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0 w-full">
      <Content />
      <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="Content">
        <div className="flex-[1_0_0] max-h-[48px] min-h-px min-w-px relative self-stretch" data-name="Table cell">
          <div aria-hidden="true" className="absolute border-[#e6ebeb] border-b border-solid inset-0 pointer-events-none" />
          <div className="flex flex-row items-center max-h-[inherit] size-full">
            <div className="content-stretch flex gap-[12px] items-center max-h-[inherit] p-[16px] relative size-full">
              <div className="content-stretch flex items-start relative shrink-0" data-name="Table cell lead action">
                <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="💠 Checkbox">
                  <div className="relative rounded-[4px] shrink-0 size-[16px]" data-name=".checkbox-base">
                    <div aria-hidden="true" className="absolute border border-[#859090] border-solid inset-0 pointer-events-none rounded-[4px]" />
                  </div>
                </div>
              </div>
              <TextAndSupportingText />
            </div>
          </div>
        </div>
        <div className="flex-[1_0_0] max-h-[48px] min-h-px min-w-px relative self-stretch" data-name="Table cell">
          <div aria-hidden="true" className="absolute border-[#e6ebeb] border-b border-solid inset-0 pointer-events-none" />
          <div className="flex flex-row items-center max-h-[inherit] size-full">
            <div className="content-stretch flex gap-[12px] items-center max-h-[inherit] p-[16px] relative size-full">
              <IconAndText />
            </div>
          </div>
        </div>
        <div className="flex-[1_0_0] max-h-[48px] min-h-px min-w-px relative self-stretch" data-name="Table cell">
          <div aria-hidden="true" className="absolute border-[#e6ebeb] border-b border-solid inset-0 pointer-events-none" />
          <div className="flex flex-row items-center max-h-[inherit] size-full">
            <div className="content-stretch flex items-center max-h-[inherit] p-[16px] relative size-full">
              <div className="bg-[#dcfae6] content-stretch flex items-center px-[8px] py-[2px] relative rounded-[4px] shrink-0" data-name="💠 Chip">
                <p className="font-['Inter:Medium',sans-serif] font-medium leading-[18px] not-italic relative shrink-0 text-[#067647] text-[14px] text-center whitespace-nowrap">Paid</p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex-[1_0_0] max-h-[48px] min-h-px min-w-px relative self-stretch" data-name="Table cell">
          <div aria-hidden="true" className="absolute border-[#e6ebeb] border-b border-solid inset-0 pointer-events-none" />
          <div className="flex flex-row items-center max-h-[inherit] size-full">
            <div className="content-stretch flex gap-[12px] items-center max-h-[inherit] p-[16px] relative size-full">
              <TextAndSupportingText2 />
            </div>
          </div>
        </div>
        <div className="flex-[1_0_0] max-h-[48px] min-h-px min-w-px relative self-stretch" data-name="Table cell">
          <div aria-hidden="true" className="absolute border-[#e6ebeb] border-b border-solid inset-0 pointer-events-none" />
          <div className="flex flex-row items-center max-h-[inherit] size-full">
            <div className="content-stretch flex gap-[12px] items-center max-h-[inherit] p-[16px] relative size-full">
              <TextAndSupportingText3 />
            </div>
          </div>
        </div>
        <div className="flex-[1_0_0] max-h-[48px] min-h-px min-w-px relative self-stretch" data-name="Table cell">
          <div aria-hidden="true" className="absolute border-[#e6ebeb] border-b border-solid inset-0 pointer-events-none" />
          <div className="flex flex-row items-center max-h-[inherit] size-full">
            <div className="content-stretch flex gap-[12px] items-center max-h-[inherit] p-[16px] relative size-full">
              <TextAndSupportingText4 />
            </div>
          </div>
        </div>
        <div className="flex-[1_0_0] max-h-[48px] min-h-px min-w-px relative self-stretch" data-name="Table cell">
          <div aria-hidden="true" className="absolute border-[#e6ebeb] border-b border-solid inset-0 pointer-events-none" />
          <div className="flex flex-row items-center max-h-[inherit] size-full">
            <div className="content-stretch flex gap-[12px] items-center max-h-[inherit] p-[16px] relative size-full">
              <TextAndSupportingText5 />
            </div>
          </div>
        </div>
        <div className="content-stretch flex items-center max-h-[48px] pl-[16px] pr-[12px] py-[16px] relative shrink-0 size-[48px]" data-name="Table cell">
          <div aria-hidden="true" className="absolute border-[#e6ebeb] border-b border-solid inset-0 pointer-events-none" />
          <button className="content-stretch cursor-pointer flex flex-col items-start relative shrink-0" data-name="Dropdown">
            <div className="overflow-clip relative shrink-0 size-[20px]" data-name="dots-vertical">
              <div className="absolute inset-[16.67%_45.83%]" data-name="Icon">
                <div className="absolute inset-[-6.25%_-50%]">
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 3.33333 15">
                    <g id="Icon">
                      <path d={svgPaths.p3ed2dd80} stroke="var(--stroke-0, #A4A7AE)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                      <path d={svgPaths.p3815c300} stroke="var(--stroke-0, #A4A7AE)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                      <path d={svgPaths.p39ad1980} stroke="var(--stroke-0, #A4A7AE)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                    </g>
                  </svg>
                </div>
              </div>
            </div>
          </button>
        </div>
      </div>
      <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="Content">
        <div className="flex-[1_0_0] max-h-[48px] min-h-px min-w-px relative self-stretch" data-name="Table cell">
          <div aria-hidden="true" className="absolute border-[#e6ebeb] border-b border-solid inset-0 pointer-events-none" />
          <div className="flex flex-row items-center max-h-[inherit] size-full">
            <div className="content-stretch flex gap-[12px] items-center max-h-[inherit] p-[16px] relative size-full">
              <div className="content-stretch flex items-start relative shrink-0" data-name="Table cell lead action">
                <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="💠 Checkbox">
                  <div className="relative rounded-[4px] shrink-0 size-[16px]" data-name=".checkbox-base">
                    <div aria-hidden="true" className="absolute border border-[#859090] border-solid inset-0 pointer-events-none rounded-[4px]" />
                  </div>
                </div>
              </div>
              <TextAndSupportingText6 />
            </div>
          </div>
        </div>
        <div className="flex-[1_0_0] max-h-[48px] min-h-px min-w-px relative self-stretch" data-name="Table cell">
          <div aria-hidden="true" className="absolute border-[#e6ebeb] border-b border-solid inset-0 pointer-events-none" />
          <div className="flex flex-row items-center max-h-[inherit] size-full">
            <div className="content-stretch flex gap-[12px] items-center max-h-[inherit] p-[16px] relative size-full">
              <IconAndText1 />
            </div>
          </div>
        </div>
        <div className="flex-[1_0_0] max-h-[48px] min-h-px min-w-px relative self-stretch" data-name="Table cell">
          <div aria-hidden="true" className="absolute border-[#e6ebeb] border-b border-solid inset-0 pointer-events-none" />
          <div className="flex flex-row items-center max-h-[inherit] size-full">
            <div className="content-stretch flex items-center max-h-[inherit] p-[16px] relative size-full">
              <div className="bg-[#e6ebeb] content-stretch flex items-center px-[8px] py-[2px] relative rounded-[4px] shrink-0" data-name="💠 Chip">
                <p className="font-['Inter:Medium',sans-serif] font-medium leading-[18px] not-italic relative shrink-0 text-[#525d5d] text-[14px] text-center whitespace-nowrap">Pending</p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex-[1_0_0] max-h-[48px] min-h-px min-w-px relative self-stretch" data-name="Table cell">
          <div aria-hidden="true" className="absolute border-[#e6ebeb] border-b border-solid inset-0 pointer-events-none" />
          <div className="flex flex-row items-center max-h-[inherit] size-full">
            <div className="content-stretch flex gap-[12px] items-center max-h-[inherit] p-[16px] relative size-full">
              <TextAndSupportingText8 />
            </div>
          </div>
        </div>
        <div className="flex-[1_0_0] max-h-[48px] min-h-px min-w-px relative self-stretch" data-name="Table cell">
          <div aria-hidden="true" className="absolute border-[#e6ebeb] border-b border-solid inset-0 pointer-events-none" />
          <div className="flex flex-row items-center max-h-[inherit] size-full">
            <div className="content-stretch flex gap-[12px] items-center max-h-[inherit] p-[16px] relative size-full">
              <TextAndSupportingText9 />
            </div>
          </div>
        </div>
        <div className="flex-[1_0_0] max-h-[48px] min-h-px min-w-px relative self-stretch" data-name="Table cell">
          <div aria-hidden="true" className="absolute border-[#e6ebeb] border-b border-solid inset-0 pointer-events-none" />
          <div className="flex flex-row items-center max-h-[inherit] size-full">
            <div className="content-stretch flex gap-[12px] items-center max-h-[inherit] p-[16px] relative size-full">
              <TextAndSupportingText10 />
            </div>
          </div>
        </div>
        <div className="flex-[1_0_0] max-h-[48px] min-h-px min-w-px relative self-stretch" data-name="Table cell">
          <div aria-hidden="true" className="absolute border-[#e6ebeb] border-b border-solid inset-0 pointer-events-none" />
          <div className="flex flex-row items-center max-h-[inherit] size-full">
            <div className="content-stretch flex gap-[12px] items-center max-h-[inherit] p-[16px] relative size-full">
              <TextAndSupportingText11 />
            </div>
          </div>
        </div>
        <div className="content-stretch flex items-center max-h-[48px] pl-[16px] pr-[12px] py-[16px] relative shrink-0 size-[48px]" data-name="Table cell">
          <div aria-hidden="true" className="absolute border-[#e6ebeb] border-b border-solid inset-0 pointer-events-none" />
          <button className="content-stretch cursor-pointer flex flex-col items-start relative shrink-0" data-name="Dropdown">
            <div className="overflow-clip relative shrink-0 size-[20px]" data-name="dots-vertical">
              <div className="absolute inset-[16.67%_45.83%]" data-name="Icon">
                <div className="absolute inset-[-6.25%_-50%]">
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 3.33333 15">
                    <g id="Icon">
                      <path d={svgPaths.p3ed2dd80} stroke="var(--stroke-0, #A4A7AE)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                      <path d={svgPaths.p3815c300} stroke="var(--stroke-0, #A4A7AE)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                      <path d={svgPaths.p39ad1980} stroke="var(--stroke-0, #A4A7AE)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                    </g>
                  </svg>
                </div>
              </div>
            </div>
          </button>
        </div>
      </div>
      <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="Content">
        <div className="flex-[1_0_0] max-h-[48px] min-h-px min-w-px relative self-stretch" data-name="Table cell">
          <div aria-hidden="true" className="absolute border-[#e6ebeb] border-b border-solid inset-0 pointer-events-none" />
          <div className="flex flex-row items-center max-h-[inherit] size-full">
            <div className="content-stretch flex gap-[12px] items-center max-h-[inherit] p-[16px] relative size-full">
              <div className="content-stretch flex items-start relative shrink-0" data-name="Table cell lead action">
                <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="💠 Checkbox">
                  <div className="relative rounded-[4px] shrink-0 size-[16px]" data-name=".checkbox-base">
                    <div aria-hidden="true" className="absolute border border-[#859090] border-solid inset-0 pointer-events-none rounded-[4px]" />
                  </div>
                </div>
              </div>
              <TextAndSupportingText12 />
            </div>
          </div>
        </div>
        <div className="flex-[1_0_0] max-h-[48px] min-h-px min-w-px relative self-stretch" data-name="Table cell">
          <div aria-hidden="true" className="absolute border-[#e6ebeb] border-b border-solid inset-0 pointer-events-none" />
          <div className="flex flex-row items-center max-h-[inherit] size-full">
            <div className="content-stretch flex gap-[12px] items-center max-h-[inherit] p-[16px] relative size-full">
              <IconAndText2 />
            </div>
          </div>
        </div>
        <div className="flex-[1_0_0] max-h-[48px] min-h-px min-w-px relative self-stretch" data-name="Table cell">
          <div aria-hidden="true" className="absolute border-[#e6ebeb] border-b border-solid inset-0 pointer-events-none" />
          <div className="flex flex-row items-center max-h-[inherit] size-full">
            <div className="content-stretch flex items-center max-h-[inherit] p-[16px] relative size-full">
              <div className="bg-[#dcfae6] content-stretch flex items-center px-[8px] py-[2px] relative rounded-[4px] shrink-0" data-name="💠 Chip">
                <p className="font-['Inter:Medium',sans-serif] font-medium leading-[18px] not-italic relative shrink-0 text-[#067647] text-[14px] text-center whitespace-nowrap">Paid</p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex-[1_0_0] max-h-[48px] min-h-px min-w-px relative self-stretch" data-name="Table cell">
          <div aria-hidden="true" className="absolute border-[#e6ebeb] border-b border-solid inset-0 pointer-events-none" />
          <div className="flex flex-row items-center max-h-[inherit] size-full">
            <div className="content-stretch flex gap-[12px] items-center max-h-[inherit] p-[16px] relative size-full">
              <TextAndSupportingText14 />
            </div>
          </div>
        </div>
        <div className="flex-[1_0_0] max-h-[48px] min-h-px min-w-px relative self-stretch" data-name="Table cell">
          <div aria-hidden="true" className="absolute border-[#e6ebeb] border-b border-solid inset-0 pointer-events-none" />
          <div className="flex flex-row items-center max-h-[inherit] size-full">
            <div className="content-stretch flex gap-[12px] items-center max-h-[inherit] p-[16px] relative size-full">
              <TextAndSupportingText15 />
            </div>
          </div>
        </div>
        <div className="flex-[1_0_0] max-h-[48px] min-h-px min-w-px relative self-stretch" data-name="Table cell">
          <div aria-hidden="true" className="absolute border-[#e6ebeb] border-b border-solid inset-0 pointer-events-none" />
          <div className="flex flex-row items-center max-h-[inherit] size-full">
            <div className="content-stretch flex gap-[12px] items-center max-h-[inherit] p-[16px] relative size-full">
              <TextAndSupportingText16 />
            </div>
          </div>
        </div>
        <div className="flex-[1_0_0] max-h-[48px] min-h-px min-w-px relative self-stretch" data-name="Table cell">
          <div aria-hidden="true" className="absolute border-[#e6ebeb] border-b border-solid inset-0 pointer-events-none" />
          <div className="flex flex-row items-center max-h-[inherit] size-full">
            <div className="content-stretch flex gap-[12px] items-center max-h-[inherit] p-[16px] relative size-full">
              <TextAndSupportingText17 />
            </div>
          </div>
        </div>
        <div className="content-stretch flex items-center max-h-[48px] pl-[16px] pr-[12px] py-[16px] relative shrink-0 size-[48px]" data-name="Table cell">
          <div aria-hidden="true" className="absolute border-[#e6ebeb] border-b border-solid inset-0 pointer-events-none" />
          <button className="content-stretch cursor-pointer flex flex-col items-start relative shrink-0" data-name="Dropdown">
            <div className="overflow-clip relative shrink-0 size-[20px]" data-name="dots-vertical">
              <div className="absolute inset-[16.67%_45.83%]" data-name="Icon">
                <div className="absolute inset-[-6.25%_-50%]">
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 3.33333 15">
                    <g id="Icon">
                      <path d={svgPaths.p3ed2dd80} stroke="var(--stroke-0, #A4A7AE)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                      <path d={svgPaths.p3815c300} stroke="var(--stroke-0, #A4A7AE)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                      <path d={svgPaths.p39ad1980} stroke="var(--stroke-0, #A4A7AE)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                    </g>
                  </svg>
                </div>
              </div>
            </div>
          </button>
        </div>
      </div>
      <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="Content">
        <div className="flex-[1_0_0] max-h-[48px] min-h-px min-w-px relative self-stretch" data-name="Table cell">
          <div aria-hidden="true" className="absolute border-[#e6ebeb] border-b border-solid inset-0 pointer-events-none" />
          <div className="flex flex-row items-center max-h-[inherit] size-full">
            <div className="content-stretch flex gap-[12px] items-center max-h-[inherit] p-[16px] relative size-full">
              <div className="content-stretch flex items-start relative shrink-0" data-name="Table cell lead action">
                <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="💠 Checkbox">
                  <div className="relative rounded-[4px] shrink-0 size-[16px]" data-name=".checkbox-base">
                    <div aria-hidden="true" className="absolute border border-[#859090] border-solid inset-0 pointer-events-none rounded-[4px]" />
                  </div>
                </div>
              </div>
              <TextAndSupportingText18 />
            </div>
          </div>
        </div>
        <div className="flex-[1_0_0] max-h-[48px] min-h-px min-w-px relative self-stretch" data-name="Table cell">
          <div aria-hidden="true" className="absolute border-[#e6ebeb] border-b border-solid inset-0 pointer-events-none" />
          <div className="flex flex-row items-center max-h-[inherit] size-full">
            <div className="content-stretch flex gap-[12px] items-center max-h-[inherit] p-[16px] relative size-full">
              <IconAndText3 />
            </div>
          </div>
        </div>
        <div className="flex-[1_0_0] max-h-[48px] min-h-px min-w-px relative self-stretch" data-name="Table cell">
          <div aria-hidden="true" className="absolute border-[#e6ebeb] border-b border-solid inset-0 pointer-events-none" />
          <div className="flex flex-row items-center max-h-[inherit] size-full">
            <div className="content-stretch flex items-center max-h-[inherit] p-[16px] relative size-full">
              <div className="bg-[#fee4e2] content-stretch flex items-center px-[8px] py-[2px] relative rounded-[4px] shrink-0" data-name="💠 Chip">
                <p className="font-['Inter:Medium',sans-serif] font-medium leading-[18px] not-italic relative shrink-0 text-[#b42318] text-[14px] text-center whitespace-nowrap">Failed</p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex-[1_0_0] max-h-[48px] min-h-px min-w-px relative self-stretch" data-name="Table cell">
          <div aria-hidden="true" className="absolute border-[#e6ebeb] border-b border-solid inset-0 pointer-events-none" />
          <div className="flex flex-row items-center max-h-[inherit] size-full">
            <div className="content-stretch flex gap-[12px] items-center max-h-[inherit] p-[16px] relative size-full">
              <TextAndSupportingText20 />
            </div>
          </div>
        </div>
        <div className="flex-[1_0_0] max-h-[48px] min-h-px min-w-px relative self-stretch" data-name="Table cell">
          <div aria-hidden="true" className="absolute border-[#e6ebeb] border-b border-solid inset-0 pointer-events-none" />
          <div className="flex flex-row items-center max-h-[inherit] size-full">
            <div className="content-stretch flex gap-[12px] items-center max-h-[inherit] p-[16px] relative size-full">
              <TextAndSupportingText21 />
            </div>
          </div>
        </div>
        <div className="flex-[1_0_0] max-h-[48px] min-h-px min-w-px relative self-stretch" data-name="Table cell">
          <div aria-hidden="true" className="absolute border-[#e6ebeb] border-b border-solid inset-0 pointer-events-none" />
          <div className="flex flex-row items-center max-h-[inherit] size-full">
            <div className="content-stretch flex gap-[12px] items-center max-h-[inherit] p-[16px] relative size-full">
              <TextAndSupportingText22 />
            </div>
          </div>
        </div>
        <div className="flex-[1_0_0] max-h-[48px] min-h-px min-w-px relative self-stretch" data-name="Table cell">
          <div aria-hidden="true" className="absolute border-[#e6ebeb] border-b border-solid inset-0 pointer-events-none" />
          <div className="flex flex-row items-center max-h-[inherit] size-full">
            <div className="content-stretch flex gap-[12px] items-center max-h-[inherit] p-[16px] relative size-full">
              <TextAndSupportingText23 />
            </div>
          </div>
        </div>
        <div className="content-stretch flex items-center max-h-[48px] pl-[16px] pr-[12px] py-[16px] relative shrink-0 size-[48px]" data-name="Table cell">
          <div aria-hidden="true" className="absolute border-[#e6ebeb] border-b border-solid inset-0 pointer-events-none" />
          <button className="content-stretch cursor-pointer flex flex-col items-start relative shrink-0" data-name="Dropdown">
            <div className="overflow-clip relative shrink-0 size-[20px]" data-name="dots-vertical">
              <div className="absolute inset-[16.67%_45.83%]" data-name="Icon">
                <div className="absolute inset-[-6.25%_-50%]">
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 3.33333 15">
                    <g id="Icon">
                      <path d={svgPaths.p3ed2dd80} stroke="var(--stroke-0, #A4A7AE)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                      <path d={svgPaths.p3815c300} stroke="var(--stroke-0, #A4A7AE)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                      <path d={svgPaths.p39ad1980} stroke="var(--stroke-0, #A4A7AE)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                    </g>
                  </svg>
                </div>
              </div>
            </div>
          </button>
        </div>
      </div>
      <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="Content">
        <div className="flex-[1_0_0] max-h-[48px] min-h-px min-w-px relative self-stretch" data-name="Table cell">
          <div aria-hidden="true" className="absolute border-[#e6ebeb] border-b border-solid inset-0 pointer-events-none" />
          <div className="flex flex-row items-center max-h-[inherit] size-full">
            <div className="content-stretch flex gap-[12px] items-center max-h-[inherit] p-[16px] relative size-full">
              <div className="content-stretch flex items-start relative shrink-0" data-name="Table cell lead action">
                <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="💠 Checkbox">
                  <div className="relative rounded-[4px] shrink-0 size-[16px]" data-name=".checkbox-base">
                    <div aria-hidden="true" className="absolute border border-[#859090] border-solid inset-0 pointer-events-none rounded-[4px]" />
                  </div>
                </div>
              </div>
              <TextAndSupportingText24 />
            </div>
          </div>
        </div>
        <div className="flex-[1_0_0] max-h-[48px] min-h-px min-w-px relative self-stretch" data-name="Table cell">
          <div aria-hidden="true" className="absolute border-[#e6ebeb] border-b border-solid inset-0 pointer-events-none" />
          <div className="flex flex-row items-center max-h-[inherit] size-full">
            <div className="content-stretch flex gap-[12px] items-center max-h-[inherit] p-[16px] relative size-full">
              <IconAndText4 />
            </div>
          </div>
        </div>
        <div className="flex-[1_0_0] max-h-[48px] min-h-px min-w-px relative self-stretch" data-name="Table cell">
          <div aria-hidden="true" className="absolute border-[#e6ebeb] border-b border-solid inset-0 pointer-events-none" />
          <div className="flex flex-row items-center max-h-[inherit] size-full">
            <div className="content-stretch flex items-center max-h-[inherit] p-[16px] relative size-full">
              <div className="bg-[#e6ebeb] content-stretch flex items-center px-[8px] py-[2px] relative rounded-[4px] shrink-0" data-name="💠 Chip">
                <p className="font-['Inter:Medium',sans-serif] font-medium leading-[18px] not-italic relative shrink-0 text-[#525d5d] text-[14px] text-center whitespace-nowrap">Refunded</p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex-[1_0_0] max-h-[48px] min-h-px min-w-px relative self-stretch" data-name="Table cell">
          <div aria-hidden="true" className="absolute border-[#e6ebeb] border-b border-solid inset-0 pointer-events-none" />
          <div className="flex flex-row items-center max-h-[inherit] size-full">
            <div className="content-stretch flex gap-[12px] items-center max-h-[inherit] p-[16px] relative size-full">
              <TextAndSupportingText26 />
            </div>
          </div>
        </div>
        <div className="flex-[1_0_0] max-h-[48px] min-h-px min-w-px relative self-stretch" data-name="Table cell">
          <div aria-hidden="true" className="absolute border-[#e6ebeb] border-b border-solid inset-0 pointer-events-none" />
          <div className="flex flex-row items-center max-h-[inherit] size-full">
            <div className="content-stretch flex gap-[12px] items-center max-h-[inherit] p-[16px] relative size-full">
              <TextAndSupportingText27 />
            </div>
          </div>
        </div>
        <div className="flex-[1_0_0] max-h-[48px] min-h-px min-w-px relative self-stretch" data-name="Table cell">
          <div aria-hidden="true" className="absolute border-[#e6ebeb] border-b border-solid inset-0 pointer-events-none" />
          <div className="flex flex-row items-center max-h-[inherit] size-full">
            <div className="content-stretch flex gap-[12px] items-center max-h-[inherit] p-[16px] relative size-full">
              <TextAndSupportingText28 />
            </div>
          </div>
        </div>
        <div className="flex-[1_0_0] max-h-[48px] min-h-px min-w-px relative self-stretch" data-name="Table cell">
          <div aria-hidden="true" className="absolute border-[#e6ebeb] border-b border-solid inset-0 pointer-events-none" />
          <div className="flex flex-row items-center max-h-[inherit] size-full">
            <div className="content-stretch flex gap-[12px] items-center max-h-[inherit] p-[16px] relative size-full">
              <TextAndSupportingText29 />
            </div>
          </div>
        </div>
        <div className="content-stretch flex items-center max-h-[48px] pl-[16px] pr-[12px] py-[16px] relative shrink-0 size-[48px]" data-name="Table cell">
          <div aria-hidden="true" className="absolute border-[#e6ebeb] border-b border-solid inset-0 pointer-events-none" />
          <button className="content-stretch cursor-pointer flex flex-col items-start relative shrink-0" data-name="Dropdown">
            <div className="overflow-clip relative shrink-0 size-[20px]" data-name="dots-vertical">
              <div className="absolute inset-[16.67%_45.83%]" data-name="Icon">
                <div className="absolute inset-[-6.25%_-50%]">
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 3.33333 15">
                    <g id="Icon">
                      <path d={svgPaths.p3ed2dd80} stroke="var(--stroke-0, #A4A7AE)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                      <path d={svgPaths.p3815c300} stroke="var(--stroke-0, #A4A7AE)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                      <path d={svgPaths.p39ad1980} stroke="var(--stroke-0, #A4A7AE)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                    </g>
                  </svg>
                </div>
              </div>
            </div>
          </button>
        </div>
      </div>
      <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="Content">
        <div className="flex-[1_0_0] max-h-[48px] min-h-px min-w-px relative self-stretch" data-name="Table cell">
          <div aria-hidden="true" className="absolute border-[#e6ebeb] border-b border-solid inset-0 pointer-events-none" />
          <div className="flex flex-row items-center max-h-[inherit] size-full">
            <div className="content-stretch flex gap-[12px] items-center max-h-[inherit] p-[16px] relative size-full">
              <div className="content-stretch flex items-start relative shrink-0" data-name="Table cell lead action">
                <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="💠 Checkbox">
                  <div className="relative rounded-[4px] shrink-0 size-[16px]" data-name=".checkbox-base">
                    <div aria-hidden="true" className="absolute border border-[#859090] border-solid inset-0 pointer-events-none rounded-[4px]" />
                  </div>
                </div>
              </div>
              <TextAndSupportingText30 />
            </div>
          </div>
        </div>
        <div className="flex-[1_0_0] max-h-[48px] min-h-px min-w-px relative self-stretch" data-name="Table cell">
          <div aria-hidden="true" className="absolute border-[#e6ebeb] border-b border-solid inset-0 pointer-events-none" />
          <div className="flex flex-row items-center max-h-[inherit] size-full">
            <div className="content-stretch flex gap-[12px] items-center max-h-[inherit] p-[16px] relative size-full">
              <IconAndText5 />
            </div>
          </div>
        </div>
        <div className="flex-[1_0_0] max-h-[48px] min-h-px min-w-px relative self-stretch" data-name="Table cell">
          <div aria-hidden="true" className="absolute border-[#e6ebeb] border-b border-solid inset-0 pointer-events-none" />
          <div className="flex flex-row items-center max-h-[inherit] size-full">
            <div className="content-stretch flex items-center max-h-[inherit] p-[16px] relative size-full">
              <div className="bg-[#dcfae6] content-stretch flex items-center px-[8px] py-[2px] relative rounded-[4px] shrink-0" data-name="💠 Chip">
                <p className="font-['Inter:Medium',sans-serif] font-medium leading-[18px] not-italic relative shrink-0 text-[#067647] text-[14px] text-center whitespace-nowrap">Paid</p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex-[1_0_0] max-h-[48px] min-h-px min-w-px relative self-stretch" data-name="Table cell">
          <div aria-hidden="true" className="absolute border-[#e6ebeb] border-b border-solid inset-0 pointer-events-none" />
          <div className="flex flex-row items-center max-h-[inherit] size-full">
            <div className="content-stretch flex gap-[12px] items-center max-h-[inherit] p-[16px] relative size-full">
              <TextAndSupportingText32 />
            </div>
          </div>
        </div>
        <div className="flex-[1_0_0] max-h-[48px] min-h-px min-w-px relative self-stretch" data-name="Table cell">
          <div aria-hidden="true" className="absolute border-[#e6ebeb] border-b border-solid inset-0 pointer-events-none" />
          <div className="flex flex-row items-center max-h-[inherit] size-full">
            <div className="content-stretch flex gap-[12px] items-center max-h-[inherit] p-[16px] relative size-full">
              <TextAndSupportingText33 />
            </div>
          </div>
        </div>
        <div className="flex-[1_0_0] max-h-[48px] min-h-px min-w-px relative self-stretch" data-name="Table cell">
          <div aria-hidden="true" className="absolute border-[#e6ebeb] border-b border-solid inset-0 pointer-events-none" />
          <div className="flex flex-row items-center max-h-[inherit] size-full">
            <div className="content-stretch flex gap-[12px] items-center max-h-[inherit] p-[16px] relative size-full">
              <TextAndSupportingText34 />
            </div>
          </div>
        </div>
        <div className="flex-[1_0_0] max-h-[48px] min-h-px min-w-px relative self-stretch" data-name="Table cell">
          <div aria-hidden="true" className="absolute border-[#e6ebeb] border-b border-solid inset-0 pointer-events-none" />
          <div className="flex flex-row items-center max-h-[inherit] size-full">
            <div className="content-stretch flex gap-[12px] items-center max-h-[inherit] p-[16px] relative size-full">
              <TextAndSupportingText35 />
            </div>
          </div>
        </div>
        <div className="content-stretch flex items-center max-h-[48px] pl-[16px] pr-[12px] py-[16px] relative shrink-0 size-[48px]" data-name="Table cell">
          <div aria-hidden="true" className="absolute border-[#e6ebeb] border-b border-solid inset-0 pointer-events-none" />
          <button className="content-stretch cursor-pointer flex flex-col items-start relative shrink-0" data-name="Dropdown">
            <div className="overflow-clip relative shrink-0 size-[20px]" data-name="dots-vertical">
              <div className="absolute inset-[16.67%_45.83%]" data-name="Icon">
                <div className="absolute inset-[-6.25%_-50%]">
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 3.33333 15">
                    <g id="Icon">
                      <path d={svgPaths.p3ed2dd80} stroke="var(--stroke-0, #A4A7AE)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                      <path d={svgPaths.p3815c300} stroke="var(--stroke-0, #A4A7AE)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                      <path d={svgPaths.p39ad1980} stroke="var(--stroke-0, #A4A7AE)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                    </g>
                  </svg>
                </div>
              </div>
            </div>
          </button>
        </div>
      </div>
      <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="Content">
        <div className="flex-[1_0_0] max-h-[48px] min-h-px min-w-px relative self-stretch" data-name="Table cell">
          <div aria-hidden="true" className="absolute border-[#e6ebeb] border-b border-solid inset-0 pointer-events-none" />
          <div className="flex flex-row items-center max-h-[inherit] size-full">
            <div className="content-stretch flex gap-[12px] items-center max-h-[inherit] p-[16px] relative size-full">
              <div className="content-stretch flex items-start relative shrink-0" data-name="Table cell lead action">
                <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="💠 Checkbox">
                  <div className="relative rounded-[4px] shrink-0 size-[16px]" data-name=".checkbox-base">
                    <div aria-hidden="true" className="absolute border border-[#859090] border-solid inset-0 pointer-events-none rounded-[4px]" />
                  </div>
                </div>
              </div>
              <TextAndSupportingText36 />
            </div>
          </div>
        </div>
        <div className="flex-[1_0_0] max-h-[48px] min-h-px min-w-px relative self-stretch" data-name="Table cell">
          <div aria-hidden="true" className="absolute border-[#e6ebeb] border-b border-solid inset-0 pointer-events-none" />
          <div className="flex flex-row items-center max-h-[inherit] size-full">
            <div className="content-stretch flex gap-[12px] items-center max-h-[inherit] p-[16px] relative size-full">
              <IconAndText6 />
            </div>
          </div>
        </div>
        <div className="flex-[1_0_0] max-h-[48px] min-h-px min-w-px relative self-stretch" data-name="Table cell">
          <div aria-hidden="true" className="absolute border-[#e6ebeb] border-b border-solid inset-0 pointer-events-none" />
          <div className="flex flex-row items-center max-h-[inherit] size-full">
            <div className="content-stretch flex items-center max-h-[inherit] p-[16px] relative size-full">
              <div className="bg-[#e6ebeb] content-stretch flex items-center px-[8px] py-[2px] relative rounded-[4px] shrink-0" data-name="💠 Chip">
                <p className="font-['Inter:Medium',sans-serif] font-medium leading-[18px] not-italic relative shrink-0 text-[#525d5d] text-[14px] text-center whitespace-nowrap">Pending</p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex-[1_0_0] max-h-[48px] min-h-px min-w-px relative self-stretch" data-name="Table cell">
          <div aria-hidden="true" className="absolute border-[#e6ebeb] border-b border-solid inset-0 pointer-events-none" />
          <div className="flex flex-row items-center max-h-[inherit] size-full">
            <div className="content-stretch flex gap-[12px] items-center max-h-[inherit] p-[16px] relative size-full">
              <TextAndSupportingText38 />
            </div>
          </div>
        </div>
        <div className="flex-[1_0_0] max-h-[48px] min-h-px min-w-px relative self-stretch" data-name="Table cell">
          <div aria-hidden="true" className="absolute border-[#e6ebeb] border-b border-solid inset-0 pointer-events-none" />
          <div className="flex flex-row items-center max-h-[inherit] size-full">
            <div className="content-stretch flex gap-[12px] items-center max-h-[inherit] p-[16px] relative size-full">
              <TextAndSupportingText39 />
            </div>
          </div>
        </div>
        <div className="flex-[1_0_0] max-h-[48px] min-h-px min-w-px relative self-stretch" data-name="Table cell">
          <div aria-hidden="true" className="absolute border-[#e6ebeb] border-b border-solid inset-0 pointer-events-none" />
          <div className="flex flex-row items-center max-h-[inherit] size-full">
            <div className="content-stretch flex gap-[12px] items-center max-h-[inherit] p-[16px] relative size-full">
              <TextAndSupportingText40 />
            </div>
          </div>
        </div>
        <div className="flex-[1_0_0] max-h-[48px] min-h-px min-w-px relative self-stretch" data-name="Table cell">
          <div aria-hidden="true" className="absolute border-[#e6ebeb] border-b border-solid inset-0 pointer-events-none" />
          <div className="flex flex-row items-center max-h-[inherit] size-full">
            <div className="content-stretch flex gap-[12px] items-center max-h-[inherit] p-[16px] relative size-full">
              <TextAndSupportingText41 />
            </div>
          </div>
        </div>
        <div className="content-stretch flex items-center max-h-[48px] pl-[16px] pr-[12px] py-[16px] relative shrink-0 size-[48px]" data-name="Table cell">
          <div aria-hidden="true" className="absolute border-[#e6ebeb] border-b border-solid inset-0 pointer-events-none" />
          <button className="content-stretch cursor-pointer flex flex-col items-start relative shrink-0" data-name="Dropdown">
            <div className="overflow-clip relative shrink-0 size-[20px]" data-name="dots-vertical">
              <div className="absolute inset-[16.67%_45.83%]" data-name="Icon">
                <div className="absolute inset-[-6.25%_-50%]">
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 3.33333 15">
                    <g id="Icon">
                      <path d={svgPaths.p3ed2dd80} stroke="var(--stroke-0, #A4A7AE)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                      <path d={svgPaths.p3815c300} stroke="var(--stroke-0, #A4A7AE)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                      <path d={svgPaths.p39ad1980} stroke="var(--stroke-0, #A4A7AE)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                    </g>
                  </svg>
                </div>
              </div>
            </div>
          </button>
        </div>
      </div>
      <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="Content">
        <div className="flex-[1_0_0] max-h-[48px] min-h-px min-w-px relative self-stretch" data-name="Table cell">
          <div aria-hidden="true" className="absolute border-[#e6ebeb] border-b border-solid inset-0 pointer-events-none" />
          <div className="flex flex-row items-center max-h-[inherit] size-full">
            <div className="content-stretch flex gap-[12px] items-center max-h-[inherit] p-[16px] relative size-full">
              <div className="content-stretch flex items-start relative shrink-0" data-name="Table cell lead action">
                <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="💠 Checkbox">
                  <div className="relative rounded-[4px] shrink-0 size-[16px]" data-name=".checkbox-base">
                    <div aria-hidden="true" className="absolute border border-[#859090] border-solid inset-0 pointer-events-none rounded-[4px]" />
                  </div>
                </div>
              </div>
              <TextAndSupportingText42 />
            </div>
          </div>
        </div>
        <div className="flex-[1_0_0] max-h-[48px] min-h-px min-w-px relative self-stretch" data-name="Table cell">
          <div aria-hidden="true" className="absolute border-[#e6ebeb] border-b border-solid inset-0 pointer-events-none" />
          <div className="flex flex-row items-center max-h-[inherit] size-full">
            <div className="content-stretch flex gap-[12px] items-center max-h-[inherit] p-[16px] relative size-full">
              <IconAndText7 />
            </div>
          </div>
        </div>
        <div className="flex-[1_0_0] max-h-[48px] min-h-px min-w-px relative self-stretch" data-name="Table cell">
          <div aria-hidden="true" className="absolute border-[#e6ebeb] border-b border-solid inset-0 pointer-events-none" />
          <div className="flex flex-row items-center max-h-[inherit] size-full">
            <div className="content-stretch flex items-center max-h-[inherit] p-[16px] relative size-full">
              <div className="bg-[#dcfae6] content-stretch flex items-center px-[8px] py-[2px] relative rounded-[4px] shrink-0" data-name="💠 Chip">
                <p className="font-['Inter:Medium',sans-serif] font-medium leading-[18px] not-italic relative shrink-0 text-[#067647] text-[14px] text-center whitespace-nowrap">Paid</p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex-[1_0_0] max-h-[48px] min-h-px min-w-px relative self-stretch" data-name="Table cell">
          <div aria-hidden="true" className="absolute border-[#e6ebeb] border-b border-solid inset-0 pointer-events-none" />
          <div className="flex flex-row items-center max-h-[inherit] size-full">
            <div className="content-stretch flex gap-[12px] items-center max-h-[inherit] p-[16px] relative size-full">
              <TextAndSupportingText44 />
            </div>
          </div>
        </div>
        <div className="flex-[1_0_0] max-h-[48px] min-h-px min-w-px relative self-stretch" data-name="Table cell">
          <div aria-hidden="true" className="absolute border-[#e6ebeb] border-b border-solid inset-0 pointer-events-none" />
          <div className="flex flex-row items-center max-h-[inherit] size-full">
            <div className="content-stretch flex gap-[12px] items-center max-h-[inherit] p-[16px] relative size-full">
              <TextAndSupportingText45 />
            </div>
          </div>
        </div>
        <div className="flex-[1_0_0] max-h-[48px] min-h-px min-w-px relative self-stretch" data-name="Table cell">
          <div aria-hidden="true" className="absolute border-[#e6ebeb] border-b border-solid inset-0 pointer-events-none" />
          <div className="flex flex-row items-center max-h-[inherit] size-full">
            <div className="content-stretch flex gap-[12px] items-center max-h-[inherit] p-[16px] relative size-full">
              <TextAndSupportingText46 />
            </div>
          </div>
        </div>
        <div className="flex-[1_0_0] max-h-[48px] min-h-px min-w-px relative self-stretch" data-name="Table cell">
          <div aria-hidden="true" className="absolute border-[#e6ebeb] border-b border-solid inset-0 pointer-events-none" />
          <div className="flex flex-row items-center max-h-[inherit] size-full">
            <div className="content-stretch flex gap-[12px] items-center max-h-[inherit] p-[16px] relative size-full">
              <TextAndSupportingText47 />
            </div>
          </div>
        </div>
        <div className="content-stretch flex items-center max-h-[48px] pl-[16px] pr-[12px] py-[16px] relative shrink-0 size-[48px]" data-name="Table cell">
          <div aria-hidden="true" className="absolute border-[#e6ebeb] border-b border-solid inset-0 pointer-events-none" />
          <button className="content-stretch cursor-pointer flex flex-col items-start relative shrink-0" data-name="Dropdown">
            <div className="overflow-clip relative shrink-0 size-[20px]" data-name="dots-vertical">
              <div className="absolute inset-[16.67%_45.83%]" data-name="Icon">
                <div className="absolute inset-[-6.25%_-50%]">
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 3.33333 15">
                    <g id="Icon">
                      <path d={svgPaths.p3ed2dd80} stroke="var(--stroke-0, #A4A7AE)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                      <path d={svgPaths.p3815c300} stroke="var(--stroke-0, #A4A7AE)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                      <path d={svgPaths.p39ad1980} stroke="var(--stroke-0, #A4A7AE)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                    </g>
                  </svg>
                </div>
              </div>
            </div>
          </button>
        </div>
      </div>
      <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="Content">
        <div className="flex-[1_0_0] max-h-[48px] min-h-px min-w-px relative self-stretch" data-name="Table cell">
          <div aria-hidden="true" className="absolute border-[#e6ebeb] border-b border-solid inset-0 pointer-events-none" />
          <div className="flex flex-row items-center max-h-[inherit] size-full">
            <div className="content-stretch flex gap-[12px] items-center max-h-[inherit] p-[16px] relative size-full">
              <div className="content-stretch flex items-start relative shrink-0" data-name="Table cell lead action">
                <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="💠 Checkbox">
                  <div className="relative rounded-[4px] shrink-0 size-[16px]" data-name=".checkbox-base">
                    <div aria-hidden="true" className="absolute border border-[#859090] border-solid inset-0 pointer-events-none rounded-[4px]" />
                  </div>
                </div>
              </div>
              <TextAndSupportingText48 />
            </div>
          </div>
        </div>
        <div className="flex-[1_0_0] max-h-[48px] min-h-px min-w-px relative self-stretch" data-name="Table cell">
          <div aria-hidden="true" className="absolute border-[#e6ebeb] border-b border-solid inset-0 pointer-events-none" />
          <div className="flex flex-row items-center max-h-[inherit] size-full">
            <div className="content-stretch flex gap-[12px] items-center max-h-[inherit] p-[16px] relative size-full">
              <IconAndText8 />
            </div>
          </div>
        </div>
        <div className="flex-[1_0_0] max-h-[48px] min-h-px min-w-px relative self-stretch" data-name="Table cell">
          <div aria-hidden="true" className="absolute border-[#e6ebeb] border-b border-solid inset-0 pointer-events-none" />
          <div className="flex flex-row items-center max-h-[inherit] size-full">
            <div className="content-stretch flex items-center max-h-[inherit] p-[16px] relative size-full">
              <div className="bg-[#fee4e2] content-stretch flex items-center px-[8px] py-[2px] relative rounded-[4px] shrink-0" data-name="💠 Chip">
                <p className="font-['Inter:Medium',sans-serif] font-medium leading-[18px] not-italic relative shrink-0 text-[#b42318] text-[14px] text-center whitespace-nowrap">Failed</p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex-[1_0_0] max-h-[48px] min-h-px min-w-px relative self-stretch" data-name="Table cell">
          <div aria-hidden="true" className="absolute border-[#e6ebeb] border-b border-solid inset-0 pointer-events-none" />
          <div className="flex flex-row items-center max-h-[inherit] size-full">
            <div className="content-stretch flex gap-[12px] items-center max-h-[inherit] p-[16px] relative size-full">
              <TextAndSupportingText50 />
            </div>
          </div>
        </div>
        <div className="flex-[1_0_0] max-h-[48px] min-h-px min-w-px relative self-stretch" data-name="Table cell">
          <div aria-hidden="true" className="absolute border-[#e6ebeb] border-b border-solid inset-0 pointer-events-none" />
          <div className="flex flex-row items-center max-h-[inherit] size-full">
            <div className="content-stretch flex gap-[12px] items-center max-h-[inherit] p-[16px] relative size-full">
              <TextAndSupportingText51 />
            </div>
          </div>
        </div>
        <div className="flex-[1_0_0] max-h-[48px] min-h-px min-w-px relative self-stretch" data-name="Table cell">
          <div aria-hidden="true" className="absolute border-[#e6ebeb] border-b border-solid inset-0 pointer-events-none" />
          <div className="flex flex-row items-center max-h-[inherit] size-full">
            <div className="content-stretch flex gap-[12px] items-center max-h-[inherit] p-[16px] relative size-full">
              <TextAndSupportingText52 />
            </div>
          </div>
        </div>
        <div className="flex-[1_0_0] max-h-[48px] min-h-px min-w-px relative self-stretch" data-name="Table cell">
          <div aria-hidden="true" className="absolute border-[#e6ebeb] border-b border-solid inset-0 pointer-events-none" />
          <div className="flex flex-row items-center max-h-[inherit] size-full">
            <div className="content-stretch flex gap-[12px] items-center max-h-[inherit] p-[16px] relative size-full">
              <TextAndSupportingText53 />
            </div>
          </div>
        </div>
        <div className="content-stretch flex items-center max-h-[48px] pl-[16px] pr-[12px] py-[16px] relative shrink-0 size-[48px]" data-name="Table cell">
          <div aria-hidden="true" className="absolute border-[#e6ebeb] border-b border-solid inset-0 pointer-events-none" />
          <button className="content-stretch cursor-pointer flex flex-col items-start relative shrink-0" data-name="Dropdown">
            <div className="overflow-clip relative shrink-0 size-[20px]" data-name="dots-vertical">
              <div className="absolute inset-[16.67%_45.83%]" data-name="Icon">
                <div className="absolute inset-[-6.25%_-50%]">
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 3.33333 15">
                    <g id="Icon">
                      <path d={svgPaths.p3ed2dd80} stroke="var(--stroke-0, #A4A7AE)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                      <path d={svgPaths.p3815c300} stroke="var(--stroke-0, #A4A7AE)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                      <path d={svgPaths.p39ad1980} stroke="var(--stroke-0, #A4A7AE)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                    </g>
                  </svg>
                </div>
              </div>
            </div>
          </button>
        </div>
      </div>
      <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="Content">
        <div className="flex-[1_0_0] max-h-[48px] min-h-px min-w-px relative self-stretch" data-name="Table cell">
          <div aria-hidden="true" className="absolute border-[#e6ebeb] border-b border-solid inset-0 pointer-events-none" />
          <div className="flex flex-row items-center max-h-[inherit] size-full">
            <div className="content-stretch flex gap-[12px] items-center max-h-[inherit] p-[16px] relative size-full">
              <div className="content-stretch flex items-start relative shrink-0" data-name="Table cell lead action">
                <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="💠 Checkbox">
                  <div className="relative rounded-[4px] shrink-0 size-[16px]" data-name=".checkbox-base">
                    <div aria-hidden="true" className="absolute border border-[#859090] border-solid inset-0 pointer-events-none rounded-[4px]" />
                  </div>
                </div>
              </div>
              <TextAndSupportingText54 />
            </div>
          </div>
        </div>
        <div className="flex-[1_0_0] max-h-[48px] min-h-px min-w-px relative self-stretch" data-name="Table cell">
          <div aria-hidden="true" className="absolute border-[#e6ebeb] border-b border-solid inset-0 pointer-events-none" />
          <div className="flex flex-row items-center max-h-[inherit] size-full">
            <div className="content-stretch flex gap-[12px] items-center max-h-[inherit] p-[16px] relative size-full">
              <IconAndText9 />
            </div>
          </div>
        </div>
        <div className="flex-[1_0_0] max-h-[48px] min-h-px min-w-px relative self-stretch" data-name="Table cell">
          <div aria-hidden="true" className="absolute border-[#e6ebeb] border-b border-solid inset-0 pointer-events-none" />
          <div className="flex flex-row items-center max-h-[inherit] size-full">
            <div className="content-stretch flex items-center max-h-[inherit] p-[16px] relative size-full">
              <div className="bg-[#e6ebeb] content-stretch flex items-center px-[8px] py-[2px] relative rounded-[4px] shrink-0" data-name="💠 Chip">
                <p className="font-['Inter:Medium',sans-serif] font-medium leading-[18px] not-italic relative shrink-0 text-[#525d5d] text-[14px] text-center whitespace-nowrap">Refunded</p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex-[1_0_0] max-h-[48px] min-h-px min-w-px relative self-stretch" data-name="Table cell">
          <div aria-hidden="true" className="absolute border-[#e6ebeb] border-b border-solid inset-0 pointer-events-none" />
          <div className="flex flex-row items-center max-h-[inherit] size-full">
            <div className="content-stretch flex gap-[12px] items-center max-h-[inherit] p-[16px] relative size-full">
              <TextAndSupportingText56 />
            </div>
          </div>
        </div>
        <div className="flex-[1_0_0] max-h-[48px] min-h-px min-w-px relative self-stretch" data-name="Table cell">
          <div aria-hidden="true" className="absolute border-[#e6ebeb] border-b border-solid inset-0 pointer-events-none" />
          <div className="flex flex-row items-center max-h-[inherit] size-full">
            <div className="content-stretch flex gap-[12px] items-center max-h-[inherit] p-[16px] relative size-full">
              <TextAndSupportingText57 />
            </div>
          </div>
        </div>
        <div className="flex-[1_0_0] max-h-[48px] min-h-px min-w-px relative self-stretch" data-name="Table cell">
          <div aria-hidden="true" className="absolute border-[#e6ebeb] border-b border-solid inset-0 pointer-events-none" />
          <div className="flex flex-row items-center max-h-[inherit] size-full">
            <div className="content-stretch flex gap-[12px] items-center max-h-[inherit] p-[16px] relative size-full">
              <TextAndSupportingText58 />
            </div>
          </div>
        </div>
        <div className="flex-[1_0_0] max-h-[48px] min-h-px min-w-px relative self-stretch" data-name="Table cell">
          <div aria-hidden="true" className="absolute border-[#e6ebeb] border-b border-solid inset-0 pointer-events-none" />
          <div className="flex flex-row items-center max-h-[inherit] size-full">
            <div className="content-stretch flex gap-[12px] items-center max-h-[inherit] p-[16px] relative size-full">
              <TextAndSupportingText59 />
            </div>
          </div>
        </div>
        <div className="content-stretch flex items-center max-h-[48px] pl-[16px] pr-[12px] py-[16px] relative shrink-0 size-[48px]" data-name="Table cell">
          <div aria-hidden="true" className="absolute border-[#e6ebeb] border-b border-solid inset-0 pointer-events-none" />
          <button className="content-stretch cursor-pointer flex flex-col items-start relative shrink-0" data-name="Dropdown">
            <div className="overflow-clip relative shrink-0 size-[20px]" data-name="dots-vertical">
              <div className="absolute inset-[16.67%_45.83%]" data-name="Icon">
                <div className="absolute inset-[-6.25%_-50%]">
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 3.33333 15">
                    <g id="Icon">
                      <path d={svgPaths.p3ed2dd80} stroke="var(--stroke-0, #A4A7AE)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                      <path d={svgPaths.p3815c300} stroke="var(--stroke-0, #A4A7AE)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                      <path d={svgPaths.p39ad1980} stroke="var(--stroke-0, #A4A7AE)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                    </g>
                  </svg>
                </div>
              </div>
            </div>
          </button>
        </div>
      </div>
      <div className="content-stretch flex h-[48px] items-center justify-between px-[16px] py-[12px] relative shrink-0 w-[1092px]" data-name="Content">
        <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-full justify-center leading-[0] not-italic relative shrink-0 text-[#525d5d] text-[14px] w-[200px]">
          <p className="leading-[18px]">Page 1 of 16</p>
        </div>
        <Pagination />
        <OfRows />
      </div>
    </div>
  );
}

function Frame7() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start max-w-[1280px] relative shrink-0 w-full">
      <Frame13 />
      <Frame6 />
      <Frame10 />
    </div>
  );
}

function ContentWrapperTransactions() {
  return (
    <div className="max-w-[1440px] relative shrink-0 w-full" data-name="content wrapper transactions">
      <div className="flex flex-col items-center max-w-[inherit] size-full">
        <div className="content-stretch flex flex-col items-center max-w-[inherit] px-[32px] py-[24px] relative w-full">
          <Frame7 />
        </div>
      </div>
    </div>
  );
}

function Page() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-center min-h-px min-w-px relative rounded-[6px] w-full" data-name="Page" style={{ backgroundImage: "linear-gradient(113.914deg, rgb(246, 250, 250) 1.0316%, rgb(255, 255, 255) 86.138%)" }}>
      <div aria-hidden="true" className="absolute border border-[#e6ebeb] border-solid inset-0 pointer-events-none rounded-[6px] shadow-[-10px_0px_24px_0px_rgba(0,0,0,0.1)]" />
      <div className="shrink-0 sticky top-0 w-full" data-name="Page toolbar">
        <div aria-hidden="true" className="absolute border-[#e6ebeb] border-b border-solid inset-0 pointer-events-none" />
        <div className="flex flex-col items-end justify-center size-full">
          <div className="content-stretch flex flex-col items-end justify-center px-[16px] py-[8px] relative w-full">
            <Frame />
          </div>
        </div>
      </div>
      <ContentWrapperTransactions />
    </div>
  );
}

function Right() {
  return (
    <div className="flex-[1_0_0] h-full min-h-px min-w-px sticky top-0" data-name="Right">
      <div className="flex flex-col justify-center size-full">
        <div className="content-stretch flex flex-col items-start justify-center pr-[12px] py-[12px] relative size-full">
          <Page />
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <div className="bg-white content-stretch flex items-start relative size-full" data-name="Home">
      <div className="absolute left-[-260px] size-[1192px] top-[-476px]">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1192 1192">
          <g id="Ellipse 874">
            <circle cx="596" cy="596" fill="url(#paint0_radial_1_985)" fillOpacity="0.5" r="596" style={{ mixBlendMode: "soft-light" }} />
          </g>
          <defs>
            <radialGradient cx="0" cy="0" gradientTransform="translate(596 596) rotate(90) scale(596)" gradientUnits="userSpaceOnUse" id="paint0_radial_1_985" r="1">
              <stop stopColor="white" />
              <stop offset="1" stopColor="white" stopOpacity="0" />
            </radialGradient>
          </defs>
        </svg>
      </div>
      <div className="absolute h-[1024px] inset-0 pointer-events-none">
        <div className="bg-[#2c6764] pointer-events-auto sticky top-0" />
      </div>
      <div className="h-full overflow-clip shrink-0 sticky top-0 w-[272px]" data-name="Main menu">
        <div className="absolute bottom-0 content-stretch flex flex-col items-start left-[52px] py-[12px] top-0 w-[220px]" data-name="Side nav">
          <div aria-hidden="true" className="absolute border-[rgba(255,255,255,0.08)] border-l border-solid inset-0 pointer-events-none" />
          <Frame2 />
          <Top />
        </div>
        <div className="absolute bottom-0 content-stretch flex flex-col items-center justify-center left-0 py-[12px] top-0 w-[52px]" data-name="Side nav">
          <Frame3 />
          <Frame5 />
        </div>
      </div>
      <Right />
    </div>
  );
}