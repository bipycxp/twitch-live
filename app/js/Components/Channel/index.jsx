import React from 'react'
import Paper from 'material-ui/Paper'

import LiveStatus from 'Components/LiveStatus'

import classNames from 'classnames/bind'
import styles from './channel.scss'
const cx = classNames.bind(styles)

export default function Channel (props) {
  let { name, live } = props

  return (
    <Paper className={cx('channel')} rounded={false}>
      <div className={cx('title')}>
        <span className={cx('liveStatus')}>
          <LiveStatus live={live} />
        </span>
        {name}
      </div>
    </Paper>
  )
}

Channel.propTypes = {
  name: React.PropTypes.string.isRequired,
  live: React.PropTypes.bool.isRequired
}
