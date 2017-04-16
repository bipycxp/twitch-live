export const FIELDS = {
  CHANNELS: `channels`,
  SETTINGS: `settings`,
}

/**
 * Class to working with Storage.
 */
export default class Storage {
  /**
   * @param {StorageProvider} provider
   */
  constructor (provider) {
    this.provider = provider
  }

  /**
   * @return {StorageProvider}
   */
  getProvider = () => this.provider

  /**
   *
   * @returns {Promise<Array>}
   */
  async getChannels () {
    return this.provider.get(FIELDS.CHANNELS)
  }

  /**
   * @param channels
   * @returns {Promise<Boolean>}
   */
  async setChannels (channels) {
    await this.provider.set(FIELDS.CHANNELS, channels)

    return true
  }

  /**
   * @param {String} id
   * @param {Object} updates - Update only fields in this object.
   * @returns {Promise<Boolean>}
   */
  async updateChannel (id, updates) {
    const channels = await this.getChannels()

    const withUpdates = channels.map((channel) => {
      if (channel.id !== id) return channel

      return {
        ...channel,
        ...updates,
      }
    })

    await this.setChannels(withUpdates)

    return true
  }

  /**
   * @param {String} id
   * @returns {Promise<Boolean>}
   */
  async destroyChannel (id) {
    const channels = await this.getChannels()
    const withoutChannel = channels.filter(channel => channel.id !== id)

    await this.setChannels(withoutChannel)

    return true
  }

  /**
   * @returns {Promise<Boolean>}
   */
  async destroyChannels () {
    await this.provider.destroy(FIELDS.CHANNELS)

    return true
  }

  /**
   * @return {Promise<Object>}
   */
  async getSettings () {
    return this.provider.get(FIELDS.SETTINGS)
  }

  /**
   * @param {Object} settings
   * @return {Promise<Boolean>}
   */
  async setSettings (settings) {
    await this.provider.set(FIELDS.SETTINGS, settings)

    return true
  }

  /**
   * @returns {Promise<Boolean>}
   */
  async destroySettings () {
    await this.provider.destroy(FIELDS.SETTINGS)

    return true
  }
}

/**
 * @typedef {Object} StorageProvider
 * @property {StorageProvider~get} get
 * @property {StorageProvider~set} set
 * @property {StorageProvider~destroy} destroy
 */

/**
 * @function StorageProvider~get
 * @param {String} field
 * @returns {*}
 */

/**
 * @function StorageProvider~set
 * @param {String} field
 * @param {*} value
 */

/**
 * @function StorageProvider~destroy
 * @param {String} field
 */
