
export const solutionTabsHeading = {
  title: 'Made for the way you host',
  description:
    'From a single villa to a multi-property group, SaaSBeds adapts to how your property sells and runs the day.',
}

// Local images from src/assets/HomePage
const local = import.meta.glob(
  '../../../assets/HomePage/*.{png,jpg,jpeg,webp,avif,svg}',
  {
    eager: true,
    query: '?url',
    import: 'default',
  }
)

// Supports local images, external URLs and public paths
const isRemote = (v) =>
  /^(https?:)?\/\//i.test(v) || /^(data|blob):/i.test(v)

const resolveImage = (value) => {
  if (!value) return ''

  if (isRemote(value)) return value

  if (value.startsWith('/')) {
    return `${import.meta.env.BASE_URL}${value.slice(1)}`
  }

  const name = value.split('/').pop()

  return local[`../../../assets/HomePage/${name}`] || ''
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

    features: [
      'Front desk calendar',
      'Housekeeping',
      'Night audit',
      '27 reports'
    ],

    image: 'Solution1.jpeg',

    alt: 'Hotel lobby',
    href: '#',
  },

  {
    id: 'resorts',
    icon: 'fa-umbrella-beach',

    title: 'Resorts',

    text: 'Rooms, restaurant and tour operators in one console',

    description:
      'Bring rooms, restaurant sales and tour operator bookings into one console. Keep every revenue stream visible and connected to the channels that fill your property.',

    features: [
      'Restaurant POS',
      'Tour Operator Panel',
      'Channel Manager'
    ],

    image: 'Solution2.jpeg',

    alt: 'Resort pool',
    href: '#',
  },

  {
    id: 'boutique',
    icon: 'fa-bell-concierge',

    title: 'Boutique hotels',

    text: 'Two rate tables, so direct and OTA prices stay yours',

    description:
      'Keep separate rate tables for direct and OTA bookings so your pricing stays in your control. Build packages, manage channels and know your guests before they arrive.',

    features: [
      'Rate Manager & packages',
      'Channel Manager',
      'Guest profiles & offers'
    ],

    image: 'Solution3.jpeg',

    alt: 'Boutique hotel room',
    href: '#',
  },

  {
    id: 'villas',
    icon: 'fa-house-chimney',

    title: 'Villas',

    text: 'Sell direct and keep every booking on one calendar',

    description:
      'Take direct bookings on your own website and keep every reservation on one calendar. Collect payments and balances without chasing guests or juggling spreadsheets.',

    features: [
      'Booking Engine',
      'Free hotel website',
      'Payments & balances'
    ],

    image: 'Solution4.jpeg',

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

    features: [
      'Bookings & check-in',
      'Booking Engine',
      'Free hotel website'
    ],

    image: 'Solution5.jpeg',

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

    features: [
      'Multi-property console',
      '27 reports',
      'HRM & payroll'
    ],

    image: 'Solution6.jpeg',

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

    features: [
      'Channel Manager',
      'Booking Engine',
      'Payments & balances'
    ],

    image: 'Solution7.jpeg',

    alt: 'Vacation rental',
    href: '#',
  },
]

// Shape used by SolutionShowcase.vue
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
