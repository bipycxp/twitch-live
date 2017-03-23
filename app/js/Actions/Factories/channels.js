import types from 'Actions/types'

export const fetchChannels = () => ({
  type: types.FETCH_CHANNELS,
})

/**
 * @param channels Channel[]
 */
export const fetchChannelsSuccess = (channels) => ({
  channels,
  type: types.FETCH_CHANNELS_SUCCESS,
})

/**
 * @param error Error
 */
export const fetchChannelsFailure = (error) => ({
  error,
  type: types.FETCH_CHANNELS_FAILURE,
})

/**
 * @param channel String
 */
export const toggleChannelFavorite = (channel) => ({
  channel,
  type: types.TOGGLE_CHANNEL_FAVORITE,
})

/**
 * @param channel String
 */
export const destroyChannel = (channel) => ({
  channel,
  type: types.DESTROY_CHANNEL,
})
