import React from 'react'

import Channel from './Channel'

export default class OfflineChannel extends React.Component {
  render () {
    let { data, favorite } = this.props
    let { name, link } = data

    return (
      <Channel favorite={favorite}>
        <div className="picture">
          <div>OFFLINE</div>
        </div>
        <div className="info">
          <div className="description">
            <a href={link} target="_blank">{name}</a>
          </div>
        </div>
      </Channel>
    )
  }
}

OfflineChannel.propTypes = {
  favorite: React.PropTypes.bool,
  data: React.PropTypes.shape({
    name: React.PropTypes.string.isRequired,
    link: React.PropTypes.string.isRequired
  }).isRequired
}

