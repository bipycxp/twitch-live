import Storage from './Storage'

import ChromeStorage from './Providers/ChromeStorage'
import LocalStorage from './Providers/LocalStorage'

const provider = chrome && chrome.storage
  ? ChromeStorage
  : LocalStorage

export default new Storage(provider)
