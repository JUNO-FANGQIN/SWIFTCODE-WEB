import { combineReducers } from 'redux'
import Immutable from 'immutable'

import home from './home'
import introduce from './introduce'

export default combineReducers({
  home,
  introduce
})