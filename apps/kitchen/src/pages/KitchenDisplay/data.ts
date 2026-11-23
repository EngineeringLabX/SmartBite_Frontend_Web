// Mock data until the kitchen operations API (Epic 5) is available

export type TicketStatus = 'New' | 'Preparing' | 'Ready'

export type TicketAlert = {
  tone: 'danger' | 'info' | 'safe' | 'caution'
  text: string
}

export type Ticket = {
  id: string
  guest: string
  /** Line under the order number, e.g. "Placed 2 mins ago • Dine-in Table 4" */
  meta: string
  items: string[]
  /** LKR */
  total: number
  status: TicketStatus
  prepMinutes: number
  cookedMinutes: number
  alert?: TicketAlert
  /** Completed tickets: how the order left the kitchen. Defaults to "Ready" */
  handoff?: 'Delivered' | 'Picked Up'
  /** Completed tickets: driver or pickup note */
  footnote?: string
  /** Completed tickets: guest rating out of 5 */
  rating?: string
}

export const INITIAL_TICKETS: Ticket[] = [
  {
    id: '1042',
    guest: 'Nimali P.',
    meta: 'Placed 2 mins ago • Dine-in Table 4',
    items: ['Quinoa Buddha Bowl × 2'],
    total: 2900,
    status: 'New',
    prepMinutes: 12,
    cookedMinutes: 0,
    alert: { tone: 'danger', text: 'Severe Peanut & Nut Allergy (Strict SafeZone)' },
  },
  {
    id: '1043',
    guest: 'Ruwan K.',
    meta: 'Placed 4 mins ago • Delivery Station #2',
    items: ['Mediterranean Mezze Platter × 2'],
    total: 3400,
    status: 'New',
    prepMinutes: 15,
    cookedMinutes: 0,
    alert: { tone: 'info', text: 'Low-Glycemic Protocol • Extra Virgin Olive Oil' },
  },
  {
    id: '1044',
    guest: 'Minoli D.',
    meta: 'Placed 6 mins ago • Curbside Pickup',
    items: ['Lentil Dhal & Organic Brown Rice × 1'],
    total: 950,
    status: 'New',
    prepMinutes: 10,
    cookedMinutes: 0,
    alert: { tone: 'safe', text: '100% Vegan & Gluten-Free Certified' },
  },
  {
    id: '1041',
    guest: 'Kasun R.',
    meta: 'Station: Hot Sauté • Chef Priya',
    items: ['Lentil Dhal & Brown Rice'],
    total: 950,
    status: 'Preparing',
    prepMinutes: 12,
    cookedMinutes: 8,
  },
  {
    id: '1040',
    guest: 'Ayesha M.',
    meta: 'Station: Cold Salad Bar • Prep #3',
    items: ['Grilled Chicken Salad (No Cilantro)'],
    total: 1650,
    status: 'Preparing',
    prepMinutes: 10,
    cookedMinutes: 8,
    alert: { tone: 'caution', text: 'Exclude Cilantro (Soap Gene sensitive)' },
  },
  {
    id: '1039',
    guest: 'Dilshan W.',
    meta: 'Station: Grill • Chef Kamal',
    items: ['Salmon Poke Bowl × 1'],
    total: 2200,
    status: 'Preparing',
    prepMinutes: 16,
    cookedMinutes: 5,
  },
  {
    id: '1036',
    guest: 'Dinesh W.',
    meta: 'Delivered • 12:44 PM',
    items: ['Salmon Poke', 'Quinoa Buddha Bowl'],
    total: 3650,
    status: 'Ready',
    prepMinutes: 14,
    cookedMinutes: 14,
    handoff: 'Delivered',
    footnote: 'Driver: ExpressCourier #44',
    rating: '5.0',
  },
  {
    id: '1035',
    guest: 'Shanika B.',
    meta: 'Picked up • 12:30 PM',
    items: ['Avocado Greens Bowl × 1'],
    total: 1850,
    status: 'Ready',
    prepMinutes: 9,
    cookedMinutes: 9,
    handoff: 'Picked Up',
    footnote: 'Customer self-pickup at counter',
  },
  {
    id: '1034',
    guest: 'Nuwan T.',
    meta: 'Delivered • 12:18 PM',
    items: ['Roasted Chickpea Salad Bowl'],
    total: 1450,
    status: 'Ready',
    prepMinutes: 11,
    cookedMinutes: 11,
    handoff: 'Delivered',
    footnote: 'Driver: QuickDeliver #12',
    rating: '4.8',
  },
]

export const NAV_ITEMS = [
  { label: 'Live Kitchen & Orders', active: true },
  { label: 'Menu & Allergen Matrix', active: false },
  { label: 'Ingredient Prep & Stock', active: false },
  { label: 'Performance & Analytics', active: false },
  { label: 'Safety Compliance', active: false },
]

export const STATS = {
  ordersToday: { value: '18', hint: '+4 vs yesterday' },
  revenueToday: { value: 'LKR 27,450', hint: '+12.5% vs midday avg' },
  averageRating: { value: '4.7', hint: 'from 126 customer reviews' },
  itemsUnavailable: { value: '2', hint: 'update in Menu' },
}

export type PerformanceTile = {
  label: string
  value: string
  valueTone?: 'good'
  badge: { text: string; tone: 'good' | 'chip' }
  /** 0–1, shown as a progress bar when set */
  progress?: number
  lines: string[]
}

export const PERFORMANCE_TILES: PerformanceTile[] = [
  {
    label: '7-day orders',
    value: '142',
    badge: { text: '+18% WoW', tone: 'good' },
    progress: 0.77,
    lines: ['Daily average: ~20.3 orders'],
  },
  {
    label: '7-day gross volume',
    value: 'LKR 218,600',
    badge: { text: '+14.2%', tone: 'good' },
    lines: ['Avg ticket: LKR 1,539', 'Peak day: Saturday (LKR 46,200)'],
  },
  {
    label: 'Kitchen speed & prep',
    value: '13.8 min',
    badge: { text: '-1.4 min faster', tone: 'good' },
    lines: ['Target window: < 15 min', '94.2% orders on time'],
  },
  {
    label: 'Allergen & diet safety',
    value: '100%',
    valueTone: 'good',
    badge: { text: 'Zero Flags', tone: 'chip' },
    lines: ['Personalized dishes: 46 items', 'SmartBite SafeCore Active'],
  },
]

export const SAFECORE_STATIONS = [
  { label: 'Cold Pantry', percent: 45, tone: 'blue' },
  { label: 'Hot Sauté/Grill', percent: 82, tone: 'amber' },
  { label: 'Packing & QC', percent: 30, tone: 'green' },
] as const
