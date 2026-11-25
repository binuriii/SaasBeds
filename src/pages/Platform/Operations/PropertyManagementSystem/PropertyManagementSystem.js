/**
 * SaaSBeds — Property Management System feature page.
 * Marketing/SEO copy below follows the user's exact supplied wording from:
 * SaaSBeds Website Page Content, pp. 9–11.
 *
 * Page-only content: no global component or global CSS changes.
 * The sample tape chart is illustrative and does not show live PMS data.
 * Confirm source claims, pricing and customer quote before publishing.
 */

// From this file: src/pages/Platform/Operations/PropertyManagementSystem/
// Four ../ segments lead back to src/.
const artwork = import.meta.glob(
  '../../../../assets/header/*.{png,jpg,jpeg,webp,svg,avif}',
  { eager: true, query: '?url', import: 'default' }
)

const image = (fileName) => {
  const match = Object.entries(artwork).find(([path]) =>
    path.split('/').pop().toLowerCase() === fileName.toLowerCase()
  )
  return match?.[1] ?? ''
}

export const seo = {
  path: '/features/hotel-property-management-system/',
  title: 'Hotel Property Management System (PMS) | SaaSBeds',
  description:
    'Cloud hotel PMS with a live dashboard, front desk tape chart, bookings by source and guest profiles, in LKR and USD. Built in Sri Lanka.'
}

export const images = {
  dashboard: image('SaasBeds Modern Dashboard Interface.png'),
  frontDesk:
    'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1600&q=85',
  guestRoom:
    'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1600&q=85',
  hotelLobby:
    'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1600&q=85',
  resort:
    'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1600&q=85'
}

export const hero = {
  firstLine: 'A hotel PMS that shows',
  secondLine: 'your whole day at a glance',
  rotatingLines: ['your whole day at a glance'],
  description:
    'See every arrival, departure, room and balance on one screen. Take bookings from the front desk calendar, track where each guest came from, and watch revenue, occupancy, ADR and RevPAR in LKR and USD as they happen.',
  primaryText: 'Book a demo',
  primaryHref: 'https://saasbeds.com/book-a-demo/'
}

// The current shared InnerHero is a one-button hero. Present See pricing just
// below it, so the global component remains 100% unchanged.
export const heroExtra = {
  text: 'See pricing',
  // Check/register the Pricing page before launch if it is still being built.
  href: 'https://saasbeds.com/pricing/'
}

export const introduction = {
  eyebrow: 'PROPERTY MANAGEMENT SYSTEM',
  title: 'Your front desk, without the paperwork',
  productLabel: 'SAASBEDS PMS',
  productAlt: 'SaaSBeds dashboard interface project artwork',
  productNote: 'SaaSBeds project artwork',
  benefits: [
    {
      number: '01', tone: 'blue', title: 'One live picture',
      text: "The property dashboard shows today's arrivals and departures, pending reviews and payments needing attention."
    },
    {
      number: '02', tone: 'lime', title: 'Fewer mistakes',
      text: 'Every booking from the front desk, website, OTAs and tour operators lands on the same calendar.'
    },
    {
      number: '03', tone: 'pink', title: 'Numbers you trust',
      text: 'Revenue, occupancy, ADR and RevPAR from today to five years, in both currencies.'
    }
  ]
}

export const featuresIntro = {
  eyebrow: 'PMS FEATURES',
  title: 'Everything your front desk needs',
  description: 'Six connected tools for everyday hotel operations.'
}

// These six paragraphs reproduce the supplied feature-row copy exactly.
export const features = [
  {
    number: '01', title: 'Front desk tape chart', tone: 'blue',
    text: 'A room-by-room calendar with week, month and range views. Hold rooms and add bookings straight from the grid.',
    visual: 'calendar', visualLabel: 'Illustrative front desk tape chart'
  },
  {
    number: '02', title: 'Bookings by source', tone: 'pink',
    text: "Filter upcoming, past and cancelled bookings, or today's check-ins and check-outs, with the source shown for each: front desk, OTA or tour operator.",
    visual: 'photo', image: images.dashboard || images.frontDesk,
    imageFit: images.dashboard ? 'contain' : 'cover',
    imageAlt: images.dashboard ? 'SaaSBeds dashboard project artwork' : 'Illustrative hotel exterior photograph',
    visualLabel: images.dashboard ? 'SaaSBeds dashboard' : 'Hotel photography'
  },
  {
    number: '03', title: 'Multi-room bookings', tone: 'green',
    text: 'Handle families and groups in one booking.',
    visual: 'photo', image: images.guestRoom,
    imageAlt: 'Illustrative hotel guest-room photograph', visualLabel: 'Guest stays'
  },
  {
    number: '04', title: 'Fast search', tone: 'lime',
    text: 'Find any booking by guest name, room or booking ID.',
    visual: 'photo', image: images.frontDesk,
    imageAlt: 'Illustrative hotel reception photograph', visualLabel: 'Front desk'
  },
  {
    number: '05', title: 'Guest profiles', tone: 'blue',
    text: 'Contacts and full booking history for every guest.',
    visual: 'photo', image: images.resort,
    imageAlt: 'Illustrative resort photograph', visualLabel: 'Guest information'
  },
  {
    number: '06', title: 'Rooms, extras and amenities', tone: 'pink',
    text: 'Set up room types and numbers, priced extras and amenities from the Room Manager.',
    visual: 'photo', image: images.hotelLobby,
    imageAlt: 'Illustrative hotel interior photograph', visualLabel: 'Room Manager'
  }
]

// These example rooms/bookings are UI demonstration data only.
export const calendar = {
  propertyName: 'Sample Property',
  label: 'Front Desk · Tape Chart',
  previewLabel: 'Illustrative calendar preview — not live hotel data',
  days: ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'],
  rooms: [
    {
      name: '101', type: 'Deluxe',
      bookings: [
        { start: 1, span: 3, tone: 'blue', text: 'Reserved' },
        { start: 5, span: 2, tone: 'mint', text: 'Reserved' }
      ]
    },
    {
      name: '102', type: 'Deluxe',
      bookings: [{ start: 2, span: 4, tone: 'lime', text: 'In house' }]
    },
    {
      name: '201', type: 'Suite',
      bookings: [
        { start: 1, span: 2, tone: 'mint', text: 'Reserved' },
        { start: 4, span: 3, tone: 'blue', text: 'Reserved' }
      ]
    },
    {
      name: '202', type: 'Suite',
      bookings: [{ start: 3, span: 3, tone: 'pink', text: 'Room hold' }]
    },
    {
      name: '301', type: 'Family',
      bookings: [{ start: 1, span: 4, tone: 'lime', text: 'In house' }]
    }
  ],
  legend: [
    { label: 'Reserved', tone: 'blue' },
    { label: 'In house', tone: 'lime' },
    { label: 'Room hold', tone: 'pink' }
  ]
}

export const workflow = {
  eyebrow: 'HOW IT WORKS',
  title: 'How it works',
  steps: [
    { number: '01', title: 'Set up rooms and rates.' },
    { number: '02', title: 'Connect your website and OTAs.' },
    { number: '03', title: 'Run arrivals, stays and departures from one screen.' }
  ]
}

// The PDF contains an explicit placeholder, not a verified testimonial.
export const proof = {
  eyebrow: 'CUSTOMER PROOF',
  title: 'From the front desk',
  quote: '[Client quote about the front desk.]',
  attribution: '[Name, property]',
  verified: false,
  placeholderNote: 'Draft testimonial placeholder — replace with a verified client quote and name before publishing.'
}

export const related = {
  eyebrow: 'RELATED FEATURES',
  title: 'More connected hotel tools',
  items: [
    { title: 'Channel Manager', href: '/features/hotel-channel-manager/' },
    { title: 'Housekeeping', href: '/features/hotel-housekeeping-software/' },
    { title: 'Night Audit', href: '/features/hotel-night-audit/' }
  ]
}

export const closing = {
  eyebrow: 'SEE SAASBEDS IN ACTION',
  title: 'See your own rooms on the SaaSBeds calendar.',
  buttonText: 'Book a demo',
  buttonHref: 'https://saasbeds.com/book-a-demo/'
}

// Keep the *existing global* FAQ.vue and FAQ.css unchanged. Its API accepts
// { title, description, items:[{ id, question, answer }] }.
// All 10 FAQ questions/answers below reproduce the supplied source copy.
export const pmsFaq = {
  title: 'Frequently Asked Questions',
  description: 'Hotel Property Management System (PMS) FAQs',
  items: [
    {
      id: 'pms-what-is',
      question: 'What is a hotel PMS?',
      answer: 'A property management system runs day-to-day hotel operations: reservations, check-in and check-out, room status, billing and reports. SaaSBeds PMS does this in the cloud and shares its data with the channel manager, POS, housekeeping and night audit.'
    },
    {
      id: 'pms-every-channel',
      question: 'Can I see bookings from every channel in one place?',
      answer: 'Yes. Front desk, website, OTA and tour operator bookings all appear on the same calendar, with the source shown on each booking.'
    },
    {
      id: 'pms-small-properties',
      question: 'Is it suitable for small properties?',
      answer: 'Yes. Guest houses and villas use the same calendar and bookings tools as larger hotels, and pricing is based on the number of rooms.'
    },
    {
      id: 'pms-cost',
      question: 'How much does a hotel PMS cost?',
      answer: 'SaaSBeds pricing depends on your package and number of rooms, billed monthly or annually. The Pricing page calculator shows your exact price.'
    },
    {
      id: 'pms-best-small-hotel',
      question: 'What is the best PMS for small hotels?',
      answer: 'A cloud PMS that is quick to learn, priced by room and supported locally. SaaSBeds is used by guest houses, villas and boutique hotels in Sri Lanka.'
    },
    {
      id: 'pms-cloud',
      question: 'What is a cloud-based hotel PMS?',
      answer: 'A PMS that runs online rather than on a server at the property. You log in from any browser, updates are automatic and data is backed up off site.'
    },
    {
      id: 'pms-what-does',
      question: 'What does a hotel PMS do?',
      answer: 'It manages reservations, room assignments, check-in and check-out, guest records, billing and reports for daily hotel operations.'
    },
    {
      id: 'pms-metrics',
      question: 'Can I see revenue, ADR and RevPAR in the PMS?',
      answer: 'Yes. The dashboard shows revenue, occupancy, ADR and RevPAR in LKR and USD, from today to five years.'
    },
    {
      id: 'pms-room-holds',
      question: 'Can I hold a room without confirming a booking?',
      answer: 'Yes. Room holds can be placed straight from the front desk calendar.'
    },
    {
      id: 'pms-fast-search',
      question: 'How do I find a booking quickly?',
      answer: 'Search by guest name, room number or booking ID from the front desk calendar.'
    }
  ]
}
