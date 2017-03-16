import React, {Component} from 'react'
import {getMeta} from './actions'
import ReactMarkdown from 'react-markdown'

class Law extends Component {
  constructor(props) {
    super(props)
    this.state = {
      meta: [],
    }
  }
  componentWillMount() {
    getMeta()
    .then(meta => this.setState({meta}))
  }
  render() {
    const law = this.state.meta.filter(a => a.name === "law")
    return(
      <div>
        <h3> 회칙 </h3>
        <div className="card-line"
          style={{margin: "16px 0px"}}>
        </div>
        {law.map(law =>
          <ReactMarkdown source={law.value} />
        )}
      </div>
    )
  }
}
// name, birth, phone, dept, isCont, isGrad, isStaff, isAct, isAnon, isRegular
// name, birth, phone, dept,         Grad,            isAct
//                           Cont             Staff           Anon     Regular


export default Law
