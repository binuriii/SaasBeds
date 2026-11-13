// All footer text lives here (copied 1:1 from the Saasbeds footer).
export const brandName = 'Saasbeds'


export const banner = {
 title: 'A smarter way to grow your business online.',
 primary: { label: 'Get a Demo', href: '#demo' },
 secondary: { label: 'Get Started', href: '#contact' }
}


const L = (label, href = '#', badge) => ({ label, href, badge })


export const featureGroups = [
 { title: 'Grow online discovery', items: [L('Restaurant Website'), L('Restaurant SEO'), L('Online Menu'), L('Reviews Engine', '#', 'Coming Soon'), L('Listings Management')] },
 { title: 'Grow repeat orders', items: [L('Point of Sale'), L('Branded Restaurant App', '#', 'Coming Soon'), L('Marketing Campaigns'), L('Push Notifications Marketing'), L('Loyalty & Rewards')] },
 { title: 'Grow online sales', items: [L('Online Ordering'), L('Smart Upsells'), L('Delivery'), L('Catering'), L('AI Phone Ordering', '#', 'Coming Soon')] },
 { title: 'Run your restaurant', items: [L('Reporting & Analytics'), L('Kitchen Tablet'), L('POS Integrations'), L('Delivery App', '#', 'Coming Soon')] }
]


export const products = [
 { id: 'ecommerce', title: 'E-commerce Solutions', href: '#' },
 { id: 'food', title: 'Food Ordering Systems', href: '#' }
]


export const corporateSolutions = [
 { id: 'mv-ecommerce', title: 'Multivendor E-Commerce Portal', href: '#' },
 { id: 'mv-food', title: 'Multivendor Food Portal', href: '#' }
]


export const companyLinks = [
 { label: 'Home', href: '/' },
 { label: 'Clients', href: '#clients' },
 { label: 'About', href: '#about' },
 { label: 'Pricing', href: '#pricing' },
 { label: 'Contact', href: '#contact' }
]


export const contactLinks = [
 { label: 'Get a Demo', href: '#demo' },
 { label: 'Contact Us', href: '#contact' },
 { label: 'View Pricing', href: '#pricing' }
]
export const contactDescription = 'Find the right solution for your next stage of growth.'


export const legalLinks = [
 { label: 'Privacy Policy', href: '#privacy' },
 { label: 'Terms of Service', href: '#terms' },
 { label: 'Cookies', href: '#cookies' }
]

