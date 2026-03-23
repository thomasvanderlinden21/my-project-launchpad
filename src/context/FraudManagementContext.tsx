import { createContext, useContext, useState, ReactNode } from 'react'

export type FraudRuleType =
  | 'ip' | 'email' | 'iban' | 'card_country'
  | 'pan' | 'shipping' | 'amount' | 'currency'

export interface FraudRule {
  id: string
  type: FraudRuleType
  entries: string[]
  shops: string[]
  createdAt: Date
}

interface FraudManagementContextValue {
  rules: FraudRule[]
  addRule: (type: FraudRuleType, entries: string[], shops: string[]) => void
}

const FraudManagementContext = createContext<FraudManagementContextValue | undefined>(undefined)

export function FraudManagementProvider({ children }: { children: ReactNode }) {
  const [rules, setRules] = useState<FraudRule[]>([])

  const addRule = (type: FraudRuleType, entries: string[], shops: string[]) => {
    const newRule: FraudRule = {
      id: Math.random().toString(36).substring(7),
      type,
      entries,
      shops,
      createdAt: new Date()
    }

    setRules(prevRules => [...prevRules, newRule])
  }

  return (
    <FraudManagementContext.Provider value={{ rules, addRule }}>
      {children}
    </FraudManagementContext.Provider>
  )
}

export const useFraudManagement = () => {
  const context = useContext(FraudManagementContext)
  if (!context) {
    throw new Error('useFraudManagement must be used within FraudManagementProvider')
  }
  return context
}
