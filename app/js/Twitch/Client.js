import 'whatwg-fetch'
import querystring from 'querystring'

/**
 * Default options.
 */
const DEFAULT_API_VERSION = `v5`
const DEFAULT_API_URL = `https://api.twitch.tv/kraken`
const DEFAULT_TWITCH_URL = `https://www.twitch.tv`

const ELEMENTS_LIMIT_PER_REQ = 100
const DEFAULT_SEARCH_COUNT = 5

/**
 * Class to working with Twitch API.
 */
export default class Twitch {
  /**
   * @param {String} clientId
   * @param {?String} apiVersion
   * @param {?String} apiUrl
   * @param {?String} twitchUrl
   */
  constructor ({ clientId, apiVersion = DEFAULT_API_VERSION, apiUrl = DEFAULT_API_URL, twitchUrl = DEFAULT_TWITCH_URL }) {
    Object.assign(this, { clientId, apiVersion, apiUrl, twitchUrl })
  }

  /**
   * Getters.
   */
  getClientId = () => this.clientId
  getApiVersion = () => this.apiVersion
  getApiUrl = () => this.apiUrl
  getTwitchUrl = () => this.twitchUrl

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
    const url = `${this.apiUrl}${path}?${querystring.stringify(params)}`
    const headers = {
      'Accept': `application/vnd.twitchtv.${this.apiVersion}+json`,
      'Client-ID': this.clientId,
    }

    const response = await fetch(url, { headers })

    if (response.status < 200 || response.status >= 300) {
      throw new Error(response.statusText)
    }

    return response.json()
  }

  /**
   * Map stream object.
   *
   * @private
   * @param {Object} stream Stream object from response.
   * @return {Object}
   */
  streamMap = stream => ({
    channelId: stream.channel._id + ``,
    displayName: stream.channel.display_name,
    game: stream.channel.game, // Full name of the game
    gameUrl: `${this.twitchUrl}/directory/game/${stream.game}`,
    logo: stream.channel.logo,
    name: stream.channel.name,
    status: stream.channel.status,
    url: stream.channel.url,
    viewers: stream.viewers,
    datetime: {
      started: stream.created_at,
    },
  })

  /**
   * Get online streams from channels.
   *
   * @param {String[]} channels Array of the channel ids.
   * @param {Function|false|null} map Map function to mapping streams from response.
   *    If false - without mapping. If not a function - use Twitch.streamMap.
   * @return {Object}
   */
  async streams (channels, map = null) {
    let streams = []
    let params = {
      channel: channels.join(`,`),
      limit: ELEMENTS_LIMIT_PER_REQ,
      offset: 0,
    }

    while (true) {
      let { _total, streams: respStreams } = await this.fetch(`/streams`, params)
      streams = [].concat(streams, respStreams)

      // Break loop if last response page.
      if (respStreams.length !== params.limit || streams.length === _total) break

      params.offset += params.limit
    }

    // If false - without mapping.
    if (map === false) return streams

    // If not a function - use Twitch.streamMap.
    return streams.map(map instanceof Function ? map : this.streamMap)
  }

  /**
   * Map channel object.
   *
   * @private
   * @param {Object} channel Channel object from response.
   * @return {Object}
   */
  channelMap = channel => ({
    id: channel._id + ``,
    displayName: channel.display_name,
    logo: channel.logo,
    name: channel.name,
    url: channel.url,
  })

  /**
   * Get channels by query.
   *
   * @param {String} query
   * @param {Number} count
   * @param {Function|false|null} map
   * @return {Object[]}
   */
  async searchChannels (query, count = DEFAULT_SEARCH_COUNT, map = null) {
    let channels = []
    let params = {
      query,
      limit: count < ELEMENTS_LIMIT_PER_REQ ? count : ELEMENTS_LIMIT_PER_REQ,
      offset: 0,
    }

    while (true) {
      const { _total, channels: respChannels } = await this.fetch(`/search/channels`, params)
      channels = channels.concat(respChannels)

      // Break loop if last response page or count is reached.
      const channelsCount = channels.length
      if (respChannels.length !== params.limit || channelsCount === _total || channelsCount === count) break

      params.offset += params.limit
    }

    // If false - without mapping.
    if (map === false) return channels

    // If not a function - use Twitch.channelMap.
    return channels.map(map instanceof Function ? map : this.channelMap)
  }

  /**
   * Get channel info.
   *
   * @param {String} channelId
   * @return {Object}
   */
  async channel (channelId) {
    return this.fetch(`/channels/` + channelId)
  }

  /**
   * Get user follows.
   *
   * @param {String} userId
   * @return {Object}
   */
  async follows (userId) {
    let follows = []
    let params = {
      limit: ELEMENTS_LIMIT_PER_REQ,
      offset: 0,
    }

    while (true) {
      let { _total, follows: respFollows } = await this.fetch(`/users/${userId}/follows/channels`, params)
      follows = [].concat(follows, respFollows)

      // Break loop if last response page.
      if (respFollows.length !== params.limit || follows.length === _total) break

      params.offset += params.limit
    }

    return follows
  }
}
