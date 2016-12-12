import React from 'react'
import AutoComplete from 'material-ui/AutoComplete'

import classNames from 'classnames/bind'
import styles from './add.scss'
const cx = classNames.bind(styles)

export default class AddChannel extends React.Component {
  static propTypes = {
    handleSearch: React.PropTypes.func.isRequired,
    handleSelect: React.PropTypes.func.isRequired
  }

  state = {
    dataSource: []
  }

  handleUpdateInput = value => this.setState({
    dataSource: this.props.handleSearch(value)
  })

  handleNewRequest = value => this.props.handleSelect(value)

  render () {
    return (
      <AutoComplete
        className={cx('add')}
        floatingLabelText="Add new channel"
        hintText="Type channel name..."
        dataSource={this.state.dataSource}
        onUpdateInput={this.handleUpdateInput}
        onNewRequest={this.handleNewRequest}
        fullWidth
      />
    )
  }
}
