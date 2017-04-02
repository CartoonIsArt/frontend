import React, {Component} from 'react'
import Dropzone from 'react-dropzone'
import {EditableText} from '@blueprintjs/core'
import ReactMarkdown from 'react-markdown'
import {postRocks, putFiles} from './actions'
import Image from './Image'
import {youtube_parser} from './Youtube'
import {progressOnsetValue, progressSetValue, progressOff} from './redux_actions'
import {connect} from 'react-redux'

class AddCard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      preview: false,
      youtube: "",
      text: "",
      isUploaded: false,
      parent_rock: null,
      attached_image: null,
      toggleAttaching: false,
    }
  }
  componentWillMount() {
    if (Number.isInteger(this.props.parentRock)) {
      this.setState({parent_rock: this.props.parentRock})
    }
  }
  resetState() {
    this.setState({preview: false})
    this.setState({youtube: ""})
    this.setState({text: ""})
    this.setState({isUploaded: false})
    this.setState({attached_image: null})
    if (Number.isInteger(this.props.parentRock)) {
      this.setState({parent_rock: this.props.parentRock})
    }
  }
  textChange(text) {
    this.setState({text})
    !this.state.isUploaded && this.setState({youtube: youtube_parser(text)})
  }
  onDrop = files => {
    const file = files[0]
    this.props.progressOnsetValue(0.5)
    putFiles(file)
    .then(json => {
      this.setState({attached_image: json.id}, 
        () => {
          this.setState({isUploaded: true})
          this.props.progressOff()
      })
      this.props.progressSetValue(1)
    })
  }
  post() {
    this.props.progressOnsetValue(0.5)
    postRocks(this.state)
    .then(() => {
      this.props.progressSetValue(1)
      this.resetState()
      this.props.reload()
      this.props.progressOff()
    })
  }
  render() {
    const preview = this.state.preview
    const text = this.state.text
    const isUploaded = this.state.isUploaded
    const attached_image = isUploaded ? this.state.attached_image : isUploaded
    const youtube = this.state.youtube
    const placeholder = "### 제목\n**진하게** \n[링크](https://cia.kw.ac.kr/)"
    const toggleAttaching = this.state.toggleAttaching
    return(
      <div className="card">
      {(toggleAttaching || youtube) &&
        <Dropzone onDrop={this.onDrop} 
          className="card-dropzone flex-container">
          {
          youtube ?
          <div className="card-youtube-wrapper">
            <iframe
              className="card-youtube"
              src={`https://www.youtube.com/embed/${youtube}`}
              frameBorder="0"
              allowFullScreen>
            </iframe>
          </div> :
          attached_image ?
          <Image
            imgId={attached_image}
            wrapperClass="card-image-wrapper"
            imgClass="card-image"
          /> :
          <span className="pt-icon pt-icon-media pt-icon-60 md-wd60"> </span>
          }
        </Dropzone>
        }
        <div className="card-content preview-menu">
          <div className="flex-container">
            <button 
              onClick={() => this.setState({preview: false})}
              type="button" className="pt-button pt-minimal text-soft preview-button" style={{
                marginRight: "4px",
                background: preview ? "#efefef" : "white"
                }}> 글쓰기 </button>
            <button 
              onClick={() => this.setState({preview: true})}
              type="button" className="pt-button pt-minimal text-soft preview-button" style={{
                marginRight: "4px",
                background: preview ? "white" : "#efefef",
              }}> 미리보기 </button>
            <div className="flex-grow-2"> </div>
            <button 
              onClick={() => this.setState({toggleAttaching: !toggleAttaching})}
              className="pt-button pt-minimal pt-icon-media"> 
              그림
            </button>
          </div>
        </div>
        <div className="card-content">
        {
        preview ?
          <div className="card-text">
            <ReactMarkdown source={text} />
          </div>
        :
          <EditableText
            onChange={value => this.textChange(value)}
            value={text}
            placeholder={placeholder}
            multiline
            minLines={4}
            maxLines={12}
          />
        }
        </div>
        <div className="card-line" />
        <div className="card-content flex-container">
          <div className="flex-grow-2">
          </div>
          <button
            onClick={() => this.post()}
            type="button" className="pt-button pt-intent-success"> 샤잇 </button>
        </div>
      </div>
    )
  }
}

AddCard.contextTypes = {
  router: React.PropTypes.object
}

const mapStateToProps = state => ({
  progress: state.progress
})

const mapDispatchToProps = ({
  progressOnsetValue,
  progressSetValue,
  progressOff,
})

export default connect(mapStateToProps, mapDispatchToProps)(AddCard)
