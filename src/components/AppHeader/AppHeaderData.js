// All original SaaSBeds labels, groups and URLs are preserved from your supplied navigation.
// Artwork is stored locally in src/assets/header and bundled by Vite.
const page = (label, href) => ({ label, href })

const files = import.meta.glob('../../assets/header/*.{png,jpg,jpeg,webp,svg,avif}', {
  eager: true,
  query: '?url',
  import: 'default'
})

const img = (name) => {
  if (!name) return ''
  if (/^https?:\/\//i.test(name)) return name
  const key = Object.keys(files).find(k => k.toLowerCase().endsWith(`/${name.toLowerCase()}`))
  return key ? files[key] : ''
}

// NAVY ANNOUNCEMENT STRIP: update this text without changing AppHeader.vue.
export const announcement = {
  tag: 'NEW',
  text: 'SaaSBeds Channel Manager: sync rates and availability on every channel',
  href: '/features/hotel-channel-manager/'
}

// Brand logo: local transparent PNG; keep this exact filename in src/assets/header/.
export const logo = {
  src: img('saasbeds-wordmark.png'),
  alt: 'SaaSBeds'
}

// HEADER CTA: the requested Book a Demo wording + URL stay unchanged.
export const ctas = {
  primary: 'Book a Demo',
  primaryHref: '/book-a-demo/'
}

// MAIN NAVIGATION
export const navItems = [
  page('Home', '/'),
  { label: 'Platform', menu: 'platform' },
  { label: 'AI Agents', menu: 'ai-agents' },
  { label: 'Solutions', menu: 'solutions' },
  page('Pricing', '/pricing/'),
  { label: 'Resources', menu: 'resources' },
  { label: 'Company', menu: 'company' },
  page('Log in', 'https://partners.saasbeds.com/console')
]

export const platform = {
  cards: [
    {
      title: 'Platform Overview',
      text: 'One login for your entire hotel operation.',
      href: '/platform/',
      image: img('platform-overview.png')
    },
    {
      title: 'All Features',
      text: 'Explore every module in the SaaSBeds platform.',
      href: '/features/',
      image: img('platform-features.png')
    }
  ],
  cols: [
    [
      {
        title: 'Operations',
        sub: 'Manage your daily property operations.',
        groups: [
          {
            items: [
              page('Property Management System', '/features/hotel-property-management-system/'),
              page('Housekeeping', '/features/hotel-housekeeping-software/'),
              page('Night Audit', '/features/hotel-night-audit/'),
              page('Inventory & Procurement', '/features/hotel-inventory-procurement/'),
              page('Restaurant POS', '/features/restaurant-pos/'),
              page('Food Ordering System', '/features/food-ordering-system/'),
              page('HRM', '/features/hotel-hrm-software/'),
              page('Mobile App for Hoteliers', '/features/hotel-management-app/')
            ]
          }
        ]
      }
    ],
    [
      {
        title: 'Distribution',
        sub: 'Manage direct bookings and OTA channels.',
        groups: [
          {
            items: [
              page('Channel Manager', '/features/hotel-channel-manager/'),
              page('Booking Engine', '/features/hotel-booking-engine/'),
              page('Free Hotel Website', '/features/hotel-website-builder/'),
              page('Tour Operator Panel', '/features/tour-operator-management/')
            ]
          }
        ]
      }
    ],
    [
      {
        title: 'Revenue & Guests',
        sub: 'Manage rates, guests, payments and reporting.',
        groups: [
          {
            items: [
              page('Rate Manager, Packages & Offers', '/features/hotel-rate-management/'),
              page('Guest Engagement', '/features/guest-engagement/'),
              page('Payments', '/features/hotel-payment-gateway/'),
              page('Reports & Analytics', '/features/hotel-reports-analytics/'),
              page('Hotel PBX Phone System', '/features/hotel-pbx-phone-system/')
            ]
          }
        ]
      }
    ]
  ]
}

export const aiAgents = {
  feature: {
    tag: 'SAASBEDS AI',
    title: 'AI that works from your live hotel data',
    text: 'Discover AI tools designed to help hotel teams and guests using approved property information.',
    href: '/ai/',
    image: img('company-feature.png'),
    alt: 'SaaSBeds AI agents'
  },
  items: [
    page('AI Agents Overview', '/ai/'),
    page('AI Receptionist', '/features/ai-receptionist/'),
    page('AI Front Desk Manager', '/features/ai-front-desk-manager/')
  ]
}

export const solutions = {
  cols: [
    {
      sections: [
        {
          label: 'By Property Type',
          items: [
            page('Hotels', '/solutions/hotels/'),
            page('Resorts', '/solutions/resorts/'),
            page('Villas', '/solutions/villas/'),
            page('Boutique Hotels', '/solutions/boutique-hotels/'),
            page('Guest Houses & B&Bs', '/solutions/guest-houses/'),
            page('Aparthotels', '/solutions/aparthotels/'),
            page('Serviced Apartments', '/solutions/serviced-apartments/'),
            page('Multi-Property Groups', '/solutions/multi-property/'),
            page('Hotel PMS', '/features/hotel-property-management-system/')
          ]
        },
        {
          label: 'By Need',
          items: [
            page('New to Hotel Software', '/solutions/first-hotel-pms/'),
            page('Switching to SaaSBeds', '/solutions/switch-hotel-software/'),
            page('Onboarding & Training', '/onboarding/')
          ]
        }
      ]
    },
    {
      sections: [
        {
          label: 'Rentals',
          items: [
            page('Vacation Rentals', '/solutions/vacation-rentals/'),
            page('Holiday Lets', '/solutions/holiday-lets/'),
            page('Urban Rentals', '/solutions/urban-rentals/'),
            page('Outdoor Stays', '/solutions/outdoor-stays/'),
            page('Home Rentals Property Management', '/solutions/home-rentals/'),
            page('Property Management for Rentals', '/solutions/rental-property-management/'),
            page('Real Estate Property Management', '/solutions/real-estate-property-management/')
          ]
        },
        {
          label: 'Services',
          items: [
            page('Hotel Website Design', '/services/hotel-website-design/'),
            page('Hotel Digital Marketing', '/services/hotel-digital-marketing/')
          ]
        }
      ]
    }
  ],
  article: {
    tag: 'SAASBEDS',
    category: 'SOLUTIONS',
    title: 'Find the right hotel management solution for your property',
    href: '/solutions/',
    image: img('solutions-article.png'),
    alt: 'SaaSBeds solutions'
  },
  feature: {
    tag: 'EXPLORE',
    href: '/platform/',
    image: img('solutions-stat.png'),
    alt: 'Explore the SaaSBeds platform'
  }
}

export const resources = {
  cols: [
    {
      label: 'Overview',
      items: [page('Resources Overview', '/resources/')]
    },
    {
      label: 'Learn',
      items: [
        page('Blog', '/blog/'),
        page('Guides & eBooks', '/guides/'),
        page('Glossary', '/glossary/')
      ]
    },
    {
      label: 'Proof',
      items: [
        page('Customer Stories', '/customers/'),
        page('Integrations & OTAs', '/integrations/')
      ]
    },
    {
      label: 'Support',
      items: [
        page('Help Centre', 'https://help.saasbeds.com'),
        page('FAQs', '/faq/'),
        page('Product Updates', '/product-updates/'),
        page('Feature Requests', 'https://requests.saasbeds.com'),
        page('App Download', '/app/')
      ]
    }
  ],
  feature: {
    tag: 'SAASBEDS',
    title: 'Blog',
    href: '/blog/',
    image: img('resources-feature.png'),
    alt: 'SaaSBeds blog'
  }
}

export const company = {
  cols: [
    {
      label: 'Company',
      items: [
        page('About Us', '/about-us/'),
        page('News & Press', '/news/')
      ]
    },
    {
      label: 'Work With Us',
      items: [
        page('Partners & Resellers', '/partners/'),
        page('Careers', '/careers/')
      ]
    },
    {
      label: 'Get in Touch',
      items: [
        page('Contact Us', '/contact-us/'),
        page('Book a Demo', '/book-a-demo/')
      ]
    }
  ],
  feature: {
    tag: 'SAASBEDS',
    title: 'About Us',
    href: '/about-us/',
    image: img('ai-agents.png'),
    alt: 'About SaaSBeds'
  }
}
