import React, {Component} from 'react'
import {getRocksByURL, logout, getRocks, whoami, getRocksByMemberId, getStarsByMemberId} from './actions'
import Image from './Image'
import Card from './Card'
import {Intent, Menu, Popover, MenuItem, Position} from '@blueprintjs/core'
import {isAlmostScrolled, prefix} from './config'
import {connect} from 'react-redux'
import {progressOnsetValue} from './redux_actions'

class Profile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      me: [],
      rocks: [],
      stars: [],
      favorites: [],
      view: 0,
      next: "",
    }
    this.wrapper = e => this.more(e)
    this.mutex = false
  }
  more(e) {
    const next = this.state.next
    if(!next) {
      return
    }
    e.preventDefault()
    if(this.mutex && isAlmostScrolled()) {
      this.mutex = false
      getRocksByURL(next)
      .then(json => {
        this.setState({rocks: this.state.rocks.concat(json.results)}, () => this.mutex=true)
        this.setState({next: json.next})
      })
    }
  }
  componentWillMount() {
    this.props.progressOnsetValue(0.7)
    whoami()
    .then(json => {
      this.setState({me: [json]})
      getRocksByMemberId(json.id)
      .then(json => this.setState({rocks: json.results}))
      getStarsByMemberId(json.id)
      .then(json => this.setState({stars: json}))
    })  
  }
  componentDidMount() {
    window.addEventListener("scroll", this.wrapper)
  }
  componentWillUnmount() {
    window.removeEventListener("scroll", this.wrapper)
  }
  handleView(i) {
    this.props.progressOnsetValue(0.7)
    this.state.stars.map(star => {
      getRocks(star.rock)
      .then(json => this.setState({favorites: this.state.favorites.concat(json)}))
    })
    this.setState({view: i})
  }
  render() {
    const me = this.state.me
    const stars = this.state.stars
    const mystar = stars.map(s => s.rock)
    const view = this.state.view
    const rocks = this.state.rocks
    const favorites = this.state.favorites
    return(
      <div className="container-600">
        {
        me.map(me =>
        <div key={me.id}>
          <div className="flex-container align-start">
            <Image 
              imgClass="profile-profile"
              wrapperClass="profile-profile-wrapper"
              imgId={me.profile_image} 
            />
            <div className="flex-container-row flex-grow-2">
              <h3 className="flex-container">
                <div className="flex-grow-2">
                  {me.username}
                </div>
                <Popover content={
                    <Menu>
                      <MenuItem 
                        onClick={() => logout()
                          .then(() => this.context.router.push('/login'))
                        }
                        iconName="log-out"
                        intent={Intent.DANGER}
                        text="로그아웃" />
                    </Menu>
                  }
                  position={Position.LEFT_BOTTOM} >
                  <span className="cursor-pointer pt-icon pt-icon-more"> </span>
                </Popover>
              </h3>
              <button 
                className="pt-button profile-button"
                onClick={() => this.context.router.push('/profile/' + me.id)}
                type="button"> 프로필 수정 </button>
              <button 
                onClick={() => this.context.router.push('/members')}
                className="pt-button profile-button"
                type="button"> 회원들 </button> 
            </div>
          </div>
          <div style={{marginTop: "20px"}}>
            <strong> 
              {me.last_name} 
              {me.isActive ? "(활동인구)" : "(비활동인구)" }
            </strong>
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
              <div> 핀 </div>
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

Profile.contextTypes = {
  router: React.PropTypes.object
}
const mapStateToProps = state => ({
})
const mapDispatchToProps = ({
  progressOnsetValue
})
export default connect(mapStateToProps, mapDispatchToProps)(Profile)
