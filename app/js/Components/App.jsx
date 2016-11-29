import React from 'react'
import getMuiTheme from 'material-ui/styles/getMuiTheme'

import List from 'Components/Stream/List'

import classNames from 'classnames/bind'
import styles from './app.scss'
const cx = classNames.bind(styles)

import Twitch from 'Twitch'

export default class App extends React.Component {
  static childContextTypes = {
    muiTheme: React.PropTypes.object.isRequired
  }

  state = {
    streams: [],
    channels: []
  }

  getChildContext () {
    const muiTheme = getMuiTheme({
      palette: {
        primary1Color: '#6441a5',
        accent1Color: 'white'
      }
    })

    return { muiTheme }
  }

  async componentDidMount () {
    const DBChannels = await this.fetchDBChannels()
    const streams = await Twitch.streams(DBChannels.map(c => c.name))
    const channels = this.aggregateChannels(DBChannels, streams)

    this.setState({ streams, channels })
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
      { name: 'illidanstrdoto', favorite: false },
      { name: 'dendi', favorite: false },
      { name: 'rxnexus', favorite: true }
    ]
  }

  /**
   * Aggregate channels with live statuses.
   *
   * @param {Array} channels
   * @param {Array} streams
   * @return {Array}
   */
  aggregateChannels = (channels, streams) => channels.map((channel) => {
    channel.live = streams.findIndex(stream => channel.name === stream.name) !== -1
    return channel
  })

  render () {
    let { streams } = this.state

    return (
      <div className={cx('app')}>
        <List streams={streams} />
      </div>
    )
  }
}
