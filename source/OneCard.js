import React, {Component} from 'react'
import {getRocks} from './actions'
import Card from './Card'
import {NonIdealState} from '@blueprintjs/core'

class OneCard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      content: [],
    }
    getRocks(this.props.params.id)
    .then(json => {
      Number.isInteger(json) ?
      this.context.router.push("/login/" + this.props.params.id) :
      this.setState({content: [json]})
    })
  }
  render() {
    const content = this.state.content
    return(
      <div className="container-600">
      {
      content.map(content =>
        content.id !== undefined ?
        <Card
          key={content.id}
          content={content}
          reload={() => this.context.router.goBack()}
        /> :
        <NonIdealState
          visual="trash"
          title="그런 글 없어요"
          description="지운듯?"
        />
      )} 
      </div>
    )
  }
}

OneCard.contextTypes = {
  router: React.PropTypes.object
}

export default OneCard
