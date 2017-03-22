import { connect } from 'react-redux'
import { destroyChannel, toggleChannelFavorite } from 'Actions'

import List from 'Components/Channel/List'

const mapStateToProps = (state) => ({
  channels: state.channels,
})

const mapDispatchToProps = (dispatch) => ({
  onFavorite: channel => dispatch(toggleChannelFavorite(channel)),
  onDestroy: channel => dispatch(destroyChannel(channel)),
})

const ChannelList = connect(
  mapStateToProps,
  mapDispatchToProps
)(List)

export default ChannelList
