import React from 'react'
import { Tabs, Tab } from 'material-ui/Tabs'

// @todo do something with containers.
import ChannelAdd from 'Containers/ChannelAdd'
import ChannelList from 'Containers/ChannelList'

const CHANNELS_TAB_NAME = `channels`
const NOTIFIES_TAB_NAME = `notifies`

export default class Settings extends React.Component {
  state = {
    activeTab: CHANNELS_TAB_NAME,
  }

  handleChange = activeTab => this.setState({ activeTab });

  render () {
    const { activeTab } = this.state

    return (
      <Tabs
        value={activeTab}
        onChange={this.handleChange}
      >
        <Tab label={CHANNELS_TAB_NAME} value={CHANNELS_TAB_NAME}>
          <ChannelAdd />
          <ChannelList />
        </Tab>
        <Tab label={NOTIFIES_TAB_NAME} value={NOTIFIES_TAB_NAME}>
          Notifies
        </Tab>
      </Tabs>
    )
  }
}
