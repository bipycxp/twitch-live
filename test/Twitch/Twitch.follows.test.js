import test from 'ava'
import sinon from 'sinon'

import Twitch from 'Twitch'

const blocks = [
  {
    title: 'Correct channel',
    entry: {
      channel: 'a'
    },
    expected: 'follows'
  }
]

blocks.forEach(async ({ title, entry, expected }) => test(title, async (t) => {
  // Spy Twitch.fetch.
  Twitch.fetch = sinon.spy(async (path, parameters) => {
    t.is(path, `/users/${entry.channel}/follows/channels`)
    return expected
  })

  const follows = await Twitch.follows(entry.channel)

  t.true(Twitch.fetch.calledOnce)
  t.is(follows, expected)
}))
