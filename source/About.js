import React, {Component} from 'react'
import {Tabs2, Tab2} from '@blueprintjs/core'
import Law from './Law'
import Halloffame from './Halloffame'
import Struct from './Struct'

class About extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tab: "law"
    }
  }
  render() {
    return(
      <div className="container-980">
        <Tabs2
          id="aboutAside"
          animate={false}
          vertical={true}
          key="horizontal"
          onChange={tab => this.setState({tab})}
          selectedTabId={this.state.tab}
        >
          <Tab2
            id="law"
            title="회칙"
            panel={<Law />}
          />
          <Tab2
            id="halloffame"
            title="버그헌터"
            panel={<Halloffame />}
          />
          <Tab2
            id="wanttosay"
            title="개발자"
            panel={<Struct />}
          />
        </Tabs2>
      </div>
    )
  }
}


export default About
