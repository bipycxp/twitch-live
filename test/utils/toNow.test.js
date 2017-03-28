import test from 'ava'
import sinon from 'sinon'

import toNow from 'utils/toNow'

const NOW = `2016-10-12T00:00:00.000Z`

const tests = [
  {
    title: `Started day ago(full)`,
    entry: {
      started: `2016-10-11T00:00:00.000Z`,
      short: false,
    },
    expected: `1d`,
  },
  {
    title: `Started day ago(short)`,
    entry: {
      started: `2016-10-11T00:00:00.000Z`,
      short: true,
    },
    expected: `a day`,
  },
  {
    title: `Started one hour ago(full)`,
    entry: {
      started: `2016-10-11T23:00:00.000Z`,
      short: false,
    },
    expected: `1h`,
  },
  {
    title: `Started one hours ago(short)`,
    entry: {
      started: `2016-10-11T23:00:00.000Z`,
      short: true,
    },
    expected: `an hour`,
  },
  {
    title: `Started 10 minutes ago(full)`,
    entry: {
      started: `2016-10-11T23:50:00.000Z`,
      short: false,
    },
    expected: `10m`,
  },
  {
    title: `Started 10 minutes ago(short)`,
    entry: {
      started: `2016-10-11T23:50:00.000Z`,
      short: true,
    },
    expected: `10 minutes`,
  },
  {
    title: `Started ~2 days ago(full)`,
    entry: {
      started: `2016-10-10T01:35:25.000Z`,
      short: false,
    },
    expected: `1d 22h 24m`,
  },
  {
    title: `Started ~2 days ago(short)`,
    entry: {
      started: `2016-10-10T01:35:25.000Z`,
      short: true,
    },
    expected: `2 days`,
  },
  {
    title: `Test default 'short' parameter`,
    entry: {
      started: `2016-10-11T00:00:00.000Z`,
    },
    expected: `1d`,
  },
]

tests.forEach(async ({ title, entry, expected }) => test(title, async (t) => {
  // Spy Date.now.
  Date.now = sinon.spy(() => NOW)

  const time = toNow(entry.started, entry.short)
  t.is(time, expected)
}))
