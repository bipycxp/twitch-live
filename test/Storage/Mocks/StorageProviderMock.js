import sinon from 'sinon'

export class StorageProviderMock {
  constructor () {
    this.data = {}
  }

  /**
   * @param {String} field
   * @returns {*}
   */
  async get (field) {
    return this.data[field]
  }

  /**
   * @param {String} field
   * @param {*} value
   */
  async set (field, value) {
    this.data[field] = value
  }

  /**
   * @param {String} field
   */
  async destroy (field) {
    delete this.data[field]
  }
}

export const wrapStorageProvider = ({ t, provider = new StorageProviderMock(), wraps: { get = {}, set = {}, destroy = {} } }) => ({
  getOriginal: () => provider,
  get: sinon.spy(async (field) => {
    get.expectedField && t.is(field, get.expectedField)
    return provider.get(field)
  }),
  set: sinon.spy(async (field, value) => {
    set.expectedField && t.is(field, set.expectedField)
    set.expectedValue && t.is(value, set.expectedValue)
    return provider.set(field, value)
  }),
  destroy: sinon.spy(async (field) => {
    destroy.expectedField && t.is(field, destroy.expectedField)
    return provider.destroy(field)
  }),
})
