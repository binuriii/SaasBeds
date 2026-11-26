export const featureHeading = {
  title: 'Everything in One Console',
  description:
    'Manage your entire hotel operation seamlessly in one place with every department, one login.',
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

  if (isRemote(value) || value.startsWith('/')) return value

  return local[
    `../../../assets/HomePage/${value.split('/').pop()}`
  ] || ''
}

// tone: lime | blue | pink | deep
const list = [
  {
    id: 'frontoffice',
    tone: 'lime',

    image: 'Feature1.jpeg',

    alt: 'Hotel front desk',
    title: 'Front office',
    text: 'Front desk calendar, bookings and check-in, housekeeping and night audit.',

    points: [
      'Front desk calendar',
      'Bookings & check-in',
      'Housekeeping',
      'Night audit',
    ],

    mock: {
      label: 'Front office',

      cards: [
        { t: 'Front desk calendar', m: 'Front office' },
        { t: 'Bookings & check-in', m: 'Front office' },
        { t: 'Housekeeping', m: 'Front office' },
        { t: 'Night audit', m: 'Front office' },
      ],

      foot: 'Every department, one login.',
      meta: '4 tools',
      cta: 'See all features',
    },
  },

  {
    id: 'distribution',
    tone: 'blue',

    image: 'Feature2.jpeg',

    alt: 'Resort pool',
    title: 'Distribution',
    text: 'Channel Manager, Booking Engine, a free hotel website and the Tour Operator Panel.',

    points: [
      'Channel Manager',
      'Booking Engine',
      'Free hotel website',
      'Tour Operator Panel',
    ],

    mock: {
      label: 'Distribution',

      cards: [
        { t: 'Channel Manager', m: 'Distribution' },
        { t: 'Booking Engine', m: 'Distribution' },
        { t: 'Free hotel website', m: 'Distribution' },
        { t: 'Tour Operator Panel', m: 'Distribution' },
      ],

      foot: 'Every department, one login.',
      meta: '4 tools',
      cta: 'See all features',
    },
  },

  {
    id: 'revenue',
    tone: 'pink',

    image: 'Feature3.jpeg',

    alt: 'Villa exterior',
    title: 'Revenue & guests',
    text: 'Rate Manager and packages, guest profiles and offers, payments and balances, and 27 reports.',

    points: [
      'Rate Manager & packages',
      'Guest profiles & offers',
      'Payments & balances',
      '27 reports',
    ],

    mock: {
      label: 'Revenue & guests',

      cards: [
        { t: 'Rate Manager & packages', m: 'Revenue & guests' },
        { t: 'Guest profiles & offers', m: 'Revenue & guests' },
        { t: 'Payments & balances', m: 'Revenue & guests' },
        { t: '27 reports', m: 'Revenue & guests' },
      ],

      foot: 'Every department, one login.',
      meta: '4 tools',
      cta: 'See all features',
    },
  },

  {
    id: 'backoffice',
    tone: 'deep',

    image: 'Feature4.jpeg',

    alt: 'Boutique hotel room',
    title: 'Back office',
    text: 'Restaurant POS, inventory and procurement, HRM and payroll, and the PBX phone system.',

    points: [
      'Restaurant POS',
      'Inventory & procurement',
      'HRM & payroll',
      'PBX phone system',
    ],

    mock: {
      label: 'Back office',

      cards: [
        { t: 'Restaurant POS', m: 'Back office' },
        { t: 'Inventory & procurement', m: 'Back office' },
        { t: 'HRM & payroll', m: 'Back office' },
        { t: 'PBX phone system', m: 'Back office' },
      ],

      foot: 'Every department, one login.',
      meta: '4 tools',
      cta: 'See all features',
    },
  },
]

export const features = list.map((f, i) => ({
  ...f,
  no: String(i + 1).padStart(2, '0'),
  src: resolveImage(f.image),
}))
