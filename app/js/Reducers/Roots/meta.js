import types from '../../Actions/types'

const INITIAL_STATE = {
  searchChannels: [],
}

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case types.FETCH_SEARCH_CHANNELS_SUCCESS:
      return {
        ...state,
        searchChannels: action.channels,
      }

    case types.FETCH_SEARCH_CHANNELS_FAILURE:
    case types.ADD_CHANNEL:
    case types.CLEAR_SEARCH_CHANNELS:
      return {
        ...state,
        searchChannels: [],
      }

    default:
      return state
  }
}
