import test from 'ava'

import Twitch from 'Twitch'

const { twitch } = require(`config.js`)

test(`Check for using config clientId`, t => t.is(Twitch.getClientId(), twitch.clientId))

;[ `clientId`, `apiUrl`, `apiVersion` ]
  .forEach(field => test(`Field '${field}' isn't empty`, t => t.truthy(twitch[field])))
