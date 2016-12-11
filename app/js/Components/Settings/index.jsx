import React from 'react'

import Channels from './Channels'

export default function Settings (props) {
  const { channels } = props

  return (
    <div>
      <Channels channels={channels} />
    </div>
  )
}

Settings.propTypes = {
  channels: React.PropTypes.array.isRequired
}
