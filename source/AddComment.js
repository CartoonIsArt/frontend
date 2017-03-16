import React, {Component} from 'react'
import {postComments} from './actions'
import {Popover, Position, Menu, MenuItem, Intent} from '@blueprintjs/core'
import Star from './Star'

class AddComment extends Component {
  constructor(props) {
    super(props)
    this.form = {
      rock: this.props.rock
    }
  }
  handleSubmit(e) {
    postComments(this.form)
    .then(() => this.props.reload())
    e.preventDefault()
    return false;
  }
  render() {
    const className = this.props.className + " flex-container"
    return(
      <div className={className}>
        <Star onlyStar={true} rockId={this.props.rock}/>
        <form className="add-comment" onSubmit={e => this.handleSubmit(e)}>
          <input type="text" className="comment" placeholder="댓글"
            onChange={e => this.form.text = e.target.value}
          />
        </form>
      </div>
    )
  }
}


export default AddComment
