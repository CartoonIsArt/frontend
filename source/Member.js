import React, {Component} from 'react'
import {getMembers, getRocks, whoami, getRocksByMemberId, getStarsByMemberId} from './actions'
import Image from './Image'
import Card from './Card'
import {Intent, Menu, Popover, MenuItem, Position} from '@blueprintjs/core'
import {fetchFail, prefix} from './config'

class Member extends Component {
  constructor(props) {
    super(props)
    this.state = {
      me: [],
      rocks: [],
      stars: [],
      member: [],
      favorites: [],
      view: 0,
    }
    whoami()
    .then(json => {
      if (json.id === this.props.params.id) {
        this.context.router.push('/profile')
      }
      this.setState({me: [json]})
    })
  }
  componentWillMount() {
    getMembers(this.props.params.id)
    .then(json => {
      Number.isInteger(json) ?
      fetchFail() :
      this.setState({member: [json]})
      getRocksByMemberId(json.id)
      .then(json => this.setState({rocks: json.results}))
      getStarsByMemberId(json.id)
      .then(json => this.setState({stars: json}))
    })
  }
  handleView(i) {
    this.state.stars.map(star => {
      getRocks(star.rock)
      .then(json => this.setState({favorites: this.state.favorites.concat(json)}))
    })
    this.setState({view: i})
  }
  render() {
    const me = this.state.me
    const member = this.state.member
    const stars = this.state.stars
    const mystar = stars.map(s => s.rock)
    const view = this.state.view
    const rocks = this.state.rocks
    const favorites = this.state.favorites
    return(
      <div className="container-600">
        {
        member.map(member =>
        <div key={member.id}>
          <div className="flex-container align-start">
            <Image 
              imgClass="profile-profile"
              wrapperClass="profile-profile-wrapper"
              imgId={member.profile_image} 
            />
            <div className="flex-container-row flex-grow-2">
              <h3 className="flex-container">
                <div className="flex-grow-2">
                  {member.username}
                </div>
                <Popover content={
                    <Menu>
                      <MenuItem 
                        iconName="eye-off"
                        intent={Intent.DANGER}
                        text="차단" />
                    </Menu>
                  }
                  position={Position.LEFT_BOTTOM} >
                  <span className="cursor-pointer pt-icon pt-icon-more"> </span>
                </Popover>
              </h3>
              {me.map(me =>
              me.is_staff && 
                <button type="button"
                  onClick={() => this.context.router.push('/profile/' + member.id)}
                  className="pt-button profile-button"
                  > 정보 수정 </button>
              )}
            </div>
          </div>
          <div style={{marginTop: "20px"}}>
            <strong> 
              {member.last_name} 
              {member.isActive ? "(활동인구)" : "(비활동인구)" }
            </strong>
          </div>
          <div style={{marginTop: "4px"}}>
            {member.department} 
          </div>
          <div className="card-line" 
            style={{marginTop: "30px", marginBottom: "12px"}}> </div>
          <div className="flex-container" style={{marginBottom: "12px"}}>
            <div 
              onClick={() => this.handleView(0)}
              className="profile-slider">
              <div> 샤잇 </div>
              <div> <strong> {rocks.length} </strong> </div>
              <div> 개 </div>
            </div>
            <div 
              onClick={() => this.handleView(1)}
              className="profile-slider">
              <div> 좋아요 </div>
              <div> <strong> {stars.length} </strong> </div>
              <div> 개 </div>
            </div>
          </div>
          {
          view === 0 ?
            rocks.map(rock => 
             <Card key={rock.id} content={rock} />
            ) :
            favorites.map(rock =>
              <Card key={rock.id} content={rock} />
            )
          }
        </div>
        )}
      </div>
    )
  }
}

Member.contextTypes = {
  router: React.PropTypes.object
}
export default Member
