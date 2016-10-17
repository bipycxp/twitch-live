import React from 'react'

import classNames from 'classnames/bind'
import styles from './counter.scss'
const cx = classNames.bind(styles)

export default function Counter (props) {
  let { active, value } = props

  return (
    <div className={cx('counter', { active })}>
      {value}
    </div>
  )
}

Counter.propTypes = {
  active: React.PropTypes.bool.isRequired,
  value: React.PropTypes.number.isRequired
}
