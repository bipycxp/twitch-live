import { call, put, takeLatest } from 'redux-saga/effects'

import * as actions from 'Actions'
import types from 'Actions/types'

import Twitch from 'Twitch'

function* fetchStreams (action) {
  try {
    const streams = yield call(Twitch.streams.bind(Twitch), action.channels)

    yield put(actions.fetchStreamsSuccess(streams))
  } catch (e) {
    console.error(e)
    yield put(actions.fetchStreamsFailure(e))
  }
}

function* rootSaga () {
  yield takeLatest(types.FETCH_STREAMS, fetchStreams)
}

export default rootSaga
