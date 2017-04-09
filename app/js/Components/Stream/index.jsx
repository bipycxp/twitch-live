import React from 'react'
import PropTypes from 'prop-types'
import Paper from 'material-ui/Paper'
import ActionAccountCircle from 'material-ui/svg-icons/action/account-circle'

import LiveTime from './LiveTime'

import separateNumber from 'utils/separateNumber'

import classNames from 'classnames/bind'
import styles from './stream.scss'
const cx = classNames.bind(styles)

Stream.propTypes = {
  displayName: PropTypes.string.isRequired,
  game: PropTypes.string.isRequired,
  gameUrl: PropTypes.string.isRequired,
  logo: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  viewers: PropTypes.number.isRequired,
  datetime: PropTypes.shape({
    started: PropTypes.string.isRequired,
  }).isRequired,
}

export default function Stream (props) {
  let { displayName, game, gameUrl, logo, status, url, viewers, datetime } = props

  return (
    <div className={cx(`stream`)}>
      <Paper className={cx(`picture`)} rounded={false}>
        <a href={url} target='_blank'>
          <img src={logo} />
        </a>
      </Paper>
      <Paper className={cx(`info`)} rounded={false}>
        <div className={cx(`viewers`)}>
          {separateNumber(viewers)}
          <ActionAccountCircle className={cx(`icon`)} />
        </div>
        <div className={cx(`status`)} title={status}>{status}</div>
        <div className={cx(`live`)}>
          <LiveTime started={datetime.started} />
        </div>
        <div className={cx(`description`)}>
          <a href={url} target='_blank'>{displayName}</a>
          playing <a href={gameUrl} title={game} target='_blank'>{game}</a>
        </div>
      </Paper>
    </div>
  )
}
