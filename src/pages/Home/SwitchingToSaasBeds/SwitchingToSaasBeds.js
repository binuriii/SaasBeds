
const base = import.meta.env.BASE_URL

const asset = (path) => `${base}${path}`

export const switching = {
  eyebrow: 'SWITCH TO SAASBEDS',

  title: 'A smoother switch\nto smarter hotel management',

  description:
    'Move your rooms, rates, future bookings and tour operator details to SaaSBeds. Keep your existing system running alongside the new platform until you are ready to go live.',

  hint: 'Scroll to see how it works',
  features: [
    'Review and configure your existing setup',

    'Import rooms, rates and future bookings',

    'Keep your existing OTA listings',

    'Staff training and local support included'
  ]
}

export const steps = [
  { stage: 'split', at: 14 },
  { stage: 'ui', at: 34 },
  { stage: 'stats', at: 54 },
  { stage: 'video', at: 74 }
]

export const calendar = {
  brand: 'SAASBEDS',

  search: 'Search bookings and guests',

  today: 'Today',
  selectDate: 'Select date',

  selectSpace: 'Select room',

  optimize: 'Optimize room availability',

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
    {
      row: 1,
      from: 0.05,
      to: 3.85,
      name: 'Maxwell Carter',
      lock: true,
      icons: ['loop', 'people', 'access']
    },
    {
      row: 1,
      from: 4.1,
      to: 7,
      name: 'Sophia Turner',
      lock: false
    },
    {
      row: 2,
      from: 3.05,
      to: 3.95,
      name: 'Ethan Davis'
    },
    {
      row: 3,
      from: 0.05,
      to: 1.9,
      name: '',
      icons: ['loop', 'people']
    },
    {
      row: 4,
      from: 1.05,
      to: 2.9,
      name: 'Olivia Bennett',
      lock: true,
      icons: ['target', 'loop', 'people']
    },
    {
      row: 4,
      from: 3.05,
      to: 7,
      name: 'Isabella Hughes',
      lock: true
    },
    {
      row: 7,
      from: 0.05,
      to: 7,
      name: 'Out of order - Bathroom renovations',
      blocked: true
    },
    {
      row: 9,
      from: 1.05,
      to: 1.9,
      name: 'Liam Johnson'
    },
    {
      row: 9,
      from: 2.0,
      to: 5.5,
      name: 'Ava Martinez',
      lock: true,
      icons: ['loop', 'people']
    },
    {
      row: 10,
      from: 0.05,
      to: 2.9,
      name: '',
      icons: ['loop', 'people', 'access']
    }
  ]
}

export const video = {
  label: 'Hotel receptionist welcoming a guest',

  image:
    'src/assets/header/resources-article.png',

  src: asset('videos/switching-training.mp4'),

  poster: asset('videos/switching-poster.jpg')
}
