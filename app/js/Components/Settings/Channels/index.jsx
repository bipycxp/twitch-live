import React from 'react'

import AddChannel from './Add'
import ChannelsList from 'Components/Channel/List'

import Twitch from 'Twitch'

export default class Channels extends React.Component {
  static propTypes = {
    channels: React.PropTypes.array.isRequired
  }

  handleChannelSearch = async function (query) {
    if (!query) return []

    return await Twitch.searchChannels(query)
  }

  handleChannelSelect = console.log

  render () {
    let { channels } = this.props

    return (
      <div>
        <AddChannel
          handleSearch={this.handleChannelSearch}
          handleSelect={this.handleChannelSelect}
        />
        <ChannelsList channels={channels} />
      </div>
    )
  }
}
