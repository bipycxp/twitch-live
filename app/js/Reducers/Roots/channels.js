import types from 'Actions/types'

export default function (state = [], action) {
  switch (action.type) {
    case types.FETCH_CHANNELS_SUCCESS:
      return action.channels

    case types.TOGGLE_CHANNEL_FAVORITE:
      return state.map(channel => {
        if (channel.id !== action.id) {
          return channel
        }

        return {
          ...channel,
          favorite: !channel.favorite,
        }
      })

    case types.ADD_CHANNEL_SUCCESS:
      let { id, name } = action.channel
      return [ ...state, { id, name, favorite: false } ]

    case types.DESTROY_CHANNEL_SUCCESS:
      return state.filter(channel => channel.id !== action.channel.id)

    case types.FETCH_STREAMS_SUCCESS:
      return state.map(channel => ({
        ...channel,
        live: action.streams.findIndex(stream => channel.id === stream.channelId) !== -1,
      }))

    default:
      return state
  }
}
