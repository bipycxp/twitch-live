import React from 'react'

import Channel from './Channel'

import classNames from 'classnames/bind'
import styles from './channel.scss'
const cx = classNames.bind(styles)

export default class OfflineChannel extends React.Component {
  render () {
    let { data, favorite } = this.props
    let { name, link } = data

    return (
      <Channel favorite={favorite}>
        <div className={cx('picture')}>
          <div>OFFLINE</div>
        </div>
        <div className={cx('info')}>
          <div className={cx('description')}>
            <a href={link} target="_blank">{name}</a>
          </div>
        </div>
      </Channel>
    )
  }
}

OfflineChannel.propTypes = {
  favorite: React.PropTypes.bool,
  data: React.PropTypes.shape({
    name: React.PropTypes.string.isRequired,
    link: React.PropTypes.string.isRequired
  }).isRequired
}
