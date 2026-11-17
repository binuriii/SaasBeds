export const switching = {

  // Small label above the heading (shown in both the intro and the left panel)
  eyebrow: 'Meet your AI team',

  // Main H2 heading (\n = line break)
  title: 'AI that works from\nyour live hotel data',

  // Section paragraph (below H2)
  description:
    'Meet two AI teammates designed to help your staff work with live hotel inventory and help guests find answers and book direct.',

  // Initial scroll animation hint
  hint: 'Scroll to meet your AI team',

  // AI team features
  features: [
    {
      title: 'AI Receptionist',
      description:
        'For your staff. Ask "Is there a room on the 20th?" and get the room type, meal plan and price from live inventory'
    },
    {
      title: 'AI Front Desk Manager',
      description:
        'For your guests. Answers questions on your website and booking engine at any hour.'
    }
  ],

  // Link
  link: {
    text: 'Meet SaaSBeds AI',
    url: '/ai'
  }

}


/* ==========================================
   2. SCROLL ANIMATION STAGES
  { stage: 'stats', at: 54 },
  { stage: 'video', at: 74 }
]


/* ==========================================
   3. HOTEL CALENDAR CONTENT
export const calendar = {

  brand: 'SAASBEDS',

  search: 'Search bookings and guests',

  today: 'Today',
  selectDate: 'Select date',
  selectSpace: 'Select space',
  optimize: 'Optimize space a…',

  // index of the highlighted day column
  highlight: 2,

  days: [
    { dow: 'Wed', date: 'Oct 3' },
    { dow: 'Thu', date: 'Oct 4' },
    { dow: 'Fri', date: 'Oct 5' },
    { dow: 'Sat', date: 'Oct 6' },
    { dow: 'Sun', date: 'Oct 7' },
    { dow: 'Mon', date: 'Oct 8' },
    { dow: 'Tue', date: 'Oct 9' }
  ],

  groups: [
    { label: 'Single rooms', rows: 4 },
    { label: 'Double rooms', rows: 7 }
  ],

  rooms: [
    { no: '101', tone: 'green' },
    { no: '102', tone: 'orange' },
    { no: '103', tone: 'green' },
    { no: '104', tone: 'orange' },
    { no: '105', tone: 'green' },
    { no: '106', tone: 'green' },
    { no: '107', tone: 'red' },
    { no: '108', tone: 'red' },
    { no: '109', tone: 'green' },
    { no: '110', tone: 'green' },
    { no: '111', tone: 'green' }
  ],

  bookings: [
    { row: 1,  from: 0.05, to: 3.85, name: 'Maxwell Carter', lock: true, icons: ['loop', 'people', 'access'] },
    { row: 1,  from: 4.1,  to: 7,    name: 'Sophia Turner', lock: false },
    { row: 2,  from: 3.05, to: 3.95, name: 'Ethan Davis' },
    { row: 3,  from: 0.05, to: 1.9,  name: '', icons: ['loop', 'people'] },
    { row: 4,  from: 1.05, to: 2.9,  name: 'Olivia Bennett', lock: true, icons: ['target', 'loop', 'people'] },
    { row: 4,  from: 3.05, to: 7,    name: 'Isabella Hughes', lock: true },
    { row: 7,  from: 0.05, to: 7,    name: 'Out of order - Bathroom renovations', blocked: true },
    { row: 9,  from: 1.05, to: 1.9,  name: 'Liam Johnson' },
    { row: 9,  from: 2.0,  to: 5.5,  name: 'Ava Martinez', lock: true, icons: ['loop', 'people'] },
    { row: 10, from: 0.05, to: 2.9,  name: '', icons: ['loop', 'people', 'access'] }
  ]

}


/* ==========================================
   4. SMALL IMAGE CARD
========================================== */

export const video = {

  label: 'Hotel receptionist smiling and talking to a guest',

  image:
    'https://images.unsplash.com/photo-1713207458740-e59c368eba6e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D'

}