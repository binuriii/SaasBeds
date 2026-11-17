export const storiesHeading = {
  title: 'People love SaaSBeds',
  description:
    'Bookings, front desk, housekeeping and channels on one platform. No juggling tools, no missed reservations.',
}

/*
  Cards are shown in this order inside a 4-column grid.
  type:  'quote' | 'metric' | 'photo'
  span:  true makes the card two columns wide
  quote cards all use the lightest blue, set in CustomerStories.css
*/
// NOTE: names, quotes and numbers below are placeholders. Replace them with real customers and figures.
export const stories = [
  {
    id: 'q1',
    type: 'quote',
    span: true,
    text: 'Moving our front desk, bookings and channels into one system changed our day. Rates stay in sync, double bookings stopped, and we welcome more guests with the same team.',
    name: 'Nimal Perera',
    role: 'General Manager, Colombo',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    rating: '5.0',
  },
  {
    id: 'm1',
    type: 'metric',
    value: 1000,
    suffix: '+',
    label: 'hotels, resorts and villas run on SaaSBeds',
    image:
      'https://images.unsplash.com/photo-1598880940017-f22eabf81a59?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDEzN3x8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 'q2',
    type: 'quote',
    text: 'The dashboard shows me which channel brings the bookings, so I know what is working every single day.',
    name: 'Sara Fernando',
    role: 'Villa Owner',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
  },
  {
    id: 'm2',
    type: 'metric',
    value: 365,
    suffix: '-day',
    label: 'care and support, every day of the year',
    image:
      'https://images.unsplash.com/photo-1742737801357-dcd6449fa317?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDI5fHx8ZW58MHx8fHx8',
  },
  {
    id: 'q3',
    type: 'quote',
    text: 'Setup was easy. They imported our data and trained the staff, and support answers whenever we call.',
    name: 'Ravi Kumar',
    role: 'Resort Manager',
    avatar: 'https://randomuser.me/api/portraits/men/46.jpg',
  },
  {
    id: 'p1',
    type: 'photo',
    span: true,
    title: 'Trusted by hotels, resorts and villas of every size',
    text: 'SaaSBeds keeps your bookings, front desk and channels in sync, so every reservation lands in the right place.',
    image:
      'https://images.unsplash.com/photo-1626387753307-5a329fa44578?q=80&w=3131&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    alt: 'Business using digital payment technology',
  },
]