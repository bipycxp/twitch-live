import 'whatwg-fetch'
import querystring from 'querystring'

import { twitch } from '../config'

const API_URL = twitch.apiUrl
const API_VERSION = twitch.apiVersion

const ELEMENTS_LIMIT_PER_REQ = 100

/**
 * Class to working with Twitch API.
 */
export class Twitch {
  /**
   * @param {String} clientId
   */
  constructor ({ clientId }) {
    this.clientId = clientId
  }

  /**
   * Get Twitch clientId.
   *
   * @return {String}
   */
  getClientId () {
    return this.clientId
  }

  /**
   * Send request to Twitch API and fetch response.
   *
   * @private
   * @param {String} path
   * @param {Object=} params
   * @return {Object}
   * @throws Error
   */
  async fetch (path, params = {}) {
    // Path to Twitch API with query params.
    const url = API_URL + path + '?' + querystring.stringify(params)
    const headers = {
      'Accept': `application/vnd.twitchtv.${API_VERSION}+json`,
      'Client-ID': this.clientId
    }

    const response = await fetch(url, { headers })

    if (response.status < 200 || response.status >= 300) {
      throw new Error(response.statusText)
    }

    return response.json()
  }

  /**
   * Get online streams from channels.
   *
   * @param {Array} channels
   * @return {Object}
   */
  async streams (channels) {
    let streams = []
    let params = {
      channel: channels.join(','),
      limit: ELEMENTS_LIMIT_PER_REQ,
      offset: 0
    }

    while (true) {
      let { _total, streams: respStreams } = await this.fetch('/streams', params)
      streams = [].concat(streams, respStreams)

      // Break loop if last response page.
      if (respStreams.length !== params.limit || streams.length === _total) break

      params.offset += params.limit
    }

    return streams
  }

  /**
   * Get channel info.
   *
   * @param {String} channel
   * @return {Object}
   */
  async channel (channel) {
    return this.fetch('/channels/' + channel)
  }

  /**
   * Get user follows.
   *
   * @param {String} user
   * @return {Object}
   */
  async follows (user) {
    let follows = []
    let params = {
      limit: ELEMENTS_LIMIT_PER_REQ,
      offset: 0
    }

    while (true) {
      let { _total, follows: respFollows } = await this.fetch(`/users/${user}/follows/channels`, params)
      follows = [].concat(follows, respFollows)

      // Break loop if last response page.
      if (respFollows.length !== params.limit || follows.length === _total) break

      params.offset += params.limit
    }

    return follows
  }
}

export default new Twitch({ clientId: twitch.clientId })
