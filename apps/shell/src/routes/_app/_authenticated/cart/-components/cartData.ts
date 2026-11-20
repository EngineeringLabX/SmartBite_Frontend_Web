// Sample dinner tray shown until there is a cart API to load it from

export type Modifier = { icon: string; label: string; value: string }

export type CartItem = {
  id: string
  name: string
  image: string
  imageAlt: string
  /** Small label over the photo, e.g. the HACCP station */
  stationTag: string
  /** How well the meal fits the user's wellness profile, 0-100 */
  match: number
  highlight: string
  price: number
  kcal: number
  protein: number
  carbs: number
  fat: number
  carbsLabel: string
  fatLabel: string
  /** Ids from the wellness profile allergen list (see profileData) */
  allergens: string[]
  modifiers: Modifier[]
  safety: { icon: string; text: string }
  quantity: number
}

export const MAX_QUANTITY = 9

export const INITIAL_CART: CartItem[] = [
  {
    id: 'salmon-bowl',
    name: 'Wild Alaskan Salmon & Roasted Quinoa Buddha Bowl',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuD7pMgIobvNP3YbEAUeU2DHZ_Ci46hoNXZ56AWODURwKgC3pSGgU59XOCRP1LhaqoTTshC-8jOe1mmggLqBi2NIBfgwv9siV2x8VdV2SmVmpEAjU85NQesHXalMopXFyN4qVyB0gWkugfME8_UW7nCMyp52MDWe9ElZHu4eBBxio7dB1D1Pvg8Pgj-MtVlTBmDlYNOZaTrkq7vs0j50W8CS8OlHq40RYBGmWWuy8puXuMHoS0B6TWP5',
    imageAlt: 'Seared salmon fillet on tri-colour quinoa with asparagus and edamame',
    stationTag: 'HACCP #02',
    match: 98,
    highlight: 'High Omega-3',
    price: 3650,
    kcal: 620,
    protein: 48,
    carbs: 28,
    fat: 18,
    carbsLabel: 'Net Carbs',
    fatLabel: 'Healthy Fats',
    allergens: [],
    modifiers: [
      { icon: 'tune', label: 'Dressing Swapped', value: 'Avocado Lime Emulsion (Zero Seed Oils)' },
      { icon: 'grain', label: 'Base Protocol', value: 'Steamed Tri-Color Andean Quinoa' },
    ],
    safety: { icon: 'shield', text: 'Certified Peanut & Shellfish Safe (Dedicated Station #2)' },
    quantity: 1,
  },
  {
    id: 'lentil-dhal',
    name: 'Slow-Simmered Lentil Dhal & Brown Rice',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCO3r-AO6coSrMPpzenyrNJwK6mBfaDypMMXqzt20o7z0SsdBYMfxLDSKpFcfg7VJoBOJkAbq2dzdPabvi2uM770pRJcqsLREHxY1BRQlX-QiF32GawKcc-BsbWIdNtgdfwJNYDn-3bJDR4a6AlhyZ2lBhCHfR1lv-lIAcCIeha9xepV8G5kSBUOIQ3Rd5Gjg1OqF0rc95WZYVG1awIgYOQKeMJGeVA9NXMfJzaAuKR3oM1YlTwUXDs',
    imageAlt: 'Golden turmeric lentil dhal in an earthen pot with brown rice',
    stationTag: 'Plant Lab',
    match: 95,
    highlight: 'High Fiber Prebiotic',
    price: 950,
    kcal: 490,
    protein: 22,
    carbs: 68,
    fat: 11,
    carbsLabel: 'Carbs',
    fatLabel: 'Fat',
    allergens: [],
    modifiers: [
      { icon: 'soup_kitchen', label: 'Spice Caliber', value: 'Mild Sri Lankan Curry Leaf Temper' },
      { icon: 'local_florist', label: 'Lipid Base', value: 'Extra Virgin Cold-Pressed Coconut Oil Simmer' },
    ],
    safety: { icon: 'eco', text: '100% Plant-Based • Certified Peanut & Tree Nut-Safe Line' },
    quantity: 1,
  },
]

/** AI-suggested add-on, offered while it is not already on the tray */
export const SUGGESTED_ADD_ON: CartItem = {
  id: 'turmeric-tonic',
  name: 'Cold-Pressed Turmeric Citrus Tonic',
  image:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuDp0urO1jAoFfH-mTZ_JRHv0peuU218OMqv2tQQS6W8h4O6Vf8Ok75cyIJvjPlD4uEUfxwETrD7_fecgr29rt4y6RRG9Nd1FZnP-oBQmqSP3ujWrzOLDqhFoZByfDTbB_18LDtUgAc_u1SXvwkPgUQrXPD66n4O2TwzJXgj34WedJIySGLpFJypZLc07nWDYd3BrF0_Ba28fMFmHKTu8Ls4RAXmRRec4VvojwPT-UYDpSWRseFC5D4p',
  imageAlt: 'Turmeric citrus tonic in a glass bottle',
  stationTag: 'Cold Press',
  match: 99,
  highlight: 'Curcumin + Electrolytes',
  price: 450,
  kcal: 35,
  protein: 0,
  carbs: 8,
  fat: 0,
  carbsLabel: 'Carbs',
  fatLabel: 'Fat',
  allergens: [],
  modifiers: [],
  safety: { icon: 'verified', text: 'Nut-Safe • Sealed at source' },
  quantity: 1,
}

/** Profile allergens the radar checks the tray against */
export const RADAR_CHECKS = [
  {
    allergen: 'peanut',
    title: 'Peanut & Tree Nut Lockout',
    passed: 'Dedicated zero-nut preparation line verified.',
  },
  {
    allergen: 'shellfish',
    title: 'Shellfish Radar Isolation',
    passed: 'No crustacean proteins present in kitchen bay.',
  },
]

/** What the user has already eaten today and their daily targets */
export const DAY_BUDGET = {
  eatenKcal: 920,
  targetKcal: 2170,
  maxKcal: 2310,
  eatenProtein: 124,
  targetProtein: 140,
  dinnerCarbs: 148,
  dinnerFat: 35,
}

export const FEES = {
  packaging: 150,
  courier: 250,
  /** Discount for a tray whose meals all match the profile closely */
  wellnessOffset: 0.05,
  wellnessMinMatch: 90,
}

export const DELIVERY = {
  address: 'Apartment 4B, Lotus Residencies',
  area: 'Alfred Place, Colombo 03, Sri Lanka',
  slot: 'Immediate (7:45 PM • 28 min)',
  hub: 'Colombo 03 Hub',
}

export const ORDER_REFERENCE = 'SB-8921-LK'
