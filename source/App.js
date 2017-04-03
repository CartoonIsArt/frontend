import React, {Component} from 'react'
import {render} from 'react-dom'
import About from './About'
import Signin from './Signin'
import Login from './Login'
import Progressbar from './Progressbar'
import Navigationbar from './Navigationbar'
import Timeline from './Timeline'
//import Favorites from './Favorites'
import EditProfile from './EditProfile'
import Profile from './Profile'
import Notifications from './Notifications'
import Admin from './Admin'
import CreateCard from './CreateCard'
import OneCard from './OneCard'
import Member from './Member'
import Search from './Search'
import {browserHistory, Router, Route, Link, IndexRoute} from 'react-router'
import {prefix} from './config'
import thunk from 'redux-thunk'
import {Provider} from 'react-redux'
import {applyMiddleware, createStore, combineReducers} from 'redux'
import shyAReducer from './reducers'


const store = createStore(
  shyAReducer,
  applyMiddleware(thunk)
)


class App extends Component {
  render() {
    return (
    <div>
      <Navigationbar />
      <Progressbar />
      <div className="nav-padding">
        {this.props.children}
      </div>
    </div>
    )
  }
}


render(
<Provider store={store}>
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Timeline} />
      <Route path="notifications" component={Notifications} />
      <Route path="members" component={Admin} />
      <Route path="members/:id" component={Member} />
      <Route path="create" component={CreateCard} />
      <Route path="signin" component={Signin} />
      <Route path="login" component={Login} />
      <Route path="login/:next" component={Login} />
      <Route path="about" component={About} />
      <Route path="search" component={Search} />
      <Route path="profile" component={Profile} />
      <Route path="profile/:id" component={EditProfile} />
      <Route path="rocks/:id" component={OneCard} />
    </Route>
  </Router>
</Provider>
,  document.getElementById("root"))
