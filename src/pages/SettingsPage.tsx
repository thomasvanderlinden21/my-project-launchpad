import { useState } from 'react'
import Button from '../components/Button'
import Checkbox from '../components/Checkbox'
import ExpansionPanel from '../components/ExpansionPanel'
import SettingsDetailPage from './SettingsDetailPage'
import UsersPage from './UsersPage'
import { useTheme } from '../context/ThemeContext'
import Icon from '../components/Icon'
import type { IconName } from '../components/Icon'
import './SettingsPage.css'

export interface SettingsPageProps {
  activeSection?: string
  onNavigate?: (section: string) => void
}

interface SettingCard {
  id: string
  title: string
  description: string
  category: 'company' | 'personal'
  icon: IconName
}

const settingsCards: SettingCard[] = [
  {
    id: 'users',
    title: 'Users',
    description: 'Manage team members, roles and access to your organisations.',
    category: 'company',
    icon: 'users',
  },
  {
    id: 'company-details',
    title: 'Company details',
    description: 'Update your company information, legal entity, and contract details.',
    category: 'company',
    icon: 'apartment',
  },
  {
    id: 'ecommerce',
    title: 'E-commerce',
    description: 'Configure online store settings, integrations and payment options.',
    category: 'company',
    icon: 'shopping-basket',
  },
  {
    id: 'terminals-settings',
    title: 'Terminals',
    description: 'Manage payment terminals, devices, and in-store settings.',
    category: 'company',
    icon: 'storefront',
  },
  {
    id: 'fraud',
    title: 'Fraud',
    description: 'Monitor fraud activity and configure protection rules.',
    category: 'company',
    icon: 'shield-question',
  },
  {
    id: 'branding',
    title: 'Your branding',
    description: 'Customise your invoices, payment pages and billing.',
    category: 'company',
    icon: 'palette',
  },
  {
    id: 'bank-accounts',
    title: 'Bank accounts',
    description: 'Add and manage bank accounts used for payouts and settlements.',
    category: 'company',
    icon: 'bank',
  },
  {
    id: 'contracts',
    title: 'Contracts',
    description: 'View and manage agreements, documents and legal terms.',
    category: 'company',
    icon: 'document',
  },
  {
    id: 'personal-details',
    title: 'Personal details',
    description: 'Update your contact information, password and authentication.',
    category: 'personal',
    icon: 'person',
  },
  {
    id: 'preferences',
    title: 'Preferences',
    description: 'Set language, notifications and personal dashboard preferences.',
    category: 'personal',
    icon: 'tune',
  },
]

export default function SettingsPage({ activeSection = 'overview', onNavigate }: SettingsPageProps) {
  const { isDark, toggle } = useTheme()
  const [themePreference, setThemePreference] = useState<'system' | 'light' | 'dark'>(isDark ? 'dark' : 'light')

  const handleThemeChange = (value: 'system' | 'light' | 'dark') => {
    setThemePreference(value)
    // For now, we'll just toggle between light and dark
    // System preference would require additional logic to detect OS theme
    if (value === 'dark' && !isDark) {
      toggle()
    } else if (value === 'light' && isDark) {
      toggle()
    }
  }

  if (activeSection === 'overview') {
    const companySettings = settingsCards.filter(card => card.category === 'company')
    const personalSettings = settingsCards.filter(card => card.category === 'personal')

    return (
      <div className="settings-page">
        <div className="settings-page__section">
          <h2 className="settings-page__section-title">Company settings</h2>
          <div className="settings-page__grid">
            {companySettings.map(card => (
              <button
                key={card.id}
                className="settings-card"
                onClick={() => onNavigate?.(card.id)}
              >
                <div className="settings-card__icon">
                  <Icon name={card.icon} size={24} />
                </div>
                <div className="settings-card__content">
                  <h3 className="settings-card__title">{card.title}</h3>
                  <p className="settings-card__description">{card.description}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="settings-page__section">
          <h2 className="settings-page__section-title">Personal settings</h2>
          <div className="settings-page__grid">
            {personalSettings.map(card => (
              <button
                key={card.id}
                className="settings-card"
                onClick={() => onNavigate?.(card.id)}
              >
                <div className="settings-card__icon">
                  <Icon name={card.icon} size={24} />
                </div>
                <div className="settings-card__content">
                  <h3 className="settings-card__title">{card.title}</h3>
                  <p className="settings-card__description">{card.description}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    )
  }

  // Render individual settings sections
  if (activeSection === 'preferences') {
    return (
      <SettingsDetailPage
        sections={[
          {
            title: 'Notification settings',
            description: 'Customize your notification settings to stay updated.',
            content: (
              <div className="settings-detail__checkbox-grid">
                <Checkbox
                  defaultChecked
                  label="Transaction notifications"
                  description="Receive notifications for all successful transactions"
                />
                <Checkbox
                  label="Failed payment alerts"
                  description="Get notified when a payment fails or is declined"
                />
                <Checkbox
                  label="Refund notifications"
                  description="Alerts when refunds are processed or requested"
                />
                <Checkbox
                  label="Weekly reports"
                  description="Receive weekly summaries of your sales and transactions"
                />
                <Checkbox
                  label="Security alerts"
                  description="Important notifications about account security"
                />
                <Checkbox
                  label="Product updates"
                  description="Stay informed about new features and improvements"
                />
              </div>
            )
          },
          {
            title: 'Display',
            description: 'Switch between light and dark modes.',
            content: (
              <div className="settings-detail__theme-grid">
                <label className="settings-detail__theme-card">
                  <input
                    type="radio"
                    name="theme"
                    value="system"
                    checked={themePreference === 'system'}
                    onChange={(e) => handleThemeChange(e.target.value as 'system')}
                    className="settings-detail__theme-radio"
                  />
                  <div className="settings-detail__theme-preview settings-detail__theme-preview--system" />
                  <span className="settings-detail__theme-label">System preference</span>
                </label>
                <label className="settings-detail__theme-card">
                  <input
                    type="radio"
                    name="theme"
                    value="light"
                    checked={themePreference === 'light'}
                    onChange={(e) => handleThemeChange(e.target.value as 'light')}
                    className="settings-detail__theme-radio"
                  />
                  <div className="settings-detail__theme-preview settings-detail__theme-preview--light" />
                  <span className="settings-detail__theme-label">Light mode</span>
                </label>
                <label className="settings-detail__theme-card">
                  <input
                    type="radio"
                    name="theme"
                    value="dark"
                    checked={themePreference === 'dark'}
                    onChange={(e) => handleThemeChange(e.target.value as 'dark')}
                    className="settings-detail__theme-radio"
                  />
                  <div className="settings-detail__theme-preview settings-detail__theme-preview--dark" />
                  <span className="settings-detail__theme-label">Dark mode</span>
                </label>
              </div>
            )
          },
          {
            title: 'Accessibility',
            description: 'Please select a preferred language for your dashboard, including date, time and number formatting.',
            content: (
              <div className="settings-detail__form-grid">
                <div className="settings-detail__form-field">
                  <label className="settings-detail__label">Company name</label>
                  <input
                    type="text"
                    className="settings-detail__input"
                    placeholder="Enter company name"
                  />
                </div>
                <div className="settings-detail__form-field">
                  <label className="settings-detail__label">Legal form</label>
                  <input
                    type="text"
                    className="settings-detail__input"
                    placeholder="Enter company name"
                  />
                </div>
                <div className="settings-detail__form-field">
                  <label className="settings-detail__label">Email address</label>
                  <input
                    type="email"
                    className="settings-detail__input"
                    placeholder="Enter company name"
                  />
                </div>
              </div>
            )
          }
        ]}
        onCancel={() => onNavigate?.('overview')}
        onSave={() => console.log('Save changes')}
      />
    )
  }

  if (activeSection === 'company-details') {
    return (
      <SettingsDetailPage
        sections={[
          {
            title: 'Company information',
            description: 'Manage your company details and legal information.',
            content: (
              <div className="settings-detail__form-grid">
                <div className="settings-detail__form-field">
                  <label className="settings-detail__label">Company name</label>
                  <input
                    type="text"
                    className="settings-detail__input"
                    defaultValue="Cycle Shop BV"
                    placeholder="Enter company name"
                  />
                </div>
                <div className="settings-detail__form-field">
                  <label className="settings-detail__label">Legal form</label>
                  <input
                    type="text"
                    className="settings-detail__input"
                    defaultValue="BV"
                    placeholder="Enter legal form"
                  />
                </div>
                <div className="settings-detail__form-field">
                  <label className="settings-detail__label">Registration number</label>
                  <input
                    type="text"
                    className="settings-detail__input"
                    defaultValue="12345678"
                    placeholder="Enter registration number"
                  />
                </div>
                <div className="settings-detail__form-field">
                  <label className="settings-detail__label">VAT number</label>
                  <input
                    type="text"
                    className="settings-detail__input"
                    defaultValue="NL123456789B01"
                    placeholder="Enter VAT number"
                  />
                </div>
                <div className="settings-detail__form-field">
                  <label className="settings-detail__label">Email address</label>
                  <input
                    type="email"
                    className="settings-detail__input"
                    defaultValue="info@cycleshop.nl"
                    placeholder="Enter email address"
                  />
                </div>
                <div className="settings-detail__form-field">
                  <label className="settings-detail__label">Phone number</label>
                  <input
                    type="tel"
                    className="settings-detail__input"
                    defaultValue="+31 20 123 4567"
                    placeholder="Enter phone number"
                  />
                </div>
              </div>
            )
          },
          {
            title: 'Store locations',
            description: 'Manage your physical store locations and addresses.',
            content: (
              <div className="settings-detail__expansion-panels">
                <ExpansionPanel
                  title="Cycle shop #1"
                  description="Damrak 123, Amsterdam"
                  defaultExpanded={true}
                >
                  <div className="settings-detail__form-grid">
                    <div className="settings-detail__form-field">
                      <label className="settings-detail__label">Store name</label>
                      <input
                        type="text"
                        className="settings-detail__input"
                        defaultValue="Cycle shop #1"
                        placeholder="Enter store name"
                      />
                    </div>
                    <div className="settings-detail__form-field">
                      <label className="settings-detail__label">Store ID</label>
                      <input
                        type="text"
                        className="settings-detail__input"
                        defaultValue="CS001"
                        placeholder="Enter store ID"
                      />
                    </div>
                    <div className="settings-detail__form-field">
                      <label className="settings-detail__label">Street address</label>
                      <input
                        type="text"
                        className="settings-detail__input"
                        defaultValue="Damrak 123"
                        placeholder="Enter street address"
                      />
                    </div>
                    <div className="settings-detail__form-field">
                      <label className="settings-detail__label">Postal code</label>
                      <input
                        type="text"
                        className="settings-detail__input"
                        defaultValue="1012 AB"
                        placeholder="Enter postal code"
                      />
                    </div>
                    <div className="settings-detail__form-field">
                      <label className="settings-detail__label">City</label>
                      <input
                        type="text"
                        className="settings-detail__input"
                        defaultValue="Amsterdam"
                        placeholder="Enter city"
                      />
                    </div>
                    <div className="settings-detail__form-field">
                      <label className="settings-detail__label">Country</label>
                      <select className="settings-detail__select" defaultValue="nl">
                        <option value="nl">Netherlands</option>
                        <option value="be">Belgium</option>
                        <option value="de">Germany</option>
                        <option value="fr">France</option>
                        <option value="gb">United Kingdom</option>
                      </select>
                    </div>
                  </div>
                </ExpansionPanel>
                <ExpansionPanel
                  title="Cycle shop #2"
                  description="Kalverstraat 45, Amsterdam"
                >
                  <div className="settings-detail__form-grid">
                    <div className="settings-detail__form-field">
                      <label className="settings-detail__label">Store name</label>
                      <input
                        type="text"
                        className="settings-detail__input"
                        defaultValue="Cycle shop #2"
                        placeholder="Enter store name"
                      />
                    </div>
                    <div className="settings-detail__form-field">
                      <label className="settings-detail__label">Store ID</label>
                      <input
                        type="text"
                        className="settings-detail__input"
                        defaultValue="CS002"
                        placeholder="Enter store ID"
                      />
                    </div>
                    <div className="settings-detail__form-field">
                      <label className="settings-detail__label">Street address</label>
                      <input
                        type="text"
                        className="settings-detail__input"
                        defaultValue="Kalverstraat 45"
                        placeholder="Enter street address"
                      />
                    </div>
                    <div className="settings-detail__form-field">
                      <label className="settings-detail__label">Postal code</label>
                      <input
                        type="text"
                        className="settings-detail__input"
                        defaultValue="1012 PX"
                        placeholder="Enter postal code"
                      />
                    </div>
                    <div className="settings-detail__form-field">
                      <label className="settings-detail__label">City</label>
                      <input
                        type="text"
                        className="settings-detail__input"
                        defaultValue="Amsterdam"
                        placeholder="Enter city"
                      />
                    </div>
                    <div className="settings-detail__form-field">
                      <label className="settings-detail__label">Country</label>
                      <select className="settings-detail__select" defaultValue="nl">
                        <option value="nl">Netherlands</option>
                        <option value="be">Belgium</option>
                        <option value="de">Germany</option>
                        <option value="fr">France</option>
                        <option value="gb">United Kingdom</option>
                      </select>
                    </div>
                  </div>
                </ExpansionPanel>
                <ExpansionPanel
                  title="Cycle shop #3"
                  description="Haarlemmerstraat 78, Amsterdam"
                >
                  <div className="settings-detail__form-grid">
                    <div className="settings-detail__form-field">
                      <label className="settings-detail__label">Store name</label>
                      <input
                        type="text"
                        className="settings-detail__input"
                        defaultValue="Cycle shop #3"
                        placeholder="Enter store name"
                      />
                    </div>
                    <div className="settings-detail__form-field">
                      <label className="settings-detail__label">Store ID</label>
                      <input
                        type="text"
                        className="settings-detail__input"
                        defaultValue="CS003"
                        placeholder="Enter store ID"
                      />
                    </div>
                    <div className="settings-detail__form-field">
                      <label className="settings-detail__label">Street address</label>
                      <input
                        type="text"
                        className="settings-detail__input"
                        defaultValue="Haarlemmerstraat 78"
                        placeholder="Enter street address"
                      />
                    </div>
                    <div className="settings-detail__form-field">
                      <label className="settings-detail__label">Postal code</label>
                      <input
                        type="text"
                        className="settings-detail__input"
                        defaultValue="1013 EV"
                        placeholder="Enter postal code"
                      />
                    </div>
                    <div className="settings-detail__form-field">
                      <label className="settings-detail__label">City</label>
                      <input
                        type="text"
                        className="settings-detail__input"
                        defaultValue="Amsterdam"
                        placeholder="Enter city"
                      />
                    </div>
                    <div className="settings-detail__form-field">
                      <label className="settings-detail__label">Country</label>
                      <select className="settings-detail__select" defaultValue="nl">
                        <option value="nl">Netherlands</option>
                        <option value="be">Belgium</option>
                        <option value="de">Germany</option>
                        <option value="fr">France</option>
                        <option value="gb">United Kingdom</option>
                      </select>
                    </div>
                  </div>
                </ExpansionPanel>
              </div>
            )
          }
        ]}
        onCancel={() => onNavigate?.('overview')}
        onSave={() => console.log('Save changes')}
      />
    )
  }

  if (activeSection === 'personal-details') {
    return (
      <SettingsDetailPage
        sections={[
          {
            title: 'Personal information',
            description: 'Screen display, receipt.',
            content: (
              <div className="settings-detail__form-grid">
                <div className="settings-detail__form-field">
                  <label className="settings-detail__label">First name</label>
                  <input
                    type="text"
                    className="settings-detail__input"
                    defaultValue="Olivia"
                  />
                </div>
                <div className="settings-detail__form-field">
                  <label className="settings-detail__label">Last name</label>
                  <input
                    type="text"
                    className="settings-detail__input"
                    defaultValue="Rhye"
                  />
                </div>
                <div className="settings-detail__form-field">
                  <label className="settings-detail__label">Phone number</label>
                  <input
                    type="tel"
                    className="settings-detail__input"
                    defaultValue="+31 6 12 34 56 78"
                  />
                </div>
                <div className="settings-detail__form-field">
                  <label className="settings-detail__label">Email address</label>
                  <input
                    type="email"
                    className="settings-detail__input"
                    defaultValue="olivia.rhye@icloud.com"
                  />
                </div>
              </div>
            )
          },
          {
            title: 'Two-factor authentication',
            description: "Increase your account's security by using multiple authentication methods to verify your identity.",
            content: (
              <div>
                <Button hierarchy="secondary">Add authentication method</Button>
              </div>
            )
          },
          {
            title: 'Language',
            description: 'Please select a preferred language for your dashboard, including date, time and number formatting.',
            content: (
              <div className="settings-detail__form-grid">
                <div className="settings-detail__form-field">
                  <label className="settings-detail__label">Language</label>
                  <select className="settings-detail__select" defaultValue="en-gb">
                    <option value="en-gb">English (United Kingdom)</option>
                    <option value="en-us">English (United States)</option>
                    <option value="nl">Nederlands</option>
                    <option value="fr">Français</option>
                    <option value="de">Deutsch</option>
                  </select>
                </div>
              </div>
            )
          }
        ]}
        onCancel={() => onNavigate?.('overview')}
        onSave={() => console.log('Save changes')}
      />
    )
  }

  if (activeSection === 'users') {
    return <UsersPage />
  }

  // Placeholder for other settings sections
  return (
    <SettingsDetailPage
      sections={[
        {
          title: activeSection.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
          description: `Configure your ${activeSection.replace('-', ' ')} settings.`,
          content: (
            <div className="settings-page__placeholder">
              <p>Settings content for {activeSection} will be displayed here.</p>
            </div>
          )
        }
      ]}
      onCancel={() => onNavigate?.('overview')}
      onSave={() => console.log('Save changes')}
    />
  )
}
