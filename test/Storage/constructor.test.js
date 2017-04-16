import test from 'ava'

import Storage from 'Storage/Storage'

const tests = [
  {
    title: `With some provider`,
    entry: `provider`,
    expected: `provider`,
  },
]

tests.forEach(({ title, entry, expected }) => test(title, (t) => {
  const storage = new Storage(entry)

  t.is(storage.getProvider(), expected)
}))
