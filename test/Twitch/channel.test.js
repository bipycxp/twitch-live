import test from 'ava'
import sinon from 'sinon'

import TwitchClient from 'Twitch/Client'
const Twitch = new TwitchClient({ clientId: `id` })

const tests = [
  {
    title: `Correct channel`,
    entry: {
      channel: `a`,
    },
    expected: `channel`,
  },
]

tests.forEach(async ({ title, entry, expected }) => test(title, async (t) => {
  // Spy Twitch.fetch.
  Twitch.fetch = sinon.spy(async (path) => {
    t.is(path, `/channels/` + entry.channel)
    return expected
  })

  const channel = await Twitch.channel(entry.channel)

  t.true(Twitch.fetch.calledOnce)
  t.is(channel, expected)
}))
