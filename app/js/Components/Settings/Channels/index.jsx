import React from 'react'

import List from 'Components/Channel/List'

export default function Settings (props) {
  let { channels } = props

  return (
    <div>
      <List channels={channels} />
    </div>
  )
}

Settings.propTypes = {
  channels: React.PropTypes.array.isRequired
}
