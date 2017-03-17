import React, {Component} from 'react'
import {getMembers} from './actions'

class TooltipContent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      members: []
    }
  }
  componentWillMount() {
    this.props.content.forEach(e => {
      getMembers(e.member)
      .then(json => this.setState({members: this.state.members.concat(json)}))
    })
  }
  render() {
    const members = this.state.members;
    return(
      <span>
        {members.length > 0 ? 
          members.map(member => 
            <div key={member.id}> {member.last_name} </div>
          ) :
          <div>
            이 글에 제일 먼저 핀을 꽂아보세요오!
          </div>
        }
      </span>
    )
  }
}


export default TooltipContent
