import React, {Component} from 'react'

class Favorites extends Component {
  constructor(props) {
    super(props)
    this.state = {
      stars: []
    }
    getStarsByMemberId(this.props.memberId)
    .then(json => this.setState({stars: json}))
  }
  render() {
    const stars = this.state.stars
    return (
      {
        stars.map(star => 
        <div key={star.id}>
          <Card
            rockId={star.rock}
          />
        </div>)
      }
    )
  }
}


export default Favorites
