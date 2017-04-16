import test from 'ava'

import Storage, { FIELDS } from 'Storage/Storage'
import { wrapStorageProvider } from './Mocks/StorageProviderMock'

const expectedField = FIELDS.SETTINGS
const expectedValue = `settings`

test(`Set settings`, async (t) => {
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
  await storage.setSettings(expectedValue)

  t.true(wrappedProvider.set.called)
  t.is(await wrappedProvider.get(expectedField), expectedValue)
})

test(`Get settings`, async (t) => {
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
  const value = await storage.getSettings()

  t.true(wrappedProvider.get.called)
  t.is(value, expectedValue)
})

test(`Destroy settings`, async (t) => {
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

  await storage.destroySettings()

  t.true(wrappedProvider.destroy.called)
  t.is(await wrappedProvider.get(expectedField), undefined)
})
