import React from 'react'
import PropTypes from 'prop-types'
import AutoComplete from 'material-ui/AutoComplete'

import callOnceWithDelay from 'utils/callOnceWithDelay'

import classNames from 'classnames/bind'
import styles from './add.scss'
const cx = classNames.bind(styles)

AddChannel.propTypes = {
  searchChannels: PropTypes.array.isRequired,
  onSearch: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
  searchDelay: PropTypes.number,
  floatingLabel: PropTypes.string,
  hintLabel: PropTypes.string,
  dataConfig: PropTypes.object,
  filter: PropTypes.func,
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
