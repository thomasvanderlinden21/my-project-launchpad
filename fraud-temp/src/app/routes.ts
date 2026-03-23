import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { HomePage } from "./components/HomePage";
import { TransactionsPage } from "./components/TransactionsPage";
import { TerminalsPage } from "./components/TerminalsPage";
import { PlaceholderPage } from "./components/PlaceholderPage";
import { SettingsPage } from "./components/SettingsPage";
import { FraudPage } from "./components/FraudPage";

function OrdersPage() {
  return PlaceholderPage({ title: "Orders" });
}
function InvoicesPage() {
  return PlaceholderPage({ title: "Invoices" });
}
function ReportsPage() {
  return PlaceholderPage({ title: "Reports" });
}
function DisputesPage() {
  return PlaceholderPage({ title: "Disputes" });
}
function PaymentsPage() {
  return PlaceholderPage({ title: "Payments" });
}
function ProductsPage() {
  return PlaceholderPage({ title: "Product catalogue" });
}
function BusinessPage() {
  return PlaceholderPage({ title: "My business" });
}
function CardIssuingPage() {
  return PlaceholderPage({ title: "Card Issuing" });
}
function CashAdvancePage() {
  return PlaceholderPage({ title: "Cash advance" });
}
function NotFoundPage() {
  return PlaceholderPage({ title: "Not Found" });
}

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: HomePage },
      {
        path: "sales/transactions",
        Component: TransactionsPage,
      },
      { path: "sales/orders", Component: OrdersPage },
      { path: "sales/invoices", Component: InvoicesPage },
      { path: "sales/reports", Component: ReportsPage },
      { path: "sales/disputes", Component: DisputesPage },
      { path: "terminals", Component: TerminalsPage },
      { path: "payments", Component: PaymentsPage },
      { path: "products", Component: ProductsPage },
      { path: "business", Component: BusinessPage },
      { path: "card-issuing", Component: CardIssuingPage },
      { path: "cash-advance", Component: CashAdvancePage },
      { path: "settings", Component: SettingsPage },
      { path: "settings/fraud", Component: FraudPage },
      { path: "*", Component: NotFoundPage },
    ],
  },
]);