import types from 'Actions/types'

export default function (state = [], action) {
  switch (action.type) {
    case types.GET_CHANNELS:
      // todo: fetch from db
      return [
        { id: 46571894, name: `alohadancetv`, favorite: true },
        { id: 31089858, name: `dreadztv`, favorite: true },
      ]
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
