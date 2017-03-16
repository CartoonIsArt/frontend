import React, {Component} from 'react'
import {Checkbox, InputGroup, Intent} from '@blueprintjs/core'
import {putPassword, letmeout, patchMembers, whoami, getMembers} from './actions'
import Image from './Image'
import Dropzone from 'react-dropzone'
import {prefix} from './config'

class AccountPanel extends Component {
  constructor(props) {
    super(props)
    this.state = {
      me: [],
      valid: true,
      target: [],
      profile_image: undefined,
    }
    whoami()
    .then(json => this.setState({me: [json]}))
    getMembers(this.props.target)
    .then(json => this.setState({target: [json]}))
  }
  handleSubmit(e) {
    //patchMembers(this.props.target, this.form)
    e.preventDefault()
  }
  isValid() {
    if (this.form.newPassword === this.form.newPasswordConfirm) {
      this.setState({valid: true})
    }
    else {
      this.setState({valid: false})
    }
  }
  letmeout() {
    letmeout()
    .then(stat => {
      if(stat === 200) {
        this.context.router.push('/')
      }
      else {
        this.setState({passwordAlert: true})
      }
    })
  }
  handleClick() {
    putPassword(this.form)
    .then(stat => {
      if(stat === 200) {
        this.context.router.push('/')
      }
      else {
        this.setState({passwordAlert: true})
      }
    })
  }
  render() {
    const me = this.state.me
    const target = this.state.target
    return(
      <div>
        <h3> 계정관리 </h3>
        <div className="card-line"
          style={{margin: "16px 0px"}}>
        </div>
        {target.map(target =>
        <form onSubmit={e => this.handleSubmit(e)}>
          {me.map(me => 
          <div>
          <div>
            <div className="profile-input">
              <div> 현재 비밀번호 </div>
              <InputGroup 
                onChange={e => {
                  this.form.password = e.target.value
                  this.setState({passwordAlert: false})
                }}
                type="password" />
              {this.state.passwordAlert &&
                <div className="text-danger"> <small> 패스워드가 틀립니다. </small> </div>
              }
            </div>
            <div className="profile-input">
              <div> 새로운 비밀번호 </div>
              <InputGroup 
                onChange={e => this.form.newPassword = e.target.value}
                type="password" />
            </div>
            <div className="profile-input">
              <div> 새로운 비밀번호(반복) </div>
              <InputGroup 
                onChange={e => {
                  this.form.newPasswordConfirm = e.target.value
                  this.isValid()
                }}
                type="password" />
              {!this.state.valid &&
                <div className="text-danger"> <small> 일치하지 않습니다. </small> </div>
              }
            </div>
            <button type="button" 
              onClick={() => this.letmeout()}
              className="pt-button pt-intent-danger">
              동게 탈퇴할래
            </button>
          </div>
          <div className="flex-container">
            <div className="flex-grow-2"> </div>
            <button 
              onClick={() => handleClick()}
              type="button" className="pt-button pt-intent-primary pt-icon-build">
              그건 아니고 패스워드만 바꿀래 (로그아웃됨)
            </button>
          </div>
          </div>
          )}
        </form>
        )}
      </div>
    )
  }
}
// name, birth, phone, dept, isCont, isGrad, isStaff, isAct, isAnon, isRegular
// name, birth, phone, dept,         Grad,            isAct
//                           Cont             Staff           Anon     Regular


export default AccountPanel
