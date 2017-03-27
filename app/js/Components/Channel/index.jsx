import React from 'react'
import IconButton from 'material-ui/IconButton'
import Checkbox from 'material-ui/Checkbox'
import ActionFavorite from 'material-ui/svg-icons/action/favorite'
import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border'
import NavigationClose from 'material-ui/svg-icons/navigation/close'

import LiveStatus from 'Components/LiveStatus'

import classNames from 'classnames/bind'
import styles from './channel.scss'
const cx = classNames.bind(styles)

export default class Channel extends React.Component {
  static propTypes = {
    id: React.PropTypes.string.isRequired,
    name: React.PropTypes.string.isRequired,
    live: React.PropTypes.bool,
    favorite: React.PropTypes.bool,
    onFavorite: React.PropTypes.func,
    onDestroy: React.PropTypes.func,
  }

  static defaultProps = {
    live: false,
    favorite: false,
    onFavorite: () => {},
    onDestroy: () => {},
  }

  handleFavorite = () => this.props.onFavorite(this.props.id)
  handleDestroy = () => this.props.onDestroy(this.props.id)

  render () {
    const { name, live, favorite } = this.props

    return (
      <div className={cx(`channel`, { favorite })}>
        <div className={cx(`title`)}>
          <span className={cx(`liveStatus`)}>
            <LiveStatus live={live} />
          </span>
          {name}
        </div>
        <div className={cx(`actions`)}>
          <Checkbox
            className={cx(`action`, `checkbox`)}
            checked={favorite}
            onCheck={this.handleFavorite}
            checkedIcon={<ActionFavorite className={cx(`icon`, `red`)} />}
            uncheckedIcon={<ActionFavoriteBorder className={cx(`icon`)} />}
          />
          <IconButton className={cx(`action`)} onClick={this.handleDestroy}>
            <NavigationClose className={cx(`icon`)} />
          </IconButton>
        </div>
      </div>
    )
  }
}
