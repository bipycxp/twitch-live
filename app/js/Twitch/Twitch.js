import 'whatwg-fetch'

const { twitch: { apiUrl, apiVersion } } = require('config.js')

/**
 * Class to working with Twitch API.
 */
export default class Twitch {
  /**
   * @param {String} clientId
   */
  constructor ({ clientId }) {
    this.clientId = clientId
  }

  /**
   * @return {String}
   */
  getClientId () {
    return this.clientId
  }

  /**
   * @private
   * @param {String} path
   * @param {Object} parameters
   * @return {Object}
   * @throws Error
   */
  async fetch (path, parameters = {}) {
    const response = await fetch(apiUrl + path, {
      ...parameters,
      headers: {
        'Accept': `application/vnd.twitchtv.${apiVersion}+json`,
        'Client-ID': this.clientId
      }
    })

    if (response.status < 200 || response.status >= 300) {
      throw new Error(response.statusText)
    }

    return response.json()
  }

  /**
   * @param {Array} channels
   * @return {Object}
   */
  async streams (channels = []) {
    return this.fetch('/streams?channel=' + channels.join())
  }

  /**
   * @param {String} channel
   * @return {Object}
   */
  async channel (channel) {
    return this.fetch('/channels/' + channel)
  }

  /**
   * @param {String} user
   * @return {Object}
   */
  async follows (user) {
    return this.fetch(`/users/${user}/follows/channels`)
  }
}
