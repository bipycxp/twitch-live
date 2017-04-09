import test from 'ava'

import TwitchClient from 'Twitch/Client'
const Twitch = new TwitchClient({ clientId: `id` })

const tests = [
  {
    title: `Check correct mapping`,
    entry: {
      stream: {
        game: `test_game`,
        viewers: 2123,
        created_at: `2015-02-12T04:42:31Z`,
        channel: {
          status: `test status`,
          display_name: `test_channel`,
          game: `test_game: description`,
          _id: 1,
          name: `test_channel`,
          logo: `logo_url`,
          url: `test_channel_url`,
        },
      },
    },
    expected: {
      stream: {
        channelId: `1`,
        displayName: `test_channel`,
        game: `test_game: description`,
        gameUrl: `https://www.twitch.tv/directory/game/test_game`,
        logo: `logo_url`,
        name: `test_channel`,
        status: `test status`,
        url: `test_channel_url`,
        viewers: 2123,
        datetime: {
          started: `2015-02-12T04:42:31Z`,
        },
      },
    },
  },
]

tests.forEach(({ title, entry, expected }) => test(title, async (t) => {
  const stream = Twitch.streamMap(entry.stream)
  t.deepEqual(stream, expected.stream)
}))
