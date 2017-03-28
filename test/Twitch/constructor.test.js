import test from 'ava'

import { Twitch } from 'Twitch'

test(`Check constructor`, async (t) => {
  const clientId = `id`
  const twitch = new Twitch({ clientId })

  t.is(twitch.getClientId(), clientId)
})
