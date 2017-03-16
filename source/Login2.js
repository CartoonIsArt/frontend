import React, {Component} from 'react'
import {login} from './actions'
import {Intent, InputGroup, Button} from '@blueprintjs/core'

class Login2 extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: "",
      password: "",
    }
  }
  handleSubmit(e){
    console.log('login')
    e.preventDefault()
    login(this.state)
    .then(stat =>
      stat === 200 &&
      this.context.router.push('/') 
    )
  }
  render() {
    return(
    <div className="im-the-boss">
      <nav className="login">
        <img src="https://cia.kw.ac.kr/media/logo.png" width={80} /> 
      </nav>
      <div className="login-container">
        <div className="flex-grow-2 copy">
          <p className="login-title text-white"> 니가 만화 좀 본다며? </p>
          <p className="text-bright"> 
            CIA는 만화문화 향유(덕질?)에 최적화 되어있습니다.
            그래요 들어와요.
          </p>
        </div>
        <div className="loginform">
          <form onSubmit={e => this.handleSubmit(e)}>
            <InputGroup
              className="login-input"
              placeholder="아이디"
              onChange={e => this.setState({username: e.target.value})}
              type="text"
            />
            <InputGroup
              className="login-input"
              placeholder="패스워드"
              onChange={e => this.setState({password: e.target.value})}
              type="password"
            />
            <Button
              style={{width: "100%"}}
              intent={Intent.SUCCESS}
              type="submit"
              text="로그인"
            />
            <Button
              style={{width: "100%"}}
              onClick={() => this.context.router.push('/signin')}
              type="button"
              text="회원가입"
            />
            <Button
              style={{width: "100%"}}
              onClick={() => document.location="http://128.134.57.197/"}
              type="submit"
              text="구동게"
            />
          </form>
        </div>
      </div>
    </div>
    )
  }
}
Login2.contextTypes = {
  router: React.PropTypes.object
}

export default Login2
