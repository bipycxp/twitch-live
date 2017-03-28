import test from 'ava'

import Twitch from 'Twitch'

const tests = [
  {
    title: `Check correct channel mapping`,
    entry: {
      channel: {
        display_name: `TEST`,
        _id: 1,
        name: `test`,
        logo: `logo_url`,
        url: `test_url`,
      },
    },
    expected: {
      channel: {
        id: `1`,
        displayName: `TEST`,
        logo: `logo_url`,
        name: `test`,
        url: `test_url`,
      },
    },
  },
]

tests.forEach(({ title, entry, expected }) => test(title, async (t) => {
  const channel = Twitch.channelMap(entry.channel)
  t.deepEqual(channel, expected.channel)
}))
