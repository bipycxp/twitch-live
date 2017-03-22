import { connect } from 'react-redux'

import List from 'Components/Stream/List'

const mapStateToProps = (state) => ({
  streams: state.streams,
})

const StreamList = connect(
  mapStateToProps
)(List)

export default StreamList
