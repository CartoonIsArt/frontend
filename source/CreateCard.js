import React, {Component} from 'react'
import AddCard from './AddCard'
import {prefix} from './config'

class CreateCard extends Component {
  render() {
    return(
      <div className="container-600">
        <AddCard
          reload={() => this.context.router.push('/')}
        />
      </div>
    )
  }
}

CreateCard.contextTypes = {
  router: React.PropTypes.object
}

export default CreateCard
