import React, {Component} from 'react'
import {postComments} from './actions'
import {Popover, Position, Menu, MenuItem, Intent} from '@blueprintjs/core'
import Star from './Star'

class AddComment extends Component {
  constructor(props) {
    super(props)
    this.state = {
      disabled: false,
    }
    this.form = {
      rock: this.props.rock,
    }
  }
  handleSubmit(e) {
    this.setState({disabled: true})
    postComments(this.form)
    .then(stat => {
      this.props.reload()
      this.setState({disabled: false})
      if (stat === 201) {
        this.refs.com.value=""
      }
    })
    e.preventDefault()
    return false;
  }
  render() {
    const className = this.props.className + " flex-container"
    return(
      <div className={className}>
        <span className="pt-icon pt-icon-comment"> </span>
        <form className="add-comment" onSubmit={e => this.handleSubmit(e)}>
          <input ref="com" type="text" className="comment" placeholder="댓글"
            disabled={this.state.disabled}
            onChange={e => this.form.text = e.target.value}
          />
        </form>
      </div>
    )
  }
}


export default AddComment
