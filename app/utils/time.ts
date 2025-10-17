// Utility functions for time management

/**
 * Get the current date/time in Egyptian timezone (Africa/Cairo)
 */
export function getEgyptianDate(): Date {
  return new Date(new Date().toLocaleString('en-US', { timeZone: 'Africa/Cairo' }))
}

/**
 * Get a date string in Egyptian timezone for comparison
 * Format: YYYY-MM-DD
 */
export function getEgyptianDateString(): string {
  const egyptDate = getEgyptianDate()
  return egyptDate.toISOString().split('T')[0]
}

/**
 * Check if we've passed 12 PM Egyptian time today
 * Returns true if current time is after 12:00 PM Egypt time
 */
export function hasPassed12PMEgypt(): boolean {
  const egyptDate = getEgyptianDate()
  const hour = egyptDate.getHours()
  return hour >= 12
}

/**
 * Get the last reset time (12 PM Egyptian time)
 * If before 12 PM, returns today at 12 PM
 * If after 12 PM, returns today at 12 PM
 */
export function getLastResetTime(): Date {
  const egyptDate = getEgyptianDate()
  const resetDate = new Date(egyptDate)
  resetDate.setHours(12, 0, 0, 0)
  return resetDate
}

/**
 * Check if quote should be updated based on 12 PM Egyptian time
 * Returns true if:
 * - No saved date exists
 * - Saved date is from a different day
 * - It's after 12 PM today and last update was before 12 PM
 */
export function shouldUpdateQuoteOfDay(lastUpdateTimestamp: number | null): boolean {
  if (!lastUpdateTimestamp) return true
  
  const lastUpdate = new Date(lastUpdateTimestamp)
  const resetTime = getLastResetTime()
  const now = getEgyptianDate()
  
  // If current time is after reset time and last update was before reset time
  if (now >= resetTime && lastUpdate < resetTime) {
    return true
  }
  
  // If it's a different day
  const lastUpdateDateStr = lastUpdate.toISOString().split('T')[0]
  const todayDateStr = getEgyptianDateString()
  
  return lastUpdateDateStr !== todayDateStr
}

/**
 * Calculate milliseconds until next 12 PM Egyptian time
 */
export function getMillisecondsUntilNext12PM(): number {
  const now = getEgyptianDate()
  const next12PM = new Date(now)
  
  // Set to 12 PM today
  next12PM.setHours(12, 0, 0, 0)
  
  // If we've passed 12 PM today, set to 12 PM tomorrow
  if (now >= next12PM) {
    next12PM.setDate(next12PM.getDate() + 1)
  }
  
  return next12PM.getTime() - now.getTime()
}


