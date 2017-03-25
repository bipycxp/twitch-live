import { fork } from 'redux-saga/effects'

import rootChannelsSaga from 'Sagas/Roots/channels'
import rootMetaSaga from 'Sagas/Roots/meta'
import rootStreamsSaga from 'Sagas/Roots/streams'

function* rootSaga () {
  yield [
    fork(rootChannelsSaga),
    fork(rootMetaSaga),
    fork(rootStreamsSaga),
  ]
}

export default rootSaga
