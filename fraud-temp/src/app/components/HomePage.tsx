import { TopBar } from "./TopBar";

export function HomePage() {
  return (
    <div className="w-full">
      <TopBar title="Home" />
      <div className="max-w-[1440px] w-full px-[32px] py-[24px]">
        <div className="flex flex-col gap-[8px] items-start max-w-[1280px]">
          <p className="font-['Raleway',sans-serif] font-semibold text-[24px] leading-[32px] text-[#121621]">
            Welcome back, Olivia
          </p>
          <p className="font-['Inter',sans-serif] font-normal text-[16px] leading-[22px] text-[#525d5d]">
            Track, manage and forecast your customers and orders.
          </p>
        </div>
      </div>
    </div>
  );
}
