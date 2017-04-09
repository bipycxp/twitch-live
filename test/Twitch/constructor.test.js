import test from 'ava'

import TwitchClient from 'Twitch/Client'

test(`Check constructor`, async (t) => {
  const clientId = `id`
  const apiVersion = `version`
  const apiUrl = `api`
  const twitchUrl = `twitch`

  const Twitch = new TwitchClient({ clientId, apiVersion, apiUrl, twitchUrl })

  t.is(Twitch.getClientId(), clientId)
  t.is(Twitch.getApiVersion(), apiVersion)
  t.is(Twitch.getApiUrl(), apiUrl)
  t.is(Twitch.getTwitchUrl(), twitchUrl)
})
