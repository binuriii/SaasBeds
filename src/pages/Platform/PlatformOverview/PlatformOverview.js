/**
 * SaaSBeds Platform Overview — page-specific content only.
 * Keep global InnerHero, AppShowcase and FAQ component code untouched.
 * Direct Unsplash images are editorial / illustrative, not product screenshots.
 * Replace any URL below to update imagery without editing the Vue or CSS.
 */

// Optional real SaaSBeds artwork from your existing src/assets/header folder.
// If an image file is absent, Vite will still build and the illustration has a fallback.
const headerAssets = import.meta.glob('../../../assets/header/*.{png,jpg,jpeg,webp,avif,svg}', {
  eager: true,
  query: '?url',
  import: 'default'
})

const localImage = (fileName) => {
  const result = Object.entries(headerAssets).find(([path]) =>
    path.split('/').pop().toLowerCase() === fileName.toLowerCase()
  )
  return result ? result[1] : ''
}

// ===== IMAGE LINKS: all hospitality photography comes from Unsplash =====
// These direct image URLs can be edited individually. Internet is required to show them.
export const images = {
  dashboard: localImage('SaasBeds Modern Dashboard Interface.png'),
  channelLogos: localImage('Travel Booking Platform Badges.png'),

  hotelExterior: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1600&q=85',
  resortPool: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1600&q=85',
  hotelLobby: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1600&q=85',
  suite: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1600&q=85',
  tropicalHotel: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=1600&q=85',
  guestRoom: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1600&q=85',
  boutiqueStay: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1600&q=85',
  stayExperience: 'https://images.unsplash.com/photo-1517840901100-8179e982acb7?auto=format&fit=crop&w=2000&q=85',
  hospitalityScene: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&w=2000&q=85'
}

// ===== SHARED HERO: only data changes on this page =====
export const hero = {
  firstLine: 'Smart Hotel Management',
  secondLine: 'Made Simple',
  rotatingLines: ['Made Simple', 'Made Smarter', 'Made Seamless'],
  description: 'Manage bookings, room rates, guests and daily hotel operations — all in one connected platform.',
  primaryText: 'Book a Demo',
  primaryHref: 'https://saasbeds.com/book-a-demo/'
}

// ===== SECTION 01: platform console and overview =====
export const overview = {
  eyebrow: 'ONE CONNECTED PLATFORM',
  titleFirst: 'One system.',
  titleSecond: 'Every part of your property.',
  description: 'From the first booking to the end-of-day report, your hotel teams can work from one clear view.',
  visualEyebrow: 'THE SAASBEDS CONSOLE',
  visualTitle: 'A clearer picture of your hotel.',
  visualText: 'Rooms, bookings, guests and performance — connected in one place.',
  tags: ['Live availability', 'Daily operations', 'Reporting'],
  imageAlt: 'Preview of the real SaaSBeds hotel management dashboard'
}

export const areas = [
  {
    number: '01', title: 'Property overview',
    text: 'Your important hotel information, all in one glance.',
    tone: 'blue', wide: true,
    image: images.dashboard, fit: 'contain',
    imageAlt: 'SaaSBeds dashboard preview'
  },
  { number: '02', title: 'Daily operations', text: 'Front desk, housekeeping and night audit.', tone: 'lime' },
  { number: '03', title: 'Rooms & rates', text: 'Inventory and pricing, kept easy to manage.', tone: 'pink' },
  { number: '04', title: 'Guests & sales', text: 'Guest profiles, packages and B2B agents.', tone: 'cream' },
  { number: '05', title: 'Add-on modules', text: 'Restaurant POS, HRM and more.', tone: 'green' },
  { number: '06', title: 'Insights', text: 'See occupancy, revenue and reporting clearly.', tone: 'blue' },
  { number: '07', title: 'Administration', text: 'Users, permissions and property settings.', tone: 'peach' }
]

// ===== SECTION 02: large alternating image + text stories =====
export const featuresHeading = {
  eyebrow: 'MADE FOR MODERN HOSPITALITY',
  titleFirst: 'Less complexity.',
  titleSecond: 'More clarity.',
  description: 'Everything you need to support your team and deliver a better guest experience.'
}

export const features = [
  {
    number: '01', tag: 'AT A GLANCE',
    title: 'Know what is happening, right now.',
    text: 'Arrivals, departures, occupancy, payments and reports are easy to review from one property dashboard.',
    chips: ['Daily overview', 'Occupancy', 'Revenue'],
    tone: 'sky',
    image: images.dashboard,
    imageAlt: 'SaaSBeds hotel dashboard screenshot',
    fit: 'contain',
    photoLabel: 'A connected view of your property'
  },
  {
    number: '02', tag: 'DISTRIBUTION',
    title: 'Your rooms, across every channel.',
    text: 'Handle direct bookings and connected OTA channels with clearer oversight of rates and availability.',
    chips: ['Direct bookings', 'OTA channels', 'Rates'],
    tone: 'lime',
    image: images.channelLogos,
    imageAlt: 'Connected booking channel graphic',
    fit: 'contain',
    photoLabel: 'Connected channels, simpler management'
  },
  {
    number: '03', tag: 'HOTEL TEAMS',
    title: 'Give your team more time for guests.',
    text: 'Keep housekeeping, night audit, front desk and back-office work in one joined-up workflow.',
    chips: ['Front desk', 'Housekeeping', 'Night audit'],
    tone: 'pink',
    image: images.hotelLobby,
    imageAlt: 'Hotel lobby and hospitality environment, Unsplash',
    fit: 'cover',
    photoLabel: 'Made for the people behind every stay'
  },
  {
    number: '04', tag: 'MULTI-PROPERTY',
    title: 'One platform, wherever you grow.',
    text: 'Move between properties and keep your wider hotel operation connected as your business grows.',
    chips: ['One login', 'Property switcher', 'Super Admin'],
    tone: 'sky',
    image: images.tropicalHotel,
    imageAlt: 'Luxury hotel exterior, Unsplash',
    fit: 'cover',
    photoLabel: 'Designed for growing portfolios'
  }
]

// ===== SECTION 03: editorial photo collection =====
export const gallery = {
  eyebrow: 'FOR EVERY KIND OF STAY',
  titleFirst: 'A platform that feels',
  titleSecond: 'right at home.',
  description: 'A single property or a growing group — SaaSBeds is designed around real hospitality work.',
  stays: [
    {
      title: 'Boutique hotels',
      subtitle: 'Personal service, connected tools',
      image: images.hotelExterior,
      alt: 'Elegant boutique hotel exterior, Unsplash'
    },
    {
      title: 'Resorts',
      subtitle: 'A clearer view across the stay',
      image: images.resortPool,
      alt: 'Resort pool and tropical hospitality setting, Unsplash'
    },
    {
      title: 'Villas & guesthouses',
      subtitle: 'Simple everyday management',
      image: images.guestRoom,
      alt: 'Premium guest room interior, Unsplash'
    }
  ]
}

// ===== NEW SECTION 04: image-led guest experience =====
export const experience = {
  eyebrow: 'GOOD HOSPITALITY STARTS BEHIND THE SCENES',
  titleFirst: 'The best stays',
  titleSecond: 'feel effortless.',
  description: 'Great guest experiences are built on calm, connected operations. Give every team a simpler way to do its best work.',
  mainImage: images.suite,
  mainAlt: 'Modern hotel suite with a welcoming atmosphere, Unsplash',
  insetImage: images.boutiqueStay,
  insetAlt: 'Light and airy hospitality interior, Unsplash',
  miniLabel: 'MORE TIME FOR WHAT MATTERS',
  points: [
    { number: '01', title: 'Smooth arrivals', text: 'Know what is coming next at the front desk.' },
    { number: '02', title: 'Connected teams', text: 'Share the details that keep each stay moving.' },
    { number: '03', title: 'Clearer decisions', text: 'Spend less time searching for information.' }
  ]
}

// ===== NEW SECTION 05: immersive hospitality photography =====
export const editorial = {
  eyebrow: 'BUILT FOR THE WAY HOTELS OPERATE',
  titleFirst: 'Less admin.',
  titleSecond: 'More hospitality.',
  description: 'Make space for the moments guests remember. SaaSBeds helps organize the work behind the experience.',
  image: images.stayExperience,
  imageAlt: 'Beautiful hotel interior photographed for hospitality, Unsplash',
  note: 'ONE CONNECTED EXPERIENCE',
  highlights: [
    { title: 'For your property', text: 'A clearer operational picture.' },
    { title: 'For your team', text: 'Tools that work together.' },
    { title: 'For your guests', text: 'A smoother journey from booking to checkout.' }
  ]
}

// ===== EXACT existing global FAQ component. Only content differs by page. =====
export const platformFaq = {
  title: 'Frequently Asked Questions',
  description: 'Quick answers to your questions about the SaaSBeds platform.',
  items: [
    {
      id: 'platform-1', question: 'Is SaaSBeds cloud-based?',
      answer: 'Yes. SaaSBeds runs in a browser, with a mobile app for iPhone and Android. You do not need to install the main console on a local server.'
    },
    {
      id: 'platform-2', question: 'Can I start with only some modules?',
      answer: 'Yes. Packages can include a booking engine, a booking engine with channel manager, and additional modules such as Restaurant POS and HRM. See the pricing options for details.'
    },
    {
      id: 'platform-3', question: 'Does SaaSBeds support LKR and USD?',
      answer: 'Yes. Rates, bookings, revenue and balances are tracked in LKR and USD, with combined totals where applicable.'
    },
    {
      id: 'platform-4', question: 'What is an all-in-one hotel management system?',
      answer: 'It is one platform connecting front desk operations, OTA distribution, direct bookings, housekeeping, restaurant tools and reporting, so departments can work from shared data.'
    },
    {
      id: 'platform-5', question: 'Can SaaSBeds manage multiple properties?',
      answer: 'Yes. A property switcher and a Super Admin view help hotel groups manage more than one property from a single login.'
    },
    {
      id: 'platform-6', question: 'Can my staff learn to use SaaSBeds?',
      answer: 'SaaSBeds setup includes staff training, supported by guides and videos covering its main modules and workflows.'
    },
    {
      id: 'platform-7', question: 'What reporting tools are available?',
      answer: 'The platform includes a reporting dashboard and a library of 27 reports covering important hotel activities and performance.'
    },
    {
      id: 'platform-8', question: 'Can SaaSBeds connect to other systems?',
      answer: 'SaaSBeds connects to online travel agencies through the channel manager and has documented integrations for the 3CX phone system and SappyEats.'
    }
  ]
}