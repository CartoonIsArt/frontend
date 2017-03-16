import React, {Component} from 'react'
import {patchNotifications, getNotificationsByToMemberId, whoami} from './actions'
import CardAuthor from './CardAuthor'
import {fetchFail, prefix, formatTime} from './config'

class Notifications extends Component {
  constructor(props) {
    super(props)
    this.state = {
      notifications: [],
      view: 0,
    }
  }
  componentWillMount() {
    whoami()
    .then(json => {
      console.log(json)
      getNotificationsByToMemberId(json.id)
      .then(json => 
        Number.isInteger(json) ?
        fetchFail() :
        this.setState({notifications: json.results}))
    })
  }
  init() {
    getNotificationsByToMemberId(this.state.me.id)
   .then(json => this.setSttte({notifications: json.results}))
  }
  readAll() {
    var p = []
    this.state.notifications
    .filter(noti => noti.confirm === 0)
    .map(noti => {
      p = p.concat(patchNotifications(noti.id))
    })
    if (p.length > 0) {
      Promise.all(p)
      .then(() => this.init())
    }
  }
  render() {
    const view = this.state.view
    const notifications = view === 0 ? 
      this.state.notifications :
      this.state.notifications.filter(noti => noti.kind === 2)

    return(
      <div className="container-600">
      <div className="flex-container noti-menu">
        <div className="noti-kind"> 
          <p onClick={() => this.setState({view: 0})} 
            style={{cursor: "pointer"}}
            className={view === 0 ? "text-lapisblue" : "" }
            > 전부 </p>
        </div>
        <div className="noti-kind flex-grow-2"> 
          <p onClick={() => this.setState({view: 1})}
            style={{cursor: "pointer", display: "inline-block"}}
            className={view === 1 ? "text-lapisblue" : "" }
            > 공지 </p>
        </div>
        <button type="button" 
          onClick={() => this.readAll()}
          className="pt-button pt-indent-primary">
          전부읽음
        </button>
      </div>
      <div className="card-line"> </div>
      {
      notifications.map(noti =>
      <div key={noti.id}>
        <div className="notification">
          <div className="flex-container">
            <CardAuthor
              author={noti.from_member}
            />
            <div style={{marginLeft: "4px"}} className="flex-grow-2 text-muted">
              <small> {formatTime(noti.create_date)} </small>
            </div>
            {
            noti.confirm === 0 &&
              <button
                onClick={() => patchNotifications(noti.id).then(() => this.init())}
                className="pt-button pt-minimal pt-intent-success pt-icon-tick"> 읽음?</button>
            }
          </div>
          <div 
            onClick={() => {
              patchNotifications(noti.id).then(() => this.init())
              this.context.router.push(noti.refer)
            }}
            className="flex-container align-start cursor-pointer" 
            style={{padding: "4px"}}>
            <span style={{marginTop: "4px", marginRight: "8px"}} className={
              noti.kind == 0 ? "pt-icon pt-icon-comment" :
              noti.kind == 1 ? "pt-icon pt-icon-star"    :
              noti.kind == 2 ? "pt-icon pt-icon-feed"    :
              ""
            }> </span>
            <div className="flex-grow-2">
              {noti.text}
            </div>
          </div>
        </div>
        <div className="card-line"> </div>
      </div>
      )}
      </div>
    )
  }
}

Notifications.contextTypes = {
  router: React.PropTypes.object
}

export default Notifications
