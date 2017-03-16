import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Intent, ProgressBar} from '@blueprintjs/core'

class Progressbar extends Component {
  render() {
    const progress = this.props.progress
    return(
    <div>
    {
    progress.view &&
    <ProgressBar
      className="pt-no-stripes progressbar"
      intent={Intent.PRIMARY}
      value={progress.value}
    />
    }
    </div>
    )
  }
}

const mapStateToProps = state => ({
  progress: state.progress
})
const mapDispatchToProps = ({
})

export default connect(mapStateToProps, mapDispatchToProps)(Progressbar)

