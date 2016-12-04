import React from 'react'

import Channel from '../index'

import classNames from 'classnames/bind'
import styles from './list.scss'
const cx = classNames.bind(styles)

export default function List (props) {
  const { channels } = props

  return (
    <div className={cx('list')}>
      {channels.map(channel => (<Channel key={channel.name} {...channel} />))}
    </div>
  )
}

List.propTypes = {
  channels: React.PropTypes.array.isRequired
}
