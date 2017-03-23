import { call, put, takeLatest } from 'redux-saga/effects'

import { fetchStreamsSuccess, fetchStreamsFailure } from 'Actions'
import types from 'Actions/types'

import Twitch from 'Twitch'

function* fetchStreams (action) {
  try {
    const streams = yield call(Twitch.streams.bind(Twitch), action.channels)

    yield put(fetchStreamsSuccess(streams))
  } catch (e) {
    yield put(fetchStreamsFailure(e))
  }
}

function* rootStreamsSaga () {
  yield takeLatest(types.FETCH_STREAMS, fetchStreams)
}

export default rootStreamsSaga
