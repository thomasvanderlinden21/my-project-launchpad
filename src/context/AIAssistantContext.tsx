import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

export interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
  context?: {
    currentPage: string
    currentFilters?: Record<string, unknown>
  }
}

export interface Conversation {
  id: string
  createdAt: Date
  messages: Message[]
  isActive: boolean
}

export interface PageContext {
  page: string
  pageTitle: string
  pageData: Record<string, unknown>
  availableActions: string[]
}

interface AIAssistantState {
  isOpen: boolean
  conversations: Conversation[]
  activeConversationId: string | null
  isTyping: boolean
  lastTopic: string | null
  currentContext: PageContext
}

interface AIAssistantContextValue extends AIAssistantState {
  togglePanel: () => void
  openPanel: () => void
  closePanel: () => void
  sendMessage: (content: string) => void
  startNewConversation: () => void
  updateContext: (context: Partial<PageContext>) => void
}

const AIAssistantContext = createContext<AIAssistantContextValue | undefined>(undefined)

const STORAGE_KEY = 'ai-assistant-conversations'

export function AIAssistantProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [activeConversationId, setActiveConversationId] = useState<string | null>(null)
  const [isTyping, setIsTyping] = useState(false)
  const [lastTopic, setLastTopic] = useState<string | null>(null)
  const [currentContext, setCurrentContext] = useState<PageContext>({
    page: 'home',
    pageTitle: 'Home',
    pageData: {},
    availableActions: [],
  })

  // Load conversations from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      try {
        const parsed = JSON.parse(stored)
        // Convert date strings back to Date objects
        const conversations = parsed.map((conv: Conversation) => ({
          ...conv,
          createdAt: new Date(conv.createdAt),
          messages: conv.messages.map((msg: Message) => ({
            ...msg,
            timestamp: new Date(msg.timestamp),
          })),
        }))
        setConversations(conversations)

        // Set active conversation
        const active = conversations.find((c: Conversation) => c.isActive)
        if (active) {
          setActiveConversationId(active.id)
        }
      } catch (e) {
        console.error('Failed to load conversations:', e)
      }
    }
  }, [])

  // Save conversations to localStorage whenever they change
  useEffect(() => {
    if (conversations.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(conversations))
    }
  }, [conversations])

  const togglePanel = () => setIsOpen(prev => !prev)
  const openPanel = () => setIsOpen(true)
  const closePanel = () => setIsOpen(false)

  const startNewConversation = () => {
    const newConversation: Conversation = {
      id: `conv-${Date.now()}`,
      createdAt: new Date(),
      messages: [],
      isActive: true,
    }

    setConversations(prev => [
      ...prev.map(c => ({ ...c, isActive: false })),
      newConversation,
    ])
    setActiveConversationId(newConversation.id)
    setLastTopic(null)
  }

  const sendMessage = (content: string) => {
    // If no active conversation, create one
    if (!activeConversationId) {
      startNewConversation()
    }

    const userMessage: Message = {
      id: `msg-${Date.now()}`,
      role: 'user',
      content,
      timestamp: new Date(),
      context: {
        currentPage: currentContext.page,
        currentFilters: currentContext.pageData as Record<string, unknown>,
      },
    }

    // Add user message
    setConversations(prev => prev.map(conv =>
      conv.id === (activeConversationId || `conv-${Date.now()}`)
        ? { ...conv, messages: [...conv.messages, userMessage] }
        : conv
    ))

    // Simulate assistant response
    setIsTyping(true)

    // Import response generator (we'll create this)
    import('../utils/aiResponseEngine').then(({ generateResponse }) => {
      const delay = Math.random() * 1200 + 800 // 800-2000ms

      setTimeout(() => {
        const assistantMessage: Message = {
          id: `msg-${Date.now()}-assistant`,
          role: 'assistant',
          content: generateResponse(content, currentContext, lastTopic),
          timestamp: new Date(),
        }

        setConversations(prev => prev.map(conv =>
          conv.id === activeConversationId || conv.id === `conv-${Date.now()}`
            ? { ...conv, messages: [...conv.messages, assistantMessage] }
            : conv
        ))

        setIsTyping(false)
        setLastTopic(content.toLowerCase())
      }, delay)
    })
  }

  const updateContext = (context: Partial<PageContext>) => {
    setCurrentContext(prev => ({ ...prev, ...context }))
  }

  const value: AIAssistantContextValue = {
    isOpen,
    conversations,
    activeConversationId,
    isTyping,
    lastTopic,
    currentContext,
    togglePanel,
    openPanel,
    closePanel,
    sendMessage,
    startNewConversation,
    updateContext,
  }

  return (
    <AIAssistantContext.Provider value={value}>
      {children}
    </AIAssistantContext.Provider>
  )
}

export const useAIAssistant = () => {
  const context = useContext(AIAssistantContext)
  if (!context) {
    throw new Error('useAIAssistant must be used within AIAssistantProvider')
  }
  return context
}
