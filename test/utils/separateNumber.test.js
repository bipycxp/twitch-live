import test from 'ava'

import separateNumber from 'utils/separateNumber'

const tests = [
  {
    title: 'Small number',
    entry: {
      number: 100,
      separator: ','
    },
    expected: '100'
  },
  {
    title: 'Middle number',
    entry: {
      number: 11900,
      separator: ','
    },
    expected: '11,900'
  },
  {
    title: 'Big number',
    entry: {
      number: 11124900,
      separator: ','
    },
    expected: '11,124,900'
  },
  {
    title: 'Check default separator',
    entry: {
      number: 2100
    },
    expected: '2,100'
  },
  {
    title: 'Check custom separator',
    entry: {
      number: 25200,
      separator: '.'
    },
    expected: '25.200'
  }
]

tests.forEach(async ({ title, entry, expected }) => test(title, async (t) => {
  const separated = separateNumber(entry.number, entry.separator)
  t.is(separated, expected)
}))
