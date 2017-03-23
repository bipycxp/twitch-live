import keyMirror from 'keymirror'

const types = keyMirror({
  // Channels.
  FETCH_CHANNELS: null,
  FETCH_CHANNELS_SUCCESS: null,
  FETCH_CHANNELS_FAILURE: null,
  TOGGLE_CHANNEL_FAVORITE: null,
  DESTROY_CHANNEL: null,

  // Streams.
  FETCH_STREAMS: null,
  FETCH_STREAMS_SUCCESS: null,
  FETCH_STREAMS_FAILURE: null,
})

export default types
