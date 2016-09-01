import React from 'react'

import Item from './Item'

export default class Menu extends React.Component {
  render () {
    return (
      <div className="menu">
        <Item onClick={() => console.log('Live')}>
          <i className="record icon" />
          Live
        </Item>
        <Item onClick={() => console.log('Offline')}>
          <i className="twitch icon" />
          Offline
        </Item>
        <Item onClick={() => console.log('Settings')}>
          Settings
        </Item>
      </div>
    )
  }
}
