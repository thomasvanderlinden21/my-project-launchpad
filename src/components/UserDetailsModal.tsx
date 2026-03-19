import { useState, useEffect } from 'react'
import SideModal from './SideModal'
import Button from './Button'
import Chip from './Chip'
import './UserDetailsModal.css'

export interface UserDetails {
  id: string
  name: string
  initials: string
  email: string
  role: 'Admin' | 'Manager' | 'User'
  accessLevel: 'Full access' | 'Limited access' | 'View only'
  status: 'Active' | 'Invited' | 'Inactive'
}

export interface UserDetailsModalProps {
  /** Controls visibility */
  isOpen: boolean
  /** Called when the modal should close */
  onClose: () => void
  /** User data to display */
  user: UserDetails | null
  /** Called when changes are saved */
  onSave?: (userId: string, updates: Partial<UserDetails>) => void
  /** Called when resend invitation is clicked */
  onResendInvite?: (userId: string) => void
}

export default function UserDetailsModal({
  isOpen,
  onClose,
  user,
  onSave,
  onResendInvite,
}: UserDetailsModalProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editedName, setEditedName] = useState('')
  const [editedEmail, setEditedEmail] = useState('')
  const [editedRole, setEditedRole] = useState<'Admin' | 'Manager' | 'User'>('User')
  const [editedAccessLevel, setEditedAccessLevel] = useState<'Full access' | 'Limited access' | 'View only'>('View only')
  const [editedStatus, setEditedStatus] = useState<'Active' | 'Invited' | 'Inactive'>('Active')

  // Reset form when user changes or modal opens
  useEffect(() => {
    if (user) {
      setEditedName(user.name)
      setEditedEmail(user.email)
      setEditedRole(user.role)
      setEditedAccessLevel(user.accessLevel)
      setEditedStatus(user.status)
      setIsEditing(false)
    }
  }, [user, isOpen])

  if (!user) return null

  const statusVariant = editedStatus === 'Active' ? 'success' : editedStatus === 'Invited' ? 'warning' : 'neutral'

  const handleSave = () => {
    if (onSave) {
      onSave(user.id, {
        name: editedName,
        email: editedEmail,
        role: editedRole,
        accessLevel: editedAccessLevel,
        status: editedStatus,
      })
    }
    setIsEditing(false)
  }

  const handleCancel = () => {
    // Reset to original values
    setEditedName(user.name)
    setEditedEmail(user.email)
    setEditedRole(user.role)
    setEditedAccessLevel(user.accessLevel)
    setEditedStatus(user.status)
    setIsEditing(false)
  }

  return (
    <SideModal
      isOpen={isOpen}
      onClose={onClose}
      title={isEditing ? 'Edit user' : 'User details'}
      width="md"
      footer={isEditing ? (
        <>
          <Button hierarchy="secondary" size="sm" onClick={handleCancel}>
            Cancel
          </Button>
          <Button hierarchy="primary" size="sm" onClick={handleSave}>
            Save changes
          </Button>
        </>
      ) : undefined}
    >
      <div className="user-details">
        {/* User header with avatar */}
        <div className="user-details__header">
          <div className="user-details__avatar">{user.initials}</div>
          <div className="user-details__header-info">
            <h3 className="user-details__name">{user.name}</h3>
            <p className="user-details__email">{user.email}</p>
          </div>
        </div>

        {/* Edit button (only show when not editing) */}
        {!isEditing && (
          <Button
            hierarchy="secondary"
            size="sm"
            fullWidth
            onClick={() => setIsEditing(true)}
          >
            Edit user
          </Button>
        )}

        {/* Details section */}
        <div className="user-details__section">
          <h4 className="user-details__section-title">Details</h4>

          {!isEditing ? (
            // Read-only view
            <div className="user-details__fields">
              <div className="user-details__field">
                <span className="user-details__field-label">Role</span>
                <span className="user-details__field-value">{user.role}</span>
              </div>
              <div className="user-details__field">
                <span className="user-details__field-label">Access level</span>
                <span className="user-details__field-value">{user.accessLevel}</span>
              </div>
              <div className="user-details__field">
                <span className="user-details__field-label">Status</span>
                <div className="user-details__field-value">
                  <Chip label={user.status} variant={statusVariant} />
                </div>
              </div>
            </div>
          ) : (
            // Edit mode
            <div className="user-details__form">
              <div className="user-details__form-field">
                <label className="user-details__form-label" htmlFor="edit-name">
                  Full name
                </label>
                <input
                  id="edit-name"
                  type="text"
                  className="user-details__form-input"
                  value={editedName}
                  onChange={(e) => setEditedName(e.target.value)}
                />
              </div>

              <div className="user-details__form-field">
                <label className="user-details__form-label" htmlFor="edit-email">
                  Email address
                </label>
                <input
                  id="edit-email"
                  type="email"
                  className="user-details__form-input"
                  value={editedEmail}
                  onChange={(e) => setEditedEmail(e.target.value)}
                />
              </div>

              <div className="user-details__form-field">
                <label className="user-details__form-label" htmlFor="edit-role">
                  Role
                </label>
                <select
                  id="edit-role"
                  className="user-details__form-select"
                  value={editedRole}
                  onChange={(e) => setEditedRole(e.target.value as 'Admin' | 'Manager' | 'User')}
                >
                  <option value="User">User</option>
                  <option value="Manager">Manager</option>
                  <option value="Admin">Admin</option>
                </select>
              </div>

              <div className="user-details__form-field">
                <label className="user-details__form-label" htmlFor="edit-access">
                  Access level
                </label>
                <select
                  id="edit-access"
                  className="user-details__form-select"
                  value={editedAccessLevel}
                  onChange={(e) => setEditedAccessLevel(e.target.value as 'Full access' | 'Limited access' | 'View only')}
                >
                  <option value="View only">View only</option>
                  <option value="Limited access">Limited access</option>
                  <option value="Full access">Full access</option>
                </select>
              </div>

              <div className="user-details__form-field">
                <label className="user-details__form-label" htmlFor="edit-status">
                  Status
                </label>
                <select
                  id="edit-status"
                  className="user-details__form-select"
                  value={editedStatus}
                  onChange={(e) => setEditedStatus(e.target.value as 'Active' | 'Invited' | 'Inactive')}
                  disabled={editedStatus === 'Invited'}
                >
                  <option value="Active">Active</option>
                  {editedStatus === 'Invited' && <option value="Invited">Invited</option>}
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
            </div>
          )}
        </div>

        {/* Resend invitation button (only show for invited users when not editing) */}
        {!isEditing && user.status === 'Invited' && onResendInvite && (
          <Button
            hierarchy="secondary"
            size="sm"
            fullWidth
            onClick={() => onResendInvite(user.id)}
          >
            Resend invitation
          </Button>
        )}
      </div>
    </SideModal>
  )
}
