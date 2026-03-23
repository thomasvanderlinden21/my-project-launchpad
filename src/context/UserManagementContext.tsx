import { createContext, useContext, useState, ReactNode } from 'react'

type UserRole = 'Admin' | 'Manager' | 'User'
type AccessLevel = 'Full access' | 'Limited access' | 'View only'
type UserStatus = 'Active' | 'Invited' | 'Inactive'

export interface User {
  id: string
  name: string
  initials: string
  email: string
  role: UserRole
  accessLevel: AccessLevel
  status: UserStatus
}

const initialUsers: User[] = [
  { id: '1', name: 'Olivia Rhye', initials: 'OR', email: 'olivia.rhye@icloud.com', role: 'Admin', accessLevel: 'Full access', status: 'Active' },
  { id: '2', name: 'Phoenix Baker', initials: 'PH', email: 'phoenix.baker@example.com', role: 'Manager', accessLevel: 'Limited access', status: 'Active' },
  { id: '3', name: 'Lana Steiner', initials: 'LS', email: 'lana.steiner@example.com', role: 'User', accessLevel: 'View only', status: 'Active' },
  { id: '4', name: 'Demi Wilkinson', initials: 'DW', email: 'demi.wilkinson@example.com', role: 'Manager', accessLevel: 'Limited access', status: 'Active' },
  { id: '5', name: 'Candice Wu', initials: 'CW', email: 'candice.wu@example.com', role: 'User', accessLevel: 'View only', status: 'Active' },
]

interface UserManagementContextValue {
  users: User[]
  addUser: (email: string, firstName: string, lastName: string, role: UserRole, accessLevel: AccessLevel) => void
}

const UserManagementContext = createContext<UserManagementContextValue | undefined>(undefined)

export function UserManagementProvider({ children }: { children: ReactNode }) {
  const [users, setUsers] = useState<User[]>(initialUsers)

  const generateInitials = (name: string): string => {
    const parts = name.trim().split(' ')
    if (parts.length === 1) {
      return parts[0].substring(0, 2).toUpperCase()
    }
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
  }

  const addUser = (email: string, firstName: string, lastName: string, role: UserRole, accessLevel: AccessLevel) => {
    const name = `${firstName} ${lastName}`
    const newUser: User = {
      id: String(users.length + 1),
      name,
      initials: generateInitials(name),
      email,
      role,
      accessLevel,
      status: 'Invited',
    }

    setUsers(prevUsers => [...prevUsers, newUser])
  }

  return (
    <UserManagementContext.Provider value={{ users, addUser }}>
      {children}
    </UserManagementContext.Provider>
  )
}

export const useUserManagement = () => {
  const context = useContext(UserManagementContext)
  if (!context) {
    throw new Error('useUserManagement must be used within UserManagementProvider')
  }
  return context
}
