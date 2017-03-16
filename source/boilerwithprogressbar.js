import React, {Component} from 'react'
import {progressOnsetValue, progressSetValue, progressOff} from './redux_actions'
import {connect} from 'react-redux'

class XXX extends Component {
  render() {
    return(
    )
  }
}

const mapStateToProps = state => ({
  progress: state.progress
})

const mapDispatchToProps = ({
  progressOnsetValue, 
  progressSetValue, 
  progressOff
})

export default connect(mapStateToProps, mapDispatchToProps)(XXX)
