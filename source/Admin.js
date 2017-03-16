import React, {Component} from 'react'
import {InputGroup} from '@blueprintjs/core'
import {getAllMembers} from './actions'
import Image from './Image'
import {fetchFail, prefix} from './config'
import {Link} from 'react-router'

class Admin extends Component {
  constructor(props) {
    super(props)
    this.state = {
      members: [],
      view: 0,
      activates: [],
      token: "",
    }
  }
  componentWillMount() {
    getAllMembers()
    .then(members => {
      Number.isInteger(members) ? 
      fetchFail() :
      this.setState({members})
    })
  }
  handleFilter(e) {
    this.setState({token: e.target.value})
  }
  render() {
    const members = this.state.members.sort((a, b) => 
      a.date_joined > b.date_joined ? -1 : 1
    )
    const activates = this.state.members.filter(member => member.isActive)
    const view = this.state.view === 0 ? members : activates
    const me = this.state.me
    return(
      <div className="container-600">
        <InputGroup
          type="text"
          leftIconName="search"
          onChange={e => this.handleFilter(e)}
          placeholder="ex) 배준호"
          rightElement={
            <button type="button"
              className="pt-button pt-minimal pt-icon-arrow-right" />
          }
        />
        <div className="flex-container" style={{marginTop: "4px"}}>
          <div 
            onClick={() => this.setState({view: 0})}
            className="flex-container-row profile-slider">
            <div> all </div>
            <div> <strong> {members.length} </strong> </div>
          </div>
          <div 
            onClick={() => this.setState({view: 1})}
            className="flex-container-row profile-slider">
            <div> activate </div>
            <div> <strong> {activates.length} </strong> </div>
          </div>
        </div>
        {
        view.filter(member => member.last_name.includes(this.state.token))
        .map(member =>
          <div key={member.id} className="flex-container manage-box">
            <Image
              imgId={member.profile_image}
              imgClass="manage-profile"
              wrapperClass="manage-profile-wrapper"
            /> 
            <Link 
                to={`/members/${member.id}`}
                className="flex-grow-2"
                style={{marginLeft: "4px"}}> 
                {member.last_name}
                {member.isAnon &&
                  "(미승인계정)"}
            </Link>
          </div>
        )}
      </div>
    )
  }
}


export default Admin
