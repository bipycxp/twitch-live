import React from 'react'
import AutoComplete from 'material-ui/AutoComplete'

import callOnceWithDelay from 'utils/callOnceWithDelay'

import classNames from 'classnames/bind'
import styles from './add.scss'
const cx = classNames.bind(styles)

AddChannel.propTypes = {
  searchChannels: React.PropTypes.array.isRequired,
  onSearch: React.PropTypes.func.isRequired,
  onSelect: React.PropTypes.func.isRequired,
  searchDelay: React.PropTypes.number,
  floatingLabel: React.PropTypes.string,
  hintLabel: React.PropTypes.string,
  dataConfig: React.PropTypes.object,
  filter: React.PropTypes.func,
}

AddChannel.defaultProps = {
  searchDelay: 300,
  floatingLabel: `Add new channel`,
  hintLabel: `Type channel name...`,
  dataConfig: { value: `id`, text: `displayName` },
  filter: () => true,
}

export default function AddChannel (props) {
  const {
    searchChannels, onSearch, onSelect,
    searchDelay, floatingLabel, hintLabel, dataConfig, filter,
  } = props

  return (
    <AutoComplete
      className={cx(`add`)}
      floatingLabelText={floatingLabel}
      hintText={hintLabel}
      dataSource={searchChannels}
      dataSourceConfig={dataConfig}
      onUpdateInput={callOnceWithDelay(onSearch, searchDelay)}
      onNewRequest={onSelect}
      filter={filter}
      fullWidth
    />
  )
}
