import React, {Component} from 'react'
import {login} from './actions'
import {Intent, InputGroup, Button} from '@blueprintjs/core'

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: "",
      password: "",
      loginfail: false,
    }
  }
  handleSubmit(e){
    e.preventDefault()
    login(this.state)
    .then(stat =>
      stat === 200 ?
        this.props.params.next !== undefined ?
          this.context.router.push('/rocks/' + this.props.params.next) :
          this.context.router.push('/')
        :
        this.setState({loginfail: true})
    )
  }
  render() {
    return(
    <div className="im-the-boss">
      <nav className="login flex-container">
        <img src="https://cia.kw.ac.kr/media/logo.png" width={80} /> 
        <div className="text-muted flex-grow-2"> 광운대학교 중앙만화동아리 CIA </div>
        <button
          onClick={() => this.context.router.push('/signin')}
          className="pt-button pt-intent-white pt-icon pt-icon-new-person pt-minimal"
          type="button"
        >
          <span className="login-nav-button"> 회원가입 </span>
        </button>
        <button
          onClick={() => document.location="http://128.134.57.197/"}
          className="pt-minimal pt-intent-white pt-button pt-icon pt-icon-history"
          type="button"
        >
          <span className="login-nav-button"> 구동게 </span>
        </button>

      </nav>
      <div className="login-container">
        <div className="flex-grow-2 copy">
          <p className="login-title text-white"> CIA 2.0 </p>
          <p className="text-bright"> 
            CIA는 당신이 더 나은 환경에서 덕질할 수 있도록 발전해왔습니다 . 
          </p>
          <p className="text-bright"> 
            500여권의 만화책, 34인치 티비, 그리고 편안한 소파와 함께 쾌적한 오타쿠라이프를 즐겨보아요.
          </p>
        </div>
        <div className="loginform">
          <form onSubmit={e => this.handleSubmit(e)}>
            <InputGroup
              className="login-input"
              placeholder="아이디"
              onChange={e => this.setState({
                username: e.target.value,
                loginfail: false,
              })}
              type="text"
            />
            <InputGroup
              className="login-input"
              placeholder="패스워드"
              onChange={e => this.setState({
                password: e.target.value,
                loginfail: false,
              })}
              type="password"
            />
            <Button
              style={{width: "100%"}}
              intent={Intent.SUCCESS}
              type="submit"
              text="로그인"
            />
            {this.state.loginfail &&
              <p className="login-fail-text">
                로그인에 실패하였습니다.
              </p>
            }
          </form>
        </div>
      </div>
    </div>
    )
  }
}
Login.contextTypes = {
  router: React.PropTypes.object
}

export default Login
