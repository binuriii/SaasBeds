export const solutionTabsHeading = {
  title: 'Made for the way you host',
  description:
    'From a single villa to a multi-property group, SaaSBeds adapts to how your property sells and runs the day.',
}

const local = import.meta.glob('../../../assets/solutions/*.{png,jpg,jpeg,webp,avif,svg}', {
  eager: true,
  query: '?url',
  import: 'default',
})

const isRemote = (v) => /^(https?:)?\/\//i.test(v) || /^(data|blob):/i.test(v)

const resolveImage = (value) => {
  if (!value) return ''
  if (isRemote(value)) return value
  if (value.startsWith('/')) return value
  const name = value.split('/').pop()
  return local[`../../../assets/solutions/${name}`] || ''
}

// text: short line shown inside the card
// description: longer copy shown under the 01/07 counter
const list = [
  {
    id: 'hotels',
    icon: 'fa-hotel',
    title: 'Hotels',
    text: 'Run every department from one login',
    description:
      'Manage the front desk, housekeeping, night audit and reporting from a single login. Every department sees the same live data, so your team stays in sync from check-in to check-out.',
    features: ['Front desk calendar', 'Housekeeping', 'Night audit', '27 reports'],
    image: 'https://images.unsplash.com/photo-1769501203628-0520479aef53?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D',
    alt: 'Hotel lobby',
    href: '#',
  },
  {
    id: 'boutique',
    icon: 'fa-bell-concierge',
    title: 'Boutique hotels',
    text: 'Two rate tables, so direct and OTA prices stay yours',
    description:
      'Keep separate rate tables for direct and OTA bookings so your pricing stays in your control. Build packages, manage channels and know your guests before they arrive.',
    features: ['Rate Manager & packages', 'Channel Manager', 'Guest profiles & offers'],
    image: 'https://images.unsplash.com/photo-1663841364507-d0a8a9c11bda?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D',
    alt: 'Boutique hotel room',
    href: '#',
  },
  {
    id: 'resorts',
    icon: 'fa-umbrella-beach',
    title: 'Resorts',
    text: 'Rooms, restaurant and tour operators in one console',
    description:
      'Bring rooms, restaurant sales and tour operator bookings into one console. Keep every revenue stream visible and connected to the channels that fill your property.',
    features: ['Restaurant POS', 'Tour Operator Panel', 'Channel Manager'],
    image: 'https://images.unsplash.com/photo-1649731000184-7ced04998f44?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D',
    alt: 'Resort pool',
    href: '#',
  },
  {
    id: 'villas',
    icon: 'fa-house-chimney',
    title: 'Villas',
    text: 'Sell direct and keep every booking on one calendar',
    description:
      'Take direct bookings on your own website and keep every reservation on one calendar. Collect payments and balances without chasing guests or juggling spreadsheets.',
    features: ['Booking Engine', 'Free hotel website', 'Payments & balances'],
    image: 'https://images.unsplash.com/photo-1720161263981-84281892ee4b?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D',
    alt: 'Villa exterior',
    href: '#',
  },
  {
    id: 'guesthouses',
    icon: 'fa-bed',
    title: 'Guest houses & B&Bs',
    text: 'Simple setup, with support from Colombo',
    description:
      'Get set up quickly with simple bookings, check-in and a free hotel website. Our team in Colombo is on hand to help you start and keep going.',
    features: ['Bookings & check-in', 'Booking Engine', 'Free hotel website'],
    image: 'https://images.unsplash.com/photo-1728502019845-a9c19e5d8f70?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D',
    alt: 'Guest house',
    href: '#',
  },
  {
    id: 'groups',
    icon: 'fa-building',
    title: 'Multi-property groups',
    text: 'One login across your whole group',
    description:
      'Switch between properties and see the whole group from one login. Compare performance with 27 reports and handle HRM and payroll in the same place.',
    features: ['Multi-property console', '27 reports', 'HRM & payroll'],
    image: 'https://images.unsplash.com/photo-1726968335694-02219ed7ce96?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D',
    alt: 'Hotel group properties',
    href: '#',
  },
  {
    id: 'rentals',
    icon: 'fa-key',
    title: 'Vacation rentals',
    text: 'Connected to the channels your guests book on',
    description:
      'Stay connected to the channels your guests already book on and avoid double bookings. Take direct reservations and payments alongside them, all from one calendar.',
    features: ['Channel Manager', 'Booking Engine', 'Payments & balances'],
    image: 'https://images.unsplash.com/photo-1778603485048-40732ec80dfe?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D',
    alt: 'Vacation rental',
    href: '#',
  },
]

// shape used by SolutionShowcase.vue
export const cards = list.map((s) => ({
  id: s.id,
  icon: s.icon,
  title: s.title,
  text: s.text,
  description: s.description,
  note: s.features.join(' · '),
  href: s.href,
  image: resolveImage(s.image),
  alt: s.alt,
}))