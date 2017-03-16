import React, {Component} from 'react'
import Image from './Image'
import {getMembers} from './actions'
import {Link} from 'react-router'
import {prefix} from './config'

class CardAuthor extends Component {
  constructor(props) {
    super(props)
    this.state = {
      member: []
    }
  }
  componentWillMount() {
    getMembers(this.props.author)
    .then(json => this.setState({member: [json]}))
  }
  render() {
    const member = this.state.member
    return(
      <div className={this.props.className}>
      {
      member.map(member =>
        <div 
          key={member.id} className="flex-container">
          <Image
            imgId={member.profile_image}
            imgClass="card-profile-image"
            wrapperClass="card-profile-image-wrapper"
          />
          <Link
            to={`/members/${this.props.author}`}>
            <div className="card-profile-name">
              {member.last_name}
            </div>
          </Link>
        </div>
      )}
      </div>
    )
  }
}

CardAuthor.contextTypes = {
  router: React.PropTypes.object
}
export default CardAuthor
