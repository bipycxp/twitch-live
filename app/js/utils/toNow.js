import moment from 'moment'

/**
 * Get formatted time from `started` to now.
 *
 * @param {string} started In ISO format.
 * @param {boolean=} short If true - return time in short format.
 * @return {string}
 */
export default function toNow (started, short = false) {
  let momentStarted = moment(started)

  // Return time in short format if parameter `short` is true.
  if (short) return momentStarted.toNow(true)

  // Count diff between `started` and now. Don't forget UTC format.
  let diff = moment(moment().diff(momentStarted)).utc().toObject()

  let days = diff.date - 1 // Dates starts from 1, but we need count of the days, so remove one.
  let { hours, minutes } = diff

  let time = []

  // If time field isn't empty - push to `time` with short name.
  days && time.push(`${days}d`)
  hours && time.push(`${hours}h`)
  minutes && time.push(`${minutes}m`)

  // Return string with space between time fields.
  return time.join(` `)
}
