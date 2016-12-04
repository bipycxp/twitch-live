import React from 'react'
import Divider from 'material-ui/Divider'

import Channel from '../index'

import classNames from 'classnames/bind'
import styles from './list.scss'
const cx = classNames.bind(styles)

export default function List (props) {
  const { channels } = props

  // Add dividers.
  let dividedList = []
  channels.forEach((channel) => {
    dividedList
      .push(
        (<Channel key={channel.name} {...channel} />),
        (<Divider key={channel.name + '_divider'} className={cx('divider')} />)
      )
  })
  // Remove last divider.
  dividedList.pop()

  return (
    <div className={cx('list')}>
      {dividedList}
    </div>
  )
}

List.propTypes = {
  channels: React.PropTypes.array.isRequired
}
