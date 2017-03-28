import test from 'ava'

const config = require(`config.js`)

test(`File exists`, t => t.truthy(config))

;[ `twitch` ]
  .forEach(field => test(`Field '${field}' exists`, t => t.truthy(config[field])))
