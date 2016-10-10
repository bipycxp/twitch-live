import test from 'ava'
import sinon from 'sinon'

import Twitch from 'Twitch'

const blocks = [
  {
    title: 'User have 10 follows',
    entry: {
      user: 'a',
      pagingFollowsCount: [ 10 ]
    },
    expected: {
      followsCount: 10,
      fetchCallsCount: 1
    }
  },
  {
    title: 'User have 100 follows',
    entry: {
      user: 'b',
      pagingFollowsCount: [ 100 ]
    },
    expected: {
      followsCount: 100,
      fetchCallsCount: 1
    }
  },
  {
    title: 'User have 150 follows',
    entry: {
      user: 'b',
      pagingFollowsCount: [ 100, 50 ]
    },
    expected: {
      followsCount: 150,
      fetchCallsCount: 2
    }
  },
  {
    title: 'User have 200 follows',
    entry: {
      user: 'c',
      pagingFollowsCount: [ 100, 100 ]
    },
    expected: {
      followsCount: 200,
      fetchCallsCount: 2
    }
  },
  {
    title: 'User have 250 follows',
    entry: {
      user: 'b',
      pagingFollowsCount: [ 100, 100, 50 ]
    },
    expected: {
      followsCount: 250,
      fetchCallsCount: 3
    }
  }
]

blocks.forEach(({ title, entry, expected }) => test.serial(title, async (t) => {
  // Spy Twitch.fetch.
  Twitch.fetch = sinon.spy(async (path) => {
    t.is(path, `/users/${entry.user}/follows/channels`)

    let follows = new Array(entry.pagingFollowsCount[Twitch.fetch.callCount - 1])
    let _total = expected.followsCount
    return { _total, follows }
  })

  const follows = await Twitch.follows(entry.user)

  t.is(Twitch.fetch.callCount, expected.fetchCallsCount)
  t.is(follows.length, expected.followsCount)
}))
