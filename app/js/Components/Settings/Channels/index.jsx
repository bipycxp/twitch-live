import React from 'react'

import AddChannel from './Add'
import ChannelsList from 'Components/Channel/List'

export default function Channels (props) {
  let { channels } = props

  return (
    <div>
      <AddChannel
        handleSearch={value => [ value, value + value, value + value + value ]}
        handleSelect={value => console.log('Selected channel: ' + value)}
      />
      <ChannelsList channels={channels} />
    </div>
  )
}

Channels.propTypes = {
  channels: React.PropTypes.array.isRequired
}
