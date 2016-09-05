import React from 'react'

import ChannelsList from '../Containers/ChannelsList'
import Menu from './Menu'

import classNames from 'classnames/bind'
import styles from './app.scss'
const cx = classNames.bind(styles)

export default class App extends React.Component {
  render () {
    return (
      <div className={cx('app')}>
        <ChannelsList />
        <Menu />
      </div>
    )
  }
}
