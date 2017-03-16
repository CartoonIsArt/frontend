import React, {Component} from 'react'
import {getRocksByURL, getTimeline} from './actions'
import Card from './Card'
import AddCard from './AddCard'
import {connect} from 'react-redux'
import {progressOnsetValue, progressSetValue, progressOff} from './redux_actions'
import {isAlmostScrolled} from './config'

class Timeline extends Component {
  constructor(props) {
    super(props)
    this.state = {
      rocks: [],
      next: "",
    }
    this.mutex = true
    this.wrapper = e => this.more(e)
  }
  componentWillMount() {
    this.init()
  }
  more(e) {
    const next = this.state.next
    if(next == undefined || next == null || next == "") {
      return;
    }
    e.preventDefault()
    if(this.mutex && isAlmostScrolled()) {
      this.mutex = false
      getRocksByURL(next)
      .then(json => { 
        this.setState({rocks: this.state.rocks.concat(json.results)}, () => this.mutex = true)
        this.setState({next: json.next})
      })
    }
  }
  componentDidMount() {
    window.addEventListener("scroll", this.wrapper)
  }
  componentWillUnmount() {
    window.removeEventListener("scroll", this.wrapper)
  }
  init() {
    this.props.progressOnsetValue(0.7)
    getTimeline()
    .then(json => {
      if(!Number.isInteger(json)) {
        this.setState({rocks: json.results})
        this.setState({next: json.next})
      }
      this.props.progressSetValue(0.9)
    })
  }
  render() {
    const rocks = this.state.rocks
    return(
      <div className="container-600">
        <AddCard 
          reload={() => this.init()}
        />
        {
          rocks.map( rock =>
            <Card
              key={rock.id}
              content={rock}
              reload={() => this.init()}
            />
          )
        }
      </div>
    )
  }
}

const mapStateToProps = state => ({
  progress: state.progress
})
const mapDispatchToProps = ({
  progressOnsetValue,
  progressSetValue,
  progressOff
})
export default connect(mapStateToProps, mapDispatchToProps)(Timeline)
