import React, {Component} from 'react'
import {whoami} from './actions'
import {doorlock} from './PPPPP.js'

class Doorlock extends Component {
  constructor(props) {
    super(props)
    this.state = {
      me: {}
    }
  }
  componentWillMount() {
    whoami()
    .then(me => this.setState({me}))
  }
  render() {
    const me = this.state.me
    return(
      <div>
        <h3> 동방 비밀번호 </h3>
        <div className="card-line"
          style={{margin: "16px 0px"}}>
        </div>
        <p>
        {me.isRegularMember ?
          doorlock :
          <div>
            <img src="https://cia.kw.ac.kr/static/neogulman.png" alt="neogul" 
              style={{width: "100%"}}
            />
            <p> "정회원 심사부터 통과하라구!" </p>
          </div>
        }
        </p>
      </div>
    )
  }
}

export default Doorlock
