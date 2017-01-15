import React from 'react'
import AutoComplete from 'material-ui/AutoComplete'

import callOnceWithDelay from 'utils/callOnceWithDelay'

import classNames from 'classnames/bind'
import styles from './add.scss'
const cx = classNames.bind(styles)

export default class AddChannel extends React.Component {
  static propTypes = {
    handleSearch: React.PropTypes.func.isRequired,
    handleSelect: React.PropTypes.func.isRequired,
    searchDelay: React.PropTypes.number
  }

  static defaultProps = {
    searchDelay: 300
  }

  state = {
    items: []
  }

  handleSearch = async function (value) {
    const items = await this.props.handleSearch(value)
    this.setState({ items })
  }.bind(this)

  handleNewRequest = value => this.props.handleSelect(value)

  render () {
    return (
      <AutoComplete
        className={cx('add')}
        floatingLabelText="Add new channel"
        hintText="Type channel name..."
        dataSource={this.state.items}
        dataSourceConfig={{ value: 'id', text: 'displayName' }}
        onUpdateInput={callOnceWithDelay(this.handleSearch, this.props.searchDelay)}
        onNewRequest={this.handleNewRequest}
        filter={() => true}
        fullWidth
      />
    )
  }
}
