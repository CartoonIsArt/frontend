import React, {Component} from 'react'
import {whoami, deleteComments, getParentlessCommentsByRockId} from './actions'
import CardAuthor from './CardAuthor'
import {formatTime} from './config'
import Comment from './Comment'

class Comments extends Component {
  constructor(props) {
    super(props)
    this.state = {
      comments: [],
      me: [],
      more: false,
    }
  }
  init() {
    getParentlessCommentsByRockId(this.props.rockId)
    .then(json => this.setState({comments: json}))
  }
  componentWillMount() {
    this.init()
    whoami()
    .then(json => this.setState({me: [json]}))
  }
  deleteComment(id) {
    deleteComments(id)
    .then(() => this.init())
  }
  render() {
    const comments = this.state.more ?
      this.state.comments :
      this.state.comments.slice(-3)
    const commentCount = this.state.comments.length
    const me = this.state.me
    return(
      <div>
        {
        (!this.state.more && commentCount > 3) &&
          <p 
            className="more-comment"
            onClick={() => this.setState({more: !this.state.more})}> 모든댓글 </p>
        }
        {comments.map(comment =>
          <Comment
            key={comment.id}
            content={comment}
            me={me}
            deleteComment={id => this.deleteComment(id)}
            depth={1}
          />
        )}
      </div>
    )
  }
}



export default Comments
