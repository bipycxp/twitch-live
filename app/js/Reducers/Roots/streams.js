import types from 'Actions/types'

export default function (state = [], action) {
  switch (action.type) {
    case types.FETCH_STREAMS_SUCCESS:
      return action.streams

    case types.DESTROY_CHANNEL_SUCCESS:
      return state.filter(stream => stream.channelId !== action.channel.id)

    default:
      return state
  }
}
