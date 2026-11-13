export const orbitHeading = {
  title: 'More than a PMS and a channel manager',
  description:
    'Most hotel systems stop at the front desk and OTAs. SaaSBeds adds what regional properties actually run on.',
}

// small label under the logo tile, appears at the end of the scroll
export const hubLabel = 'One console'

// Local files: your logo is in src/assets/header (path is relative to this file)
const local = import.meta.glob('../../../assets/header/*.{png,jpg,jpeg,webp,avif,svg}', {
  eager: true,
  query: '?url',
  import: 'default',
})

/*
  `logo` can be a web link, a file name from src/assets/header, or a '/public' path.
  Leave it '' to show the built-in placeholder mark.
*/
const isRemote = (v) => /^(https?:)?\/\//i.test(v) || /^(data|blob):/i.test(v)
const resolveImage = (value) => {
  if (!value) return ''
  if (isRemote(value) || value.startsWith('/')) return value
  return local[`../../../assets/header/${value.split('/').pop()}`] || ''
}

export const logo = { src: resolveImage('cropped-Saasbeds.png'), alt: 'SaaSBeds' }

// card 1: top
export const attention = {
  title: 'Needs your attention',
  count: 3,
  items: [
    { name: 'Confirm booking #SB-2041', meta: 'Front desk · 4 minutes ago' },
    { name: 'Approve Booking.com rate update', meta: 'Channel manager · 12 minutes ago' },
    { name: 'Assign room 105 to housekeeping', meta: 'Housekeeping · 28 minutes ago' },
  ],
  heading: 'Clarity over complexity',
  text: 'No features for the sake of features. Every screen is built to make your front desk faster.',
}

// card 2: bottom left
export const flow = {
  steps: ['Booking.com', 'SaaSBeds', 'Calendar'],
  title: 'OTA booking sync',
  text: 'Every booking lands on one calendar.',
  meta: '5 channels / 1 calendar',
  heading: 'Built for your property',
  paragraph: 'Direct rates and OTA rates stay separate, so your pricing stays yours.',
}

// card 3: bottom right
export const confirmed = {
  status: 'Confirmed',
  title: 'Booking confirmed',
  text: 'Olivia Bennett · Deluxe King · 2 nights · LKR 84,000',
  heading: 'LKR and USD everywhere',
  paragraph: 'Rates, bookings and balances in both currencies, with a combined total.',
}