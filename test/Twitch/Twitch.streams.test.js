import test from 'ava'
import sinon from 'sinon'

import Twitch from 'Twitch'

const blocks = [
  {
    title: 'With one channel',
    entry: {
      channels: [ 'a' ]
    },
    expected: 'streams'
  },
  {
    title: 'With few channels',
    entry: {
      channels: [ 'a', 'b' ]
    },
    expected: 'streams'
  }
]

blocks.forEach(async ({ title, entry, expected }) => test(title, async (t) => {
  // Spy Twitch.fetch.
  Twitch.fetch = sinon.spy(async (path, parameters) => {
    t.is(path, '/streams?channel=' + entry.channels.join())
    return expected
  })

  const streams = await Twitch.streams(entry.channels)

  t.true(Twitch.fetch.calledOnce)
  t.is(streams, expected)
}))
