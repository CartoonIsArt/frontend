import React, {Component} from 'react'
import {Link} from 'react-router'
import {prefix} from './config'
import {Intent, Tag} from '@blueprintjs/core'
import {getNotificationsByToMemberId, whoami} from './actions'

class Navigationbar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      len: 0,
    }
  }
  init() {
    whoami()
    .then(json =>
      getNotificationsByToMemberId(json.id)
      .then(json => {
        this.setState({len: json.results.filter(a => !a.confirm).length})
      })
    )
  }
  componentWillMount() {
    this.init()
  }
  handleClick(to) {
    this.init()
    this.context.router.push(to)
  }
  render() {
    const create = '/create'
    const timeline = '/'
    const notifications = '/notifications'
    const search = '/search'
    const profile = '/profile'
    const len = this.state.len
    return(
    <nav className="pt-navbar pt-fixed-top .modifier">
      <div className="pt-navbar-group">
          <div className="col-4" onClick={() => this.handleClick(create)}>
            <div className="nav-button-cover">
              <span className="pt-minimal pt-icon-edit pt-icon-large" />
            </div>
          </div>
        <div className="col-4" onClick={() => this.handleClick(search)}>
          <div className="nav-button-cover">
            <span className="pt-minimal pt-icon-search pt-icon-large" />
          </div>
        </div>
          <div className="col-4 logo" onClick={() => this.handleClick(timeline)}>
            <div className="nav-button-cover logo">
              <img src="https://cia.kw.ac.kr/static/logo80.png" />
            </div>
          </div>
          <div className="col-4" onClick={() => this.handleClick(notifications) }>
            <div className="nav-button-cover">
              <div className="flex-container">
                <span className="pt-minimal pt-icon-notifications pt-icon-large" />
                {
                  len > 0 &&
                    <Tag intent={Intent.PRIMARY}> {
                      len > 9 ? 
                      "9+" :
                      len
                    }</Tag>
                }
              </div>
            </div>
          </div>
          <div className="col-4" onClick={() => this.handleClick(profile)}>
            <div className="nav-button-cover">
              <span className="pt-minimal pt-icon-person pt-icon-large" />
            </div>
          </div>
      </div>
    </nav>
    )
  }
}
Navigationbar.contextTypes = {
  router: React.PropTypes.object
}

export default Navigationbar
