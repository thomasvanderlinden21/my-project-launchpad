import { createContext, useContext, useState, useCallback, useRef, ReactNode } from "react";

export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

interface AIAssistantContextType {
  isOpen: boolean;
  openPanel: () => void;
  closePanel: () => void;
  togglePanel: () => void;
  messages: Message[];
  isTyping: boolean;
  conversationVersion: number;
  sendMessage: (content: string, currentPath: string) => void;
  startNewConversation: () => void;
}

const AIAssistantContext = createContext<AIAssistantContextType | null>(null);

// ─────────────────────────────────────────────────────────────
// Mock AI response generator
// ─────────────────────────────────────────────────────────────
function generateResponse(message: string, path: string): string {
  const m = message.toLowerCase();

  // Navigation requests
  if (/take me to|go to|navigate to|open|show me the/.test(m)) {
    if (/terminal/.test(m))
      return `Of course! You can manage all your devices from the **Terminals** page.\n\n[Go to Terminals →](/terminals)`;
    if (/transaction/.test(m))
      return `Sure! Head over to **Transactions** to see all payment activity.\n\n[Go to Transactions →](/sales/transactions)`;
    if (/home|dashboard/.test(m))
      return `Let's head back to the **Home** dashboard.\n\n[Go to Home →](/)`;
    if (/product|catalogue/.test(m))
      return `You can find your product catalogue here:\n\n[Go to Product Catalogue →](/products)`;
    if (/report/.test(m))
      return `Sales reports are available here:\n\n[Go to Reports →](/sales/reports)`;
  }

  // Overview / today's activity
  if (/overview|today.{0,20}activit|what.{0,10}happening/.test(m)) {
    if (path.includes("/sales/transactions"))
      return `Here's today's **transaction summary** for Cycle shop #2:\n\n- **Total transactions:** 142\n- **Successful:** 138 (97.2%)\n- **Failed:** 4 (2.8%)\n- **Total volume:** €4,280.50\n- **Average transaction value:** €30.14\n\nYou're up **12%** in volume vs. yesterday. Peak hour was 2–3 PM with 28 transactions.\n\nWould you like me to break this down by payment method?`;
    return `Here's your **overview for today** (18 March 2026):\n\n- **Sales volume:** €4,280.50 (+12% vs yesterday)\n- **Transactions:** 142 processed, 4 failed\n- **Active terminals:** 8 of 10 online\n- **Top product:** Mountain Bike Service — 14 sales\n\nCheck your [Transactions →](/sales/transactions) or [Terminals →](/terminals) for more detail.`;
  }

  // Sales volume
  if (/sales volume|revenue|earnings|how much/.test(m)) {
    return `Your **current sales volume** for today is **€4,280.50**.\n\n- This is **+12%** compared to yesterday (€3,821.80)\n- This week so far: **€22,450.00**\n- This month to date: **€89,200.00**\n\nHead to [Reports →](/sales/reports) to export a full breakdown by period.`;
  }

  // Failed / declined transactions
  if (/fail|declin|error|problem|issue/.test(m)) {
    return `There are **4 failed transactions** today:\n\n- 2× **Insufficient funds** — €45.00 and €120.00\n- 1× **Card declined** — €78.50\n- 1× **Timeout** — €32.00\n\nThis is a **2.8% failure rate**, which is within the normal range (typically < 3%).\n\nWould you like me to show the full list? [View failed transactions →](/sales/transactions)`;
  }

  // Transaction count
  if (/how many transaction|transaction count|number of transaction/.test(m)) {
    return `You've had **142 transactions** today so far.\n\n- **138 successful** (97.2%)\n- **4 failed** (2.8%)\n\nThis puts you on track for a strong day — you typically average around **130 transactions** on Wednesdays.\n\nYou can filter and export these from the [Transactions page →](/sales/transactions).`;
  }

  // Terminal status
  if (/terminal.{0,20}status|which terminal|offline|online/.test(m)) {
    return `Here's the current **terminal status** for Cycle shop #2:\n\n- **8 terminals online** and processing normally\n- **2 terminals offline**:\n  - Terminal T-009 (Entrance desk) — last seen 2 hours ago\n  - Terminal T-012 (Workshop) — connection error\n\nI'd recommend checking the physical connection on those two. [View all terminals →](/terminals)`;
  }

  // How to add product in bulk
  if (/bulk|csv|import product/.test(m)) {
    return `To add products in bulk, click the **"Add product bulk"** button at the top of the Product Catalogue page. You'll be prompted to upload a CSV file.\n\nYour CSV should include these columns:\n\n- **SKU** — unique product identifier\n- **Name** — product display name\n- **Price** — in EUR (e.g. 29.99)\n- **Category** — product category\n- **Stock** — available quantity\n- **VAT rate** — applicable VAT %\n\nWould you like me to show you a sample CSV template?`;
  }

  // Top selling products
  if (/top.{0,10}sell|best.{0,10}sell|popular product/.test(m)) {
    return `Your **top-selling products** this month:\n\n1. **Mountain Bike Service** — 214 sales — €12,840\n2. **Bike Lock Premium** — 189 sales — €5,670\n3. **Helmet Pro Series** — 156 sales — €9,360\n4. **Cycling Gloves** — 143 sales — €2,145\n5. **Water Bottle XL** — 98 sales — €980\n\n[View full product catalogue →](/products)`;
  }

  // Refunds
  if (/refund/.test(m)) {
    return `Today's **refunds** for Cycle shop #2:\n\n- **3 refunds processed** — total €145.50\n  - €78.00 — Bike Lock Premium (defective item)\n  - €45.50 — Cycling Shorts (wrong size)\n  - €22.00 — Water Bottle XL (duplicate charge)\n\nAll refunds are in the **completed** state and should reflect on your customers' statements within 3–5 business days.\n\n[View all refunds →](/sales/transactions)`;
  }

  // Export
  if (/export|download|csv/.test(m)) {
    return `You can export your transaction data by going to the **Transactions** page and clicking the **Export** button in the top-right corner.\n\nAvailable formats:\n- **CSV** — best for spreadsheet analysis\n- **PDF** — best for sharing or printing\n- **XLSX** — for Excel users\n\nYou can also apply date filters before exporting to get a specific range.\n\n[Go to Transactions →](/sales/transactions)`;
  }

  // What am I looking at / current page
  if (/what.{0,15}(looking at|am i|page|here)|current page|where am i/.test(m)) {
    if (path === "/") return `You're on the **Home dashboard** for Cycle shop #2. This gives you a high-level overview of today's sales performance, recent transactions, active terminals, and key metrics. It's your go-to starting point each day.`;
    if (path.includes("/sales/transactions")) return `You're on the **Transactions** page. This shows all payment activity for your shop, with filtering by date, status, payment method, and more. You can search individual transactions, view details, issue refunds, and export data.`;
    if (path.includes("/terminals")) return `You're on the **Terminals** page. This shows all payment terminals registered to Cycle shop #2 — their online/offline status, last activity, model, and configuration options.`;
    if (path.includes("/products")) return `You're on the **Product Catalogue** page. This lists all products configured for Cycle shop #2. You can search, filter, add individual products, or bulk-import via CSV.`;
    return `You're currently navigating the **Worldline merchant portal** for Cycle shop #2. Use the left sidebar to jump between sections — Sales, Terminals, Payments, Products, and more.`;
  }

  // Suggestions/help
  if (/how do i|help me|how to|how can/.test(m)) {
    return `I'm here to help! Here are some things I can assist with:\n\n- **Transaction analysis** — summaries, failed payments, refunds\n- **Terminal management** — checking status, troubleshooting\n- **Product catalogue** — adding, editing, bulk importing\n- **Reports & exports** — generating and downloading reports\n- **Navigation** — getting you to any page quickly\n\nWhat would you like to know more about?`;
  }

  // Thanks
  if (/thank|thanks|great|perfect|awesome/.test(m)) {
    return `You're welcome! Is there anything else I can help you with?`;
  }

  // CSV template
  if (/sample|template|example/.test(m)) {
    return `Here's a sample CSV structure for bulk product import:\n\n\`\`\`\nSKU,Name,Price,Category,Stock,VAT\nBIK-001,Mountain Bike Service,59.99,Services,999,20\nLOCK-002,Bike Lock Premium,29.99,Accessories,50,20\nHEL-003,Helmet Pro Series,59.99,Safety,30,20\n\`\`\`\n\nMake sure your file is **UTF-8 encoded** and uses a comma delimiter. Maximum 500 rows per import.\n\nWould you like to proceed to the Product Catalogue? [Go to Products →](/products)`;
  }

  // Default / fallback responses
  const fallbacks = [
    `I'm here to help with **Cycle shop #2** operations. I can assist with:\n\n- Transaction data and summaries\n- Terminal status and management\n- Product catalogue questions\n- Navigation and feature guidance\n\nCould you be a bit more specific about what you need?`,
    `That's a great question! Based on your current context, I'd suggest checking the relevant data in your portal. Can you tell me more about what you're looking for? I can pull specific numbers or navigate you directly to the right section.`,
    `I understand you're asking about "${message.slice(0, 40)}${message.length > 40 ? "..." : ""}". Let me help — could you give me a bit more detail? For example, are you looking for data from a specific time period or a particular transaction type?`,
  ];
  return fallbacks[Math.floor(Math.random() * fallbacks.length)];
}

// ─────────────────────────────────────────────────────────────
// Page-specific suggestion chips
// ─────────────────────────────────────────────────────────────
export function getPageSuggestions(path: string): string[] {
  if (path === "/") return [
    "Give me an overview of today's activity",
    "What's my current sales volume?",
    "Navigate to terminals",
  ];
  if (path.includes("/sales/transactions")) return [
    "Show today's transaction summary",
    "Are there any failed transactions?",
    "How many transactions did I have today?",
  ];
  if (path.includes("/terminals")) return [
    "What's the current terminal status?",
    "Which terminals are offline?",
    "Take me to transactions",
  ];
  if (path.includes("/products")) return [
    "Show me my top-selling products",
    "How do I add a product in bulk?",
    "Filter products by category",
  ];
  if (path.includes("/sales/reports")) return [
    "Show me this month's revenue",
    "Export transactions to CSV",
    "What am I looking at?",
  ];
  if (path.includes("/sales")) return [
    "Show today's transaction summary",
    "Are there any failed transactions?",
    "Export transactions to CSV",
  ];
  return [
    "Give me an overview of today's activity",
    "What am I looking at?",
    "How do I get help?",
  ];
}

// ─────────────────────────────────────────────────────────────
// Provider
// ─────────────────────────────────────────────────────────────
export function AIAssistantProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [conversationVersion, setConversationVersion] = useState(0);
  const typingTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const openPanel = useCallback(() => setIsOpen(true), []);
  const closePanel = useCallback(() => setIsOpen(false), []);
  const togglePanel = useCallback(() => setIsOpen((prev) => !prev), []);

  const sendMessage = useCallback((content: string, currentPath: string) => {
    const userMsg: Message = {
      id: `u-${Date.now()}`,
      role: "user",
      content,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    const delay = 1000 + Math.random() * 800;
    typingTimerRef.current = setTimeout(() => {
      const response = generateResponse(content, currentPath);
      const assistantMsg: Message = {
        id: `a-${Date.now()}`,
        role: "assistant",
        content: response,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMsg]);
      setIsTyping(false);
    }, delay);
  }, []);

  const startNewConversation = useCallback(() => {
    if (typingTimerRef.current) clearTimeout(typingTimerRef.current);
    setMessages([]);
    setIsTyping(false);
    setConversationVersion((v) => v + 1);
  }, []);

  return (
    <AIAssistantContext.Provider
      value={{
        isOpen,
        openPanel,
        closePanel,
        togglePanel,
        messages,
        isTyping,
        conversationVersion,
        sendMessage,
        startNewConversation,
      }}
    >
      {children}
    </AIAssistantContext.Provider>
  );
}

export function useAIAssistant() {
  const ctx = useContext(AIAssistantContext);
  if (!ctx) throw new Error("useAIAssistant must be used within AIAssistantProvider");
  return ctx;
}
