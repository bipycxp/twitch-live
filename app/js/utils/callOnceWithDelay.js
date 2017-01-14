/**
 * Return wrapped function which call callback once after delay.
 *
 * @param {function} callback
 * @param {number=} delay Time in msec.
 * @return {*}
 */
export default function callOnceWithDelay (callback, delay = 0) {
  let timeoutId

  return function (...args) {
    clearTimeout(timeoutId)

    timeoutId = setTimeout(
      () => callback.apply(callback, args),
      delay
    )
  }
}
