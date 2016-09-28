import Twitch from './Twitch'

const { twitch: { clientId } } = require('config.js')

export default new Twitch({ clientId })
