import React, {Component} from 'react'
import {Popover, Position, Menu, MenuItem, Intent} from '@blueprintjs/core'
import {whoami, deleteRocks} from './actions'

class MoreRock extends Component {
  constructor(props) {
    super(props)
    this.state = {
      me: [],
    }
    whoami()
    .then(json => this.setState({me: [json]}))
  }
  render() {
    const me = this.state.me
    const rock = this.props.rock
    return(
      <Popover content={
          <Menu>
          {me.map(me =>
          me.id == rock.author ?
            <MenuItem
              key={me.id}
              iconName="error"
              onClick={() => deleteRocks(rock.id).then(() => this.props.reload())}
              intent={Intent.DANGER}
              text="삭제" />
          :
            <MenuItem
              key={me.id}
              iconName="error"
              intent={Intent.DANGER}
              text="이 글 보기싫어" />
          )}
          </Menu>
        }
        position={Position.LEFT_BOTTOM} >
        <span className="pt-icon-more pt-icon-large cursor-pointer" />
      </Popover>
    )
  }
}


export default MoreRock
