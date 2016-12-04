import React from 'react'

import LiveStatus from 'Components/LiveStatus'

import classNames from 'classnames/bind'
import styles from './channel.scss'
const cx = classNames.bind(styles)

export default function Channel (props) {
  let { name, live } = props

  return (
    <div className={cx('channel')}>
      <div className={cx('title')}>
        <span className={cx('liveStatus')}>
          <LiveStatus live={live} />
        </span>
        {name}
      </div>
    </div>
  )
}

Channel.propTypes = {
  name: React.PropTypes.string.isRequired,
  live: React.PropTypes.bool.isRequired
}
