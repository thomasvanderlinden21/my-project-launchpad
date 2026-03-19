import { useState } from 'react'
import Icon from '../components/Icon'
import TableCell from '../components/TableCell'
import UserDetailsModal from '../components/UserDetailsModal'
import InviteUserModal from '../components/InviteUserModal'
import type { UserDetails } from '../components/UserDetailsModal'
import './UsersPage.css'

type UserRole = 'Admin' | 'Manager' | 'User'
type AccessLevel = 'Full access' | 'Limited access' | 'View only'
type UserStatus = 'Active' | 'Invited' | 'Inactive'

interface User {
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

const statusToChipVariant: Record<UserStatus, 'success' | 'warning' | 'neutral'> = {
  Active: 'success',
  Invited: 'warning',
  Inactive: 'neutral',
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>(initialUsers)
  const [searchQuery, setSearchQuery] = useState('')
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState<UserDetails | null>(null)
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false)

  const filteredUsers = users
    .filter(user => {
      if (!searchQuery) return true
      const query = searchQuery.toLowerCase()
      return (
        user.name.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query) ||
        user.role.toLowerCase().includes(query)
      )
    })
    .sort((a, b) => {
      // Sort invited users to the top
      if (a.status === 'Invited' && b.status !== 'Invited') return -1
      if (a.status !== 'Invited' && b.status === 'Invited') return 1
      return 0
    })

  const handleRowClick = (userId: string) => {
    const user = users.find(u => u.id === userId)
    if (!user) return

    const userDetails: UserDetails = {
      id: user.id,
      name: user.name,
      initials: user.initials,
      email: user.email,
      role: user.role,
      accessLevel: user.accessLevel,
      status: user.status,
    }

    setSelectedUser(userDetails)
    setIsDetailsModalOpen(true)
  }

  const generateInitials = (name: string): string => {
    const parts = name.trim().split(' ')
    if (parts.length === 1) {
      return parts[0].substring(0, 2).toUpperCase()
    }
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
  }

  const handleSendInvite = (email: string, name: string, role: UserRole, accessLevel: AccessLevel) => {
    const newUser: User = {
      id: String(users.length + 1),
      name,
      initials: generateInitials(name),
      email,
      role,
      accessLevel,
      status: 'Invited',
    }

    setUsers([...users, newUser])
    setIsInviteModalOpen(false)
  }

  return (
    <div className="users-page">
      <div className="users-page__toolbar">
        <div className="users-page__search-group">
          <div className="users-page__search">
            <Icon name="search" size={20} />
            <input
              type="text"
              className="users-page__search-input"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search users"
            />
          </div>
        </div>
        <button className="users-page__invite-btn" onClick={() => setIsInviteModalOpen(true)}>
          Invite user
        </button>
      </div>

      <div className="users-page__table-wrapper">
        <table className="users-page__table">
          <thead>
            <tr>
              <th className="users-page__th">Name</th>
              <th className="users-page__th">Email</th>
              <th className="users-page__th">Role</th>
              <th className="users-page__th">Access level</th>
              <th className="users-page__th">Status</th>
              <th className="users-page__th users-page__th--actions"></th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map(user => {
              return (
                <tr
                  key={user.id}
                  className="users-page__row"
                >

                  <TableCell onClick={() => handleRowClick(user.id)}>
                    <div className="users-page__user-info">
                      <div className="users-page__user-avatar">{user.initials}</div>
                      <span className="users-page__user-name">{user.name}</span>
                    </div>
                  </TableCell>

                  <TableCell onClick={() => handleRowClick(user.id)}>{user.email}</TableCell>

                  <TableCell onClick={() => handleRowClick(user.id)}>{user.role}</TableCell>

                  <TableCell onClick={() => handleRowClick(user.id)}>{user.accessLevel}</TableCell>

                  <TableCell
                    chip={{
                      label: user.status,
                      variant: statusToChipVariant[user.status],
                    }}
                    onClick={() => handleRowClick(user.id)}
                  />

                  <TableCell>
                    <button className="users-page__action-btn" aria-label="More actions">
                      <Icon name="dots-vertical" size={20} />
                    </button>
                  </TableCell>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      <UserDetailsModal
        isOpen={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
        user={selectedUser}
        onSave={(userId, updates) => {
          console.log('Save user changes:', userId, updates)
          // Here you would implement the actual save logic
          // e.g., call an API to update the user
        }}
        onResendInvite={(userId) => {
          console.log('Resend invitation to user:', userId)
          // Here you would implement the actual resend invitation logic
          // e.g., call an API to resend the invitation email
        }}
      />

      <InviteUserModal
        isOpen={isInviteModalOpen}
        onClose={() => setIsInviteModalOpen(false)}
        onSendInvite={handleSendInvite}
      />
    </div>
  )
}
