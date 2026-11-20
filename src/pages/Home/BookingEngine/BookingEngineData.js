// All content for the combined BookingEngine section (dashboard animation + app / support cards).
export const head = {
  title1: 'Everything you run,',
  title2: 'in one dashboard',
  text: 'SaaSBeds provides a smart and modern booking engine designed for hotels, resorts, and guesthouses.'
}

export const features = [
  { icon: 'gear', tone: 'sky', title: 'Customization Options', text: 'Customize your booking engine to match your brand and needs.' },
  { icon: 'check', tone: 'lime', title: 'Sell More Than Rooms', text: 'Don’t just sell rooms—create and promote packages anytime.' },
  { icon: 'card', tone: 'pink', title: 'Payment Gateway', text: 'Integrate secure payment gateways into the system.' }
]

export const nav = [
  { label: 'Front Desk', icon: 'bell' },
  { label: 'Dashboard', icon: 'grid', active: true },
  { label: 'Bookings', icon: 'list' },
  { label: 'Marketing', icon: 'horn' },
  { label: 'Room Manager', icon: 'sofa' },
  { label: 'Guests', icon: 'user' },
  { label: 'Payments', icon: 'coins' }
]

// [label, value, delta, tone, prefix]
export const stats = [
  { label: 'New Booking', value: 220, delta: '8.70%', tone: 'sky', up: true },
  { label: 'Check In', value: 120, delta: '6.70%', tone: 'mint', up: true },
  { label: 'Check Out', value: 100, delta: '1.70%', tone: 'pink', up: false },
  { label: 'Total Revenue', value: 100000, delta: '6.70%', tone: 'mint', up: true, prefix: 'Rs.' }
]

export const avail = {
  segments: [
    { label: 'Occupied', w: 52, c: '#DDD2EF' },
    { label: 'Reserved', w: 14, c: '#CDE8DD' },
    { label: 'Not Ready', w: 9, c: '#F6DEC8' },
    { label: 'Available', w: 7, c: '#FBF0A8' }
  ],
  grid: [                                    // screenshot order: row 1 Occupied | Reserved, row 2 Available | Not Ready
    { label: 'Occupied', value: 220, c: '#DCD0F0' },
    { label: 'Reserved', value: 52, c: '#C9DCF2' },
    { label: 'Available', value: 15, c: '#8DB5E8' },
    { label: 'Not Ready', value: 13, c: '#8DB5E8' }
  ]
}

export const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
export const revenue = [172, 160, 172, 176, 168, 205, 185, 155, 160, 195, 172, 180, 214, 190, 198, 184, 196]   // k, 50k–200k scale
export const peak = 5
export const bookings = [                     // [booked, top (booked + cancelled)] on a 10–80 scale
  [47, 68], [58, 68], [56, 70], [62, 68], [54, 71], [58, 68], [60, 68]
]
export const yTicks = [80, 70, 60, 50, 40, 30, 20, 10]

export const platforms = [
  { label: 'Direct Booking', pct: 60, tone: '#C5DCF0' },
  { label: 'Booking.com', pct: 20, tone: '#F6DEC8' },
  { label: 'Agoda', pct: 15, tone: '#CDE8DD' },
  { label: 'Direct Booking', pct: 5, tone: '#FBF0A8' }
]

export const rating = {
  score: '4.5', word: 'Impressive', from: 'From 2565 Reviews',
  rows: [['Facilities', 4.4], ['Cleanliness', 4.2], ['Services', 3.6], ['Comfort', 4.2], ['Location', 4.5]]
}

export const tasks = [
  { date: 'June 28, 2025', text: '10 Am Meeting', tone: 'mint' },
  { date: 'June 28, 2025', text: 'Room 1345 cleaning', tone: 'pink' },
  { date: 'June 28, 2025', text: 'Room 1345 cleaning', tone: 'pink' },
  { date: 'June 28, 2025', text: 'Room 1345 cleaning', tone: 'lime' },
  { date: 'June 28, 2025', text: 'Room 1345 cleaning', tone: 'sky' }
]

export const ICONS = {
  gear: 'M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6zM19 12l2-1-2-4-2 .8-1.6-1L15 4h-4l-.4 2.8-1.6 1L7 7l-2 4 2 1v1l-2 1 2 4 2-.8 1.6 1L11 20h4l.4-2.8 1.6-1 2 .8 2-4-2-1z',
  check: 'M4 5h16v14H4zM8 12l3 3 5-6',
  card: 'M4 6h16v14H4zM4 10h16M9 3v4m6-4v4M12 13v5m-2.5-2.5h5',
  bell: 'M4 18h16M6 18a6 6 0 0 1 12 0M12 8V6M10 6h4',
  grid: 'M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6z',
  list: 'M4 6l1.5 1.5L8 5M11 6h9M4 12l1.5 1.5L8 11M11 12h9M4 18l1.5 1.5L8 17M11 18h9',
  horn: 'M4 19l3-9 7 7zM13 4l1 3M18 6l-2 2M20 11l-3 .5',
  sofa: 'M6 11V7h12v4M4 11h16v6H4zM6 17v2m12-2v2',
  user: 'M12 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8zM5 20a7 7 0 0 1 14 0',
  coins: 'M4 8c0-1.7 3.6-3 8-3s8 1.3 8 3-3.6 3-8 3-8-1.3-8-3zM4 8v4c0 1.7 3.6 3 8 3m8-7v4m-8 3v4c0 1.7 3.6 3 8 3s8-1.3 8-3v-4',
  search: 'M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14zm9 16-4-4',
  chat: 'M5 5h14v10H9l-4 4z',
  alarm: 'M6 17V11a6 6 0 0 1 12 0v6l2 2H4zM10 21h4',
  cog: 'M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6z',
  cal: 'M5 6h14v14H5zM5 10h14M9 3v4m6-4v4',
  left: 'm15 5-7 7 7 7',
  inn: 'M8 4H5v16h3M12 8l-4 4 4 4M8 12h11',
  out: 'M16 4h3v16h-3M12 8l4 4-4 4M16 12H5'
}

// Smooth SVG path through points (quadratic midpoints)
export function smooth(vals, w, h, min = 50, max = 200) {
  const step = w / (vals.length - 1)
  const pts = vals.map((v, i) => [i * step, h - ((v - min) / (max - min)) * h])
  let d = `M${pts[0][0]},${pts[0][1]}`
  for (let i = 1; i < pts.length; i++) {
    const [x0, y0] = pts[i - 1], [x1, y1] = pts[i]
    const mx = (x0 + x1) / 2
    d += ` C${mx},${y0} ${mx},${y1} ${x1},${y1}`
  }
  return { line: d, area: `${d} L${w},${h} L0,${h} Z`, pts }
}

/* ---------- lower cards ---------- */
export const dayView = {
  tag: 'Property dashboard',
  title: 'Your whole day at a glance',
  text: 'See every arrival, departure, room and balance on one screen, and watch revenue, occupancy, ADR and RevPAR in LKR and USD as they happen.',
  buttons: [
    { label: 'Book a demo', href: '/demo/' },
    { label: 'See Pricing', href: '/pricing/' }
  ]
}

export const reports = {
  tag: 'Reports & analytics',
  title: '27 reports ready on day one',
  text: 'The reports dashboard compares bookings, arrivals, departures, in-house guests, revenue, occupancy and outstanding balances with the previous period.'
}