import React from 'react'

import List from '../Components/Channel/List'

import Twitch from '../Twitch'

export default class ChannelsList extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      channels: {
        live: [],
        offline: []
      }
    }
  }

  async componentDidMount () {
    const DBChannels = await this.fetchDBChannels()
    const streams = await Twitch.streams(DBChannels.map(c => c.name))
    const channels = this.aggregateChannels(DBChannels, streams)

    this.setState({ channels })
  }

  /**
   * Fetch saved channels from DB.
   *
   * @returns {Array}
   */
  async fetchDBChannels () {
    // @todo: fetch from DB.
    return [
      { name: 'arteezy', favorite: true },
      { name: 'dreadztv', favorite: true },
      { name: 'starladder1', favorite: false },
      { name: 'dendi', favorite: false },
      { name: 'rxnexus', favorite: true }
    ]
  }

  /**
   * Aggregate live and offline channels.
   *
   * @param {Array} channels
   * @param {Array} streams
   * @return {{live: Array, offline: Array}}
   */
  aggregateChannels (channels, streams) {
    let live = []
    let offline = []

    channels.forEach((c) => {
      let stream = streams.find(s => s.name === c.name)

      if (stream) {
        // Live channel.
        c.data = stream
        live.push(c)
      } else {
        // Offline channel.
        offline.push(c)
      }
    })

    return { live, offline }
  }

  render () {
    return (<List {...this.props} {...this.state} />)
  }
}

ChannelsList.propTypes = {
  handleChange: React.PropTypes.func.isRequired,
  slideIndex: React.PropTypes.number.isRequired
}
