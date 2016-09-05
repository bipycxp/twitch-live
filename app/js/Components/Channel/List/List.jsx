import React from 'react'

import LiveChannel from '../Live'
import OfflineChannel from '../Offline'

import classNames from 'classnames/bind'
import styles from './list.scss'
const cx = classNames.bind(styles)

export default class List extends React.Component {
  render () {
    let { channels } = this.props
    let mapping = {
      live: LiveChannel,
      offline: OfflineChannel
    }

    return (
      <div className={cx('list')}>
        {Object.keys(mapping).map((type) => {
          let TypedChannel = mapping[type]

          return (
            <section key={type} className={cx(type)}>
              {channels[type].map(channel => (<TypedChannel key={channel.data.id} {...channel} />))}
            </section>
          )
        })}
      </div>
    )
  }
}

List.propTypes = {
  channels: React.PropTypes.shape({
    live: React.PropTypes.array.isRequired,
    offline: React.PropTypes.array.isRequired
  }).isRequired
}
