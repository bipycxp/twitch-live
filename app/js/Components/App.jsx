import React from 'react'

import List from './Channel/List'
import Menu from './Menu'

export default class App extends React.Component {
  render () {
    return (
      <div className="app">
        <List />
        <Menu />
      </div>
    )
  }
}
