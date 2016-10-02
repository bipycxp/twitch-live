import React from 'react'
import ReactDOM from 'react-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
import injectTapEventPlugin from 'react-tap-event-plugin'
injectTapEventPlugin()

import App from 'Components/App'

const WrappedApp = () => (
  <MuiThemeProvider>
    <App />
  </MuiThemeProvider>
)

ReactDOM.render((<WrappedApp />), document.getElementById('root'))
