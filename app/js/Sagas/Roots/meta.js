import { call, fork, put, take, takeLatest, cancel } from 'redux-saga/effects'

import {
  fetchSearchChannelsSuccess, fetchSearchChannelsFailure,
} from 'Actions'
import types from 'Actions/types'

import Twitch from 'Twitch'

function* fetchSearchChannels ({ query }) {
  try {
    const channels = yield call(Twitch.searchChannels.bind(Twitch), query)

    yield put(fetchSearchChannelsSuccess(channels))
  } catch (e) {
    yield put(fetchSearchChannelsFailure(e))
  }
}

function* fetchSearchChannelsHandler (action) {
  // Start task in background.
  const task = yield fork(fetchSearchChannels, action)

  // Cancel task after action.
  yield take(types.CLEAR_SEARCH_CHANNELS)
  yield cancel(task)
}

function* rootMetaSaga () {
  yield takeLatest(types.FETCH_SEARCH_CHANNELS, fetchSearchChannelsHandler)
}

export default rootMetaSaga
