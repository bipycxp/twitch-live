import React from 'react'

// @todo do something with containers.
import ChannelAdd from 'Containers/ChannelAdd'
import ChannelList from 'Containers/ChannelList'

import Menu from 'material-ui/Menu'
import MenuItem from 'material-ui/MenuItem'

import classNames from 'classnames/bind'
import styles from './settings.scss'
const cx = classNames.bind(styles)

const CHANNELS_TAB_NAME = `channels`
const NOTIFIES_TAB_NAME = `notifies`

export default class Settings extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      show: false,
      activeTab: CHANNELS_TAB_NAME,
    }
  }

  handleChange = (element, activeTab) => {
    this.setState({activeTab})
  }

  openSettings = () => {
    this.setState((prevState) => ({
      open: !prevState.open,
      activeClass: prevState.open ? `slide-down` : `slide-top`,
    }))
  }

  render () {
    const menuStyle = {
      float: `left`,
      width: `112px !important`,
      padding: `0 !important`,
    }
    const listStyle = {
      paddingTop: `0 !important`,
      paddingBottom: `0 !important`,
      padding: `0 !important`,
    }

    const {activeTab} = this.state
    const content = {
      [CHANNELS_TAB_NAME]: (
        <section className=''>
          <ChannelAdd />
          <ChannelList />
        </section>
      ),
      [NOTIFIES_TAB_NAME]: (<section>Notifies</section>),
    }

    return (
      <div className={cx(`content`) + cx(` `) + cx(`${this.state.activeClass}`)}>
        <div onClick={this.openSettings} className={cx(`button`)}>Settings</div>
        <Menu style={menuStyle} listStyle={listStyle} onChange={this.handleChange}>
          <MenuItem primaryText={CHANNELS_TAB_NAME} value={CHANNELS_TAB_NAME} />
          <MenuItem primaryText={NOTIFIES_TAB_NAME} value={NOTIFIES_TAB_NAME} />
        </Menu>
        <div className={cx(`menu-content`)}>
          {content[activeTab]}
        </div>
      </div>
    )
  }
}
