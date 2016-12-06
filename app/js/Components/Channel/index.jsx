import React from 'react'
import IconButton from 'material-ui/IconButton'
import ActionFavorite from 'material-ui/svg-icons/action/favorite'
import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border'
import NavigationClose from 'material-ui/svg-icons/navigation/close'

import LiveStatus from 'Components/LiveStatus'

import classNames from 'classnames/bind'
import styles from './channel.scss'
const cx = classNames.bind(styles)

export default class Channel extends React.Component {
  static propTypes = {
    name: React.PropTypes.string.isRequired,
    live: React.PropTypes.bool.isRequired,
    favorite: React.PropTypes.bool
  }

  static defaultProps = {
    favorite: false
  }

  constructor (props) {
    super(props)

    const { favorite } = this.props

    this.state = {
      favorite
    }
  }

  handleFavorite = () => this.setState(prev => ({ favorite: !prev.favorite }))
  handleDestroy = () => console.log('removed')

  render () {
    const { name, live } = this.props
    const { favorite } = this.state

    const Heart = favorite ? ActionFavorite : ActionFavoriteBorder

    return (
      <div className={cx('channel', { favorite })}>
        <div className={cx('title')}>
          <span className={cx('liveStatus')}>
            <LiveStatus live={live} />
          </span>
          {name}
        </div>
        <div className={cx('actions')}>
          <IconButton className={cx('action')} onClick={this.handleFavorite}>
            <Heart className={cx('icon', 'heart', { favorite })} />
          </IconButton>
          <IconButton className={cx('action')} onClick={this.handleDestroy}>
            <NavigationClose className={cx('icon')} />
          </IconButton>
        </div>
      </div>
    )
  }
}
