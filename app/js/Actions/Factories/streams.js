import types from 'Actions/types'

/**
 * @param channels Number[]
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
 * @param error Error
 */
export const fetchStreamsFailure = (error) => ({
  error,
  type: types.FETCH_STREAMS_FAILURE,
})
