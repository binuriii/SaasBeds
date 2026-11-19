export const hiw = {
  title: 'How it works',

  // paragraph under the heading (edit freely)
  description:
    'Three simple steps take you from setup to running your hotel day to day.'
}

export const steps = [
  {
    kind: 'photo',
    title: 'We set it up with you',
    text:
      'Rooms, rates, tour operators and channels are configured, and existing bookings come across.',

    // background photo for card 01 (same Unsplash photo already used in your switching section)
    image:
      'https://images.unsplash.com/photo-1600813547757-39c40da12c8d?auto=format&fit=crop&w=1400&q=85',
    imageAlt: 'Green natural texture'
  },

  {
    kind: 'glass',
    title: 'Sell everywhere',
    text:
      'Direct rates go to your website, daily rates go to the OTAs, and every booking lands on one calendar.',

    // background photo for card 02
    image:
      'https://images.unsplash.com/photo-1540429642795-26aa06834d0d?auto=format&fit=crop&w=1400&q=85',
    imageAlt: 'Abstract green background',

    widget: {
      title: 'Sell everywhere',
      pill: 'One calendar',
      rows: [
        { name: 'Website', tag: 'Direct rates' },
        { name: 'OTAs', tag: 'Daily rates' }
      ],
      calendarLabel: 'One calendar',
      days: ['Wed', 'Thu', 'Fri', 'Sat', 'Sun', 'Mon', 'Tue'],
      highlight: 2,
      // bookings landing on the calendar (from / to = day columns 0-7)
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

    // plant picture for card 03 (positioned bottom right, tilted)
    image:
      'https://images.unsplash.com/photo-1685291793110-5fe3854a44c0?auto=format&fit=crop&w=1400&q=85',
    imageAlt: 'Green plant',

    panel: {
      title: 'Same data',
      items: ['Housekeeping', 'Restaurant', 'Night audit', 'Reports']
    }
  }
]