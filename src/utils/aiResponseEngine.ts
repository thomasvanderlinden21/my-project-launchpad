import type { PageContext } from '../context/AIAssistantContext'
import {
  getTransactionStats,
  getTerminalStats,
  getSalesStats,
  getDisputeStats,
  getInvoiceStats,
  getOrderStats,
  mockUser,
  mockMerchant,
  mockTransactions,
  mockTerminals,
} from '../data/mockData'

// Pattern matchers for different categories
const patterns = {
  navigation: /(?:where|how do i get|take me|navigate|go to|show me the|find)/i,
  dataOverview: /(?:overview|summary|how many|what\'s my|show me today|give me a)/i,
  specificLookup: /(?:failed|offline|top|unpaid|open|pending)/i,
  howTo: /(?:how do i|how can i|what\'s the process|help me|explain)/i,
  analysis: /(?:compare|trend|analyze|breakdown|growth|month over month)/i,
  action: /(?:export|download|filter|create|add|generate)/i,
  meta: /(?:what can you|help|who are you|capabilities)/i,
  greeting: /^(?:hi|hello|hey|thanks|thank you|good morning|good afternoon)/i,
}

export function generateResponse(
  userInput: string,
  context: PageContext,
  lastTopic: string | null
): string {
  const input = userInput.toLowerCase().trim()

  // Greeting
  if (patterns.greeting.test(input)) {
    return generateGreeting(context)
  }

  // Meta / capabilities
  if (patterns.meta.test(input)) {
    return generateMetaResponse()
  }

  // Navigation
  if (patterns.navigation.test(input)) {
    return generateNavigationResponse(input, context)
  }

  // How-to / help
  if (patterns.howTo.test(input)) {
    return generateHowToResponse(input, context)
  }

  // Analysis
  if (patterns.analysis.test(input)) {
    return generateAnalysisResponse(input, context)
  }

  // Action requests
  if (patterns.action.test(input)) {
    return generateActionResponse(input, context)
  }

  // Specific data lookups
  if (patterns.specificLookup.test(input)) {
    return generateSpecificLookupResponse(input, context)
  }

  // Data overview / summary
  if (patterns.dataOverview.test(input)) {
    return generateOverviewResponse(input, context)
  }

  // Follow-ups
  if (lastTopic && (input.includes('more') || input.includes('details') || input.includes('which'))) {
    return generateFollowUpResponse(input, lastTopic, context)
  }

  // Fallback
  return generateFallbackResponse()
}

function generateGreeting(context: PageContext): string {
  const suggestions = getPageSuggestions(context.page)
  return `Hi ${mockUser.firstName}! 👋 I\'m here to help. ${suggestions[0]?.toLowerCase() || 'What can I help you with?'}`
}

function generateMetaResponse(): string {
  return `I\'m your AI assistant for the ${mockMerchant.name} portal. Here\'s what I can help with:

• **Navigate** to any page or feature
• **Summarize** your transactions, sales, or terminal data
• **Answer** how-to questions about portal features
• **Look up** specific data points
• **Analyze** trends and patterns

Try asking me something like "Show me today\'s sales" or "How do I add a terminal?"`
}

function generateNavigationResponse(input: string, context: PageContext): string {
  // Map common terms to routes
  const routes: Record<string, { route: string; name: string }> = {
    transaction: { route: '/', name: 'Transactions' },
    sale: { route: '/', name: 'Sales/Transactions' },
    terminal: { route: '/', name: 'Terminals' },
    invoice: { route: '/', name: 'Invoices' },
    order: { route: '/', name: 'Orders' },
    dispute: { route: '/', name: 'Disputes' },
    report: { route: '/', name: 'Reports' },
    setting: { route: '/', name: 'Settings' },
    home: { route: '/', name: 'Home' },
  }

  for (const [key, value] of Object.entries(routes)) {
    if (input.includes(key)) {
      return `You can find ${value.name} in the sidebar navigation. [Go to ${value.name} →](${value.route})\n\nOnce there, you\'ll see all your ${key}s with options to filter, search, and manage them.`
    }
  }

  return `You can navigate using the sidebar on the left. The main sections are:

• **Home** - Overview and status updates
• **Sales** - Transactions, orders, invoices
• **Terminals** - Manage your payment terminals
• **Reports** - Analytics and exports
• **Settings** - Account and preferences

Which section would you like to visit?`
}

function generateHowToResponse(input: string, context: PageContext): string {
  if (input.includes('terminal') && input.includes('add')) {
    return `To add a new terminal:

1. Go to **Terminals** from the sidebar
2. Click the **"Order terminal"** button (top right)
3. Select your terminal model
4. Fill in the delivery details
5. Confirm your order

[Go to Terminals →](/)

The new terminal will appear in your list once it\'s shipped.`
  }

  if (input.includes('export')) {
    return `To export data:

1. Navigate to the page with the data you want (Transactions, Terminals, etc.)
2. Apply any filters you need
3. Click the **"Export"** button (top right)
4. Your data will download as a CSV file

You can then open it in Excel or Google Sheets.`
  }

  if (input.includes('filter')) {
    return `To filter your data:

1. Click the **"Filters"** button next to the search bar
2. Set your criteria (date range, status, amount, etc.)
3. Click **"Apply filters"**

The table will update to show only matching items. You can clear filters anytime by clicking "Reset" in the filters panel.`
  }

  return `I can help you with most portal features! Here are common tasks:

• **Adding terminals** - Order from Terminals page
• **Exporting data** - Use Export button on any data page
• **Filtering** - Use Filters panel on list pages
• **Refunds** - Click on a transaction, then "Refund"

What specifically would you like to know how to do?`
}

function generateAnalysisResponse(input: string, context: PageContext): string {
  const sales = getSalesStats()

  if (input.includes('month')) {
    return `**Monthly Sales Comparison**

**This month:** ${sales.thisMonth}
**Last month:** ${sales.lastMonth}
**Change:** +${sales.vsLastMonth}% 📈

Your sales are trending upward! This represents a strong month-over-month growth.

📊 *Interactive chart visualization coming soon*`
  }

  if (input.includes('week')) {
    return `**Weekly Sales Trend**

**This week:** ${sales.thisWeek}
**Last week:** ${sales.lastWeek}
**Change:** +${sales.vsLastWeek}%

You\'re performing ${parseFloat(sales.vsLastWeek) > 0 ? 'better' : 'slower'} than last week.

📊 *Detailed trend analysis coming soon*`
  }

  return `I can analyze your data! Here's what I can show you:

• **Sales trends** - Compare week/month/quarter
• **Transaction patterns** - Peak times, average amounts
• **Terminal performance** - Usage stats by location

Try asking "Compare this month vs last month" or "Show sales trend this quarter"`
}

function generateActionResponse(input: string, context: PageContext): string {
  if (input.includes('export')) {
    const currentPage = context.page
    return `To export ${currentPage} data, click the **Export** button at the top right of the page. Your data will download as a CSV file.

[View ${context.pageTitle} →](/)`
  }

  if (input.includes('filter') && input.includes('failed')) {
    return `I've prepared the filter for you. To see failed transactions:

1. Go to Transactions
2. Click "Filters"
3. Select "Failed" under Status
4. Click "Apply filters"

Or [Go to Transactions →](/) and I\'ll help you set it up!`
  }

  if (input.includes('create') || input.includes('add')) {
    return `You can create/add items from the relevant page:

• **New transaction** - Use "Create Payment" in sidebar
• **New terminal** - Click "Order terminal" on Terminals page
• **New user** - Go to Settings > Users > "Add user"

What would you like to create?`
  }

  return `I can help you perform actions like:

• **Export** data to CSV
• **Filter** to specific items
• **Create** new records

What action would you like to take?`
}

function generateSpecificLookupResponse(input: string, context: PageContext): string {
  const transactions = getTransactionStats()
  const terminals = getTerminalStats()
  const disputes = getDisputeStats()
  const invoices = getInvoiceStats()

  if (input.includes('failed')) {
    const failedTxs = mockTransactions.filter(t => t.status === 'Failed')
    if (failedTxs.length === 0) {
      return `Great news! You have **no failed transactions** right now. ✅`
    }

    return `You have **${transactions.failed} failed transaction${transactions.failed > 1 ? 's' : ''}**:

${failedTxs.map(tx => `• ${tx.id} - ${tx.amount} (${tx.date.split(',')[0]})`).join('\n')}

[View all transactions →](/) to see more details or attempt to retry them.`
  }

  if (input.includes('offline') || (input.includes('terminal') && input.includes('down'))) {
    const offlineTerminals = mockTerminals.filter(t => t.status === 'inactive')
    if (offlineTerminals.length === 0) {
      return `All your terminals are online! ✅\n\n**${terminals.active}/${terminals.total}** terminals active.`
    }

    return `**${terminals.offline} terminal${terminals.offline > 1 ? 's' : ''} offline:**

${offlineTerminals.map(t => `• **${t.name}** (${t.serialNumber}) - ${t.locationValue}`).join('\n')}

[View Terminals →](/) for more details and troubleshooting options.`
  }

  if (input.includes('unpaid')) {
    return `You have **${invoices.unpaid} unpaid invoice${invoices.unpaid > 1 ? 's' : ''}**:

${invoices.list.filter(inv => inv.status === 'unpaid').map(inv => `• ${inv.id} - ${inv.amount} (Due: ${inv.dueDate})`).join('\n')}

**Next due:** ${invoices.nextDue} - ${invoices.nextAmount}

[View Invoices →](/)`
  }

  if (input.includes('open') && input.includes('dispute')) {
    return `**${disputes.open} open dispute${disputes.open > 1 ? 's' : ''}:**

${disputes.list.filter(d => d.status === 'open').map(d => `• ${d.id} - ${d.amount}\n  Reason: ${d.reason}`).join('\n')}

${disputes.requiresAction > 0 ? `⚠️ **${disputes.requiresAction} requires your action**` : ''}

[View Disputes →](/)`
  }

  if (input.includes('pending')) {
    const pendingTxs = mockTransactions.filter(t => t.status === 'Pending')
    return `**${transactions.pending} pending transaction${transactions.pending > 1 ? 's' : ''}:**

${pendingTxs.slice(0, 3).map(tx => `• ${tx.id} - ${tx.amount} (${tx.date.split(',')[0]})`).join('\n')}

These are awaiting confirmation. They typically process within 24 hours.

[View all transactions →](/)`
  }

  return `I can look up specific data for you. Try asking:

• "Show failed transactions"
• "Which terminals are offline?"
• "List unpaid invoices"
• "Show open disputes"`
}

function generateOverviewResponse(input: string, context: PageContext): string {
  const page = context.page
  const transactions = getTransactionStats()
  const terminals = getTerminalStats()
  const sales = getSalesStats()
  const orders = getOrderStats()
  const invoices = getInvoiceStats()

  if (input.includes('today') || input.includes('activity')) {
    return `**Today\'s Activity Overview**

**Sales:** ${sales.today} (+${sales.vsYesterday}% vs yesterday) 📈

**Transactions:**
• Total: ${transactions.todayCount}
• Processed: ${transactions.processed}
• Failed: ${transactions.failed}
• Pending: ${transactions.pending}

**Terminals:** ${terminals.active}/${terminals.total} active ✅

Everything looks good! ${transactions.failed > 0 ? `You have ${transactions.failed} failed transaction${transactions.failed > 1 ? 's' : ''} that may need attention.` : ''}`
  }

  if (page === 'transactions' || input.includes('transaction')) {
    return `**Transaction Summary**

**Total transactions:** ${transactions.total}
**Status breakdown:**
• **Processed:** ${transactions.processed} ✅
• **Pending:** ${transactions.pending} ⏳
• **Failed:** ${transactions.failed} ❌
• **Refunded:** ${transactions.refunded}

**Total volume:** ${transactions.totalVolume}

[View detailed transactions →](/)`
  }

  if (page === 'terminals' || input.includes('terminal')) {
    return `**Terminal Overview**

**Total terminals:** ${terminals.total}

**Status:**
• **Active:** ${terminals.active} ✅
• **Offline:** ${terminals.offline} ${terminals.offline > 0 ? '⚠️' : ''}
• **Shipped:** ${terminals.shipped} 📦
• **Needs update:** ${terminals.needsUpdate}

${terminals.offline > 0 ? '[View offline terminals →](/)' : 'All systems operational! ✅'}`
  }

  if (input.includes('sales') || input.includes('revenue')) {
    return `**Sales Overview**

**Today:** ${sales.today} (+${sales.vsYesterday}% vs yesterday)
**This week:** ${sales.thisWeek} (+${sales.vsLastWeek}% vs last week)
**This month:** ${sales.thisMonth} (+${sales.vsLastMonth}% vs last month)

Your sales are trending ${parseFloat(sales.vsLastMonth) > 0 ? 'upward' : 'downward'}! 📊

[View detailed reports →](/)`
  }

  return `**${mockMerchant.name} Portal Overview**

**Sales:** ${sales.today} today
**Transactions:** ${transactions.total} total (${transactions.failed} failed)
**Terminals:** ${terminals.active}/${terminals.total} active
**Orders:** ${orders.pendingFulfillment} pending fulfillment

What would you like to explore?`
}

function generateFollowUpResponse(input: string, lastTopic: string, context: PageContext): string {
  if (lastTopic.includes('failed')) {
    const failedTxs = mockTransactions.filter(t => t.status === 'Failed')
    return `Here are the details on failed transactions:

${failedTxs.map(tx => `**${tx.id}**
• Amount: ${tx.amount}
• Date: ${tx.date}
• Type: ${tx.transactionType}
• Order: ${tx.orderId}`).join('\n\n')}

[View in Transactions →](/) to retry or refund.`
  }

  if (lastTopic.includes('offline') || lastTopic.includes('terminal')) {
    const offlineTerminals = mockTerminals.filter(t => t.status === 'inactive')
    return `Offline terminal details:

${offlineTerminals.map(t => `**${t.name}**
• Serial: ${t.serialNumber}
• Location: ${t.locationValue}
• Status: Offline`).join('\n\n')}

To troubleshoot:
1. Check power and network connections
2. Restart the terminal
3. Contact support if issue persists

[View Terminals →](/)`
  }

  return `Based on our conversation, here's more detail:\n\n${generateOverviewResponse(input, context)}`
}

function generateFallbackResponse(): string {
  return `I\'m not sure I understand that in the context of your portal. Here are some things I can help with:

• **Navigate** to any page or feature
• **Summarize** your transactions, sales, or terminal data
• **Answer** how-to questions about portal features
• **Look up** specific data points

Could you rephrase your question? For example:
• "Show me today's sales"
• "How many failed transactions?"
• "Take me to terminals"`
}

export function getPageSuggestions(page: string): string[] {
  const suggestions: Record<string, string[]> = {
    home: [
      'Give me an overview of today\'s activity',
      'What\'s my current sales volume?',
      'Any issues I should know about?',
    ],
    transactions: [
      'Summarize today\'s transactions',
      'Are there any failed transactions?',
      'Compare this week vs last week',
    ],
    terminals: [
      'Show terminal status overview',
      'Which terminals are offline?',
      'How do I add a new terminal?',
    ],
    orders: [
      'Show recent orders',
      'Any orders pending fulfillment?',
      'Order volume this week',
    ],
    invoices: [
      'Show unpaid invoices',
      'When is my next invoice due?',
      'Download latest invoice',
    ],
    reports: [
      'Generate a sales summary for this month',
      'Compare revenue month-over-month',
      'Export report as PDF',
    ],
    disputes: [
      'Show open disputes',
      'Any disputes requiring action?',
      'What\'s my dispute rate?',
    ],
    settings: [
      'How do I change notification preferences?',
      'Manage user access',
      'Update business information',
    ],
  }

  return suggestions[page] || suggestions.home
}
