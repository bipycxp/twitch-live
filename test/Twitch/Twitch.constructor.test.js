import test from 'ava'

import Twitch from 'Twitch/Twitch'

const blocks = [
  {
    title: 'Correct entry',
    entry: {
      clientId: 'id'
    },
    expected: {
      clientId: 'id',
      methods: [ 'constructor', 'getClientId', 'fetch', 'streams', 'channel', 'follows' ]
    }
  }
]

blocks.forEach(async ({ title, entry, expected }) => test(title, async (t) => {
  const twitch = new Twitch(entry)

  // Check availability of the necessary methods.
  const methods = Object.getOwnPropertyNames(Object.getPrototypeOf(twitch))
  t.deepEqual(methods, expected.methods)

  t.is(twitch.getClientId(), expected.clientId)
}))
