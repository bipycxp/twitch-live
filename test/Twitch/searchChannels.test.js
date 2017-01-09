import test from 'ava'
import sinon from 'sinon'

import Twitch from 'Twitch'
const ELEMENTS_LIMIT_PER_REQ = 100
const DEFAULT_SEARCH_COUNT = 5

// Testing correct request parameters and paging.
const pagingTests = [
  {
    title: 'With default count',
    entry: {
      query: 'a',
      count: undefined,
      channelsCount: 10,
      pagingChannelsCount: [ DEFAULT_SEARCH_COUNT ]
    },
    expected: {
      limit: DEFAULT_SEARCH_COUNT,
      channelsCount: DEFAULT_SEARCH_COUNT,
      fetchCallsCount: 1,
      pagingOffset: [ 0 ]
    }
  },
  {
    title: 'With count = 50, but channels = 40',
    entry: {
      query: 'a',
      count: 50,
      channelsCount: 40,
      pagingChannelsCount: [ 40 ]
    },
    expected: {
      limit: 50,
      channelsCount: 40,
      fetchCallsCount: 1,
      pagingOffset: [ 0 ]
    }
  },
  {
    title: 'With count = 100, but channels = 100',
    entry: {
      query: 'a',
      count: 100,
      channelsCount: 100,
      pagingChannelsCount: [ 100 ]
    },
    expected: {
      limit: ELEMENTS_LIMIT_PER_REQ,
      channelsCount: 100,
      fetchCallsCount: 1,
      pagingOffset: [ 0 ]
    }
  },
  {
    title: 'With count = 120, but channels = 120',
    entry: {
      query: 'a',
      count: 120,
      channelsCount: 120,
      pagingChannelsCount: [ 100, 20 ]
    },
    expected: {
      limit: ELEMENTS_LIMIT_PER_REQ,
      channelsCount: 120,
      fetchCallsCount: 2,
      pagingOffset: [ 0, 100 ]
    }
  },
  {
    title: 'With count = 150, but channels = 130',
    entry: {
      query: 'a',
      count: 150,
      channelsCount: 130,
      pagingChannelsCount: [ 100, 30 ]
    },
    expected: {
      limit: ELEMENTS_LIMIT_PER_REQ,
      channelsCount: 130,
      fetchCallsCount: 2,
      pagingOffset: [ 0, 100 ]
    }
  },
  {
    title: 'With count = 150, but channels = 200',
    entry: {
      query: 'a',
      count: 150,
      channelsCount: 200,
      pagingChannelsCount: [ 100, 50 ]
    },
    expected: {
      limit: ELEMENTS_LIMIT_PER_REQ,
      channelsCount: 150,
      fetchCallsCount: 2,
      pagingOffset: [ 0, 100 ]
    }
  }
]

pagingTests.forEach(({ title, entry, expected }) => test.serial(title, async (t) => {
  // Spy Twitch.fetch.
  Twitch.fetch = sinon.spy(async (path, params) => {
    const callIndex = Twitch.fetch.callCount - 1

    t.is(path, '/search/channels')
    t.deepEqual(params, {
      query: entry.query,
      limit: expected.limit,
      offset: expected.pagingOffset[callIndex]
    })

    const channels = new Array(entry.pagingChannelsCount[callIndex])
    const _total = expected.channelsCount

    return { _total, channels }
  })

  const channels = await Twitch.searchChannels(entry.query, entry.count)

  t.is(Twitch.fetch.callCount, expected.fetchCallsCount)
  t.is(channels.length, expected.channelsCount)
}))

// Testing map parameter.
const mappingTests = [
  {
    title: 'Without map function (map = false)',
    entry: {
      respChannels: [ 'a' ],
      map: false // Without mapping.
    },
    expected: {
      channels: [ 'a' ]
    }
  },
  {
    title: 'Map function is empty (map = null)',
    entry: {
      respChannels: [ 'a' ],
      map: null // With default Twitch.channelMap.
    },
    expected: {
      channels: [ 'channelMap' ]
    }
  },
  {
    title: 'With map function',
    entry: {
      respChannels: [ 'a' ],
      map: () => 'test' // Use custom map function.
    },
    expected: {
      channels: [ 'test' ]
    }
  }
]

mappingTests.forEach(({ title, entry, expected }) => test.serial(title, async (t) => {
  // Spy Twitch.fetch.
  Twitch.fetch = sinon.spy(async () => ({ _total: entry.respChannels.length, channels: entry.respChannels }))
  Twitch.channelMap = sinon.spy(() => 'channelMap')

  const channels = await Twitch.searchChannels('', DEFAULT_SEARCH_COUNT, entry.map)

  if (entry.map === false) {
    // If false - without mapping.
    t.true(Twitch.channelMap.notCalled)
  } else if (typeof entry.map !== 'function') {
    // If not a function - use Twitch.channelMap.
    t.is(Twitch.channelMap.callCount, expected.channels.length)
  }

  t.deepEqual(channels, expected.channels)
}))
