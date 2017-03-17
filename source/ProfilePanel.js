import React, {Component} from 'react'
import {Toaster, Checkbox, InputGroup, Intent} from '@blueprintjs/core'
import {patchMembers, whoami, getMembers} from './actions'
import Image from './Image'
import Dropzone from 'react-dropzone'

class ProfilePanel extends Component {
  constructor(props) {
    super(props)
    this.state = {
      me: [],
      target: [],
      profile_image: undefined,
      disabled: false,
    }
    this.form = {}
  }
  componentWillMount() {
    whoami()
    .then(json => this.setState({me: [json]}))
    getMembers(this.props.target)
    .then(json => this.setState({target: [json]}))
    this.toaster = Toaster.create()
  }
  handleSubmit(e) {
    this.setState({disabled: true})
    patchMembers(this.props.target, this.form)
    .then(json => {
      this.setState({disabled: false})
      Number.isInteger(json) ?
        this.toaster.show({
          className: "pt-intent-danger",
          timeout: 1000,
          message: "실패"
      }) :
        this.toaster.show({
          className: "pt-intent-success",
          timeout: 1000,
          message: "성공"
      })
    })
    e.preventDefault()
  }
  onDrop = files => {
    const file = files[0]
    putFiles(file)
    .then(json => {
      this.setState({profile_image: json.id})
      this.form.profile_image = json.id
    })
  }
  render() {
    const me = this.state.me
    const target = this.state.target
    return(
      <div>
        <h3> 프로필 </h3>
        <div className="card-line"
          style={{margin: "16px 0px"}}>
        </div>
        {target.map(target =>
        <form key={target.id} onSubmit={e => this.handleSubmit(e)}>
          {me.map(me => 
          <div>
            <div className="flex-container align-start">
              <div className="flex-grow-2">
                {me.is_staff &&
                <div className="flex-container-row">
                  <Checkbox 
                    defaultChecked={!target.isAnon} 
                    onChange={e => this.form.isAnon = !e.target.checked}> 가입승인 </Checkbox>
                  <Checkbox 
                    defaultChecked={target.isRegularMember} 
                    onChange={e => this.form.isRegularMember = e.target.checked}> 정회원 </Checkbox>
                  <Checkbox 
                    defaultChecked={target.is_staff} 
                    onChange={e => this.form.is_staff = e.target.checked}> 임원 </Checkbox>
                  <Checkbox 
                    defaultChecked={target.isContibuter} 
                    onChange={e => this.form.isContributer = e.target.checked}> 기여자 </Checkbox>
                </div>
                }
                  <Checkbox 
                    defaultChecked={target.isActive} 
                    onChange={e => this.form.isActive = e.target.checked}> 활동인구 </Checkbox>
                  <Checkbox 
                    defaultChecked={target.isGraduate} 
                    onChange={e => this.form.isGraduate = e.target.checked}> 졸업생 </Checkbox>
              </div>
              <div>
                <Dropzone onDrop={this.onDrop}
                  className="profile-dropzone">
                  <Image 
                    imgId={this.state.profile_image ?
                      this.state.profile_image :
                      me.id === target.id ? 
                      me.profile_image : 
                      target.profile_image}
                    wrapperClass="profile-profile-wrapper"
                    imgClass="profile-profile"
                  />
                </Dropzone>
              </div>
            </div>
            <div className="flex-container-row">
              <div className="profile-input">
                <div> 이름 </div>
                <InputGroup 
                  onChange={e => this.form.last_name = e.target.value}
                  placeholder={target.last_name}
                  type="text" />
              </div>
              <div className="profile-input">
                <div> 연락처 </div>
                <InputGroup 
                  onChange={e => this.form.phone_number = e.target.value}
                  placeholder={target.phone_number}
                  type="text" />
              </div>
              <div className="profile-input">
                <div> 학과(부) </div>
                <InputGroup 
                  onChange={e => this.form.department = e.target.value}
                  placeholder={target.department}
                  type="text" />
              </div>
            </div>
            <div className="flex-container">
              <div className="flex-grow-2"> </div>
              <button 
                disabled={this.state.disabled}
                type="submit" className="pt-button pt-button-primary pt-icon-build">
                확인
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


export default ProfilePanel
