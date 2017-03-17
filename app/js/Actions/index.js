import types from './types'

export const getChannels = () => ({
  type: types.GET_CHANNELS,
})

export const toggleChannelFavorite = (channel) => ({
  channel,
  type: types.TOGGLE_CHANNEL_FAVORITE,
})

export const destroyChannel = (channel) => ({
  channel,
  type: types.DESTROY_CHANNEL,
})
