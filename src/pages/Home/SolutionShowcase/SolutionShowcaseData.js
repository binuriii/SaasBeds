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

const list = [
  {
    id: 'hotels',
    icon: 'fa-hotel',
    title: 'Hotels',
    text: 'Run every department from one login',
    features: ['Front desk calendar', 'Housekeeping', 'Night audit', '27 reports'],
    image: 'https://images.unsplash.com/photo-1788204997214-f648d8f40835?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw3OXx8fGVufDB8fHx8fA%3D%3D',
    alt: 'Hotel lobby',
    href: '#',
  },
  {
    id: 'resorts',
    icon: 'fa-umbrella-beach',
    title: 'Resorts',
    text: 'Rooms, restaurant and tour operators in one console',
    features: ['Restaurant POS', 'Tour Operator Panel', 'Channel Manager'],
    image: 'https://images.unsplash.com/photo-1617859047452-8510bcf207fd?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D',
    alt: 'Resort pool',
    href: '#',
  },
  {
    id: 'villas',
    icon: 'fa-house-chimney',
    title: 'Villas',
    text: 'Sell direct and keep every booking on one calendar',
    features: ['Booking Engine', 'Free hotel website', 'Payments & balances'],
    image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D',
    alt: 'Villa exterior',
    href: '#',
  },
  {
    id: 'boutique',
    icon: 'fa-bell-concierge',
    title: 'Boutique hotels',
    text: 'Two rate tables, so direct and OTA prices stay yours',
    features: ['Rate Manager & packages', 'Channel Manager', 'Guest profiles & offers'],
    image: 'https://images.unsplash.com/photo-1596386461350-326ccb383e9f?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D',
    alt: 'Boutique hotel room',
    href: '#',
  },
  {
    id: 'guesthouses',
    icon: 'fa-bed',
    title: 'Guest houses & B&Bs',
    text: 'Simple setup, with support from Colombo',
    features: ['Bookings & check-in', 'Booking Engine', 'Free hotel website'],
    image: 'https://images.unsplash.com/photo-1560184897-ae75f418493e?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D',
    alt: 'Guest house',
    href: '#',
  },
  {
    id: 'groups',
    icon: 'fa-building',
    title: 'Multi-property groups',
    text: 'One login across your whole group',
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
  note: s.features.join(' · '),
  href: s.href,
  image: resolveImage(s.image),
  alt: s.alt,
}))