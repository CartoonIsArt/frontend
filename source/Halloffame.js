import React, {Component} from 'react'

class Halloffame extends Component {
  render() {
    return(
      <div>
        <h3> 버그헌터 </h3>
        <div className="card-line"
          style={{margin: "16px 0px"}}>
        </div>
        <p> 동게 버그를 찾아낸 회원들 </p>
        <p>
          17기 박재범 <br />
          13기 강깊은 <br />
          18기 김민정 <br />
          17기 김은성 <br />
          18기 홍원근 <br />
          11기 김영원 <br />
        </p>
      </div>
    )
  }
}

export default Halloffame
