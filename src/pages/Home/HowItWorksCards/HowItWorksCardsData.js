
export const hiw = {
  title: 'How it works',

  description:
    'Three simple steps take you from setup to running your hotel day to day.'
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

export const steps = [
  {
    kind: 'photo',

    title: 'We set it up with you',

    text:
      'Rooms, rates, tour operators and channels are configured, and existing bookings come across.',

    // Background image for card 01
    image: resolveImage('HIW1.jpeg'),

    imageAlt: 'Green natural texture'
  },

  {
    kind: 'glass',

    title: 'Sell everywhere',

    text:
      'Direct rates go to your website, daily rates go to the OTAs, and every booking lands on one calendar.',

    // Background image for card 02
    image: resolveImage('HIW2.jpeg'),

    imageAlt: 'Abstract green background',

    widget: {
      title: 'Sell everywhere',

      pill: 'One calendar',

      rows: [
        { name: 'Website', tag: 'Direct rates' },
        { name: 'OTAs', tag: 'Daily rates' }
      ],

      calendarLabel: 'One calendar',

      days: [
        'Wed',
        'Thu',
        'Fri',
        'Sat',
        'Sun',
        'Mon',
        'Tue'
      ],

      highlight: 2,

      // Bookings landing on the calendar
      bookings: [
        { row: 0, from: 0.1, to: 3,   label: 'Website', type: 'web' },
        { row: 0, from: 3.2, to: 6.9, label: 'OTAs',    type: 'ota' },
        { row: 1, from: 1,   to: 4.3, label: 'OTAs',    type: 'ota' },
        { row: 1, from: 4.5, to: 6.9, label: 'Website', type: 'web' },
        { row: 2, from: 0.1, to: 2.4, label: 'OTAs',    type: 'ota' },
        { row: 2, from: 2.6, to: 5.6, label: 'Website', type: 'web' }
      ]
    }
  },

  {
    kind: 'panel',

    title: 'Run the day',

    text:
      'Housekeeping, restaurant, night audit and reports all work from the same data.',

    // Plant image for card 03
    image: resolveImage('HIW3.jpeg'),

    imageAlt: 'Green plant',

    panel: {
      title: 'Same data',

      items: [
        'Housekeeping',
        'Restaurant',
        'Night audit',
        'Reports'
      ]
    }
  }
]
