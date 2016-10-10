import test from 'ava'
import sinon from 'sinon'

import Twitch from 'Twitch'

const blocks = [
  {
    title: 'With one channel',
    entry: {
      channels: [ 'a' ],
      pagingStreamsCount: [ 1 ]
    },
    expected: {
      streamsCount: 1,
      fetchCallsCount: 1
    }
  },
  {
    title: 'With 100 channels',
    entry: {
      channels: new Array(100),
      pagingStreamsCount: [ 100 ]
    },
    expected: {
      streamsCount: 100,
      fetchCallsCount: 1
    }
  },
  {
    title: 'With 150 channels',
    entry: {
      channels: new Array(150),
      pagingStreamsCount: [ 100, 50 ]
    },
    expected: {
      streamsCount: 150,
      fetchCallsCount: 2
    }
  },
  {
    title: 'With 200 channels',
    entry: {
      channels: new Array(200),
      pagingStreamsCount: [ 100, 100 ]
    },
    expected: {
      streamsCount: 200,
      fetchCallsCount: 2
    }
  },
  {
    title: 'With 250 channels',
    entry: {
      channels: new Array(250),
      pagingStreamsCount: [ 100, 100, 50 ]
    },
    expected: {
      streamsCount: 250,
      fetchCallsCount: 3
    }
  }
]

blocks.forEach(({ title, entry, expected }) => test.serial(title, async (t) => {
  // Spy Twitch.fetch.
  Twitch.fetch = sinon.spy(async (path, params) => {
    t.is(path, '/streams')
    t.deepEqual(params.channel, entry.channels.join(','))

    let streams = new Array(entry.pagingStreamsCount[Twitch.fetch.callCount - 1])
    let _total = expected.streamsCount
    return { _total, streams }
  })

  const streams = await Twitch.streams(entry.channels)

  t.is(Twitch.fetch.callCount, expected.fetchCallsCount)
  t.is(streams.length, expected.streamsCount)
}))
