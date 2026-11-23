/** "HH:MM" (24h) → minutes after midnight */
export function toMinutes(time: string) {
  const [hours, minutes] = time.split(':').map(Number)
  return hours * 60 + minutes
}

/** Minutes after midnight → "12:30 PM" */
export function formatClock(totalMinutes: number) {
  const minutes = ((totalMinutes % 1440) + 1440) % 1440
  const hours24 = Math.floor(minutes / 60)
  const hours12 = hours24 % 12 || 12
  return `${String(hours12).padStart(2, '0')}:${String(minutes % 60).padStart(2, '0')} ${hours24 < 12 ? 'AM' : 'PM'}`
}

/** Hour of the day → "12:00 PM" without a leading zero, for window labels */
export const formatHour = (hour: number) => formatClock(hour * 60).replace(/^0/, '')
