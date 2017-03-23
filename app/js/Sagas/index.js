import { fork } from 'redux-saga/effects'

import rootChannelsSaga from 'Sagas/Roots/channels'
import rootStreamsSaga from 'Sagas/Roots/streams'

function* rootSaga () {
  yield [
    fork(rootChannelsSaga),
    fork(rootStreamsSaga),
  ]
}

export default rootSaga
