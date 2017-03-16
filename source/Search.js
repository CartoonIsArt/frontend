import React, {Component} from 'react'
import {InputGroup} from '@blueprintjs/core'
import {getRocksBySearch} from './actions'
import Card from './Card'

class Search extends Component {
  constructor(props) {
    super(props)
    this.state = {
      results: [],
    }
  }
  handleChange(e) {
    this.setState({keyword: e.target.value})
  }
  handleSubmit(e) {
    getRocksBySearch(this.state.keyword)
    .then(json => this.setState({results: json.results}))
    e.preventDefault()
  }
  render() {
    const results = this.state.results
    return(
      <div className="container-600">
      <form 
        style={{marginBottom: "8px"}}
        onSubmit={e => this.handleSubmit(e)}>
        <InputGroup
          type="text"
          leftIconName="search"
          placeholder="ex) 회의록"
          onChange={e => this.handleChange(e)}
          rightElement={
            <button type="submit"
              className="pt-button pt-minimal pt-icon-arrow-right" />
          }
        />
      </form>
        {results.map(result =>
          <Card
            key={result.id}
            content={result}
          />
        )}
        <div>
          <button type="button"
            onClick={() => this.context.router.push('/about')}
            className="pt-button">
            고오급 정보
          </button>
          <button type="button"
            onClick={() => document.location="http://128.134.57.197"}
            className="pt-button pt-minimal">
            구동게 바로가기
          </button>
        </div>
      </div>
    )
  }
}

Search.contextTypes = {
  router: React.PropTypes.object
}

export default Search
