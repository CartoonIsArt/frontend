import React, {Component} from 'react'
import {postStar, deleteStar, whoami, getStarsByRockId} from './actions'
import {Intent, Position, Tooltip} from '@blueprintjs/core'
import TooltipContent from './TooltipContent'

class Star extends Component {
  constructor(props) {
    super(props)
    this.state = {
      stars: [],
      me: [],
    }
    this.mutex = false
    this.init()
    whoami()
    .then(json => this.setState({me: [json]}))
  }
  init() {
    getStarsByRockId(this.props.rockId)
    .then(json => this.setState({stars: json}))
  }
  toggleStar() {
    if(this.mutex) {
      return
    }
    this.mutex = true
    const thumbs = this.state.stars.filter(star => star.member == this.state.me[0].id)
    if(thumbs.length > 0 && thumbs[0].isUp) {
      deleteStar(thumbs[0].id)
      .then(() => this.init())
    }
    else {
      postStar({
        member: this.state.me[0].id,
        rock: this.props.rockId,
        isUp: true,
      })
      .then(() => this.init())
    }
    this.mutex = false
  }
  render() {
    const stars = this.state.stars.filter(star => star.isUp)
    const me = this.state.me
    const onlyStar = this.props.onlyStar
    const starEmpty = "pt-icon pt-icon-pin"
    const starFill = "pt-icon pt-icon-unpin pinit"
    const who = stars.map(star => star.member)
    return(
      <div 
        onClick={() => this.toggleStar()}
        className="flex-container cursor-pointer">
        {me.map(me =>
          <span key={me.id} className={who.includes(Number(me.id)) ? starFill : starEmpty}>
          </span>
        )}
        {!onlyStar &&
        <Tooltip
          content={<TooltipContent content={stars} /> }
          position={Position.RIGHT_TOP}
        >
          <div className="text-muted" style={{marginLeft: "4px"}}>
            {stars.length}
          </div>
        </Tooltip>
        }
      </div>
    )
  }
}


export default Star
