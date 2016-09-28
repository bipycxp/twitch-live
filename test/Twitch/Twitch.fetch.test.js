import test from 'ava'
import sinon from 'sinon'

import Twitch from 'Twitch'

const { twitch: { apiUrl, apiVersion } } = require('config.js')

const blocks = [
  {
    title: 'Success request with status 200',
    entry: {
      path: '/a/g',
      parameters: { a: 'b', c: 'd' }
    },
    expected: {
      json: () => 'json',
      status: 200,
      statusText: 'success'
    }
  },
  {
    title: 'Success request with status 250',
    entry: {
      path: '/a/g',
      parameters: { a: 'b', c: 'd' }
    },
    expected: {
      json: () => 'json',
      status: 250,
      statusText: 'success'
    }
  },
  {
    title: 'Bad request with status 100',
    entry: {
      path: '/a/g',
      parameters: { a: 'b', c: 'd' }
    },
    expected: {
      json: () => 'json',
      status: 100,
      statusText: 'error'
    }
  },
  {
    title: 'Bad request with status 300',
    entry: {
      path: '/a/g',
      parameters: { a: 'b', c: 'd' }
    },
    expected: {
      json: () => 'json',
      status: 300,
      statusText: 'error'
    }
  },
  {
    title: 'Bad request with status 350',
    entry: {
      path: '/a/g',
      parameters: { a: 'b', c: 'd' }
    },
    expected: {
      json: () => 'json',
      status: 350,
      statusText: 'error'
    }
  }
]

blocks.forEach(async ({ title, entry, expected }) => test(title, async (t) => {
  // Spy global.fetch.
  global.fetch = sinon.spy(async (path, parameters) => {
    t.is(path, apiUrl + entry.path)
    t.deepEqual(parameters, {
      ...entry.parameters,
      headers: {
        'Accept': `application/vnd.twitchtv.${apiVersion}+json`,
        'Client-ID': Twitch.getClientId()
      }
    })

    return expected
  })

  try {
    const response = await Twitch.fetch(entry.path, entry.parameters)

    t.true(global.fetch.calledOnce)
    t.is(response, expected.json())
  } catch (e) {
    // Check errors.
    if (expected.status < 200 || expected.status >= 300) {
      t.is(e.message, expected.statusText)
      return true
    }

    throw e
  }
}))
