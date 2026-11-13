export const dashboardHeading = {
  title1: 'Everything you run,',
  title2: 'in one dashboard',
  description:
    'Track revenue, channels and housekeeping live, so your team always knows where the day stands.',
}

export const intro = {
  tag: 'Hotel booking management software',
  title: 'Simple, yet powerful for modern hotels',
  text: 'Run bookings, channels, payments and housekeeping from one dashboard built to simplify your daily operations.',
}

export const sidebar = ['Front Desk', 'Dashboard', 'Bookings', 'Marketing']

// stats: value = number to count up to, pct = bar fill, prefix/suffix wrap the number
// chart: 7 column heights in %   nav: sidebar item highlighted for this tab
export const tabs = {
  Bookings: {
    nav: 'Bookings',
    stats: [
      { label: 'Revenue',      value: 290172, prefix: '$', pct: 72 },
      { label: 'Occupancy',    value: 82,     suffix: '%', pct: 82 },
      { label: 'ADR',          value: 177,    prefix: '$', pct: 58 },
      { label: 'New bookings', value: 220,    pct: 45 },
    ],
    chart: [40, 62, 48, 80, 66, 92, 74],
  },
  Channels: {
    nav: 'Marketing',
    stats: [
      { label: 'Direct',      value: 48, suffix: '%', pct: 48 },
      { label: 'Booking.com', value: 31, suffix: '%', pct: 31 },
      { label: 'Expedia',     value: 14, suffix: '%', pct: 14 },
      { label: 'Walk-in',     value: 7,  suffix: '%', pct: 7 },
    ],
    chart: [55, 44, 70, 58, 86, 64, 78],
  },
  Housekeeping: {
    nav: 'Front Desk',
    stats: [
      { label: 'Clean',       value: 132, pct: 88 },
      { label: 'In progress', value: 24,  pct: 34 },
      { label: 'Not ready',   value: 13,  pct: 18 },
      { label: 'Inspected',   value: 96,  pct: 70 },
    ],
    chart: [72, 50, 84, 60, 46, 90, 68],
  },
}

export const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']