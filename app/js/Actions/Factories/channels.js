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
 * @param channel Channel
 */
export const addChannel = (channel) => ({
  channel,
  type: types.ADD_CHANNEL,
})

/**
 * @param id String
 */
export const toggleChannelFavorite = (id) => ({
  id,
  type: types.TOGGLE_CHANNEL_FAVORITE,
})

/**
 * @param id String
 */
export const destroyChannel = (id) => ({
  id,
  type: types.DESTROY_CHANNEL,
})
