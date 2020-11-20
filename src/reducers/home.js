import Immutable from 'immutable'

const initState = Immutable.fromJS({ data: null })

export default function homeReducer(state = initState, action) {
  switch(action.type){
    case 'SET_HOME_DATA':
      return state.set('data', Immutable.fromJS(action.payload))
    default:
      return state
  }
}