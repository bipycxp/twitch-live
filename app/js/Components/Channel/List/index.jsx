import React from 'react'
import SwipeableViews from 'react-swipeable-views'

import LiveChannel from '../Live'
import OfflineChannel from '../Offline'

import classNames from 'classnames/bind'
import styles from './list.scss'
const cx = classNames.bind(styles)

export default class List extends React.Component {
  render () {
    const { handleChange, slideIndex, channels: { live, offline } } = this.props

    return (
      <SwipeableViews className={cx('list')} index={slideIndex} onChangeIndex={handleChange}>
        <div className={cx('live')}>
          {live.map(channel => (<LiveChannel key={channel.name} {...channel} />))}
        </div>
        <div className={cx('offline')}>
          {offline.map(channel => (<OfflineChannel key={channel.name} {...channel} />))}
        </div>
      </SwipeableViews>
    )
  }
}

List.propTypes = {
  channels: React.PropTypes.shape({
    live: React.PropTypes.array.isRequired,
    offline: React.PropTypes.array.isRequired
  }).isRequired,
  handleChange: React.PropTypes.func.isRequired,
  slideIndex: React.PropTypes.number.isRequired
}
