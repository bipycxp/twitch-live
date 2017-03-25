import types from 'Actions/types'

/**
 * @param query String
 */
export const fetchSearchChannels = (query) => ({
  query,
  type: types.FETCH_SEARCH_CHANNELS,
})

/**
 * @param channels Channel[]
 */
export const fetchSearchChannelsSuccess = (channels) => ({
  channels,
  type: types.FETCH_SEARCH_CHANNELS_SUCCESS,
})

/**
 * @param error Error
 */
export const fetchSearchChannelsFailure = (error) => ({
  error,
  type: types.FETCH_SEARCH_CHANNELS_FAILURE,
})

export const clearSearchChannels = () => ({
  type: types.CLEAR_SEARCH_CHANNELS,
})
