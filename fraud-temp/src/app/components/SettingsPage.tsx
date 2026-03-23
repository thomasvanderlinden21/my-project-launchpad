import svgPaths from "../../imports/svg-bzu1j6hxn7";
import { TopBar } from "./TopBar";
import { useNavigate } from "react-router";

// ─── Icon wrapper ────────────────────────────────────────────────────────────

function SettingIcon({ pathKey }: { pathKey: string }) {
  const d = (svgPaths as Record<string, string>)[pathKey];
  if (!d) return null;
  return (
    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
      <path d={d} fill="#277777" />
    </svg>
  );
}

function IconBadge({ pathKey }: { pathKey: string }) {
  return (
    <div className="bg-[#e6f0ef] flex items-center p-[4px] rounded-[4px] shrink-0">
      <div className="relative shrink-0 size-[24px]">
        <SettingIcon pathKey={pathKey} />
      </div>
    </div>
  );
}

// ─── Card ────────────────────────────────────────────────────────────────────

interface CardData {
  iconKey: string;
  title: string;
  description: string;
}

function SettingCard({ card }: { card: CardData }) {
  const navigate = useNavigate();

  const routes: Record<string, string> = {
    "Fraud": "/settings/fraud",
  };

  const to = routes[card.title];

  return (
    <div
      className={`bg-white relative rounded-[4px] transition-shadow ${to ? "cursor-pointer hover:shadow-md" : "cursor-default"}`}
      onClick={to ? () => navigate(to) : undefined}
    >
      <div className="flex flex-col justify-end overflow-clip rounded-[inherit] size-full">
        <div className="flex flex-col gap-[12px] items-start p-[16px] w-full">
          <IconBadge pathKey={card.iconKey} />
          <div className="flex flex-col gap-[6px] items-start w-full">
            <p className="font-['Inter',sans-serif] font-medium leading-[22px] text-[#121621] text-[16px] whitespace-nowrap">
              {card.title}
            </p>
            <p className="font-['Inter',sans-serif] font-normal leading-[18px] text-[#525d5d] text-[14px]">
              {card.description}
            </p>
          </div>
        </div>
      </div>
      <div
        aria-hidden="true"
        className="absolute border border-[#e6ebeb] border-solid inset-[-1px] pointer-events-none rounded-[5px]"
      />
    </div>
  );
}

// ─── Data ────────────────────────────────────────────────────────────────────

const companyCards: CardData[] = [
  {
    iconKey: "p25e8a200",
    title: "Users",
    description: "Manage team members, roles and access to your organisations.",
  },
  {
    iconKey: "pb8677c0",
    title: "Company details",
    description: "Update your company information, legal entity, and contract details.",
  },
  {
    iconKey: "p58a5100",
    title: "E-commerce",
    description: "Configure online store settings, integrations and payment options.",
  },
  {
    iconKey: "p334bcf00",
    title: "Terminals",
    description: "Manage payment terminals, devices, and in-store settings.",
  },
  {
    iconKey: "p28a50a80",
    title: "Bank accounts",
    description: "Add and manage bank accounts used for payouts and settlements.",
  },
  {
    iconKey: "p3fa47080",
    title: "Fraud",
    description: "Monitor fraud activity and configure protection rules.",
  },
  {
    iconKey: "p200f000",
    title: "Your branding",
    description: "Customise your invoices, payment pages and billing.",
  },
  {
    iconKey: "p3e562100",
    title: "Contracts",
    description: "View and manage agreements, documents and legal terms.",
  },
];

const personalCards: CardData[] = [
  {
    iconKey: "p1ac14c00",
    title: "Personal details",
    description: "Update your contact information, password and authentication.",
  },
  {
    iconKey: "p114dd2f0",
    title: "Preferences",
    description: "Set language, notifications and personal dashboard preferences.",
  },
];

// ─── Page ────────────────────────────────────────────────────────────────────

export function SettingsPage() {
  return (
    <div className="w-full">
      <TopBar title="User overview" />

      <div className="w-full px-[32px] py-[24px] flex flex-col gap-[32px] items-center">
        {/* Company settings */}
        <div className="flex flex-col gap-[16px] items-center w-full max-w-[1280px]">
          <p className="font-['Inter',sans-serif] font-medium leading-[18px] text-[#525d5d] text-[14px] w-full">
            Company settings
          </p>
          <div className="grid grid-cols-4 gap-[16px] w-full">
            {companyCards.map((card) => (
              <SettingCard key={card.title} card={card} />
            ))}
          </div>
        </div>

        {/* Personal settings */}
        <div className="flex flex-col gap-[16px] items-center w-full max-w-[1280px]">
          <p className="font-['Inter',sans-serif] font-medium leading-[18px] text-[#525d5d] text-[14px] w-full">
            Personal settings
          </p>
          <div className="grid grid-cols-4 gap-[16px] w-full">
            {personalCards.map((card) => (
              <SettingCard key={card.title} card={card} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}