// Sample wellness profile shown until there is a profile API to load it from

export type Severity = 'Extreme' | 'High' | 'Moderate' | 'Mild'
export type Tone = 'primary' | 'secondary' | 'tertiary' | 'muted' | 'error'

export type Allergen = {
  id: string
  name: string
  detail: string
  severity: Severity
  note: string
  noteIcon?: string
  noteTone: Tone
}

export const SEVERITIES: Record<Severity, { label: string; option: string; icon: string }> = {
  Extreme: { label: 'Extreme / Anaphylactic', option: 'Extreme / Anaphylactic Risk', icon: 'shield_with_heart' },
  High: { label: 'High Alert', option: 'High Alert', icon: 'warning' },
  Moderate: { label: 'Moderate', option: 'Moderate Intolerance', icon: 'water_drop' },
  Mild: { label: 'Mild Notice', option: 'Mild Sensitivity', icon: 'info' },
}

export const INITIAL_ALLERGENS: Allergen[] = [
  {
    id: 'peanut',
    name: 'Peanuts & Groundnuts',
    detail: 'Ara h 1, Ara h 2 proteins',
    severity: 'Extreme',
    note: 'Cross-contamination zero tolerance',
    noteIcon: 'block',
    noteTone: 'error',
  },
  {
    id: 'shellfish',
    name: 'Crustaceans & Shellfish',
    detail: 'Shrimp, crab, lobster, tropomyosin',
    severity: 'High',
    note: 'Include oyster sauce & fish stock traces',
    noteIcon: 'priority_high',
    noteTone: 'muted',
  },
  {
    id: 'milk',
    name: "Cow's Milk & Lactose",
    detail: 'Enzyme insufficiency & Casein sensitivity',
    severity: 'Moderate',
    note: 'Auto-substitute Oat / Almond',
    noteIcon: 'change_circle',
    noteTone: 'primary',
  },
  {
    id: 'soy',
    name: 'Soy Lecithin Emulsifiers',
    detail: 'Processed food sensitivity',
    severity: 'Mild',
    note: 'Informational flag on packaging scan',
    noteTone: 'secondary',
  },
]

export const EATING_STYLES = [
  'Mediterranean',
  'Low-Glycemic Index',
  'Intermittent Fasting (16:8)',
  'Vegan',
  'Keto (Low-Carb)',
  'Halal Certified',
  'Low-FODMAP',
  'Pescatarian',
  'Paleo Diet',
]

export const INITIAL_EATING_STYLES = ['Mediterranean', 'Low-Glycemic Index', 'Intermittent Fasting (16:8)']

export const CHEF_DIRECTIVES =
  'Strictly avoid industrial refined seed oils (soybean, canola, corn). Use exclusively cold-pressed extra-virgin olive oil or avocado oil. Prefer grass-fed dairy alternatives and sulfur-rich brassica vegetables.'

export const MACROS: { name: string; grams: string; split: string; percent: number; tone: Tone }[] = [
  { name: 'Protein', grams: '145g', split: '28% (580 kcal)', percent: 28, tone: 'primary' },
  { name: 'Complex Carbs', grams: '180g', split: '34% (720 kcal)', percent: 34, tone: 'secondary' },
  { name: 'Healthy Fats', grams: '75g', split: '38% (675 kcal)', percent: 38, tone: 'tertiary' },
]

export const MEALS: { name: string; calories: string; focus: string; tone: Tone }[] = [
  { name: 'Breakfast (8:30 AM)', calories: '550 kcal', focus: '35g Protein focus', tone: 'primary' },
  { name: 'Lunch (1:00 PM)', calories: '750 kcal', focus: 'High Polyphenol', tone: 'secondary' },
  { name: 'Dinner (7:00 PM)', calories: '650 kcal', focus: 'Low Glycemic Load', tone: 'tertiary' },
  { name: 'Micro Snack / Intra', calories: '200 kcal', focus: 'Pre-sleep raw nuts', tone: 'muted' },
]

export const CONDITIONS: {
  name: string
  icon: string
  description: string
  label: string
  value: string
  tone: Tone
}[] = [
  {
    name: 'Blood Sugar Stability',
    icon: 'glucose',
    description: 'Target glycemic load < 55. AI flags and reduces quick-digesting refined starches.',
    label: 'Current Target:',
    value: 'Pre-diabetes Shield',
    tone: 'primary',
  },
  {
    name: 'Hypertension Watch',
    icon: 'favorite',
    description: 'Maximum daily sodium ceiling set to 1,800mg. AI recommends potassium counterweights.',
    label: 'Sodium Cap:',
    value: '< 1,800 mg / day',
    tone: 'tertiary',
  },
  {
    name: 'Gut Microbiome (IBS)',
    icon: 'microbiology',
    description: 'Prioritize prebiotic inulin and fermented foods while restricting high fructans.',
    label: 'Focus:',
    value: 'Microbial Diversity',
    tone: 'primary',
  },
]

export const SPICE_LEVELS = ['No Heat', 'Gentle', 'Light Warmth', 'Medium Warmth', 'Hot', 'Ghost Pepper']

export const CUISINES = ['Japanese Washoku', 'Greek Island', 'Levantine Mezze', 'Northern Italian', 'Thai (Herb-centric)']

export const STAR_INGREDIENTS = [
  'Wild King Salmon',
  'Hass Avocado',
  'Tri-Color Quinoa',
  'Organic Blueberries',
  'Shiitake Mushrooms',
]

export const DISLIKED_INGREDIENTS = ['Cilantro (Soap Gene)', 'Excessive Truffle Oil', 'Aspartame & Sucralose']

export const SAFETY_GUARDS = [
  {
    name: 'Menu Auto-Scrubbing',
    description: 'Dishes violating peanut or shellfish profiles are hidden on partner restaurant menus.',
  },
  {
    name: 'Live SafeScanner Camera',
    description: 'High-speed OCR & barcode lookup directly validates consumer grocery item labels.',
  },
  {
    name: 'Smart Substitutions',
    description: 'Automatically suggest dairy alternatives without compromising texture or mouthfeel.',
  },
]

export const COMPLIANCE_IMAGE =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuDDeKVbYCBvNqIBR-gA-oMtWdYYbA88_F3miq4OsDukYZhPVmDw0AQE9AYNO4-aaBkQYogYY41-ImiJzvPlgsgkG_KeNsMYD_VY-fFMAEzlcXL-vYTpr0bQtfYi8r2zvaxNY18S3xIt77O_JgH2n-jT5JjZoP6nx_gimkQbjZgKlJvf-mPQLopo4xJIjQDv8vyfAbS4FKgPtwOS1oTM0qpIJpXRZ6H2lTjbvoHukZ-Ef7Xzo5djdisU'
