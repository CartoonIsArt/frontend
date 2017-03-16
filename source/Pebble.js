import React, {Component} from 'react'
import {youtube_parser} from './Youtube'
import ReactMarkdown from 'react-markdown'
import Image from './Image'

class Pebble extends Component {
  render() {
    const content = this.props.content
    const youtubeShortcut = youtube_parser(content.text)
    return(
      <div>
        {
        content.attached_image ?
        <Image
          imgId={content.attached_image}
          imgClass="card-image"
          wrapperClass="card-image-wrapper"
        /> :
        youtubeShortcut &&
        <div className="card-youtube-wrapper">
          <iframe className="card-youtube"
            src={`https://www.youtube.com/embed/${youtubeShortcut}`}
            frameBorder="0"
            allowFullScreen
          />
        </div>
        }
        <div className="card-content">
          <div className="card-text">
            <ReactMarkdown source={content.text} />
          </div>
        </div>
      </div>
    )
  }
}


export default Pebble
