export const SET = 'SET'
export const VIEW = 'VIEW'
export const HIDE = 'HIDE'
export const ONSET = 'ONSET'

export const viewProgress = progress => ({type: VIEW, progress})
export const hideProgress = progress => ({type: HIDE, progress})
export const setProgress = progress => ({type: SET, progress})
export const onsetProgress = progress => ({type: ONSET, progress})


export const progressOn = () => dispatch => {
  dispatch(viewProgress({value: 0}))
}
export const progressOff = () => dispatch => {
  dispatch(hideProgress({value: 1}))
}
export const progressSetValue = (value = 0) => dispatch => {
  dispatch(setProgress({value}))
}
export const progressOnsetValue = (value = 0) => dispatch => {
  console.log(value)
  dispatch(onsetProgress({value}))
}
