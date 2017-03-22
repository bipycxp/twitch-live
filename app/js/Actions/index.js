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

/**
 * @param channels String[]
 */
export const fetchStreams = (channels) => ({
  channels,
  type: types.FETCH_STREAMS,
})

/**
 * @param streams Stream[]
 */
export const fetchStreamsSuccess = (streams) => ({
  streams,
  type: types.FETCH_STREAMS_SUCCESS,
})

/**
 * @param error String
 */
export const fetchStreamsFailure = (error) => ({
  error,
  type: types.FETCH_STREAMS_FAILURE,
})
