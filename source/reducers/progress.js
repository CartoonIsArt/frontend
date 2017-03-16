import {createStore} from 'redux'

export const progress = (state = {view: false, value: 0}, action) => {
  switch(action.type) {
    case 'ONSET':
      return {
        view: true,
        value: action.progress.value
      }
    case 'SET':
      return {
        view: state.view,
        value: action.progress.value
      }
    case 'HIDE':
      return {
        view: false,
        value: state.value
      }
    case 'VIEW':
      return {
        view: true,
        value: state.value
      }
    default:
      return state
  }
}

export default progress
