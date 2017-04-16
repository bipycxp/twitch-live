import test from 'ava'

import Storage, { FIELDS } from 'Storage/Storage'
import { wrapStorageProvider } from './Mocks/StorageProviderMock'

const expectedField = FIELDS.CHANNELS
const expectedValue = `channels`

test(`Set channels`, async (t) => {
  const wrappedProvider = wrapStorageProvider({
    t,
    wraps: {
      set: {
        expectedField,
        expectedValue,
      },
    },
  })

  const storage = new Storage(wrappedProvider)
  await storage.setChannels(expectedValue)

  t.true(wrappedProvider.set.called)
  t.is(await wrappedProvider.get(expectedField), expectedValue)
})

test(`Get channels`, async (t) => {
  const wrappedProvider = wrapStorageProvider({
    t,
    wraps: {
      get: {
        expectedField,
      },
    },
  })

  wrappedProvider.set(expectedField, expectedValue)
  const storage = new Storage(wrappedProvider)
  const value = await storage.getChannels()

  t.true(wrappedProvider.get.called)
  t.is(value, expectedValue)
})

test(`Destroy channels`, async (t) => {
  const wrappedProvider = wrapStorageProvider({
    t,
    wraps: {
      destroy: {
        expectedField,
      },
    },
  })

  await wrappedProvider.set(expectedField, expectedValue)
  const storage = new Storage(wrappedProvider)

  t.is(await wrappedProvider.get(expectedField), expectedValue)

  await storage.destroyChannels()

  t.true(wrappedProvider.destroy.called)
  t.is(await wrappedProvider.get(expectedField), undefined)
})

test.todo(`Test addChannel`)
test.todo(`Test getChannel`)
test.todo(`Test updateChannel`)
test.todo(`Test destroyChannel`)
