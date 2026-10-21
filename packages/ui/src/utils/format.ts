export const CURRENCY = 'LKR'

export const formatPrice = (amount: number) => `${CURRENCY} ${amount.toLocaleString()}`

export const formatCalories = (kcal: number) => `${kcal} kcal`
