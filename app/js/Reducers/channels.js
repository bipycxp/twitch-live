import types from 'Actions/types'

export default function (state = [], action) {
  switch (action.type) {
    case types.FETCH_CHANNELS_SUCCESS:
      return action.channels
    case types.TOGGLE_CHANNEL_FAVORITE:
      return state.map(channel => {
        if (channel.name !== action.channel) {
          return channel
        }

        return {
          ...channel,
          ...{ favorite: !channel.favorite },
        }
      })
    case types.DESTROY_CHANNEL:
      return state.filter(channel => channel.name !== action.channel)
    case types.FETCH_STREAMS_SUCCESS:
      return state.map(channel => ({
        ...channel,
        ...{ live: action.streams.findIndex(stream => channel.id === stream.channelId) !== -1 },
      }))
    default:
      return state
  }
}
