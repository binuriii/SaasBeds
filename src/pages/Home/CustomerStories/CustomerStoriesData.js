
export const storiesHeading = {
  title: 'People love SaaSBeds',
  description:
    'Bookings, front desk, housekeeping and channels on one platform. No juggling tools, no missed reservations.',
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

/*
  Cards are shown in this order inside a 4-column grid.
  type: 'quote' | 'metric' | 'photo'
  span: true makes the card two columns wide.
  Quote cards use the lightest blue from CustomerStories.css.
*/

// NOTE: Names, quotes and numbers are placeholders.
// Replace them with real customers and verified figures.

export const stories = [
  {
    id: 'q1',
    type: 'quote',
    span: true,

    text: 'Moving our front desk, bookings and channels into one system changed our day. Rates stay in sync, double bookings stopped, and we welcome more guests with the same team.',

    name: 'Nimal Perera',
    role: 'General Manager, Colombo',

    avatar: resolveImage(
      'Avatar1.jpg'
    ),

    rating: '5.0',
  },

  {
    id: 'm1',
    type: 'metric',

    value: 1000,
    suffix: '+',

    label: 'hotels, resorts and villas run on SaaSBeds',

    image: resolveImage('CutomerStories1.jpeg'),
  },

  {
    id: 'q2',
    type: 'quote',

    text: 'The dashboard shows me which channel brings the bookings, so I know what is working every single day.',

    name: 'Sara Fernando',
    role: 'Villa Owner',

    avatar: resolveImage(
      'Avatar2.jpg'
    ),
  },

  {
    id: 'm2',
    type: 'metric',

    value: 365,
    suffix: '-day',

    label: 'care and support, every day of the year',

    image: resolveImage('CutomerStories2.jpeg'),
  },

  {
    id: 'q3',
    type: 'quote',

    text: 'Setup was easy. They imported our data and trained the staff, and support answers whenever we call.',

    name: 'Ravi Kumar',
    role: 'Resort Manager',

    avatar: resolveImage(
      'Avatar3.jpg'
    ),
  },

  {
    id: 'p1',
    type: 'photo',
    span: true,

    title: 'Trusted by hotels, resorts and villas of every size',

    text: 'SaaSBeds keeps your bookings, front desk and channels in sync, so every reservation lands in the right place.',

    image: resolveImage('CutomerStories3.jpeg'),

    alt: 'Business using digital payment technology',
  },
]
