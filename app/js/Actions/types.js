import keyMirror from 'keymirror'

const types = keyMirror({
  GET_CHANNELS: null,
  TOGGLE_CHANNEL_FAVORITE: null,
  DESTROY_CHANNEL: null,

  // Streams
  FETCH_STREAMS: null,
  FETCH_STREAMS_SUCCESS: null,
  FETCH_STREAMS_FAILURE: null,
})

export default types
