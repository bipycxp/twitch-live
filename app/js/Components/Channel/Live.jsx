import React from 'react'

import Channel from './Channel'

export default class LiveChannel extends React.Component {
  constructor (props) {
    super(props)

    this.handlePictureClick = this.handlePictureClick.bind(this)
  }

  handlePictureClick () {
    window.open(this.props.data.link, '_blank')
  }

  render () {
    let { data, favorite } = this.props
    let { game, link, liveTime, name, picture, status, viewers } = data

    return (
      <Channel favorite={favorite}>
        <div className="picture">
          <img src={picture} onClick={this.handlePictureClick} />
        </div>
        <div className="info">
          <div className="status">{status}</div>
          <div className="viewers">
            {viewers}
            <i className="user red icon" />
          </div>
          <div className="live">live {liveTime}</div>
          <div className="description">
            <a href={link} target="_blank">{name}</a>
            <span>{game}</span>
          </div>
        </div>
      </Channel>
    )
  }
}

LiveChannel.propTypes = {
  favorite: React.PropTypes.bool,
  data: React.PropTypes.shape({
    game: React.PropTypes.string.isRequired,
    link: React.PropTypes.string.isRequired,
    liveTime: React.PropTypes.number.isRequired,
    name: React.PropTypes.string.isRequired,
    picture: React.PropTypes.string.isRequired,
    status: React.PropTypes.string.isRequired,
    viewers: React.PropTypes.number.isRequired
  }).isRequired
}

