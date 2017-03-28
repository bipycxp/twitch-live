import test from 'ava'
import sinon from 'sinon'

import Twitch from 'Twitch'

import querystring from 'querystring'

const { twitch } = require(`config.js`)

const tests = [
  {
    title: `Success request with status 200`,
    entry: {
      path: `/a/g`,
      params: { a: `b`, c: `d` },
    },
    expected: {
      json: () => `json`,
      status: 200,
      statusText: `success`,
    },
  },
  {
    title: `Success request with status 250`,
    entry: {
      path: `/a/g`,
      params: { a: `b`, c: `d` },
    },
    expected: {
      json: () => `json`,
      status: 250,
      statusText: `success`,
    },
  },
  {
    title: `Bad request with status 100`,
    entry: {
      path: `/a/g`,
      params: { a: `b`, c: `d` },
    },
    expected: {
      json: () => `json`,
      status: 100,
      statusText: `error`,
    },
  },
  {
    title: `Bad request with status 300`,
    entry: {
      path: `/a/g`,
      params: { a: `b`, c: `d` },
    },
    expected: {
      json: () => `json`,
      status: 300,
      statusText: `error`,
    },
  },
  {
    title: `Bad request with status 350`,
    entry: {
      path: `/a/g`,
      params: { a: `b`, c: `d` },
    },
    expected: {
      json: () => `json`,
      status: 350,
      statusText: `error`,
    },
  },
]

tests.forEach(async ({ title, entry, expected }) => test(title, async (t) => {
  // Spy global.fetch.
  global.fetch = sinon.spy(async (path, params) => {
    const headers = {
      'Accept': `application/vnd.twitchtv.${twitch.apiVersion}+json`,
      'Client-ID': Twitch.getClientId(),
    }

    t.is(path, twitch.apiUrl + entry.path + `?` + querystring.stringify(entry.params))
    t.deepEqual(params, { headers })

    return expected
  })

  try {
    const response = await Twitch.fetch(entry.path, entry.params)

    t.true(global.fetch.calledOnce)
    t.is(response, expected.json())
  } catch (e) {
    // Assert test if catching request error(code not between 200-299)
    if (expected.status < 200 || expected.status >= 300) {
      t.is(e.message, expected.statusText)
      return true
    }

    throw e
  }
}))
