import * as React from 'react'
import {Tab2, Tabs2} from '@blueprintjs/core'
import ProfilePanel from './ProfilePanel'
import AccountPanel from './AccountPanel'

class EditProfile extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      tab: "profile",
    }
  }
  render() {
    return(
      <div className="container-980">
        <Tabs2
          id="aside"
          animate={false}
          vertical={true}
          key="horizontal"
          onChange={tab => this.setState({tab})}
          selectedTabId={this.state.tab}
        >
          <Tab2
            className="flex-grow-2"
            id="profile" title="프로필" panel={<ProfilePanel target={this.props.params.id} />} />
          <Tab2 
            className="flex-grow-2"
            id="account" title="계정" panel={<AccountPanel target={this.props.params.id} />} />
        </Tabs2>
      </div>
    )
  }
}

export default EditProfile
