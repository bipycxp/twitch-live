import { connect } from 'react-redux'
import { fetchSearchChannels, clearSearchChannels, addChannel } from 'Actions'

import Add from 'Components/Channel/Add'

const mapStateToProps = (state) => ({
  searchChannels: state.meta.searchChannels,
})

const mapDispatchToProps = (dispatch) => ({
  onSearch: (query) => {
    if (!query) {
      dispatch(clearSearchChannels())
      return
    }

    dispatch(fetchSearchChannels(query))
  },
  onSelect: channel => dispatch(addChannel(channel)),
})

const AddContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Add)

export default AddContainer
