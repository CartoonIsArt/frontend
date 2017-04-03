import React, {Component} from 'react'
import {getFiles} from './actions'
import {progressOff, progressSetValue} from './redux_actions'
import {connect} from 'react-redux'

class Image extends Component {
  constructor(props) {
    super(props)
    this.state = {
      file: []
    }
  }
  componentWillUpdate() {
    if(this.state.file.length > 0 && this.props.imgId !== this.state.file[0].id) {
      this.init()
    }
  }
  componentWillMount() {
    this.init()
  }
  init() {
    this.props.progressSetValue(1)
    getFiles(this.props.imgId)
    .then(json => {
      this.setState({file: [json]}, () => this.props.progressOff())
    })
  }
  render() {
    const file = this.state.file
    return (
      <div className={this.props.wrapperClass}>
      {
        file.map(f => 
        <div key={f.id}>
          <img
            className={this.props.imgClass}
            src={`https://cia.kw.ac.kr/media/${f.file_hash}`}
            alt={f.filename} />
        </div>)
      }
      </div>
    )
  }
}

const mapStateToProps = state => ({
})
const mapDispatchToProps = ({
  progressOff,
  progressSetValue
})
export default connect(mapStateToProps, mapDispatchToProps)(Image)
