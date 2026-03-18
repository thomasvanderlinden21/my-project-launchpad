import { useState } from 'react'
import Tabs from '../components/Tabs'
import type { TabItem } from '../components/Tabs'
import Chip from '../components/Chip'
import Button from '../components/Button'
import Icon from '../components/Icon'
import './TerminalDetailPage.css'

interface TerminalDetail {
  id: string
  name: string
  model: string
  serialNumber: string
  imageSrc?: string
  statusChips: { label: string; variant: 'success' | 'warning' | 'info' | 'neutral' }[]
  terminalInfo: {
    terminalModel: string
    serialNumber: string
    creationDate: string
    lastTmsCall: { label: string; variant: 'success' | 'warning' | 'neutral' }
  }
  identification: {
    terminalId: string
    terminalModel: string
    serialNumber: string
    softwareVersion: string
    ep2Features: string[]
    storeName: string
    address: string
    deliveryDate: string
    contractType: string
    supportType: string
    endOfSupportDate: string
  }
  integrations: {
    id: string
    name: string
    description: string
    imageSrc?: string
    enabled: boolean
  }[]
}

// Mock data
const mockTerminals: Record<string, TerminalDetail> = {
  '1': {
    id: '1',
    name: 'Outside main terminal #1',
    model: 'AXIUM RX 7000',
    serialNumber: '1926D82',
    imageSrc: '/terminal-images/axium-rx-7000.png',
    statusChips: [
      { label: 'Online', variant: 'success' },
      { label: 'Transacting', variant: 'success' }
    ],
    terminalInfo: {
      terminalModel: 'AXIUM RX 7000',
      serialNumber: '1926D82',
      creationDate: '2025/01/17 12:00:00 UTC',
      lastTmsCall: { label: 'Online', variant: 'success' }
    },
    identification: {
      terminalId: '31398885',
      terminalModel: 'Saturn 1000F2',
      serialNumber: '19265D8B',
      softwareVersion: 'BX_EP2_740_23_109A_C1 (Test)',
      ep2Features: [
        'BookingC',
        'redit advice',
        'Follow on credit',
        'Booking phone auth.',
        'Reversal',
        'Finance balance indicator'
      ],
      storeName: 'Cycle shop #2',
      address: 'Kalverstraat 45, Amsterdam',
      deliveryDate: '17/01/2025',
      contractType: 'Rental (36 months)',
      supportType: 'Premium support',
      endOfSupportDate: '17/01/2028'
    },
    integrations: [
      {
        id: '1',
        name: 'Integration A',
        description: 'Connect your terminal to Integration A for seamless payment processing.',
        enabled: true
      },
      {
        id: '2',
        name: 'Integration B',
        description: 'Enable Integration B to sync transaction data automatically.',
        enabled: false
      },
      {
        id: '3',
        name: 'Integration C',
        description: 'Integration C provides advanced analytics and reporting features.',
        enabled: true
      },
      {
        id: '4',
        name: 'Integration D',
        description: 'Connect with Integration D for inventory management.',
        enabled: false
      },
      {
        id: '5',
        name: 'Integration E',
        description: 'Integration E offers customer loyalty program integration.',
        enabled: true
      }
    ]
  },
  '2': {
    id: '2',
    name: 'Inside main terminal #1',
    model: 'MOVE 5000',
    serialNumber: '1926D83',
    statusChips: [
      { label: 'Online', variant: 'success' },
      { label: 'Update available', variant: 'warning' }
    ],
    terminalInfo: {
      terminalModel: 'MOVE 5000',
      serialNumber: '1926D83',
      creationDate: '2024/12/10 09:30:00 UTC',
      lastTmsCall: { label: 'Online', variant: 'success' }
    },
    identification: {
      terminalId: '31398886',
      terminalModel: 'MOVE 5000',
      serialNumber: '19265D8C',
      softwareVersion: 'BX_EP2_740_23_108B_C1 (Production)',
      ep2Features: [
        'Contactless payments',
        'PIN verification',
        'Receipt printing',
        'Multi-currency support'
      ],
      storeName: 'Cycle shop #2',
      address: 'Main counter, Kalverstraat 45, Amsterdam',
      deliveryDate: '10/12/2024',
      contractType: 'Purchase',
      supportType: 'Standard support',
      endOfSupportDate: '10/12/2027'
    },
    integrations: [
      {
        id: '1',
        name: 'Integration A',
        description: 'Connect your terminal to Integration A for seamless payment processing.',
        enabled: true
      },
      {
        id: '2',
        name: 'Integration B',
        description: 'Enable Integration B to sync transaction data automatically.',
        enabled: true
      },
      {
        id: '3',
        name: 'Integration C',
        description: 'Integration C provides advanced analytics and reporting features.',
        enabled: false
      },
      {
        id: '4',
        name: 'Integration D',
        description: 'Connect with Integration D for inventory management.',
        enabled: true
      },
      {
        id: '5',
        name: 'Integration E',
        description: 'Integration E offers customer loyalty program integration.',
        enabled: false
      }
    ]
  },
  '3': {
    id: '3',
    name: 'Mobile terminal #1',
    model: 'YOXIMO',
    serialNumber: '1926D84',
    statusChips: [
      { label: 'Online', variant: 'success' }
    ],
    terminalInfo: {
      terminalModel: 'YOXIMO',
      serialNumber: '1926D84',
      creationDate: '2025/01/05 14:15:00 UTC',
      lastTmsCall: { label: 'Online', variant: 'success' }
    },
    identification: {
      terminalId: '31398887',
      terminalModel: 'YOXIMO',
      serialNumber: '19265D8D',
      softwareVersion: 'YX_MOB_520_12_045A_C2 (Production)',
      ep2Features: [
        'Mobile payments',
        'NFC support',
        'Battery powered',
        'Bluetooth connectivity'
      ],
      storeName: 'Cycle shop #2',
      address: 'Delivery van, Mobile unit',
      deliveryDate: '05/01/2025',
      contractType: 'Rental (24 months)',
      supportType: 'Premium support',
      endOfSupportDate: '05/01/2027'
    },
    integrations: [
      {
        id: '1',
        name: 'Integration A',
        description: 'Connect your terminal to Integration A for seamless payment processing.',
        enabled: true
      },
      {
        id: '2',
        name: 'Integration B',
        description: 'Enable Integration B to sync transaction data automatically.',
        enabled: false
      },
      {
        id: '3',
        name: 'Integration C',
        description: 'Integration C provides advanced analytics and reporting features.',
        enabled: true
      },
      {
        id: '4',
        name: 'Integration D',
        description: 'Connect with Integration D for inventory management.',
        enabled: false
      },
      {
        id: '5',
        name: 'Integration E',
        description: 'Integration E offers customer loyalty program integration.',
        enabled: true
      }
    ]
  },
  '4': {
    id: '4',
    name: 'Terminal #4',
    model: 'DESK 3500',
    serialNumber: '1926D85',
    statusChips: [
      { label: 'Shipped', variant: 'info' }
    ],
    terminalInfo: {
      terminalModel: 'DESK 3500',
      serialNumber: '1926D85',
      creationDate: '2025/02/01 10:00:00 UTC',
      lastTmsCall: { label: 'Offline', variant: 'neutral' }
    },
    identification: {
      terminalId: '31398888',
      terminalModel: 'DESK 3500',
      serialNumber: '19265D8E',
      softwareVersion: 'DK_EP2_350_18_092A_C1 (Test)',
      ep2Features: [
        'Chip & PIN',
        'Magnetic stripe',
        'Contactless',
        'QR code payments'
      ],
      storeName: 'Cycle shop #3',
      address: 'Pending installation',
      deliveryDate: '01/02/2025',
      contractType: 'Purchase',
      supportType: 'Standard support',
      endOfSupportDate: '01/02/2028'
    },
    integrations: [
      {
        id: '1',
        name: 'Integration A',
        description: 'Connect your terminal to Integration A for seamless payment processing.',
        enabled: false
      },
      {
        id: '2',
        name: 'Integration B',
        description: 'Enable Integration B to sync transaction data automatically.',
        enabled: false
      },
      {
        id: '3',
        name: 'Integration C',
        description: 'Integration C provides advanced analytics and reporting features.',
        enabled: false
      },
      {
        id: '4',
        name: 'Integration D',
        description: 'Connect with Integration D for inventory management.',
        enabled: false
      },
      {
        id: '5',
        name: 'Integration E',
        description: 'Integration E offers customer loyalty program integration.',
        enabled: false
      }
    ]
  },
  '5': {
    id: '5',
    name: 'Terminal #5',
    model: 'iPP 320',
    serialNumber: '1926D86',
    statusChips: [
      { label: 'Inactive', variant: 'neutral' }
    ],
    terminalInfo: {
      terminalModel: 'iPP 320',
      serialNumber: '1926D86',
      creationDate: '2024/08/15 11:20:00 UTC',
      lastTmsCall: { label: 'Offline', variant: 'neutral' }
    },
    identification: {
      terminalId: '31398889',
      terminalModel: 'iPP 320',
      serialNumber: '19265D8F',
      softwareVersion: 'IP_EP2_320_15_078A_C1 (Production)',
      ep2Features: [
        'Compact design',
        'PIN entry',
        'Receipt printer',
        'Ethernet connectivity'
      ],
      storeName: 'Cycle shop #2',
      address: 'Storage, Kalverstraat 45, Amsterdam',
      deliveryDate: '15/08/2024',
      contractType: 'Rental (12 months)',
      supportType: 'Basic support',
      endOfSupportDate: '15/08/2025'
    },
    integrations: [
      {
        id: '1',
        name: 'Integration A',
        description: 'Connect your terminal to Integration A for seamless payment processing.',
        enabled: false
      },
      {
        id: '2',
        name: 'Integration B',
        description: 'Enable Integration B to sync transaction data automatically.',
        enabled: false
      },
      {
        id: '3',
        name: 'Integration C',
        description: 'Integration C provides advanced analytics and reporting features.',
        enabled: false
      },
      {
        id: '4',
        name: 'Integration D',
        description: 'Connect with Integration D for inventory management.',
        enabled: false
      },
      {
        id: '5',
        name: 'Integration E',
        description: 'Integration E offers customer loyalty program integration.',
        enabled: false
      }
    ]
  },
  '6': {
    id: '6',
    name: 'Card Reader #1',
    model: 'LINK 2500',
    serialNumber: '1926D87',
    statusChips: [
      { label: 'Online', variant: 'success' }
    ],
    terminalInfo: {
      terminalModel: 'LINK 2500',
      serialNumber: '1926D87',
      creationDate: '2024/11/20 08:45:00 UTC',
      lastTmsCall: { label: 'Online', variant: 'success' }
    },
    identification: {
      terminalId: '31398890',
      terminalModel: 'LINK 2500',
      serialNumber: '19265D90',
      softwareVersion: 'LK_EP2_250_10_065A_C1 (Production)',
      ep2Features: [
        'Card reading',
        'Chip support',
        'Contactless',
        'USB connectivity'
      ],
      storeName: 'Cycle shop #2',
      address: 'Accessory station, Kalverstraat 45, Amsterdam',
      deliveryDate: '20/11/2024',
      contractType: 'Purchase',
      supportType: 'Standard support',
      endOfSupportDate: '20/11/2027'
    },
    integrations: [
      {
        id: '1',
        name: 'Integration A',
        description: 'Connect your terminal to Integration A for seamless payment processing.',
        enabled: true
      },
      {
        id: '2',
        name: 'Integration B',
        description: 'Enable Integration B to sync transaction data automatically.',
        enabled: true
      },
      {
        id: '3',
        name: 'Integration C',
        description: 'Integration C provides advanced analytics and reporting features.',
        enabled: false
      },
      {
        id: '4',
        name: 'Integration D',
        description: 'Connect with Integration D for inventory management.',
        enabled: false
      },
      {
        id: '5',
        name: 'Integration E',
        description: 'Integration E offers customer loyalty program integration.',
        enabled: false
      }
    ]
  },
  '7': {
    id: '7',
    name: 'Receipt Printer #1',
    model: 'TRP 100',
    serialNumber: '1926D88',
    statusChips: [
      { label: 'Online', variant: 'success' }
    ],
    terminalInfo: {
      terminalModel: 'TRP 100',
      serialNumber: '1926D88',
      creationDate: '2024/10/05 16:00:00 UTC',
      lastTmsCall: { label: 'Online', variant: 'success' }
    },
    identification: {
      terminalId: '31398891',
      terminalModel: 'TRP 100',
      serialNumber: '19265D91',
      softwareVersion: 'TP_EP2_100_08_042A_C1 (Production)',
      ep2Features: [
        'Thermal printing',
        'Auto-cut',
        'High-speed',
        'Ethernet/USB'
      ],
      storeName: 'Cycle shop #2',
      address: 'Main counter, Kalverstraat 45, Amsterdam',
      deliveryDate: '05/10/2024',
      contractType: 'Purchase',
      supportType: 'Basic support',
      endOfSupportDate: '05/10/2027'
    },
    integrations: [
      {
        id: '1',
        name: 'Integration A',
        description: 'Connect your terminal to Integration A for seamless payment processing.',
        enabled: true
      },
      {
        id: '2',
        name: 'Integration B',
        description: 'Enable Integration B to sync transaction data automatically.',
        enabled: false
      },
      {
        id: '3',
        name: 'Integration C',
        description: 'Integration C provides advanced analytics and reporting features.',
        enabled: false
      },
      {
        id: '4',
        name: 'Integration D',
        description: 'Connect with Integration D for inventory management.',
        enabled: true
      },
      {
        id: '5',
        name: 'Integration E',
        description: 'Integration E offers customer loyalty program integration.',
        enabled: false
      }
    ]
  }
}

export interface TerminalDetailPageProps {
  terminalId?: string
  onBack?: () => void
}

export default function TerminalDetailPage({ terminalId = '1', onBack }: TerminalDetailPageProps) {
  const [activeTab, setActiveTab] = useState('identification')

  const terminal = terminalId ? mockTerminals[terminalId] : null

  if (!terminal) {
    return (
      <div className="terminal-detail-page">
        <div className="terminal-detail-page__not-found">
          <h1>Terminal not found</h1>
          <Button hierarchy="secondary" onClick={onBack}>
            Back to Terminals
          </Button>
        </div>
      </div>
    )
  }

  const tabItems: TabItem[] = [
    { id: 'identification', label: 'Identification', children: null },
    { id: 'interface', label: 'Interface & Display', children: null },
    { id: 'technical', label: 'Technical configuration', children: null },
    { id: 'payment', label: 'Payment configuration', children: null },
    { id: 'integrations', label: 'Integrations', children: null },
    { id: 'logs', label: 'Logs', children: null }
  ]

  return (
    <div className="terminal-detail-page">
      {/* Page Header */}
      <div className="terminal-detail-page__header">
        <div className="terminal-detail-page__header-left">
          <div className="terminal-detail-page__title-row">
            <h1 className="terminal-detail-page__title">{terminal.name}</h1>
            {terminal.statusChips.map((chip, index) => (
              <Chip key={index} label={chip.label} variant={chip.variant} size="lg" />
            ))}
          </div>
          <p className="terminal-detail-page__subtitle">
            {terminal.model} | {terminal.model}
          </p>
        </div>
        <Button hierarchy="primary" size="md" iconRight="chevron-down">
          Actions
        </Button>
      </div>

      {/* Hero Section */}
      <div className="terminal-detail-page__hero">
        <div className="terminal-detail-page__hero-card">
          <div className="terminal-detail-page__hero-image">
            <img
              src="/assets/terminal-placeholder.png"
              alt={terminal.name}
              className="terminal-detail-page__terminal-image"
            />
          </div>
          <div className="terminal-detail-page__hero-info">
            <h3 className="terminal-detail-page__hero-title">Terminal information</h3>
            <div className="terminal-detail-page__info-row">
              <span className="terminal-detail-page__info-label">Terminal model</span>
              <span className="terminal-detail-page__info-value">{terminal.terminalInfo.terminalModel}</span>
            </div>
            <div className="terminal-detail-page__info-row">
              <span className="terminal-detail-page__info-label">Serial number</span>
              <span className="terminal-detail-page__info-value">{terminal.terminalInfo.serialNumber}</span>
            </div>
            <div className="terminal-detail-page__info-row">
              <span className="terminal-detail-page__info-label">Creation date</span>
              <span className="terminal-detail-page__info-value">{terminal.terminalInfo.creationDate}</span>
            </div>
            <div className="terminal-detail-page__info-row">
              <span className="terminal-detail-page__info-label">Last TMS call</span>
              <div className="terminal-detail-page__info-value">
                <Chip
                  label={terminal.terminalInfo.lastTmsCall.label}
                  variant={terminal.terminalInfo.lastTmsCall.variant}
                  size="sm"
                />
              </div>
            </div>
            <div className="terminal-detail-page__info-row">
              <span className="terminal-detail-page__info-label">Creation date</span>
              <span className="terminal-detail-page__info-value">{terminal.terminalInfo.creationDate}</span>
            </div>
          </div>
        </div>

        <div className="terminal-detail-page__hero-actions">
          <button className="terminal-detail-page__action-item">
            <Icon name="visibility" size={20} />
            <span>Show password</span>
          </button>
          <button className="terminal-detail-page__action-item">
            <Icon name="close" size={20} />
            <span>Deactivate</span>
          </button>
          <button className="terminal-detail-page__action-item">
            <Icon name="leak-remove" size={20} />
            <span>Unbind</span>
          </button>
          <button className="terminal-detail-page__action-item">
            <Icon name="bolt" size={20} />
            <span>Trigger pin</span>
          </button>
          <button className="terminal-detail-page__action-item">
            <Icon name="replay" size={20} />
            <span>Restart</span>
          </button>
          <button className="terminal-detail-page__action-item">
            <Icon name="add" size={20} />
            <span>Take control</span>
          </button>
        </div>
      </div>

      {/* Tabs Section */}
      <div className="terminal-detail-page__tabs">
        <Tabs
          items={tabItems}
          activeId={activeTab}
          onChange={setActiveTab}
        />
      </div>

      {/* Tab Content */}
      <div className="terminal-detail-page__content">
        {activeTab === 'identification' && (
          <div className="terminal-detail-page__identification">
            {/* Terminal information */}
            <div className="terminal-detail-section">
              <h3 className="terminal-detail-section__title">Terminal information</h3>
              <div className="terminal-detail-section__row">
                <span className="terminal-detail-section__label">Terminal ID</span>
                <span className="terminal-detail-section__value">{terminal.identification.terminalId}</span>
              </div>
              <div className="terminal-detail-section__row">
                <span className="terminal-detail-section__label">Terminal model</span>
                <span className="terminal-detail-section__value">{terminal.identification.terminalModel}</span>
              </div>
              <div className="terminal-detail-section__row">
                <span className="terminal-detail-section__label">Serial Number</span>
                <span className="terminal-detail-section__value">{terminal.identification.serialNumber}</span>
              </div>
            </div>

            <div className="terminal-detail-section__divider" />

            {/* Software */}
            <div className="terminal-detail-section">
              <h3 className="terminal-detail-section__title">Software</h3>
              <div className="terminal-detail-section__row">
                <span className="terminal-detail-section__label">Master software version</span>
                <span className="terminal-detail-section__value">{terminal.identification.softwareVersion}</span>
              </div>
              <div className="terminal-detail-section__row terminal-detail-section__row--top">
                <span className="terminal-detail-section__label">EP2 Features</span>
                <div className="terminal-detail-section__value">
                  {terminal.identification.ep2Features.map((feature, index) => (
                    <div key={index}>{feature}</div>
                  ))}
                </div>
              </div>
            </div>

            <div className="terminal-detail-section__divider" />

            {/* Physical location */}
            <div className="terminal-detail-section">
              <h3 className="terminal-detail-section__title">Physical location</h3>
              <div className="terminal-detail-section__row">
                <span className="terminal-detail-section__label">Store Name</span>
                <span className="terminal-detail-section__value">{terminal.identification.storeName}</span>
              </div>
              <div className="terminal-detail-section__row">
                <span className="terminal-detail-section__label">Address</span>
                <span className="terminal-detail-section__value">{terminal.identification.address}</span>
              </div>
            </div>

            <div className="terminal-detail-section__divider" />

            {/* Installation date */}
            <div className="terminal-detail-section">
              <h3 className="terminal-detail-section__title">Installation date</h3>
              <div className="terminal-detail-section__row">
                <span className="terminal-detail-section__label">Delivery Date</span>
                <span className="terminal-detail-section__value">{terminal.identification.deliveryDate}</span>
              </div>
              <div className="terminal-detail-section__row">
                <span className="terminal-detail-section__label">Installation Date</span>
                <span className="terminal-detail-section__value">{terminal.identification.deliveryDate}</span>
              </div>
            </div>

            <div className="terminal-detail-section__divider" />

            {/* Contract */}
            <div className="terminal-detail-section">
              <h3 className="terminal-detail-section__title">Contract</h3>
              <div className="terminal-detail-section__row">
                <span className="terminal-detail-section__label">Contract type</span>
                <span className="terminal-detail-section__value">{terminal.identification.contractType}</span>
              </div>
              <div className="terminal-detail-section__row">
                <span className="terminal-detail-section__label">Support type</span>
                <span className="terminal-detail-section__value">{terminal.identification.supportType}</span>
              </div>
              <div className="terminal-detail-section__row">
                <span className="terminal-detail-section__label">End of support date</span>
                <span className="terminal-detail-section__value">{terminal.identification.endOfSupportDate}</span>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'integrations' && (
          <div className="terminal-detail-page__integrations">
            {terminal.integrations.map((integration) => (
              <div key={integration.id} className="integration-card">
                <div className="integration-card__image-placeholder" />
                <div className="integration-card__content">
                  <h4 className="integration-card__title">{integration.name}</h4>
                  <p className="integration-card__description">{integration.description}</p>
                </div>
                <div className="integration-card__footer">
                  <button className="integration-card__settings">Settings</button>
                  <label className="integration-card__toggle">
                    <input
                      type="checkbox"
                      checked={integration.enabled}
                      onChange={() => {}}
                      className="integration-card__toggle-input"
                    />
                    <span className="integration-card__toggle-slider"></span>
                  </label>
                </div>
              </div>
            ))}
          </div>
        )}

        {(activeTab === 'interface' || activeTab === 'technical' || activeTab === 'payment' || activeTab === 'logs') && (
          <div className="terminal-detail-page__placeholder">
            <p>Coming soon</p>
          </div>
        )}
      </div>
    </div>
  )
}
