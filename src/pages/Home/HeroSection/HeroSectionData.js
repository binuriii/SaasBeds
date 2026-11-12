import { ref, onMounted, onBeforeUnmount, h } from 'vue'

// Central place for all dashboard content. Replace image URLs with local assets if you prefer.
export const POOL_IMAGE =
  'https://images.unsplash.com/photo-1684871431939-7ea664ac1eb9?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D'
export const GUEST_PHOTO = 'https://i.pravatar.cc/120?img=47'

export const brand = 'SaasBeds' // swap for your own generic brand
export const searchPlaceholder = 'Search within Central Inn'
export const searchTyped = 'Olivia Bennett' // 14 characters (matches steps(14) in the CSS)

export const dates = [
  { day: 'Wed', label: 'Oct 3' },
  { day: 'Thu', label: 'Oct 4' },
  { day: 'Fri', label: 'Oct 5', active: true },
  { day: 'Sat', label: 'Oct 6' },
]

// status: free (blue) | soon (lime) | blocked (black)
export const groups = [
  { name: 'Single rooms', rooms: [
    { no: 101, status: 'free' }, { no: 102, status: 'soon' },
    { no: 103, status: 'free' }, { no: 104, status: 'soon' } ] },
  { name: 'Double rooms', rooms: [
    { no: 105, status: 'free' }, { no: 106, status: 'free' },
    { no: 107, status: 'blocked' }, { no: 108, status: 'blocked' } ] },
  { name: 'Triple rooms', rooms: [
    { no: 109, status: 'free' }, { no: 110, status: 'soon' }, { no: 111, status: 'soon' } ] },
]

// room = room number, from = first date column (1-based), to = end column (exclusive)
export const reservations = [
  { id: 'r1', room: 102, from: 1, to: 5, name: 'Maxwell Carter', locked: true, icons: ['sync', 'group'], tone: 'pink' },
  { id: 'r2', room: 103, from: 4, to: 5, name: 'Ethan Davis', tone: 'pink' },
  { id: 'r3', room: 104, from: 1, to: 3, name: '', icons: ['sync', 'group'], tone: 'blank' },
  { id: 'r4', room: 105, from: 2, to: 4, name: 'Olivia Bennett', locked: true, icons: ['pass', 'sync', 'group'], tone: 'pink', selected: true },
  { id: 'r5', room: 105, from: 4, to: 5, name: 'Isabella Hughes', locked: true, tone: 'pink' },
  { id: 'r6', room: 108, from: 1, to: 5, name: 'Out of order - Bathroom renovations', outOfOrder: true, tone: 'grey' },
  { id: 'r7', room: 110, from: 2, to: 3, name: 'Liam Johnson', tone: 'pink' },
  { id: 'r8', room: 110, from: 3, to: 5, name: 'Ava Martinez', locked: true, tone: 'pink' },
  { id: 'r9', room: 111, from: 1, to: 3, name: '', icons: ['sync', 'group', 'access'], tone: 'blank' },
]

// a booking that "drops in" near the end of the loop
export const newReservation = {
  id: 'r10', room: 103, from: 1, to: 3, name: 'Noah Walker', icons: ['sync'], tone: 'pink', isNew: true,
}

export const reservation = {
  guest: 'Olivia Bennett',
  tabs: ['Reservation', 'Group (3)'],
  from: 'Oct 4', to: 'Oct 6',
  status: 'Confirmed',
  statusDone: 'Checked-in',
  meta: '2 nights, Thu 14:30 - Sat 10:30', code: '52634564',
  notesCount: 3,
  notes: ['Quiet room on a higher floor', 'Peanut allergy (restaurant)', 'Extra towels from housekeeping'],
  role: 'Main guest', party: '(1x adult, 1x child)',
  tip: 'The guest has an upcoming reservation from Oct 3 to Oct 6. She has expressed a preference for a quiet room on a higher floor. Additionally, during a prior visit to the restaurant, she mentioned an allergy to peanuts. The guest also requested extra towels from housekeeping.',
  tipFooter: 'Summarized by AI, inaccurate information is possible.',
}

// Fake cursor position per step, in % of the dashboard: [left, top]
// One entry per timeline step. Tweak if the cursor lands slightly off a target.
export const cursorPath = [
  [62, 9],   // 0  idle
  [24, 9],   // 1  search field, typing
  [30, 44],  // 2  booking selected, panel loads
  [88, 21],  // 3  "Group" tab
  [76, 21],  // 4  back to reservation, notes + tip
  [74, 45],  // 5  hover notes/tip
  [76, 87],  // 6  press "Check in"
  [26, 29],  // 7  new booking drops in
  [60, 9],   // 8  rest, then loop
]
export const STEPS = cursorPath.length

// tiny icon path map (24x24, stroke icons)
export const ICONS = {
  menu: 'M4 7h10M4 12h16M4 17h10',
  search: 'M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14zm9 16-4-4',
  left: 'm15 5-7 7 7 7', right: 'm9 5 7 7-7 7', down: 'm6 9 6 6 6-6',
  back: 'M19 12H5m6-6-6 6 6 6',
  cal: 'M5 6h14v14H5zM5 10h14M9 3v4m6-4v4',
  lock: 'M7 11h10v9H7zM9 11V8a3 3 0 0 1 6 0v3',
  sync: 'M20 12a8 8 0 1 1-3-6.2M20 4v4h-4',
  group: 'M12 4v4M6 20v-4h12v4M12 8v8M4 20h4M16 20h4',
  pass: 'M12 3l7 3v5c0 5-3 8-7 10-4-2-7-5-7-10V6z',
  access: 'M12 5v.01M12 8v6h4l2 5M9 12a5 5 0 1 0 6 6',
  user: 'M12 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8zM5 20a7 7 0 0 1 14 0',
  coin: 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zm3 6h-4a2 2 0 0 0 0 4h2a2 2 0 0 1 0 4H9',
  bell: 'M6 17V11a6 6 0 0 1 12 0v6l2 2H4zM10 21h4',
  cross: 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM9 9l6 6m0-6-6 6',
  bulb: 'M9 18h6M10 21h4M12 3a6 6 0 0 0-4 10c1 1 1 2 1 3h6c0-1 0-2 1-3a6 6 0 0 0-4-10z',
  dots: 'M12 5v.01M12 12v.01M12 19v.01',
  print: 'M7 9V4h10v5M7 17H4v-7h16v7h-3M7 14h10v6H7z',
  arrow: 'M5 12h14m-5-5 5 5-5 5',
  check: 'm5 12 5 5 9-10',
}

// Advances one step at a time and loops. Final state is shown for reduced motion / SSR.
export function useTimeline(interval = 1800) {
  const step = ref(STEPS - 1)
  let timer = null
  onMounted(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    step.value = 0
    timer = setInterval(() => { step.value = (step.value + 1) % STEPS }, interval)
  })
  onBeforeUnmount(() => clearInterval(timer))
  return { step }
}

// Small stroke-icon component (functional, no template needed)
export const UiIcon = (props) =>
  h('svg', {
    class: 'ui-icon', width: props.size, height: props.size, viewBox: '0 0 24 24', fill: 'none',
    stroke: 'currentColor', 'stroke-width': 2, 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'aria-hidden': 'true',
  }, [h('path', { d: ICONS[props.name] })])
UiIcon.props = { name: { type: String, required: true }, size: { type: Number, default: 16 } }