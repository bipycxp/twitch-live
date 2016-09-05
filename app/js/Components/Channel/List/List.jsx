import React from 'react'

import LiveChannel from '../Live'
import OfflineChannel from '../Offline'

import classNames from 'classnames/bind'
import styles from './list.scss'
const cx = classNames.bind(styles)

export default class List extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      live: [],
      offline: []
    }
  }

  async componentDidMount () {
    this.setState({ status: 'pending' })
    let channels = await this.fetchChannels()
    this.setState(Object.assign({ status: 'ready' }, channels))
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
    let mapping = {
      live: LiveChannel,
      offline: OfflineChannel
    }

    return (
      <div className={cx('list')}>
        {[ 'live', 'offline' ].map(type => {
          let TypedChannel = mapping[type]

          return (
            <section key={type} className={cx(type)}>
              {this.state[type].map(channel => (<TypedChannel key={channel.data.id} {...channel} />))}
            </section>
          )
        })}
      </div>
    )
  }
}
