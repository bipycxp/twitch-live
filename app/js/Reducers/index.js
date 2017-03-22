import { combineReducers } from 'redux'

import channels from './channels'
import streams from './streams'

const reducers = combineReducers({
  channels,
  streams,
})

export default reducers
