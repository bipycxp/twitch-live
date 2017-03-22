import React from 'react'

import Stream from 'Components/Stream'

import classNames from 'classnames/bind'
import styles from './list.scss'
const cx = classNames.bind(styles)

List.propTypes = {
  streams: React.PropTypes.array.isRequired,
}

export default function List (props) {
  const { streams } = props

  return (
    <div className={cx(`list`)}>
      {streams.map(stream => (<Stream key={stream.name} {...stream} />))}
    </div>
  )
}
