export const brandsText = 'Embraced by startups, agencies, and teams across the world.'

// seconds for one full loop
export const brandsDuration = 30

// Local logo files live in src/assets/logos (path is relative to this file)
const local = import.meta.glob('../../../assets/logos/*.{png,jpg,jpeg,webp,avif,svg}', {
  eager: true,
  query: '?url',
  import: 'default',
})

// matches by file name; returns '' if the file is missing (a text wordmark is shown instead)
const resolveImage = (name) => {
  const key = Object.keys(local).find((k) => k.split('/').pop() === name)
  return key ? local[key] : ''
}

// image = file name in src/assets/logos, href = link (leave '' for no link), h = logo height in px
const brands = [
  { name: 'Coco Bay',           image: 'cocobay_logo.png',        href: 'https://cocobayunawatuna.com', h: 40 },
  { name: 'House of Sincerity', image: 'house_of_sincerity.webp', href: 'https://www.houseofsincerity.com', h: 50 },
  { name: 'Grand Kandyan',      image: 'grand_kandyan.png',       href: 'https://www.grandkandyan.com', h: 65 },
  { name: 'Villa Albino',       image: 'Villa_Albino.png',        href: 'https://albinovilla.com', h: 70 },
  { name: 'Sigiri Vananthara',  image: 'Sigiri_Vananthara.png',   href: 'https://sigirivananthara.com', h: 55 },
  { name: 'Square 380',         image: 'Square_380.webp',         href: 'https://square380.com', h: 60 },
  { name: 'Tree of Life',       image: 'tree_of_life.png',        href: 'https://hoteltreeoflife.com', h: 50 },
  { name: 'Wijaya Leisure',     image: 'wijaya_leisure.png',      href: 'https://wijayaleisure.com', h: 65 },
]

export const logos = brands.map((b) => ({ ...b, src: resolveImage(b.image) }))

// value = big text, label = small text under it. Replace the [X] values with real numbers.
export const stats = [
  { value: '[X]',           label: 'properties' },
  { value: '[X]',           label: 'bookings managed' },
  { value: '27',            label: 'ready-made reports' },
  { value: 'Local support', label: 'from Colombo' },
]