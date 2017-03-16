import {combineReducers} from 'redux'
import progress from './progress'

const rootReducer = combineReducers({
  progress,
})

const shyAReducer = (state, action) => rootReducer(state, action)

export default shyAReducer
