export const featureHeading = {
  title: 'Everything in One Console',
  description:
    'Manage your entire hotel operation seamlessly in one place with every department, one login.',
}

// Local files: put them in src/assets/features (path is relative to this file)
const local = import.meta.glob('../../../assets/features/*.{png,jpg,jpeg,webp,avif,svg}', {
  eager: true,
  query: '?url',
  import: 'default',
})

/*
  `image` can be a web link, a file name from src/assets/features, or a '/public' path.
  Leave it '' to use only the palette color.
*/
const isRemote = (v) => /^(https?:)?\/\//i.test(v) || /^(data|blob):/i.test(v)
const resolveImage = (value) => {
  if (!value) return ''
  if (isRemote(value) || value.startsWith('/')) return value
  return local[`../../../assets/features/${value.split('/').pop()}`] || ''
}

// tone: lime | blue | pink | deep (shows while the image loads)
const list = [
  {
    id: 'frontoffice', tone: 'lime',
    image: 'https://images.unsplash.com/photo-1793559141324-6e65850719b0?w=1400&auto=format&fit=crop&q=70',
    alt: 'Hotel front desk',
    title: 'Front office',
    text: 'Front desk calendar, bookings and check-in, housekeeping and night audit.',
    points: ['Front desk calendar', 'Bookings & check-in', 'Housekeeping', 'Night audit'],
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
    id: 'distribution', tone: 'blue',
    image: 'https://images.unsplash.com/photo-1617859047452-8510bcf207fd?w=1400&auto=format&fit=crop&q=70',
    alt: 'Resort pool',
    title: 'Distribution',
    text: 'Channel Manager, Booking Engine, a free hotel website and the Tour Operator Panel.',
    points: ['Channel Manager', 'Booking Engine', 'Free hotel website', 'Tour Operator Panel'],
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
    id: 'revenue', tone: 'pink',
    image: 'https://images.unsplash.com/photo-1793475621322-1110c59b5a83?w=1400&auto=format&fit=crop&q=70',
    alt: 'Villa exterior',
    title: 'Revenue & guests',
    text: 'Rate Manager and packages, guest profiles and offers, payments and balances, and 27 reports.',
    points: ['Rate Manager & packages', 'Guest profiles & offers', 'Payments & balances', '27 reports'],
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
    id: 'backoffice', tone: 'deep',
    image: 'https://images.unsplash.com/photo-1792646764169-15f10c36b859?w=1400&auto=format&fit=crop&q=70',
    alt: 'Boutique hotel room',
    title: 'Back office',
    text: 'Restaurant POS, inventory and procurement, HRM and payroll, and the PBX phone system.',
    points: ['Restaurant POS', 'Inventory & procurement', 'HRM & payroll', 'PBX phone system'],
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