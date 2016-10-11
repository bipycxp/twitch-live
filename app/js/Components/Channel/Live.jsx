import React from 'react'
import Paper from 'material-ui/Paper'
import ActionAccountCircle from 'material-ui/svg-icons/action/account-circle'

import moment from 'moment'

import Channel from './Channel'

import classNames from 'classnames/bind'
import styles from './channel.scss'
const cx = classNames.bind(styles)

export default class LiveChannel extends React.Component {
  render () {
    let { data, favorite } = this.props
    let { displayName, game, logo, status, url, viewers, datetime } = data
    let live = 'live ' + moment(datetime.started).toNow(true)

    // Add comma separate to big number.
    let viewersFormat = viewers.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1,')

    return (
      <Channel className={cx('live')} favorite={favorite}>
        <Paper className={cx('picture')} rounded={false}>
          <a href={url} target="_blank">
            <img src={logo} />
          </a>
        </Paper>
        <Paper className={cx('info')} rounded={false}>
          <div className={cx('viewers')}>
            {viewersFormat}
            <ActionAccountCircle className={cx('icon')} />
          </div>
          <div className={cx('status')} title={status}>{status}</div>
          <div className={cx('live')}>{live}</div>
          <div className={cx('description')}>
            <a href={url} target="_blank">{displayName}</a>
            <span title={game}>{game}</span>
          </div>
        </Paper>
      </Channel>
    )
  }
}

LiveChannel.propTypes = {
  favorite: React.PropTypes.bool.isRequired,
  data: React.PropTypes.shape({
    game: React.PropTypes.string.isRequired,
    logo: React.PropTypes.string.isRequired,
    name: React.PropTypes.string.isRequired,
    status: React.PropTypes.string.isRequired,
    url: React.PropTypes.string.isRequired,
    viewers: React.PropTypes.number.isRequired,
    datetime: React.PropTypes.shape({
      started: React.PropTypes.string.isRequired
    })
  }).isRequired
}
