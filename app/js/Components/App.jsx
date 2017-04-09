import React from 'react'
import PropTypes from 'prop-types'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import { grey900 } from 'material-ui/styles/colors'

import StreamList from 'Containers/StreamList'
import Settings from 'Components/Settings'

import classNames from 'classnames/bind'
import styles from './app.scss'
const cx = classNames.bind(styles)

export default class App extends React.Component {
  static childContextTypes = {
    muiTheme: PropTypes.object.isRequired,
  }

  getChildContext () {
    const muiTheme = getMuiTheme({
      palette: {
        textColor: grey900,
      },
    })

    return { muiTheme }
  }

  render () {
    return (
      <div className={cx(`app`)}>
        <StreamList />
        <Settings />
      </div>
    )
  }
}
