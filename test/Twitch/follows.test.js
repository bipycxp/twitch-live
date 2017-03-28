import test from 'ava'
import sinon from 'sinon'

import Twitch from 'Twitch'
const ELEMENTS_LIMIT_PER_REQ = 100

const tests = [
  {
    title: `User have 10 follows`,
    entry: {
      user: `a`,
      pagingFollowsCount: [ 10 ],
    },
    expected: {
      followsCount: 10,
      fetchCallsCount: 1,
      pagingOffset: [ 0 ],
    },
  },
  {
    title: `User have 100 follows`,
    entry: {
      user: `b`,
      pagingFollowsCount: [ 100 ],
    },
    expected: {
      followsCount: 100,
      fetchCallsCount: 1,
      pagingOffset: [ 0 ],
    },
  },
  {
    title: `User have 150 follows`,
    entry: {
      user: `b`,
      pagingFollowsCount: [ 100, 50 ],
    },
    expected: {
      followsCount: 150,
      fetchCallsCount: 2,
      pagingOffset: [ 0, 100 ],
    },
  },
  {
    title: `User have 200 follows`,
    entry: {
      user: `c`,
      pagingFollowsCount: [ 100, 100 ],
    },
    expected: {
      followsCount: 200,
      fetchCallsCount: 2,
      pagingOffset: [ 0, 100 ],
    },
  },
  {
    title: `User have 250 follows`,
    entry: {
      user: `b`,
      pagingFollowsCount: [ 100, 100, 50 ],
    },
    expected: {
      followsCount: 250,
      fetchCallsCount: 3,
      pagingOffset: [ 0, 100, 200 ],
    },
  },
]

tests.forEach(({ title, entry, expected }) => test.serial(title, async (t) => {
  // Spy Twitch.fetch.
  Twitch.fetch = sinon.spy(async (path, params) => {
    const callIndex = Twitch.fetch.callCount - 1

    t.is(path, `/users/${entry.user}/follows/channels`)
    t.deepEqual(params, {
      limit: ELEMENTS_LIMIT_PER_REQ,
      offset: expected.pagingOffset[callIndex],
    })

    let follows = new Array(entry.pagingFollowsCount[callIndex])
    let _total = expected.followsCount

    return { _total, follows }
  })

  const follows = await Twitch.follows(entry.user)

  t.is(Twitch.fetch.callCount, expected.fetchCallsCount)
  t.is(follows.length, expected.followsCount)
}))
