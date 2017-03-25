import { put, takeLatest, select } from 'redux-saga/effects'

import {
  fetchStreams,
  fetchChannelsSuccess, fetchChannelsFailure,
  addChannelSuccess, addChannelFailure,
  destroyChannelSuccess, destroyChannelFailure,
} from 'Actions'
import types from 'Actions/types'
import { selectChannels } from 'Sagas/Selectors'

function* fetchChannelsWorker () {
  try {
    // @TODO: need to fetch it from DB.
    const channels = [
      { id: `46571894`, name: `alohadancetv`, favorite: true },
      { id: `31089858`, name: `dreadztv`, favorite: true },
    ]

    yield put(fetchChannelsSuccess(channels))
  } catch (e) {
    yield put(fetchChannelsFailure(e))
  }
}

function* addChannelWorker ({ channel }) {
  try {
    // @TODO: need to add it to DB.

    yield put(addChannelSuccess(channel))
  } catch (e) {
    yield put(addChannelFailure(e))
  }
}

function* destroyChannelWorker ({ id }) {
  try {
    // @TODO: need to remove it from DB.

    const channel = (yield select(selectChannels)).find(channel => channel.id === id)

    yield put(destroyChannelSuccess(channel))
  } catch (e) {
    yield put(destroyChannelFailure(e))
  }
}

function* updateStreamsWorker () {
  const channels = (yield select(selectChannels)).map(channel => channel.id)

  yield put(fetchStreams(channels))
}

function* rootChannelsSaga () {
  yield takeLatest(types.FETCH_CHANNELS, fetchChannelsWorker)
  yield takeLatest(types.ADD_CHANNEL, addChannelWorker)
  yield takeLatest(types.DESTROY_CHANNEL, destroyChannelWorker)
  yield takeLatest(types.ADD_CHANNEL_SUCCESS, updateStreamsWorker)
}

export default rootChannelsSaga
