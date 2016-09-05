import React from 'react'

import Item from './Item'

import classNames from 'classnames/bind'
import styles from './menu.scss'
const cx = classNames.bind(styles)

export default class Menu extends React.Component {
  render () {
    return (
      <div className={cx('menu')}>
        <Item onClick={() => console.log('Live')}>
          <i className={cx('record', 'icon')} />
          Live
        </Item>
        <Item onClick={() => console.log('Offline')}>
          <i className={cx('twitch', 'icon')} />
          Offline
        </Item>
        <Item onClick={() => console.log('Settings')}>
          Settings
        </Item>
      </div>
    )
  }
}
