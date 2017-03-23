import { call, put, takeLatest } from 'redux-saga/effects'

import { fetchChannelsSuccess, fetchChannelsFailure } from 'Actions'
import types from 'Actions/types'

function* fetchChannels () {
  try {
    // @TODO: need to fetch it from DB.
    const channels = yield call(Array.from, [
      { id: 46571894, name: `alohadancetv`, favorite: true },
      { id: 31089858, name: `dreadztv`, favorite: true },
    ])

    yield put(fetchChannelsSuccess(channels))
  } catch (e) {
    yield put(fetchChannelsFailure(e))
  }
}

function* rootChannelsSaga () {
  yield takeLatest(types.FETCH_CHANNELS, fetchChannels)
}

export default rootChannelsSaga
