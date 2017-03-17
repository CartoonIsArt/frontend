import React, {Component} from 'react'
import Image from './Image'
import CardAuthor from './CardAuthor'
import Comments from './Comments'
import MoreRock from './MoreRock'
import AddComment from './AddComment'
import ReactMarkdown from 'react-markdown'
import {youtube_parser} from './Youtube'
import {NonIdealState} from '@blueprintjs/core'
import Pebble from './Pebble'
import Star from './Star'
import {whoami, getRocksByParentId} from './actions'
import {formatTime} from './config'
import AddCard from './AddCard'
import {progressSetValue} from './redux_actions'
import {connect} from 'react-redux'

class Card extends Component {
  constructor(props) {
    super(props)
    this.state = {
      pebbles: [],
      isSpread: "false",
      ck: 0,
      writePebble: false,
      me: [],
    }
  }
  componentWillMount() {
    whoami()
    .then(json => this.setState({me: [json]}))
    this.init()
  }
  init() {
    this.props.progressSetValue(0.9)
    getRocksByParentId(this.props.content.id)
    .then(json => json && this.setState({pebbles: json.results}))
  }
  render() {
    const pebbles = this.state.pebbles
    const content = this.props.content
    const url = "https://cia.kw.ac.kr/rocks/" + content.id
    const youtubeShortcut = youtube_parser(content.text)
    const moreCss = this.state.isSpread ? "" :  "card-more-pebble" 
    const me = this.state.me
    return(
      <article className="card">
      <div className="card-content flex-container">
        <CardAuthor
          className="flex-grow-2"
          author={content.author}
        />
        <small className="text-muted">
          {formatTime(content.write_date)}
        </small>
      </div>
      {
      content.attached_image ?
      <Image
        imgId={content.attached_image}
        imgClass="card-image"
        wrapperClass="card-image-wrapper"
        /> :
      youtubeShortcut ?
      <div className="card-youtube-wrapper">
        <iframe className="card-youtube"
          src={`https://www.youtube.com/embed/${youtubeShortcut}`}
          frameBorder="0"
          allowFullScreen
        />
      </div> :
      <div className="card-row" />
      }
      <div className="card-content">
        <ReactMarkdown 
          className="card-text"
          source={content.text} />
      </div>
        {
         pebbles.map(pebble =>
           <Pebble 
            key={pebble.id}
            content={pebble}
          />
          )
        }
      <div className="card-content">
      {me.map(me => me.id == content.author && (
        this.state.writePebble ?
          <AddCard 
            key={content.id}
            reload={() => this.init()}
            parentRock={content.id} /> :
          <p
            key={content.id}
            className="more-comment"
            onClick={() => this.setState({writePebble: true})}>
            이어쓰기
          </p>)
      )}
        <div className="flex-container">
          <Star
            rockId={content.id}
          />
          <div className="flex-grow-2"> </div>
          <div className="text-muted">
            <small> {url} </small>
          </div>
        </div>
        <Comments
          key={this.state.ck}
          rockId={content.id}
        />
      </div>
      <div className="card-line" />
      <div className="card-content flex-container">
        <AddComment
          className="flex-grow-2"
          rock={content.id}
          reload={() => this.setState({ck: this.state.ck + 1})}
        />
        <MoreRock 
          reload={() => this.props.reload()}
          rock={content}
        />
      </div>
      </article>
    )
  }
}

const mapStateToProps = state => ({
})
const mapDispatchToProps = ({
  progressSetValue,
})
export default connect(mapStateToProps, mapDispatchToProps)(Card)
