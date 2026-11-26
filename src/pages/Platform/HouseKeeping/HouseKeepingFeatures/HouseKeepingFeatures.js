export const heading = {
  title: 'Everything your housekeeping team needs',

  description:
    'Manage rooms, assign cleaners, set priorities and track daily progress from one connected platform.'
}

export const roomBoard = {
  title: 'Room status board',

  description:
    'Clean, Dirty and In Progress at a glance, filtered by floor, cleaner, condition and room type.',

  filters: [
    'All rooms',
    'Floor',
    'Cleaner',
    'Room type'
  ],

  statuses: [
    { label: 'Clean', tone: 'green' },
    { label: 'Dirty', tone: 'pink' },
    { label: 'In Progress', tone: 'blue' },
    { label: 'Out of order', tone: 'lime' }
  ],

  rooms: [
    { number: '101', status: 'blue' },
    { number: '102', status: 'green' },
    { number: '103', status: 'pink' },
    { number: '104', status: 'blue' },
    { number: '105', status: 'pink' },
    { number: '106', status: 'blue' },
    { number: '201', status: 'green' },
    { number: '202', status: 'pink' },
    { number: '203', status: 'lime' },
    { number: '204', status: 'blue' },
    { number: '205', status: 'pink' },
    { number: '206', status: 'green' }
  ]
}

export const cleaners = {
  title: 'Cleaner assignment',

  description:
    'Give each cleaner their rooms and see progress through the day.',

  team: [
    { name: 'Sarah', initials: 'SA', assigned: 12, completed: 9, tone: 'blue' },
    { name: 'Emma', initials: 'EM', assigned: 10, completed: 7, tone: 'pink' },
    { name: 'Daniel', initials: 'DA', assigned: 12, completed: 10, tone: 'green' }
  ]
}

export const priorities = {
  title: 'Clear priorities',

  description:
    'Flag the rooms that must be ready first.',

  rooms: [
    { number: 'Room 204', label: 'Early arrival', time: '10:00 AM', tone: 'lime' },
    { number: 'Room 302', label: 'VIP guest', time: '11:30 AM', tone: 'pink' },
    { number: 'Room 105', label: 'Next check-in', time: '12:00 PM', tone: 'green' }
  ]
}

export const maintenance = {
  title: 'Out-of-order rooms',

  description:
    'Take rooms out of sale for maintenance and bring them back when fixed.',

  room: '203',

  issue: 'Air conditioning',

  status: 'Out of order',

  steps: [
    'Issue reported',
    'Maintenance assigned',
    'Ready to sell'
  ]
}

export const reports = {
  title: 'Housekeeping reports',

  description:
    'Housekeeping and maintenance reports show what was done and what is outstanding.',

  metrics: [
    { label: 'Completed', value: 26 },
    { label: 'Outstanding', value: 8 }
  ],

  days: [
    { label: 'Mon', completed: 65, pending: 24 },
    { label: 'Tue', completed: 82, pending: 18 },
    { label: 'Wed', completed: 56, pending: 30 },
    { label: 'Thu', completed: 90, pending: 16 },
    { label: 'Fri', completed: 72, pending: 22 },
    { label: 'Sat', completed: 95, pending: 14 },
    { label: 'Sun', completed: 78, pending: 20 }
  ]
}