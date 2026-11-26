export const impactHeading = {
  title: 'Powering hospitality impact',
  description:
    'Smarter systems lead to stronger performance. Hotels using SaaSBeds see the difference in revenue, efficiency and guest satisfaction.',
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

// h = bar height in % when closed
// tone: lime | blue | black | pink

const list = [
  {
    id: 'calls',
    tone: 'black',
    h: 68,

    value: '93%',
    label: 'Reduction in calls',

    title: 'Resorts answer guests faster with the AI Receptionist',

    link: '#',
    image: 'Impact1.jpeg',
    alt: 'Resort reception',
  },

  {
    id: 'revpar',
    tone: 'blue',
    h: 52,

    value: '39%',
    label: 'Increase in RevPAR',

    title: 'Boutique hotels lift RevPAR with separate direct and OTA rates',

    link: '#',
    image: 'Impact2.jpeg',
    alt: 'Boutique hotel room',
  },

  {
    id: 'direct',
    tone: 'lime',
    h: 34,

    value: '45%',
    label: 'Increase in direct bookings',

    title: 'Guest houses grow direct bookings with SaaSBeds',

    link: '#',
    image: 'Impact3.jpeg',
    alt: 'Guest house lounge',
  },

  {
    id: 'payments',
    tone: 'pink',
    h: 84,

    value: '100%',
    label: 'Automated payments',

    title: 'Villas automate payments and balances in LKR and USD',

    link: '#',
    image: 'Impact4.jpeg',
    alt: 'Villa pool',
  },
]

export const stats = list.map((s) => ({
  ...s,
  src: resolveImage(s.image),
}))

export const impactNote =
  'Sample figures. Replace with verified customer results.'
