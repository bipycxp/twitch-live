import { applyMiddleware, createStore } from 'redux'
import createSagaMiddleware from 'redux-saga'
import createLogger from 'redux-logger'

import rootReducer from 'Reducers'
import { fetchChannels, fetchStreams } from 'Actions'
import sagas from 'Sagas'

function configureStore (initialState) {
  const sagaMiddleware = createSagaMiddleware()
  const logger = createLogger()

  const store = createStore(
    rootReducer,
    initialState,
    applyMiddleware(sagaMiddleware, logger)
  )

  sagaMiddleware.run(sagas)

  // @todo: move it.
  store.dispatch(fetchChannels())
  store.dispatch(fetchStreams(store.getState().channels.map(({ id }) => id)))

  return store
}

export default configureStore
