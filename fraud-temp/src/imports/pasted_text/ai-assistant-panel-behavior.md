PROTOTYPE BEHAVIOR: AI Assistant Panel

═══════════════════════════════════════
1. TOGGLE & PANEL BEHAVIOR
═══════════════════════════════════════

TRIGGER: The "AI assistant" icon (sparkle icon) in the bottom utility bar acts as a toggle.

OPENING THE PANEL:
- When the user clicks the "AI assistant" icon in the bottom utility bar, a panel slides in from the right side of the screen with a smooth ease-in-out animation (approximately 300ms).
- The panel is 360px wide and takes the full height of the viewport (minus the top header bar and bottom utility bar).
- The panel is FIXED — it does not scroll with page content.
- The main content area (everything between the left sidebar navigation and the right edge) compresses/resizes to accommodate the panel. The main content does NOT go behind the panel — it reflows to fit the remaining horizontal space.
- The AI assistant icon in the bottom bar should appear in an "active/selected" state when the panel is open (highlighted or filled to indicate it is toggled on).

CLOSING THE PANEL:
- The user can close the panel in two ways:
  (a) Clicking the "X" (close) button in the top-right corner of the AI assistant panel header.
  (b) Clicking the "AI assistant" icon in the bottom utility bar again (toggle off).
- When closed, the panel slides out to the right with the same 300ms ease-in-out animation.
- The main content area expands back to its full width.
- The AI assistant icon returns to its default/inactive state.

PERSISTENCE ACROSS NAVIGATION:
- When the AI assistant panel is open and the user navigates to a different page via the left sidebar navigation (e.g., from "Product catalogue" to "Transactions" to "Home"), the AI assistant panel REMAINS open and fixed on the right side.
- The main content area updates to show the new page, but the panel stays in place with the conversation intact.
- The panel only closes when the user explicitly closes it (via X button or toggle icon).

═══════════════════════════════════════
2. CHAT INTERFACE BEHAVIOR
═══════════════════════════════════════

LAYOUT:
- The panel has three zones:
  (a) HEADER: Fixed at the top of the panel. Contains the title "AI assistant" (left-aligned) and an "X" close button (right-aligned).
  (b) CONVERSATION AREA: Scrollable middle area that fills all available vertical space between the header and the input bar. Messages stack vertically from top to bottom, with the newest messages at the bottom. When the conversation exceeds the visible area, this section scrolls independently. The scroll automatically snaps to the bottom when a new message is added.
  (c) INPUT BAR: Fixed at the bottom of the panel. Contains a text input field with placeholder text "Add your prompt" and a send button (arrow icon) that appears/activates when the user types text.

EMPTY STATE (first time opening or new conversation):
- When the panel opens and there is no prior conversation, show a welcome state:
  - A greeting message from the assistant: "Hi [User's first name], I'm your AI assistant. I can help you navigate the portal, answer questions about your data, and more. What can I help you with?"
  - Below the greeting, show 2–3 contextual suggestion chips/buttons based on the current page the user is on. Examples:
    - If on "Product catalogue": "Show me my top-selling products" / "How do I add a product in bulk?" / "Filter products by category"
    - If on "Transactions": "Show today's transaction summary" / "Are there any failed transactions?" / "Export transactions to CSV"
    - If on "Home": "Give me an overview of today's activity" / "What's my current sales volume?" / "Navigate to terminals"
  - Clicking a suggestion chip sends it as the user's first message and triggers an assistant response.

MESSAGE BEHAVIOR:
- USER MESSAGES: Appear right-aligned in a styled bubble (use the brand's primary color or a distinguishable user-message style). Show the message text and a small timestamp below.
- ASSISTANT MESSAGES: Appear left-aligned with a different style (light background or white bubble). The assistant's name or icon appears next to the first message in a sequence. Show a small timestamp below each message.
- When the assistant is generating a response, show a typing indicator (three animated dots) in the assistant's message area. This appears immediately after the user sends a message.
- Assistant responses appear with a slight delay (simulating processing time — approximately 1–2 seconds) and then render with a subtle fade-in.
- The assistant can respond with:
  - Plain text paragraphs
  - Bulleted or numbered lists
  - Bold/emphasized text for key terms
  - Clickable links that navigate to other pages in the portal (e.g., "Go to Terminals" as a hyperlink that navigates the main content area)
  - (Future) Inline data tables, charts, or graphs embedded within the conversation

CONVERSATION PERSISTENCE:
- When the user closes the AI assistant panel and reopens it (whether immediately or after navigating to different pages), the full conversation history is preserved and displayed exactly where the user left off.
- The scroll position returns to the bottom of the conversation (most recent messages visible).
- The user can scroll up to review older messages.
- There should be a "New conversation" button (small icon or text link) in the panel header or at the top of the conversation area, allowing the user to start a fresh conversation. This does NOT delete the old conversation — it archives it.

═══════════════════════════════════════
3. CONTEXT AWARENESS
═══════════════════════════════════════

SCREEN CONTEXT:
- The AI assistant is aware of which page/screen the user currently has open in the main content area.
- When the user navigates to a new page, the assistant's context updates silently. If the user asks a question, the assistant factors in the current page.
- Example interactions:
  - User is on "Product catalogue" and asks: "What am I looking at?" → Assistant responds: "You're currently on the Product Catalogue page. This page shows all products configured for Cycle shop #2. You have [X] products listed. You can search, filter, add individual products, or add products in bulk using the buttons at the top."
  - User is on "Transactions" and asks: "Show me today's refunds" → Assistant responds with a summary of today's refunded transactions, pulled from the data visible/accessible on this page.

DATA ACCESS:
- The assistant has access to the same data scope as the logged-in user. This includes:
  - Transaction data (volumes, amounts, statuses, details)
  - Terminal information (locations, statuses, configurations)
  - Product catalogue data
  - Business/merchant information
  - Sales data and analytics
  - Card issuing data
  - Cash advance records
  - Settings and configuration details
- The assistant does NOT have access to data beyond the user's permission level. It respects role-based access controls.

NAVIGATION ASSISTANCE:
- When the user asks "How do I..." or "Where can I find..." or "Take me to...", the assistant provides:
  (a) A text explanation of where the feature/page is located.
  (b) A clickable link/button within the chat message that navigates the main content area to the relevant page when clicked.
  - Example: User asks "Where can I manage my terminals?" → Assistant responds: "You can manage your terminals from the **Terminals** page. [Go to Terminals →]" — clicking "Go to Terminals →" navigates the main content area to the Terminals page while the assistant panel stays open.

═══════════════════════════════════════
4. INPUT INTERACTIONS
═══════════════════════════════════════

TEXT INPUT FIELD:
- The input field is always visible at the bottom of the panel.
- Placeholder text: "Add your prompt"
- When the user clicks into the field, the placeholder disappears and a blinking cursor appears.
- As the user types, a send button (arrow/send icon) becomes active/visible on the right side of the input field.
- The input field expands vertically (up to a max of ~4 lines) to accommodate longer messages. After 4 lines, the input field becomes scrollable internally.
- Pressing "Enter" on the keyboard sends the message (same as clicking the send button).
- Pressing "Shift + Enter" creates a new line within the message without sending.
- After sending, the input field clears and returns to single-line height with the placeholder text.

SEND BUTTON:
- Inactive/hidden when the input field is empty.
- Active/visible when there is text in the input field.
- On click: sends the message, clears the input field, scrolls the conversation to the bottom, and triggers the assistant's typing indicator followed by a response.

═══════════════════════════════════════
5. RESPONSIVE BEHAVIOR
═══════════════════════════════════════

- On standard desktop viewports (1280px and above): The panel is 360px wide. Main content compresses to fill remaining space.
- On smaller desktop viewports (1024px–1279px): The panel is 320px wide. Main content compresses accordingly.
- If viewport becomes too narrow to comfortably show both main content and panel (below 1024px): The panel overlays the main content as a slide-over drawer with a semi-transparent backdrop. Clicking the backdrop closes the panel.

═══════════════════════════════════════
6. SAMPLE INTERACTION FLOW
═══════════════════════════════════════

Step 1: User is on the "Product catalogue" page. The AI assistant panel is closed.
Step 2: User clicks the "AI assistant" sparkle icon in the bottom utility bar.
Step 3: The panel slides in from the right. Main content compresses. The welcome message and contextual suggestions appear.
Step 4: User clicks the suggestion "How do I add a product in bulk?"
Step 5: The suggestion appears as a user message bubble. Typing indicator shows for 1.5 seconds.
Step 6: Assistant responds: "To add products in bulk, click the **'Add product bulk'** button at the top of the Product Catalogue page. You'll be prompted to upload a CSV file with your product data. [Learn more about CSV formatting →]. Would you like me to walk you through the CSV template?"
Step 7: User types "Yes please" and hits Enter.
Step 8: Assistant responds with a detailed explanation including a formatted list of required CSV columns.
Step 9: User clicks "Transactions" in the left sidebar navigation.
Step 10: The main content area navigates to the Transactions page. The AI assistant panel remains open with the conversation intact.
Step 11: User asks in the chat: "How many transactions did I have today?"
Step 12: Assistant responds with today's transaction count and a brief summary, contextually relevant to the Transactions page.
Step 13: User clicks the "X" button to close the panel. Panel slides out. Main content expands.
Step 14: User later clicks the AI assistant icon again. Panel slides in. The full conversation from steps 4–12 is still visible. User can continue chatting.

═══════════════════════════════════════
7. VISUAL STYLE NOTES
═══════════════════════════════════════

- The panel has a subtle left border or shadow to visually separate it from the main content.
- Background color of the panel: white or very light grey (consistent with the portal's design system).
- Typography, colors, and spacing follow the Worldline design system used throughout the portal.
- The panel should feel integrated — not like a popup or modal, but like a native part of the application layout.
- Smooth transitions for all open/close/resize animations.