import React from 'react'
import getMuiTheme from 'material-ui/styles/getMuiTheme'

import ChannelsList from '../Containers/ChannelsList'
import Menu from './Menu'

import classNames from 'classnames/bind'
import styles from './app.scss'
const cx = classNames.bind(styles)

export default class App extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      slideIndex: 0
    }

    this.handleSlideChange = this.handleSlideChange.bind(this)
  }

  getChildContext () {
    const muiTheme = getMuiTheme({
      palette: {
        primary1Color: '#6441a5',
        accent1Color: 'white'
      }
    })

    return { muiTheme }
  }

  handleSlideChange (slideIndex) {
    this.setState({ slideIndex })
  }

  render () {
    const slideProps = {
      slideIndex: this.state.slideIndex,
      handleChange: this.handleSlideChange
    }

    return (
      <div className={cx('app')}>
        <ChannelsList {...slideProps} />
        <Menu {...slideProps} />
      </div>
    )
  }
}

App.childContextTypes = {
  muiTheme: React.PropTypes.object.isRequired
}
