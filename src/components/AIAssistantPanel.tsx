import { useState, useEffect, useRef } from 'react'
import { useAIAssistant } from '../context/AIAssistantContext'
import { getPageSuggestions } from '../utils/aiResponseEngine'
import { mockUser } from '../data/mockData'
import Icon from './Icon'
import './AIAssistantPanel.css'

export interface AIAssistantPanelProps {
  /** Controls whether the panel is visible */
  isOpen: boolean
  /** Callback when the panel should close */
  onClose: () => void
  /** Callback to navigate to specific items (e.g., terminal:2) */
  onNavigate?: (target: string) => void
}

export default function AIAssistantPanel({
  isOpen,
  onClose,
  onNavigate,
}: AIAssistantPanelProps) {
  const {
    conversations,
    activeConversationId,
    isTyping,
    currentContext,
    sendMessage,
    startNewConversation,
  } = useAIAssistant()

  const [inputValue, setInputValue] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const activeConversation = conversations.find(c => c.id === activeConversationId)
  const messages = activeConversation?.messages || []
  const hasMessages = messages.length > 0

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping])

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 100)}px`
    }
  }, [inputValue])

  // Handle link clicks for navigation
  useEffect(() => {
    const handleLinkClick = (e: MouseEvent) => {
      let target = e.target as HTMLElement

      // Check if clicked element or its parent is a link
      while (target && target !== document.body) {
        if (target.tagName === 'A' && target.classList.contains('ai-assistant-panel__link')) {
          e.preventDefault()
          e.stopPropagation()

          const href = target.getAttribute('href')
          console.log('AI Link clicked:', href)

          if (href) {
            if (href.startsWith('terminal:') && onNavigate) {
              console.log('Navigating to terminal:', href)
              onNavigate(href)
            } else if (href === '/') {
              // Handle navigation to pages - for now just log
              console.log('Navigate to page:', href)
            }
          }
          return
        }
        target = target.parentElement as HTMLElement
      }
    }

    document.addEventListener('click', handleLinkClick, true)
    return () => document.removeEventListener('click', handleLinkClick, true)
  }, [onNavigate])

  const handleSend = () => {
    if (inputValue.trim()) {
      sendMessage(inputValue.trim())
      setInputValue('')
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const handleSuggestionClick = (suggestion: string) => {
    sendMessage(suggestion)
  }

  const handleNewConversation = () => {
    startNewConversation()
  }

  const formatTime = (date: Date) => {
    return new Date(date).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    })
  }

  const renderMarkdown = (content: string) => {
    // Simple markdown rendering
    let html = content

    // Bold
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')

    // Bullet lists
    html = html.replace(/^• (.+)$/gm, '<li>$1</li>')
    html = html.replace(/(<li>.*<\/li>\n?)+/g, '<ul>$&</ul>')

    // Numbered lists
    html = html.replace(/^\d+\. (.+)$/gm, '<li>$1</li>')

    // Links with format [text](url)
    html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="ai-assistant-panel__link">$1</a>')

    // Line breaks
    html = html.replace(/\n\n/g, '</p><p>')
    html = html.replace(/\n/g, '<br>')

    return `<p>${html}</p>`
  }

  if (!isOpen) return null

  const suggestions = getPageSuggestions(currentContext.page)

  return (
    <>
      <div className="ai-assistant-panel" role="complementary" aria-label="AI Assistant">
        {/* Header */}
        <div className="ai-assistant-panel__header">
        <h2 className="ai-assistant-panel__title">AI assistant</h2>
        <div className="ai-assistant-panel__header-actions">
          {hasMessages && (
            <button
              className="ai-assistant-panel__new-btn"
              onClick={handleNewConversation}
              aria-label="New conversation"
            >
              <Icon name="plus" size={16} />
              New
            </button>
          )}
          <button
            className="ai-assistant-panel__close-btn"
            onClick={onClose}
            aria-label="Close AI Assistant"
          >
            <Icon name="close" size={24} />
          </button>
        </div>
      </div>

      {/* Conversation Area */}
      <div className="ai-assistant-panel__conversation">
        {!hasMessages ? (
          // Welcome / Empty State
          <div className="ai-assistant-panel__welcome">
            <div className="ai-assistant-panel__welcome-icon">
              <Icon name="sparkle" size={32} />
            </div>
            <p className="ai-assistant-panel__welcome-message">
              Hi {mockUser.firstName}, I'm your AI assistant. I can help you navigate the portal, answer questions about your data, and more. What can I help you with?
            </p>
            <div className="ai-assistant-panel__suggestions">
              {suggestions.map((suggestion, index) => (
                <button
                  key={index}
                  className="ai-assistant-panel__suggestion"
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        ) : (
          // Messages
          <div className="ai-assistant-panel__messages">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`ai-assistant-panel__message ai-assistant-panel__message--${message.role}`}
              >
                {message.role === 'assistant' && (
                  <div className="ai-assistant-panel__message-icon">
                    <Icon name="sparkle" size={16} />
                  </div>
                )}
                <div className="ai-assistant-panel__message-content">
                  <div
                    className="ai-assistant-panel__message-text"
                    dangerouslySetInnerHTML={{ __html: renderMarkdown(message.content) }}
                  />
                  <div className="ai-assistant-panel__message-time">
                    {formatTime(message.timestamp)}
                  </div>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="ai-assistant-panel__message ai-assistant-panel__message--assistant">
                <div className="ai-assistant-panel__message-icon">
                  <Icon name="sparkle" size={16} />
                </div>
                <div className="ai-assistant-panel__message-content">
                  <div className="ai-assistant-panel__typing">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Input Bar */}
      <div className="ai-assistant-panel__input-bar">
        <textarea
          ref={textareaRef}
          className="ai-assistant-panel__textarea"
          placeholder="Add your prompt..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          rows={1}
        />
        <button
          className={`ai-assistant-panel__send-btn${inputValue.trim() ? ' ai-assistant-panel__send-btn--active' : ''}`}
          onClick={handleSend}
          disabled={!inputValue.trim()}
          aria-label="Send message"
        >
          <Icon name="arrow-right" size={20} />
        </button>
      </div>
    </div>
    </>
  )
}
