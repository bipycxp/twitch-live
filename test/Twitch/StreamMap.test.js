import test from 'ava'

import Twitch from 'Twitch'

const tests = [
  {
    title: 'Check correct mapping',
    entry: {
      stream: {
        game: 'StarCraft II',
        viewers: 2123,
        average_fps: 29.9880749574,
        delay: 0,
        video_height: 720,
        is_playlist: false,
        created_at: '2015-02-12T04:42:31Z',
        _id: 4989654544,
        channel: {
          mature: false,
          status: 'test status',
          broadcaster_language: 'en',
          display_name: 'test_channel',
          game: 'StarCraft II: Heart of the Swarm',
          delay: null,
          language: 'en',
          _id: 12345,
          name: 'test_channel',
          created_at: '2007-05-22T10:39:54Z',
          updated_at: '2015-02-12T04:15:49Z',
          logo: 'http://.../test_channel-profile_image-300x300.jpeg',
          banner: 'http://.../test_channel-channel_header_image-640x125.png',
          video_banner: 'http://.../test_channel-channel_offline_image-640x360.png',
          background: null,
          profile_banner: 'http://.../test_channel-profile_banner-480.png',
          profile_banner_background_color: null,
          partner: true,
          url: 'http://www.twitch.tv/test_channel',
          views: 49144894,
          followers: 215780,
          _links: {
            self: 'https://.../test_channel',
            follows: 'https://.../test_channel/follows',
            commercial: 'https://.../test_channel/commercial',
            stream_key: 'https://.../test_channel/stream_key',
            chat: 'https://api.twitch.tv/kraken/chat/test_channel',
            features: 'https://.../test_channel/features',
            subscriptions: 'https://.../test_channel/subscriptions',
            editors: 'https://.../test_channel/editors',
            teams: 'https://.../test_channel/teams',
            videos: 'https://.../test_channel/videos'
          }
        },
        preview: {
          small: 'http://.../live_user_test_channel-80x45.jpg',
          medium: 'http://.../live_user_test_channel-320x180.jpg',
          large: 'http://.../live_user_test_channel-640x360.jpg',
          template: 'http://.../live_user_test_channel-{width}x{height}.jpg'
        },
        _links: {
          self: 'https://.../test_channel'
        }
      }
    },
    expected: {
      stream: {
        delay: 0,
        displayName: 'test_channel',
        game: 'StarCraft II',
        gameUrl: 'https://www.twitch.tv/directory/game/StarCraft II',
        logo: 'http://.../test_channel-profile_image-300x300.jpeg',
        name: 'test_channel',
        status: 'test status',
        url: 'http://www.twitch.tv/test_channel',
        viewers: 2123,
        datetime: {
          started: '2015-02-12T04:42:31Z'
        }
      }
    }
  }
]

tests.forEach(({ title, entry, expected }) => test(title, async (t) => {
  const stream = Twitch.streamMap(entry.stream)
  t.deepEqual(stream, expected.stream)
}))
