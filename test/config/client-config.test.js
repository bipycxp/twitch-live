import test from 'ava'

const FIELDS = [
  `TWITCH_CLIENT_ID`,
]

;[ `development`, `test`, `production` ].forEach((env) => {
  // @TODO: Fix path to `client-config` alias.
  const config = require(`../../config/client-config/${env}`)

  test(`${env}: config file exists`, t => t.truthy(config))

  FIELDS.forEach(field => test(`${env}: field '${field}' exists`, t => t.truthy(config[field])))

  test(`${env}: some fields are excess or missing`, t => t.is(Object.keys(config).length, FIELDS.length))
})
