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

    this.handleOptionsClick = this.handleOptionsClick.bind(this)
  }

  handleOptionsClick () {
    alert('click')
  }

  render () {
    let { favorite } = this.state

    return (
      <div className={cx('channel', { favorite })}>
        {this.props.children}
        <div className={cx('options')} onClick={this.handleOptionsClick} />
      </div>
    )
  }
}

Channel.propTypes = {
  favorite: React.PropTypes.bool,
  children: React.PropTypes.oneOfType([
    React.PropTypes.arrayOf(React.PropTypes.node),
    React.PropTypes.node
  ])
}
