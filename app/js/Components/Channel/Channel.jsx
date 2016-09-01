import React from 'react'

export default class Channel extends React.Component {
  constructor (props) {
    super(props)

    let { favorite = false } = props

    this.state = {
      favorite
    }

    this.handleOptionsClick = this.handleOptionsClick.bind(this)
  }

  handleOptionsClick () {
    alert('click')
  }

  render () {
    return (
      <div className={'channel ' + this.state.favorite ? 'favorite' : ''}>
        {this.props.children}
        <div className="options" onClick={this.handleOptionsClick} />
      </div>
    )
  }
}

Channel.propTypes = {
  favorite: React.PropTypes.bool,
  children: React.PropTypes.oneOfType([
    React.PropTypes.arrayOf(React.PropTypes.node),
    React.PropTypes.node
  ])
}
