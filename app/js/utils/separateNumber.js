/**
 * Return separate number.
 *
 * @param {number} number
 * @param {string=} separator
 * @return {string}
 */
export default function separateNumber (number, separator = ',') {
  return (+number).toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1' + separator)
}
