import React from 'react'

import { upperFirst } from 'lodash'

import classNames from 'classnames/bind'
import styles from './item.scss'
const cx = classNames.bind(styles)

/**
 * @param {MenuItem} props
 * @return {XML}
 */
export default function Item (props) {
  let { name, onClick, active, count, title } = props

  return (
    <div className={cx('item', name, { active })} onClick={onClick}>
      {title == null ? upperFirst(name) : title}
      {count ? (<div className={cx('count')}>{count}</div>) : ''}
    </div>
  )
}

Item.propTypes = {
  name: React.PropTypes.string.isRequired,
  onClick: React.PropTypes.func.isRequired,
  active: React.PropTypes.bool,
  count: React.PropTypes.number,
  title: React.PropTypes.string
}

/**
 * @typedef {object} MenuItem
 * @property {string} name
 * @property {fun} onClick
 * @property {?bool} active
 * @property {?number} count
 * @property {?string} title
 */
