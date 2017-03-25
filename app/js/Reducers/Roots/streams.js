import types from '../../Actions/types'

export default function (state = [], action) {
  switch (action.type) {
    case types.FETCH_STREAMS_SUCCESS:
      return action.streams

    default:
      return state
  }
}
