export const directoryHeading = {
  title: 'Feature directory',
  description:
    'Everything you need to manage, grow and simplify your hotel operations.'
}

export const aiImage = {
  src: 'https://images.unsplash.com/photo-1767716134849-5e5abb7bf59b?q=80&w=1013&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D',
  alt: 'SaaSBeds AI assistant'
}

/* =========================================
   FEATURE GROUPS
========================================= */

const feature = (name, slug) => ({
  name,
  href: `/features/${slug}`
})

export const featureGroups = [
  {
    id: 'operations',
    title: 'Operations',
    features: [
      feature(
        'Property Management System',
        'hotel-property-management-system'
      ),
      feature('Housekeeping', 'hotel-housekeeping'),
      feature('Night Audit', 'hotel-night-audit'),
      feature('Inventory & Procurement', 'hotel-inventory-procurement'),
      feature('Restaurant POS', 'restaurant-pos'),
      feature('Food Ordering System', 'food-ordering-system'),
      feature('HRM', 'hotel-hrm'),
      feature('Mobile App', 'hotel-mobile-app')
    ]
  },

  {
    id: 'distribution',
    title: 'Distribution',
    features: [
      feature('Channel Manager', 'hotel-channel-manager'),
      feature('Booking Engine', 'hotel-booking-engine'),
      feature('Free Hotel Website', 'free-hotel-website'),
      feature('Tour Operator Panel', 'tour-operator-panel')
    ]
  },

  {
    id: 'revenue',
    title: 'Revenue & guests',
    features: [
      feature('Rate Manager', 'hotel-rate-manager'),
      feature('Packages & Offers', 'hotel-packages-offers'),
      feature('Guest Engagement', 'hotel-guest-engagement'),
      feature('Payments', 'hotel-payments'),
      feature('Reports & Analytics', 'hotel-reports-analytics'),
      feature('Hotel PBX Phone System', 'hotel-pbx-phone-system')
    ]
  },

  {
    id: 'ai',
    title: 'AI',
    features: [
      {
        name: 'AI Receptionist',
        href: '/ai/ai-receptionist'
      },
      {
        name: 'AI Front Desk Manager',
        href: '/ai/ai-front-desk-manager'
      }
    ]
  },

  {
    id: 'administration',
    title: 'Administration',
    features: [
      feature('Activity & Login Logs', 'activity-login-logs'),
      feature('Currencies', 'currencies'),
      feature('Taxes', 'taxes'),
      feature('Bank Details', 'bank-details'),
      feature('Themes', 'themes'),
      feature('Email (SMTP) Settings', 'email-settings'),
      feature('Booking Notifications', 'booking-notifications')
    ]
  }
]