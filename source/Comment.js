import React, {Component} from 'react'
import {formatTime} from './config'
import CardAuthor from './CardAuthor'
import Linkify from 'react-linkify'
import Image from './Image'
import {deleteComments, postComments, getCommentsByParent} from './actions'
import {Alert, EditableText, Intent} from '@blueprintjs/core'
import {Link} from 'react-router'
import {prefix} from './config'

class Comment extends Component {
  constructor(props) {
    super(props)
    this.state = {
      createRecomment: false,
      recomments: [],
      text: "",
      rock: this.props.content.rock,
      parent_comment: this.props.content.id,
      alertDelte: false,
      isRecommentDisabled: false,
    }
  }
  init() {
    this.props.depth === 1 &&
    getCommentsByParent(this.props.content.id)
    .then(json => this.setState({recomments: json}))
    this.setState({text: ""})
    this.setState({isRecommentDisabled: false})
  }
  componentWillMount() {
    this.init()
  }
  deleteComment() {
    deleteComments(this.props.content.id)
    .then(() => this.init())
  }
  recommentSubmit() {
    this.setState({isRecommentDisabled: true})
    postComments(this.state)
    .then(() => this.init())
  }
  render() {
    const content = this.props.content
    const me = this.props.me
    const createRecomment = this.state.createRecomment
    const recomments = this.state.recomments
    const depth=this.props.depth
    const text = this.state.text
    const isRecommentDisabled = this.state.isRecommentDisabled
    return(
    <div className={this.props.className && this.props.className}>
      <div className="flex-container comment">
        <CardAuthor
          className="flex-grow-2"
          author={content.author}
        />
        <div style={{marginRight: "4px"}}>
          <small className="text-muted">
            {formatTime(content.write_date)}
          </small>
        </div>
        {me.map(me =>
          me.id == content.author &&
          <div key={me.id}>
            <button type="button"
              onClick={() => this.setState({alertDelete: true})}
              className="pt-button pt-minimal pt-icon-small-cross" />
            <Alert
              className="alert"
              isOpen={this.state.alertDelete}
              confirmButtonText="네"
              onConfirm={() => this.props.deleteComment(content.id)}
              intent={Intent.DANGER}
              cancelButtonText="아니오"
              onCancel={() => this.setState({alertDelete: false})}
            >
              <p> 진짜 지워요? </p>
            </Alert>
          </div>
        )}
      </div>
      <div className="comment-text">
      <Linkify>
        {content.text} 
      </Linkify>
      </div>
      {depth === 1 &&
        <p 
          onClick={() => this.setState({createRecomment: !this.state.createRecomment})}
          className="more-comment comment-text"> 답글 </p>
      }
      {depth === 1 && recomments.map(recomment =>
        <Comment
          key={recomment.id}
          className="recomment"
          content={recomment}
          deleteComment={() => this.deleteComment()}
          me={me}
          depth={depth+1}
        />
      )}
      {createRecomment &&
        <div className="recomment">
          <div className="flex-container comment" style={{marginBottom: "4px"}}>
            <Image
              imgId={me[0].profile_image}
              imgClass="card-profile-image"
              wrapperClass="card-profile-image-wrapper"
            />
            <Link
              to={`/members/${me.id}`}>
              <div className="card-profile-name">
                {me[0].last_name}
              </div>
            </Link>
          </div>
          <div className="comment-text">
            <textarea
              style={{width: "100%"}}
              onChange={e => this.setState({text: e.target.value})}
              value={text}
              placeholder="답글"
              disabled={isRecommentDisabled}
            >
            </textarea>
            <div className="flex-container">
              <div className="flex-grow-2"> 
              </div>
              <p 
                style={{marginTop: "4px"}}
                onClick={() => this.recommentSubmit()}
                className="more-comment"> 답글 </p>
            </div>
          </div>
        </div>
      }
    </div>
    )
  }
}


export default Comment
