import React from 'react'
import Paper from 'material-ui/Paper'

import Channel from './Channel'

import classNames from 'classnames/bind'
import styles from './channel.scss'
const cx = classNames.bind(styles)

export default class OfflineChannel extends React.Component {
  render () {
    let { data, favorite } = this.props
    let { name, link } = data

    return (
      <Channel className={cx('offline')} favorite={favorite}>
        <Paper className={cx('picture')} rounded={false}>
          OFFLINE
        </Paper>
        <Paper className={cx('info')} rounded={false}>
          <div className={cx('description')}>
            <a href={link} target="_blank">{name}</a>
          </div>
        </Paper>
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
