import React from 'react'
import getMuiTheme from 'material-ui/styles/getMuiTheme'

import List from '../Components/Channel/List'
import Menu from './Menu'

import classNames from 'classnames/bind'
import styles from './app.scss'
const cx = classNames.bind(styles)

import Twitch from '../Twitch'

export default class App extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      channels: {
        live: [],
        offline: []
      },
      slideIndex: 0
    }

    this.handleSlideChange = this.handleSlideChange.bind(this)
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

  handleSlideChange (slideIndex) {
    this.setState({ slideIndex })
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
      { name: 'illidanstrdoto', favorite: false },
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
    const slideProps = {
      slideIndex: this.state.slideIndex,
      handleChange: this.handleSlideChange
    }

    let { channels } = this.state

    let counters = {
      live: channels.live.length,
      offline: channels.offline.length
    }

    return (
      <div className={cx('app')}>
        <List {...slideProps} channels={channels} />
        <Menu {...slideProps} counters={counters} />
      </div>
    )
  }
}

App.childContextTypes = {
  muiTheme: React.PropTypes.object.isRequired
}
