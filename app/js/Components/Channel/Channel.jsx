import React from 'react'

import classNames from 'classnames/bind'
import styles from './channel.scss'
const cx = classNames.bind(styles)

export default class Channel extends React.Component {
  constructor (props) {
    super(props)
    let { favorite = false } = props
    this.state = {
      favorite
    }
  }

  render () {
    let { favorite } = this.state
    let { children, className } = this.props

    return (
      <div className={cx('channel', className, { favorite })}>
        {children}
      </div>
    )
  }
}

Channel.propTypes = {
  className: React.PropTypes.string,
  favorite: React.PropTypes.bool,
  children: React.PropTypes.oneOfType([
    React.PropTypes.arrayOf(React.PropTypes.node),
    React.PropTypes.node
  ])
}
