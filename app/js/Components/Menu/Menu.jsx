import React from 'react'

import Item from './Item'

import classNames from 'classnames/bind'
import styles from './menu.scss'
const cx = classNames.bind(styles)

export default class Menu extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      items: [
        {
          name: 'live',
          active: true
        },
        {
          name: 'offline'
        },
        {
          name: 'settings',
          title: 'Sets'
        }
      ]
    }

    this.renderItem = this.renderItem.bind(this)
  }

  /**
   * Set new active item.
   *
   * @param {string} name - Item name
   */
  setActiveItem (name) {
    let items = this.state.items.map(item => ({...item, active: name === item.name}))
    this.setState({ items })
  }

  /**
   * Item onClick handler.
   *
   * @param {MenuItem} item
   */
  handleItemClick (item) {
    let { name, onClick } = item

    this.setActiveItem(name)
    onClick && onClick()
  }

  /**
   * @param {MenuItem} item
   * @return {XML}
   */
  renderItem (item) {
    return (<Item key={item.name} {...item} onClick={this.handleItemClick.bind(this, item)} />)
  }

  /**
   * @return {XML}
   */
  render () {
    return (
      <div className={cx('menu')}>
        {this.state.items.map(this.renderItem)}
      </div>
    )
  }
}
