// Local images from src/assets/Platform/HouseKeeping
const local = import.meta.glob(
  '../../../../assets/Platform/HouseKeeping/*.{png,jpg,jpeg,webp,avif,svg}',
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

  return local[`../../../../assets/Platform/HouseKeeping/${name}`] || ''
}


export const valueIntro = {
  title: 'Faster turnover, fewer surprises at check-in',

  description:
    'One board for the whole team. Housekeeping and front desk see the same room status.',

  tags: [
    'One board',
    'Clear priorities',
    'Public areas too'
  ],

  primaryText: 'Book a demo',

  primaryHref: 'https://saasbeds.com/book-a-demo/'
}


export const portrait = {
  title: 'Clear priorities',

  description:
    'Early arrivals and VIP rooms go to the top of the list.',

  image: resolveImage('ValueIntro2.jpeg'),

  alt: 'Hotel housekeeping professional',

  pills: [
    'Early arrivals',
    'VIP rooms'
  ]
}


export const card = {
  title: 'Public areas too',

  description:
    'Lobbies, pools and restaurants are tracked alongside guest rooms.',

  image: resolveImage('ValueIntro1.jpeg'),

  alt: 'Luxury hotel public areas',

  pills: [
    'Lobbies',
    'Pools',
    'Restaurants',
    'Cafes'
  ]
}