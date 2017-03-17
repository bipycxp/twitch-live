import { applyMiddleware, createStore } from 'redux'
import createLogger from 'redux-logger'
import rootReducer from 'Reducers'
import { getChannels } from 'Actions'

export default function configureStore (initialState) {
  const logger = createLogger()

  const store = createStore(
    rootReducer,
    initialState,
    applyMiddleware(logger)
  )

  // @todo: move it.
  store.dispatch(getChannels())

  return store
}
