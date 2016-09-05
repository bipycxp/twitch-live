import React from 'react'

import List from './Channel/List'
import Menu from './Menu'

import classNames from 'classnames/bind'
import styles from './app.scss'
const cx = classNames.bind(styles)

export default class App extends React.Component {
  render () {
    return (
      <div className={cx('app')}>
        <List />
        <Menu />
      </div>
    )
  }
}
