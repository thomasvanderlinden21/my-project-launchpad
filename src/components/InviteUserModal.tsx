import { useState } from 'react'
import SideModal from './SideModal'
import Button from './Button'
import './InviteUserModal.css'

export interface InviteUserModalProps {
  /** Controls visibility */
  isOpen: boolean
  /** Called when the modal should close */
  onClose: () => void
  /** Called when invite is sent */
  onSendInvite?: (email: string, name: string, role: string, accessLevel: string) => void
}

export default function InviteUserModal({
  isOpen,
  onClose,
  onSendInvite,
}: InviteUserModalProps) {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [role, setRole] = useState('User')
  const [accessLevel, setAccessLevel] = useState('View only')

  const handleSendInvite = () => {
    if (onSendInvite) {
      onSendInvite(email, name, role, accessLevel)
    }
    // Reset form
    setEmail('')
    setName('')
    setRole('User')
    setAccessLevel('View only')
    onClose()
  }

  const handleCancel = () => {
    // Reset form
    setEmail('')
    setName('')
    setRole('User')
    setAccessLevel('View only')
    onClose()
  }

  const isFormValid = email.trim() !== '' && name.trim() !== ''

  return (
    <SideModal
      isOpen={isOpen}
      onClose={handleCancel}
      title="Invite user"
      width="md"
      footer={
        <>
          <Button hierarchy="secondary" size="sm" onClick={handleCancel}>
            Cancel
          </Button>
          <Button
            hierarchy="primary"
            size="sm"
            onClick={handleSendInvite}
            disabled={!isFormValid}
          >
            Send invite
          </Button>
        </>
      }
    >
      <div className="invite-user">
        <div className="invite-user__form">
          <div className="invite-user__field">
            <label className="invite-user__label" htmlFor="invite-email">
              Email address *
            </label>
            <input
              id="invite-email"
              type="email"
              className="invite-user__input"
              placeholder="user@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoFocus
            />
          </div>

          <div className="invite-user__field">
            <label className="invite-user__label" htmlFor="invite-name">
              Full name *
            </label>
            <input
              id="invite-name"
              type="text"
              className="invite-user__input"
              placeholder="Enter full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="invite-user__field">
            <label className="invite-user__label" htmlFor="invite-role">
              Role
            </label>
            <select
              id="invite-role"
              className="invite-user__select"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="User">User</option>
              <option value="Manager">Manager</option>
              <option value="Admin">Admin</option>
            </select>
          </div>

          <div className="invite-user__field">
            <label className="invite-user__label" htmlFor="invite-access">
              Access level
            </label>
            <select
              id="invite-access"
              className="invite-user__select"
              value={accessLevel}
              onChange={(e) => setAccessLevel(e.target.value)}
            >
              <option value="View only">View only</option>
              <option value="Limited access">Limited access</option>
              <option value="Full access">Full access</option>
            </select>
          </div>
        </div>

        <div className="invite-user__info">
          <p className="invite-user__info-text">
            An invitation email will be sent to the provided email address with instructions to set up their account.
          </p>
        </div>
      </div>
    </SideModal>
  )
}
