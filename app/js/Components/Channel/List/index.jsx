import React from 'react'
import Divider from 'material-ui/Divider'

import Channel from '../index'

import classNames from 'classnames/bind'
import styles from './list.scss'
const cx = classNames.bind(styles)

ChannelsList.propTypes = {
  channels: React.PropTypes.array.isRequired,
  onFavorite: React.PropTypes.func,
  onDestroy: React.PropTypes.func,
}

export default function ChannelsList (props) {
  const { channels, onFavorite, onDestroy } = props

  // Add dividers.
  let dividedList = []
  channels.forEach((channel) => {
    dividedList
      .push(
        (<Channel
          key={channel.id}
          {...channel}
          onFavorite={onFavorite}
          onDestroy={onDestroy}
        />),
        (<Divider key={`${channel.id}_divider`} className={cx(`divider`)} />)
      )
  })
  // Remove last divider.
  dividedList.pop()

  return (
    <div className={cx(`list`)}>
      {dividedList}
    </div>
  )
}
