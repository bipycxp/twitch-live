import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import configureStore from 'Store'

import App from 'Components/App'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

// Needed for onTouchTap.
// http://stackoverflow.com/a/34015469/988941
import injectTapEventPlugin from 'react-tap-event-plugin'
injectTapEventPlugin()

const store = configureStore()

const WrappedApp = () => (
  <Provider store={store}>
    <MuiThemeProvider>
      <App />
    </MuiThemeProvider>
  </Provider>
)

// Create root node.
const root = document.createElement(`div`)
root.id = `root`
document.body.appendChild(root)

ReactDOM.render((<WrappedApp />), document.getElementById(root.id))
