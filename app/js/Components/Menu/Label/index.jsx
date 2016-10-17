import React from 'react'

import Counter from './Counter'

export default function Label (props) {
  const { active, title, count } = props

  return (
    <div>
      {title}
      {count ? (<Counter active={active} value={count} />) : ''}
    </div>
  )
}

Label.propTypes = {
  active: React.PropTypes.bool.isRequired,
  title: React.PropTypes.string.isRequired,
  count: React.PropTypes.number
}
