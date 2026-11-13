export const solutionTabsHeading = {
  title: 'Made for the way you host',
  description:
    'From a single villa to a multi-property group, SaaSBeds adapts to how your property sells and runs the day.',
}

// Local files: put them in src/assets/solutions (path is relative to this file)
const local = import.meta.glob('../../../assets/solutions/*.{png,jpg,jpeg,webp,avif,svg}', {
  eager: true,
  query: '?url',
  import: 'default',
})

/*
  `image` can be any of these:
  1. a web link:           'https://images.unsplash.com/photo-123?w=1200'
  2. a local file name:    'hotels.jpg'  (from src/assets/solutions)
  3. a path from /public:  '/images/hotels.jpg'
*/
const isRemote = (v) => /^(https?:)?\/\//i.test(v) || /^(data|blob):/i.test(v)

const resolveImage = (value) => {
  if (!value) return ''
  if (isRemote(value)) return value                 // link: use as is
  if (value.startsWith('/')) return value           // public folder: use as is
  const name = value.split('/').pop()               // 'hotels.jpg' or './assets/solutions/hotels.jpg'
  return local[`../../../assets/solutions/${name}`] || ''
}

// tone: lime | blue | pink | green (matches your global palette)
const list = [
  {
    id: 'hotels', label: 'Hotels', tone: 'lime',
    title: 'Run every department from one login',
    features: ['Front desk calendar', 'Housekeeping', 'Night audit', '27 reports'],
    image: 'https://images.unsplash.com/photo-1718359759373-1b2670b7478b?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D', alt: 'Hotel lobby', href: '#',
  },
  {
    id: 'resorts', label: 'Resorts', tone: 'blue',
    title: 'Rooms, restaurant and tour operators in one console',
    features: ['Restaurant POS', 'Tour Operator Panel', 'Channel Manager'],
    image: 'https://images.unsplash.com/photo-1617859047452-8510bcf207fd?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D', alt: 'Resort pool', href: '#',
  },
  {
    id: 'villas', label: 'Villas', tone: 'pink',
    title: 'Sell direct and keep every booking on one calendar',
    features: ['Booking Engine', 'Free hotel website', 'Payments & balances'],
    image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D', alt: 'Villa exterior', href: '#',
  },
  {
    id: 'boutique', label: 'Boutique hotels', tone: 'green',
    title: 'Two rate tables, so direct and OTA prices stay yours',
    features: ['Rate Manager & packages', 'Channel Manager', 'Guest profiles & offers'],
    image: 'https://images.unsplash.com/photo-1596386461350-326ccb383e9f?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D', alt: 'Boutique hotel room', href: '#',
  },
  {
    id: 'guesthouses', label: 'Guest houses & B&Bs', tone: 'lime',
    title: 'Simple setup, with support from Colombo',
    features: ['Bookings & check-in', 'Booking Engine', 'Free hotel website'],
    image: 'https://images.unsplash.com/photo-1560184897-ae75f418493e?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D', alt: 'Guest house', href: '#',
  },
  {
    id: 'groups', label: 'Multi-property groups', tone: 'blue',
    title: 'One login across your whole group',
    features: ['Multi-property console', '27 reports', 'HRM & payroll'],
    image: 'https://images.unsplash.com/photo-1726968335694-02219ed7ce96?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D', alt: 'Hotel group properties', href: '#',
  },
  {
    id: 'rentals', label: 'Vacation rentals', tone: 'pink',
    title: 'Connected to the channels your guests book on',
    features: ['Channel Manager', 'Booking Engine', 'Payments & balances'],
    image: 'https://images.unsplash.com/photo-1778603485048-40732ec80dfe?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D', alt: 'Vacation rental', href: '#',
  },
]

export const solutions = list.map((s) => ({ ...s, src: resolveImage(s.image) }))