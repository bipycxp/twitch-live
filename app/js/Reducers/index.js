import { combineReducers } from 'redux'

import channels from './Roots/channels'
import streams from './Roots/streams'
import meta from './Roots/meta'

const reducers = combineReducers({
  channels,
  streams,
  meta,
})

export default reducers
