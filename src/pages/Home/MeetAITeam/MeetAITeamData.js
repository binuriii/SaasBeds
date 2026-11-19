export const switching = {
  title: 'AI that works from\nyour live hotel data',
  features: [
    {
      title: 'AI Receptionist',
      description:
        'For your staff. Ask "Is there a room on the 20th?" and get the room type, meal plan and price from live inventory, then a reservation draft ready to confirm.'
    },
    {
      title: 'AI Front Desk Manager',
      description:
        'For your guests. Answers questions on your website and booking engine at any hour and guides guests to book direct.'
    }
  ],
  link: { text: 'Meet SaaSBeds AI', url: '/ai' }
}

export const staff = {
  title: 'AI Receptionist',
  badge: 'Live inventory',
  question: 'Is there a room on the 20th?',
  answer: 'Yes, 3 room types are open on Nov 20.',
  rooms: [
    { type: 'Deluxe Double', plan: 'Bed & breakfast', price: 'Rs 28,400', left: '2 left' },
    { type: 'Standard Single', plan: 'Room only', price: 'Rs 17,800', left: '1 left' },
    { type: 'Family Suite', plan: 'Half board', price: 'Rs 43,000', left: '1 left' }
  ],
  draft: {
    label: 'Reservation draft',
    state: 'Ready to confirm',
    room: 'Deluxe Double · Bed & breakfast',
    dates: 'Nov 20 – 21 · 1 night',
    price: 'Rs 28,400',
    edit: 'Edit',
    confirm: 'Confirm'
  }
}

export const guest = {
  title: 'AI Front Desk Manager',
  badge: 'Online 24/7',
  question: 'Can I check in late tonight?',
  answer: 'Yes, the front desk is open all night. Want me to hold a room?',
  reply: 'Yes please, the Deluxe Double.',
  offer: { room: 'Deluxe Double', plan: 'Bed & breakfast', price: 'Rs 28,400 / night', cta: 'Book direct' }
}

export const video = {
  label: 'Hotel receptionist smiling and talking to a guest',
  image:
    'https://images.unsplash.com/photo-1659018966834-99be9746b49e?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D'
}