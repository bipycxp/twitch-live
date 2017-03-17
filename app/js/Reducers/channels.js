import types from 'Actions/types'

export default function (state = [], action) {
  switch (action.type) {
    case types.GET_CHANNELS:
      // todo: fetch from db
      return [
        { name: `arteezy`, favorite: true },
        { name: `dreadztv`, favorite: true },
        { name: `illidanstrdoto`, favorite: false },
        { name: `dendi`, favorite: false },
        { name: `rxnexus`, favorite: true },
        { name: `dotamajorru`, favorite: true },
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
    default:
      return state
  }
}
