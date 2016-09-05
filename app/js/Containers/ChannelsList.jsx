import React from 'react'

import List from '../Components/Channel/List'

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
    let channels = await this.fetchChannels()
    this.setState({ channels })
  }

  /**
   * @return {{live: Array, offline: Array}}
   */
  async fetchChannels () {
    return {
      live: [
        {
          favorite: true,
          data: {
            id: 123213,
            name: 'Livestream',
            status: 'Live stream',
            link: '',
            game: 'Game',
            liveTime: 1232313,
            picture: 'http://socialtimes.com/files/2011/01/Rick-Astley-150x150.jpg',
            viewers: 123
          }
        }
      ],
      offline: [
        {
          favorite: false,
          data: {
            id: 131252,
            name: 'Offline stream',
            link: ''
          }
        }
      ]
    }
  }

  render () {
    return (<List channels={this.state.channels} />)
  }
}
