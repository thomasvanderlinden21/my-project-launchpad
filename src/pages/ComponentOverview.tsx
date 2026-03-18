import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'
import { SunIcon, MoonIcon, HeadsetIcon, MailIcon, UserIcon, CheckIcon } from '../components/icons'
import Button from '../components/Button'
import Chip from '../components/Chip'
import Card from '../components/Card'
import Icon from '../components/Icon'
import Input from '../components/Input'
import Alert from '../components/Alert'
import Stepper from '../components/Stepper'
import Step from '../components/Step'
import Modal from '../components/Modal'
import Tabs from '../components/Tabs'
import type { TabItem } from '../components/Tabs'
import TableCell from '../components/TableCell'
import './SubPage.css'
import './ComponentOverview.css'

type ActiveModal = 'confirm-sm' | 'info-md' | 'form-lg' | null

export default function ComponentOverview() {
  const { isDark, toggle } = useTheme()
  const [activeModal, setActiveModal] = useState<ActiveModal>(null)
  const closeModal = () => setActiveModal(null)

  return (
    <div className="subpage">
      <header className="subpage-header">
        <Link to="/" className="subpage-back">← Back</Link>
        <span className="subpage-header-title">Component Overview</span>
        <button
          className="subpage-theme-btn"
          onClick={toggle}
          aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {isDark ? <SunIcon /> : <MoonIcon />}
        </button>
      </header>

      <main className="subpage-main">
        <div className="subpage-content">

          {/* ── Button ─────────────────────────────── */}
          <section className="subpage-section">
            <h2 className="subpage-section-title">Button</h2>

            <div className="subpage-group">
              <p className="subpage-group-label">Primary</p>
              <div className="subpage-row">
                <Button hierarchy="primary" size="md">Primary md</Button>
                <Button hierarchy="primary" size="sm">Primary sm</Button>
                <Button hierarchy="primary" size="md" disabled>Disabled</Button>
              </div>
            </div>

            <div className="subpage-group">
              <p className="subpage-group-label">Secondary</p>
              <div className="subpage-row">
                <Button hierarchy="secondary" size="md">Secondary md</Button>
                <Button hierarchy="secondary" size="sm">Secondary sm</Button>
                <Button hierarchy="secondary" size="md" disabled>Disabled</Button>
              </div>
            </div>

            <div className="subpage-group">
              <p className="subpage-group-label">Tertiary</p>
              <div className="subpage-row">
                <Button hierarchy="tertiary" size="md">Tertiary md</Button>
                <Button hierarchy="tertiary" size="sm">Tertiary sm</Button>
                <Button hierarchy="tertiary" size="md" disabled>Disabled</Button>
              </div>
            </div>

            <div className="subpage-group">
              <p className="subpage-group-label">With icons</p>
              <div className="subpage-row">
                <Button hierarchy="primary"   size="md" leadingIcon={<HeadsetIcon />}>Leading icon</Button>
                <Button hierarchy="secondary" size="sm" trailingIcon={<MailIcon />}>Trailing icon</Button>
                <Button hierarchy="tertiary"  size="md" iconOnly leadingIcon={<UserIcon />} aria-label="Account" />
              </div>
            </div>
          </section>

          {/* ── Chip ───────────────────────────────── */}
          <section className="subpage-section">
            <h2 className="subpage-section-title">Chip</h2>

            <div className="subpage-group">
              <p className="subpage-group-label">Variants</p>
              <div className="subpage-row">
                <Chip label="Success"  variant="success" />
                <Chip label="Info"     variant="info" />
                <Chip label="Neutral"  variant="neutral" />
                <Chip label="Warning"  variant="warning" />
              </div>
            </div>

            <div className="subpage-group">
              <p className="subpage-group-label">With labels from portal</p>
              <div className="subpage-row">
                <Chip label="Complete" variant="success" />
                <Chip label="To do"    variant="info" />
                <Chip label="Pending"  variant="neutral" />
                <Chip label="Overdue"  variant="warning" />
              </div>
            </div>

            <div className="subpage-group">
              <p className="subpage-group-label">With icons</p>
              <div className="subpage-row">
                <Chip label="Complete" variant="success" icon={<CheckIcon />} />
                <Chip label="To do"    variant="info"    icon={<Icon name="info" size={12} />} />
                <Chip label="Pending"  variant="neutral" icon={<Icon name="chevron-right" size={12} />} />
                <Chip label="Overdue"  variant="warning" icon={<Icon name="warning" size={12} />} />
              </div>
            </div>
          </section>

          {/* ── Input ─────────────────────────────── */}
          <section className="subpage-section">
            <h2 className="subpage-section-title">Input</h2>

            <div className="subpage-group">
              <p className="subpage-group-label">Default states</p>
              <div className="overview-input-grid">
                <Input
                  label="Label"
                  placeholder="Placeholder text"
                />
                <Input
                  label="With helper text"
                  placeholder="Enter value"
                  helperText="This is a hint to help the user."
                />
                <Input
                  label="Error"
                  placeholder="Enter value"
                  error
                  errorMessage="Something went wrong. Please try again."
                />
                <Input
                  label="Disabled"
                  placeholder="Not editable"
                  disabled
                  helperText="This field is currently unavailable."
                />
              </div>
            </div>

            <div className="subpage-group">
              <p className="subpage-group-label">With icons</p>
              <div className="overview-input-grid">
                <Input
                  label="Leading icon"
                  placeholder="Search…"
                  leadingIcon={<Icon name="search" size={18} />}
                />
                <Input
                  label="Trailing icon"
                  placeholder="you@example.com"
                  trailingIcon={<Icon name="mail" size={18} />}
                />
                <Input
                  label="Both icons"
                  placeholder="Search by name"
                  leadingIcon={<Icon name="search" size={18} />}
                  trailingIcon={<Icon name="close" size={18} />}
                />
                <Input
                  label="Error with icon"
                  placeholder="Enter email"
                  error
                  errorMessage="Invalid email address."
                  leadingIcon={<Icon name="mail" size={18} />}
                />
              </div>
            </div>

            <div className="subpage-group">
              <p className="subpage-group-label">Size variants</p>
              <div className="overview-input-grid">
                <Input
                  label="Medium (default)"
                  placeholder="size md — 48px"
                  size="md"
                  leadingIcon={<Icon name="user" size={18} />}
                />
                <Input
                  label="Small"
                  placeholder="size sm — 40px"
                  size="sm"
                  leadingIcon={<Icon name="user" size={16} />}
                />
              </div>
            </div>
          </section>

          {/* ── Alert ─────────────────────────────── */}
          <section className="subpage-section">
            <h2 className="subpage-section-title">Alert</h2>

            <div className="subpage-group">
              <p className="subpage-group-label">All variants — title only</p>
              <div className="overview-alert-stack">
                <Alert variant="info"    title="Your account review is in progress." />
                <Alert variant="success" title="Payment processed successfully." />
                <Alert variant="warning" title="Your session will expire in 5 minutes." />
                <Alert variant="error"   title="We couldn't process your request." />
              </div>
            </div>

            <div className="subpage-group">
              <p className="subpage-group-label">With title + message</p>
              <div className="overview-alert-stack">
                <Alert
                  variant="info"
                  title="Identity verification required"
                  message="Please complete your identity check before you can start accepting payments."
                />
                <Alert
                  variant="success"
                  title="Bank account linked"
                  message="Your IBAN ending in 4821 has been verified and is ready to receive payouts."
                />
                <Alert
                  variant="warning"
                  title="Document expiring soon"
                  message="Your business registration expires on 14 Mar 2026. Upload a new copy to avoid disruption."
                />
                <Alert
                  variant="error"
                  title="Payout failed"
                  message="We couldn't transfer funds to your account. Please check your bank details and try again."
                />
              </div>
            </div>

            <div className="subpage-group">
              <p className="subpage-group-label">No icon</p>
              <div className="overview-alert-stack">
                <Alert variant="info"    title="Scheduled maintenance on 1 Mar, 02:00–04:00 UTC." showIcon={false} />
                <Alert variant="success" title="Your details have been saved."                   showIcon={false} />
              </div>
            </div>

            <div className="subpage-group">
              <p className="subpage-group-label">Dismissible</p>
              <div className="overview-alert-stack">
                <Alert
                  variant="info"
                  title="New feature available"
                  message="You can now export transaction reports as CSV directly from the portal."
                  onDismiss={() => {}}
                />
                <Alert
                  variant="warning"
                  title="Action required"
                  message="Update your contact details to keep your account secure."
                  onDismiss={() => {}}
                />
              </div>
            </div>
          </section>

          {/* ── Stepper ────────────────────────────── */}
          <section className="subpage-section">
            <h2 className="subpage-section-title">Stepper</h2>

            <div className="subpage-group">
              <p className="subpage-group-label">Horizontal — step 2 active</p>
              <Stepper activeStep={1}>
                <Step label="Business details"       description="Company info &amp; address" />
                <Step label="Identity verification"  description="Upload ID documents" />
                <Step label="Banking"                description="Connect bank account" />
                <Step label="Review"                 description="Confirm &amp; submit" />
              </Stepper>
            </div>

            <div className="subpage-group">
              <p className="subpage-group-label">Horizontal — step 3 active</p>
              <Stepper activeStep={2}>
                <Step label="Business details" />
                <Step label="Identity verification" />
                <Step label="Banking" />
                <Step label="Review" />
              </Stepper>
            </div>

            <div className="subpage-group">
              <p className="subpage-group-label">Horizontal — all complete</p>
              <Stepper activeStep={4}>
                <Step label="Business details" />
                <Step label="Identity verification" />
                <Step label="Banking" />
                <Step label="Review" />
              </Stepper>
            </div>

            <div className="subpage-group">
              <p className="subpage-group-label">Vertical — step 2 active</p>
              <div style={{ maxWidth: 320 }}>
                <Stepper activeStep={1} orientation="vertical">
                  <Step
                    label="Business details"
                    description="Provide your company name, registration number, and registered address."
                  />
                  <Step
                    label="Identity verification"
                    description="Upload a government-issued photo ID for the primary account holder."
                  />
                  <Step
                    label="Banking"
                    description="Add the IBAN where payouts should be deposited."
                  />
                  <Step
                    label="Review &amp; submit"
                    description="Check your details and submit for approval."
                  />
                </Stepper>
              </div>
            </div>
          </section>

          {/* ── Card ───────────────────────────────── */}
          <section className="subpage-section">
            <h2 className="subpage-section-title">Card</h2>

            <div className="subpage-group">
              <p className="subpage-group-label">Default (elevated)</p>
              <div className="overview-card-grid">
                <Card
                  header={{ title: 'Card title', subtitle: 'Optional supporting text below the title' }}
                >
                  <p className="overview-card-body-text">
                    Card body content goes here. This slot accepts any React nodes.
                  </p>
                </Card>
              </div>
            </div>

            <div className="subpage-group">
              <p className="subpage-group-label">With footer actions</p>
              <div className="overview-card-grid">
                <Card
                  header={{ title: 'Onboarding tasks', subtitle: 'You can come back and finish this anytime' }}
                  footer={
                    <Button hierarchy="primary" fullWidth>Start identity verification</Button>
                  }
                >
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span className="overview-card-body-text">Business details</span>
                      <Chip label="Complete" variant="success" />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span className="overview-card-body-text">Identity verification</span>
                      <Chip label="To do" variant="info" />
                    </div>
                  </div>
                </Card>
              </div>
            </div>

            <div className="subpage-group">
              <p className="subpage-group-label">Flat / no shadow</p>
              <div className="overview-card-grid">
                <Card
                  elevation="flat"
                  header={{ title: 'Flat card', subtitle: 'No box shadow, useful on elevated backgrounds' }}
                >
                  <p className="overview-card-body-text">
                    Flat elevation removes the drop shadow for use on non-white surfaces.
                  </p>
                </Card>
              </div>
            </div>

            <div className="subpage-group">
              <p className="subpage-group-label">Padding sizes</p>
              <div className="overview-card-grid overview-card-grid--3">
                <Card elevation="flat" padding="sm">
                  <p className="overview-card-body-text">padding sm</p>
                </Card>
                <Card elevation="flat" padding="md">
                  <p className="overview-card-body-text">padding md (default)</p>
                </Card>
                <Card elevation="flat" padding="lg">
                  <p className="overview-card-body-text">padding lg</p>
                </Card>
              </div>
            </div>
          </section>

          {/* ── Modal ──────────────────────────────────── */}
          <section className="subpage-section">
            <h2 className="subpage-section-title">Modal</h2>

            <div className="subpage-group">
              <p className="subpage-group-label">Sizes — click to open</p>
              <div className="subpage-row">
                <Button hierarchy="secondary" size="md" onClick={() => setActiveModal('confirm-sm')}>
                  Small (400px)
                </Button>
                <Button hierarchy="secondary" size="md" onClick={() => setActiveModal('info-md')}>
                  Medium (560px)
                </Button>
                <Button hierarchy="secondary" size="md" onClick={() => setActiveModal('form-lg')}>
                  Large (720px)
                </Button>
              </div>
            </div>

            {/* Small — confirmation dialog */}
            <Modal
              isOpen={activeModal === 'confirm-sm'}
              onClose={closeModal}
              title="Remove bank account?"
              size="sm"
              footer={
                <>
                  <Button hierarchy="secondary" size="md" onClick={closeModal}>Cancel</Button>
                  <Button hierarchy="primary"   size="md" onClick={closeModal}>Remove</Button>
                </>
              }
            >
              <p>
                This will disconnect your IBAN ending in 4821. Any pending payouts will
                be placed on hold until you add a new account.
              </p>
            </Modal>

            {/* Medium — informational dialog */}
            <Modal
              isOpen={activeModal === 'info-md'}
              onClose={closeModal}
              title="Identity verification required"
              size="md"
              footer={
                <Button hierarchy="primary" size="md" onClick={closeModal}>
                  Start verification
                </Button>
              }
            >
              <p style={{ marginBottom: 12 }}>
                Before you can start accepting payments we need to verify your identity.
                This is a regulatory requirement under PSD2 and takes about 5 minutes.
              </p>
              <p>
                You'll need a government-issued photo ID (passport or national ID card)
                and a recent proof of address dated within the last 3 months.
              </p>
            </Modal>

            {/* Large — form / detail dialog */}
            <Modal
              isOpen={activeModal === 'form-lg'}
              onClose={closeModal}
              title="Edit business details"
              size="lg"
              footer={
                <>
                  <Button hierarchy="secondary" size="md" onClick={closeModal}>Cancel</Button>
                  <Button hierarchy="primary"   size="md" onClick={closeModal}>Save changes</Button>
                </>
              }
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <Input label="Legal business name" placeholder="e.g. Acme B.V." />
                <Input label="Registration number"  placeholder="e.g. KVK 12345678" />
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                  <Input label="City"    placeholder="Amsterdam" />
                  <Input label="Country" placeholder="Netherlands" />
                </div>
                <Input label="Website" placeholder="https://example.com" trailingIcon={<Icon name="arrow-right" size={16} />} />
              </div>
            </Modal>

          </section>

          {/* ── Tabs ────────────────────────────────── */}
          <section className="subpage-section">
            <h2 className="subpage-section-title">Tabs</h2>

            <div className="subpage-group">
              <p className="subpage-group-label">Default — no icons</p>
              <Tabs
                items={[
                  {
                    id: 'overview',
                    label: 'Overview',
                    children: (
                      <div className="overview-tab-body">
                        <p>Your account is active and verified. Payouts are processed every business day before 17:00 CET.</p>
                        <div className="overview-tab-stats">
                          <div className="overview-tab-stat">
                            <span className="overview-tab-stat-value">€ 12,480.00</span>
                            <span className="overview-tab-stat-label">Available balance</span>
                          </div>
                          <div className="overview-tab-stat">
                            <span className="overview-tab-stat-value">€ 3,200.00</span>
                            <span className="overview-tab-stat-label">Pending</span>
                          </div>
                          <div className="overview-tab-stat">
                            <span className="overview-tab-stat-value">247</span>
                            <span className="overview-tab-stat-label">Transactions this month</span>
                          </div>
                        </div>
                      </div>
                    ),
                  },
                  {
                    id: 'documents',
                    label: 'Documents',
                    children: (
                      <div className="overview-tab-body">
                        <p>Upload and manage the documents required for your account verification.</p>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 12 }}>
                          <div className="overview-tab-doc-row">
                            <span>Passport / National ID</span>
                            <Chip label="Verified" variant="success" />
                          </div>
                          <div className="overview-tab-doc-row">
                            <span>Proof of address</span>
                            <Chip label="Verified" variant="success" />
                          </div>
                          <div className="overview-tab-doc-row">
                            <span>Business registration</span>
                            <Chip label="Expiring soon" variant="warning" />
                          </div>
                        </div>
                      </div>
                    ),
                  },
                  {
                    id: 'payouts',
                    label: 'Payouts',
                    children: (
                      <div className="overview-tab-body">
                        <p>Payouts are sent to your registered bank account ending in <strong>4821</strong>.</p>
                        <div style={{ marginTop: 12 }}>
                          <Alert
                            variant="info"
                            title="Next payout scheduled for 28 Feb 2026"
                          />
                        </div>
                      </div>
                    ),
                  },
                ] satisfies TabItem[]}
              />
            </div>

            <div className="subpage-group">
              <p className="subpage-group-label">With icons + disabled tab</p>
              <Tabs
                items={[
                  {
                    id: 'account',
                    label: 'Account',
                    icon: <Icon name="user" size={16} />,
                    children: (
                      <div className="overview-tab-body">
                        <p>Manage your account details, business information, and contact preferences.</p>
                      </div>
                    ),
                  },
                  {
                    id: 'security',
                    label: 'Security',
                    icon: <Icon name="check-circle" size={16} />,
                    children: (
                      <div className="overview-tab-body">
                        <p>Review login activity, manage two-factor authentication, and update your password.</p>
                      </div>
                    ),
                  },
                  {
                    id: 'notifications',
                    label: 'Notifications',
                    icon: <Icon name="mail" size={16} />,
                    children: (
                      <div className="overview-tab-body">
                        <p>Choose which events trigger email or SMS notifications for your account.</p>
                      </div>
                    ),
                  },
                  {
                    id: 'api',
                    label: 'API keys',
                    icon: <Icon name="chevron-right" size={16} />,
                    disabled: true,
                    children: <></>,
                  },
                ] satisfies TabItem[]}
              />
            </div>

          </section>

          {/* ── TableCell ────────────────────────────── */}
          <section className="subpage-section">
            <h2 className="subpage-section-title">TableCell</h2>

            <div className="subpage-group">
              <p className="subpage-group-label">Table example with TableCell components</p>
              <div style={{ border: '1px solid var(--border-neutral-low)', borderRadius: '6px', overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr>
                      <th style={{
                        padding: '8px 16px',
                        textAlign: 'left',
                        fontSize: '14px',
                        fontWeight: 500,
                        color: 'var(--content-secondary)',
                        borderBottom: '1px solid var(--border-neutral-low)',
                        background: 'transparent'
                      }}>
                        <input type="checkbox" aria-label="Select all" />
                      </th>
                      <th style={{
                        padding: '8px 16px',
                        textAlign: 'left',
                        fontSize: '14px',
                        fontWeight: 500,
                        color: 'var(--content-secondary)',
                        borderBottom: '1px solid var(--border-neutral-low)',
                        background: 'transparent'
                      }}>ID</th>
                      <th style={{
                        padding: '8px 16px',
                        textAlign: 'left',
                        fontSize: '14px',
                        fontWeight: 500,
                        color: 'var(--content-secondary)',
                        borderBottom: '1px solid var(--border-neutral-low)',
                        background: 'transparent'
                      }}>Payment</th>
                      <th style={{
                        padding: '8px 16px',
                        textAlign: 'left',
                        fontSize: '14px',
                        fontWeight: 500,
                        color: 'var(--content-secondary)',
                        borderBottom: '1px solid var(--border-neutral-low)',
                        background: 'transparent'
                      }}>Status</th>
                      <th style={{
                        padding: '8px 16px',
                        textAlign: 'left',
                        fontSize: '14px',
                        fontWeight: 500,
                        color: 'var(--content-secondary)',
                        borderBottom: '1px solid var(--border-neutral-low)',
                        background: 'transparent'
                      }}>Amount</th>
                      <th style={{
                        padding: '8px 16px',
                        textAlign: 'left',
                        fontSize: '14px',
                        fontWeight: 500,
                        color: 'var(--content-secondary)',
                        borderBottom: '1px solid var(--border-neutral-low)',
                        background: 'transparent'
                      }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr style={{ cursor: 'pointer', transition: 'background-color 0.15s' }}>
                      <TableCell checkbox>
                        <input type="checkbox" aria-label="Select row" />
                      </TableCell>
                      <TableCell>#2456221</TableCell>
                      <TableCell paymentMethod={{ cardNumber: '****9382', type: 'visa' }} />
                      <TableCell chip={{ label: 'Paid', variant: 'success' }} />
                      <TableCell>€ 259,00</TableCell>
                      <TableCell actions onActionClick={() => console.log('Action clicked')} />
                    </tr>
                    <tr style={{ cursor: 'pointer', transition: 'background-color 0.15s' }}>
                      <TableCell checkbox>
                        <input type="checkbox" aria-label="Select row" />
                      </TableCell>
                      <TableCell>#2456222</TableCell>
                      <TableCell paymentMethod={{ cardNumber: '****1234', type: 'visa' }} />
                      <TableCell chip={{ label: 'Pending', variant: 'neutral' }} />
                      <TableCell>€ 150,00</TableCell>
                      <TableCell actions onActionClick={() => console.log('Action clicked')} />
                    </tr>
                    <tr style={{ cursor: 'pointer', transition: 'background-color 0.15s' }}>
                      <TableCell checkbox>
                        <input type="checkbox" aria-label="Select row" />
                      </TableCell>
                      <TableCell>#2456223</TableCell>
                      <TableCell paymentMethod={{ cardNumber: '****5678', type: 'visa' }} />
                      <TableCell chip={{ label: 'Completed', variant: 'info' }} />
                      <TableCell>€ 320,00</TableCell>
                      <TableCell actions onActionClick={() => console.log('Action clicked')} />
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="subpage-group">
              <p className="subpage-group-label">Chip variants in table cells</p>
              <div className="subpage-row">
                <TableCell chip={{ label: 'Paid', variant: 'success' }} />
                <TableCell chip={{ label: 'Pending', variant: 'neutral' }} />
                <TableCell chip={{ label: 'Failed', variant: 'warning' }} />
                <TableCell chip={{ label: 'Info', variant: 'info' }} />
              </div>
            </div>

            <div className="subpage-group">
              <p className="subpage-group-label">Payment method cell</p>
              <div className="subpage-row">
                <TableCell paymentMethod={{ cardNumber: '****9382', type: 'visa' }} />
                <TableCell paymentMethod={{ cardNumber: '****1234', type: 'visa' }} />
              </div>
            </div>
          </section>

        </div>
      </main>
    </div>
  )
}
