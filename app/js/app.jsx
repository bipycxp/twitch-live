import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { applyMiddleware, createStore } from 'redux'
import createLogger from 'redux-logger'
import reducers from './reducers'

import { getChannels } from 'Actions'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
import injectTapEventPlugin from 'react-tap-event-plugin'
injectTapEventPlugin()

import App from 'Components/App'

const logger = createLogger()
const store = createStore(
  reducers,
  applyMiddleware(logger)
)

store.dispatch(getChannels())

const WrappedApp = () => (
  <Provider store={store}>
    <MuiThemeProvider>
      <App />
    </MuiThemeProvider>
  </Provider>
)

ReactDOM.render((<WrappedApp />), document.getElementById(`root`))
