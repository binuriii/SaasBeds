export const brandName = 'SaaSBeds'

export const banner = {
  title: 'A smarter way to grow your business online.',
  primary: { label: 'Book a Demo', href: '/book-a-demo/' },
  secondary: { label: 'See Pricing', href: '/pricing/' }
}

const link = (label, href, badge = '') => ({ label, href, badge })

// Keep four feature columns on desktop; they become two or one on smaller screens.
export const featureGroups = [
  {
    title: 'Hotel operations',
    items: [
      link('Property Management System', '/features/hotel-property-management-system/'),
      link('Housekeeping', '/features/hotel-housekeeping-software/'),
      link('Night Audit', '/features/hotel-night-audit/'),
      link('Inventory & Procurement', '/features/hotel-inventory-procurement/'),
      link('Restaurant POS', '/features/restaurant-pos/'),
      link('HRM', '/features/hotel-hrm-software/'),
      link('Mobile App for Hoteliers', '/features/hotel-management-app/')
    ]
  },
  {
    title: 'Distribution & bookings',
    items: [
      link('Channel Manager', '/features/hotel-channel-manager/'),
      link('Booking Engine', '/features/hotel-booking-engine/'),
      link('Free Hotel Website', '/features/hotel-website-builder/'),
      link('Tour Operator Panel', '/features/tour-operator-management/'),
      link('Integrations & OTAs', '/integrations/')
    ]
  },
  {
    title: 'Revenue & guests',
    items: [
      link('Rate Manager, Packages & Offers', '/features/hotel-rate-management/'),
      link('Guest Engagement', '/features/guest-engagement/'),
      link('Payments', '/features/hotel-payment-gateway/'),
      link('Reports & Analytics', '/features/hotel-reports-analytics/'),
      link('Hotel PBX Phone System', '/features/hotel-pbx-phone-system/')
    ]
  },
  {
    title: 'AI & hotel solutions',
    items: [
      link('AI Agents Overview', '/ai/'),
      link('AI Receptionist', '/features/ai-receptionist/'),
      link('AI Front Desk Manager', '/features/ai-front-desk-manager/'),
      link('Hotels', '/solutions/hotels/'),
      link('Resorts', '/solutions/resorts/'),
      link('Villas', '/solutions/villas/'),
      link('Multi-Property Groups', '/solutions/multi-property/')
    ]
  }
]

// Secondary footer row: overview links, property types, company and direct contact.
export const products = [
  { id: 'platform', title: 'Platform Overview', href: '/platform/' },
  { id: 'features', title: 'All Features', href: '/features/' },
  { id: 'pricing', title: 'Pricing', href: '/pricing/' },
  { id: 'resources', title: 'Resources Overview', href: '/resources/' },
  { id: 'blog', title: 'Blog', href: '/blog/' },
  { id: 'guides', title: 'Guides & eBooks', href: '/guides/' }
]

export const corporateSolutions = [
  { id: 'boutique', title: 'Boutique Hotels', href: '/solutions/boutique-hotels/' },
  { id: 'guest-houses', title: 'Guest Houses & B&Bs', href: '/solutions/guest-houses/' },
  { id: 'apartments', title: 'Serviced Apartments', href: '/solutions/serviced-apartments/' },
  { id: 'rentals', title: 'Vacation Rentals', href: '/solutions/vacation-rentals/' },
  { id: 'switching', title: 'Switching to SaaSBeds', href: '/solutions/switch-hotel-software/' },
  { id: 'onboarding', title: 'Onboarding & Training', href: '/onboarding/' }
]

export const companyLinks = [
  link('About Us', '/about-us/'),
  link('Customer Stories', '/customers/'),
  link('Partners & Resellers', '/partners/'),
  link('Careers', '/careers/'),
  link('News & Press', '/news/'),
  link('Security & Data Privacy', '/security/')
]

export const contactLinks = [
  link('Book a Demo', '/book-a-demo/'),
  link('Contact Us', '/contact-us/'),
  link('Help Centre', 'https://help.saasbeds.com'),
  link('FAQs', '/faq/'),
  link('Call 0112 000 562', 'tel:+94112000562')
]

export const contactDescription =
  'Built and supported in Sri Lanka. Colombo 07, Sri Lanka · Bethlehem, Pennsylvania, USA.'

export const legalLinks = [
  link('Privacy Policy', '/privacy-policy/'),
  link('Terms of Service', '/terms/'),
  link('Cookie Policy', '/cookie-policy/'),
  link('Refund Policy', '/refund-policy/'),
  link('Security', '/security/'),
  link('Sitemap', '/sitemap/')
]

export const footerCredit = 'Built and supported in Sri Lanka'