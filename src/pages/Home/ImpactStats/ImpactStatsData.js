export const impactHeading = {
  title: 'Powering hospitality impact',
  description:
    'Smarter systems lead to stronger performance. Hotels using SaaSBeds see the difference in revenue, efficiency and guest satisfaction.',
}

// Local files: put them in src/assets/impact (path is relative to this file)
const local = import.meta.glob('../../../assets/impact/*.{png,jpg,jpeg,webp,avif,svg}', {
  eager: true,
  query: '?url',
  import: 'default',
})

/*
  `image` can be:
  1. a web link:           'https://images.unsplash.com/photo-123?w=1200'
  2. a local file name:    'guesthouse.jpg'  (from src/assets/impact)
  3. a path from /public:  '/images/guesthouse.jpg'
*/
const isRemote = (v) => /^(https?:)?\/\//i.test(v) || /^(data|blob):/i.test(v)
const resolveImage = (value) => {
  if (!value) return ''
  if (isRemote(value) || value.startsWith('/')) return value
  const name = value.split('/').pop()
  return local[`../../../assets/impact/${name}`] || ''
}

// h = bar height in % when closed     tone: lime | blue | black | pink  (global palette)
const list = [
  {
    id: 'direct', tone: 'lime', h: 34,
    value: '45%', label: 'Increase in direct bookings',
    title: 'Guest houses grow direct bookings with SaaSBeds',
    link: '#', image: 'https://images.unsplash.com/photo-1794039990705-5c1094a33197?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D', alt: 'Guest house lounge',
  },
  {
    id: 'revpar', tone: 'blue', h: 52,
    value: '39%', label: 'Increase in RevPAR',
    title: 'Boutique hotels lift RevPAR with separate direct and OTA rates',
    link: '#', image: 'https://images.unsplash.com/photo-1793609568655-fe4a886b7f95?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D', alt: 'Boutique hotel room',
  },
  {
    id: 'calls', tone: 'black', h: 68,
    value: '93%', label: 'Reduction in calls',
    title: 'Resorts answer guests faster with the AI Receptionist',
    link: '#', image: 'https://images.unsplash.com/photo-1783121603058-821abeaca1ea?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D', alt: 'Resort reception',
  },
  {
    id: 'payments', tone: 'pink', h: 84,
    value: '100%', label: 'Automated payments',
    title: 'Villas automate payments and balances in LKR and USD',
    link: '#', image: 'https://images.unsplash.com/photo-1793363605725-f4dc80e33a34?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D', alt: 'Villa pool',
  },
]

export const stats = list.map((s) => ({ ...s, src: resolveImage(s.image) }))

export const impactNote = 'Sample figures. Replace with verified customer results.'