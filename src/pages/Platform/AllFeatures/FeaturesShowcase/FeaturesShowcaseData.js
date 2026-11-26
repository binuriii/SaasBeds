const local = import.meta.glob(
  '../../../../assets/Platform/AllFeatures/*.{png,jpg,jpeg,webp,avif,svg}',
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

  return local[`../../../../assets/Platform/AllFeatures/${name}`] || ''
}


export const showcase = {
  title: 'Every feature you need to run your property',

  description:
    'Browse SaaSBeds module by module. Each one works on its own and shares data with the rest.',

  features: [
    'PMS',
    'Channel Manager',
    'Booking Engine',
    'Housekeeping',
    'Night Audit',
    'Restaurant POS',
    'HRM',
  ],

  primaryText: 'Book a demo',
  primaryHref: 'https://saasbeds.com/book-a-demo/',

  secondaryText: 'See pricing',
  secondaryHref: '/pricing'
}


export const teamImage = {
  src: resolveImage('FeaturesShowcase1.jpeg'),

  alt: 'Hotel management professional',

  label: 'Connected hotel management',

  caption: 'One platform. More possibilities.'
}

export const hotelImage = {
  src: resolveImage('FeaturesShowcase2.jpeg'),

  alt: 'Luxury hotel and resort'
}

export const platformInfo = {
  title: 'One connected platform',

  subtitle: 'Built for modern hotels',

  highlight: 'Connected hotel modules',

  description:
    'Manage your entire property with connected tools that simplify daily operations and help your business grow.'
}

export const dashboard = {
  metrics: [
    {
      label: 'Ready-made reports',
      value: '27',
      unit: 'Reports'
    },
    {
      label: 'Supported currencies',
      value: '02',
      unit: 'LKR / USD'
    }
  ],

  label: 'Connected hotel operations',

  bars: 14,

  activeBars: 9
}