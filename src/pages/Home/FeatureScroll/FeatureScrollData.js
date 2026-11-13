export const featureHeading = {
  title: 'Every department, one login',
  description:
    'Front desk, rates, OTAs, AI and back office run on the same data, so nothing is entered twice.',
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
    id: 'frontdesk', tone: 'lime',
    image: 'https://images.unsplash.com/photo-1793559141324-6e65850719b0?w=1400&auto=format&fit=crop&q=70',
    alt: 'Hotel front desk',
    title: 'Front desk & bookings',
    text: 'One calendar for every booking from direct, OTA and tour operator sales. Check guests in, move reservations and close the day with a guided night audit.',
    points: ['Front desk calendar', 'Bookings & check-in', 'Tour Operator Panel', 'Guided night audit'],
    mock: {
      label: 'Front desk',
      cards: [
        { t: 'Olivia Bennett', m: 'Room 105 · 2 nights' },
        { t: 'Maxwell Carter', m: 'Room 102 · 4 nights' },
        { t: 'Ethan Davis', m: 'Room 103 · 1 night' },
        { t: 'Isabella Hughes', m: 'Room 105 · 1 night' },
      ],
      foot: 'Every booking on one calendar.',
      meta: '11 rooms / 4 channels',
      cta: '+ New booking',
    },
  },
  {
    id: 'channels', tone: 'blue',
    image: 'https://images.unsplash.com/photo-1617859047452-8510bcf207fd?w=1400&auto=format&fit=crop&q=70',
    alt: 'Resort pool',
    title: 'Channel manager & rates',
    text: 'Seasonal rates for direct sales and separate daily rates for OTAs, sent to Booking.com, Agoda, Expedia and Airbnb from one place.',
    points: ['Two rate tables', 'Channel Manager', 'Rate Manager & packages', 'LKR and USD everywhere'],
    mock: {
      label: 'Rates',
      cards: [
        { t: 'Deluxe King', m: 'Direct · LKR 42,000' },
        { t: 'Deluxe King', m: 'Booking.com · LKR 46,500' },
        { t: 'Garden Suite', m: 'Direct · LKR 68,000' },
        { t: 'Garden Suite', m: 'Agoda · LKR 71,200' },
      ],
      foot: 'Direct and OTA rates stay separate.',
      meta: '5 channels / 2 rate tables',
      cta: '+ Add rate',
    },
  },
  {
    id: 'ai', tone: 'pink',
    image: 'https://images.unsplash.com/photo-1793475621322-1110c59b5a83?w=1400&auto=format&fit=crop&q=70',
    alt: 'Villa exterior',
    title: 'AI Receptionist',
    text: 'Ask about availability and get the room type, meal plan and price from live inventory, then a reservation draft ready to confirm.',
    points: ['Live availability answers', 'Reservation drafts', 'Works from your hotel data', 'Rates and inventory in real time'],
    mock: {
      label: 'AI Receptionist',
      cards: [
        { t: 'Is there a room on the 20th?', m: 'Question from staff' },
        { t: 'Deluxe King · Bed & breakfast', m: 'Available · LKR 42,000' },
        { t: 'Draft reservation', m: '2 nights · 2 adults' },
        { t: 'Ready to confirm', m: 'Olivia Bennett' },
      ],
      foot: 'Every answer comes from live inventory.',
      meta: 'Draft ready',
      cta: 'Confirm',
    },
  },
  {
    id: 'backoffice', tone: 'deep',
    image: 'https://images.unsplash.com/photo-1792646764169-15f10c36b859?w=1400&auto=format&fit=crop&q=70',
    alt: 'Boutique hotel room',
    title: 'Back office & reports',
    text: 'Housekeeping, restaurant, procurement, HR and payroll work from the same data, with 27 ready-made reports.',
    points: ['Housekeeping', 'Restaurant POS', 'Inventory & procurement', 'HRM & payroll'],
    mock: {
      label: 'Operations',
      cards: [
        { t: 'Rooms clean', m: '132 of 150' },
        { t: 'Restaurant orders', m: '24 open today' },
        { t: 'Stock to reorder', m: '6 items' },
        { t: 'Payroll', m: 'Ready to run' },
      ],
      foot: 'One system for the whole property.',
      meta: '27 reports',
      cta: 'Open reports',
    },
  },
]

export const features = list.map((f, i) => ({
  ...f,
  no: String(i + 1).padStart(2, '0'),
  src: resolveImage(f.image),
}))