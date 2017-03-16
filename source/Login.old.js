import React, {Component} from 'react'
import {login} from './actions'
import {Intent, InputGroup, Button} from '@blueprintjs/core'

class Login extends Component {
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
        <div className="container-600" style={{marginTop: "80px"}}>
          <div className="flex-column-container align-stretch">
            <h4> 광운대학교 만화동아리 </h4>
            <img src="//cia.kw.ac.kr/media/logo.png" 
              className="login-logo"
            />
            <div style={{marginTop: "100px"}}>
              <form onSubmit={e => this.handleSubmit(e)}>
                <div className="flex-container-row">
                  <InputGroup
                    placeholder="아이디"
                    leftIconName="person"
                    onChange={e => this.setState({username: e.target.value})}
                    type="text"
                  />
                  <InputGroup
                    placeholder="패스워드"
                    leftIconName="lock"
                    onChange={e => this.setState({password: e.target.value})}
                    type="password"
                  />
                  <Button iconName="arrow-right"
                    className="login-button"
                    intent={Intent.PRIMARY}
                    type="submit"
                    text="로그인"
                  />
                  <Button 
                    className="login-button"
                    intent={Intent.SUCCESS}
                    onClick={() => this.context.router.push('/signin')}
                    type="button"
                    text="회원가입"
                  />
                  <Button 
                    className="login-button"
                    onClick={() => document.location="http://128.134.57.197/"}
                    type="button"
                    text="구동게"
                  />
                </div>
              </form>
            </div>
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
