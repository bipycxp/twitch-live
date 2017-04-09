import React from 'react'
import PropTypes from 'prop-types'

import toNow from 'utils/toNow'

import classNames from 'classnames/bind'
import styles from './liveTime.scss'
const cx = classNames.bind(styles)

export default class LiveTime extends React.Component {
  static propTypes = {
    started: PropTypes.string.isRequired,
  }

  state = {
    short: true,
  }

  onFocusHandler = () => this.setState({ short: false })
  onBlurHandler = () => this.setState({ short: true })

  render () {
    let { started } = this.props
    let { short } = this.state

    return (
      <div className={cx(`liveTime`)} onMouseEnter={this.onFocusHandler} onMouseLeave={this.onBlurHandler}>
        {`live ${toNow(started, short)}`}
      </div>
    )
  }
}
