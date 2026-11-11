const img = (n) => new URL(`../../assets/header/${n}`, import.meta.url).href

export const announcement = { tag: 'NEW', text: 'Mews Channel Manager, powered by SiteMinder', href: '#' }
export const utilityLinks = ['Search', 'Contact us', 'Log in']

export const navItems = [
  { label: 'Platform', menu: 'platform' },
  { label: 'Solutions', menu: 'solutions' },
  { label: 'Customers' },
  { label: 'Resources', menu: 'resources' },
  { label: 'Pricing' },
  { label: 'Mews AI' }
]

export const platform = {
  cards: [
    { title: 'Platform Overview', text: 'Explore the operating system for hotels.', image: img('platform-overview.png') },
    { title: 'Mews Marketplace', text: 'Explore 1000+ hospitality integrations.', image: img('marketplace.png') }
  ],
  cols: [
    [{ title: 'Property Management (PMS)', sub: 'Connect your guest experience.', groups: [
      { label: 'For staff', items: ['Reservation Management', 'Upsells', 'Housekeeping', 'Guest Intelligence', 'Business Intelligence', 'Accounting & Billing', 'Automations'] },
      { label: 'For guests', items: ['Booking Engine', 'Guest Check-In', 'Guest Messaging'] }] }],
    [{ title: 'Point-of-Sale (POS)', sub: 'Simplify F&B operations.', groups: [{ items: ['ePOS', 'Embedded Payments'] }] },
     { title: 'Revenue Management (RMS)', sub: 'Grow property revenue with AI.', groups: [{ items: ['Dynamic Pricing', 'Demand Forecasting & Controls', { label: 'Channel Management', badge: img('siteminder-powered.png'), badgeAlt: 'SiteMinder Powered' }] }] }],
    [{ title: 'Payments', sub: 'Embedded with PMS & POS.', groups: [{ items: ['Tokenization', 'Automated Reconciliation', 'Multicurrency', 'Terminals', { label: 'Flexible Financing with', badge: img('youlend.png'), badgeAlt: 'YouLend' }, 'Accounts Receivable'] }] },
     { groups: [{ label: 'Other', items: ['Open API', 'Security & Compliance', 'Data & Reporting', 'Developer Docs'] }] }]
  ]
}

export const solutions = {
  cols: [
    { label: 'By property type', items: ['Hotels', 'Groups & Chains', 'Small Hotels', 'Independent Hotels', 'Extended Stays', 'Hostels', 'Motels', 'Enterprise'] },
    { label: 'By role', items: ['General Managers', 'Revenue Managers', 'Finance Teams', 'IT Managers', 'F&B Managers', 'Sales & MICE Managers'] }
  ],
  article: { tag: 'Article', meta: 'Company', title: '2026 Hospitality Industry Outlook: how AI will reshape guest journeys', image: img('solutions-article.png') },
  stat: { alt: 'Article: 10x reduced onboarding time, Leven', image: img('solutions-stat.png') }
}

export const resources = {
  feature: { alt: 'Resource Center: a library of hospitality insights.', image: img('resource-center.png') },
  cols: [
    { label: 'Learn', items: ['Blog', 'Research', 'Webinars', 'Events', 'Matt Talks', 'Future is Human', 'Unfold', 'Compare Mews', 'Mews University', 'Developer Docs'] },
    { label: 'Connect', items: ['About Mews', 'Press', 'Partners', 'Reviews & Awards', 'Referrals', 'Contact'] }
  ],
  article: { tag: 'Article', title: 'Introducing Mews OS, hospitality’s first unified operating system', image: img('resources-article.png') }
}
