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

export const hiw = {
  title: 'How it works',

  description:
    'From check-out to ready to sell in three simple steps.'
}

/*
  tone: pink = Dirty, blue = In progress / assigned,
        green = Clean / Ready to sell, lime = highlight
*/

export const steps = [
  {
    tone: 'pink',

    title: 'Check-outs mark rooms dirty',

    // Background image for this card (leave '' for colour only)
    image: resolveImage('HouseKeeping1.avif'),

    imageAlt: 'Hotel room after check-out',

    text: '',

    widget: {
      title: 'Check-outs',
      pill: 'Today',

      rows: [
        { name: 'Room 204', meta: 'Checked out 10:05', tag: 'Dirty' },
        { name: 'Room 105', meta: 'Checked out 10:20', tag: 'Dirty' },
        { name: 'Room 312', meta: 'Checked out 10:42', tag: 'Dirty' }
      ]
    }
  },

  {
    tone: 'blue',

    title: 'Supervisors assign and prioritise',

    // Background image for this card (leave '' for colour only)
    image: resolveImage('HouseKeeping2.avif'),

    imageAlt: 'Housekeeping supervisor with team',

    text: '',

    widget: {
      title: 'Assignments',
      pill: 'Priority order',

      rows: [
        { name: 'Sarah', meta: 'Room 204 · Early arrival', tag: '1' },
        { name: 'Emma', meta: 'Room 302 · VIP guest', tag: '2' },
        { name: 'Daniel', meta: 'Room 105 · Next check-in', tag: '3' }
      ]
    }
  },

  {
    tone: 'green',

    title: 'Cleaners update status',

    // Background image for this card (leave '' for colour only)
    image: resolveImage('HouseKeeping3.avif'),

    imageAlt: 'Clean hotel room ready for guests',

    text: 'The front desk sees rooms ready to sell.',

    widget: {
      title: 'Front desk',
      pill: 'Live',

      rows: [
        { name: 'Room 204', meta: 'Updated by Sarah', tag: 'Ready to sell' },
        { name: 'Room 302', meta: 'Updated by Emma', tag: 'Ready to sell' }
      ],

      cta: 'Mark as clean'
    }
  }
]