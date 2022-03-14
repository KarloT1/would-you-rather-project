import React, { Component } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { handleInitialData } from '../actions/shared'
import { connect } from 'react-redux'
import Login from './Login'
import Nav from './Nav'
import Home from './Home'
import QuestionCard from './QuestionCard'
import NewPoll from './NewPoll'
import Error404 from './Error404'
import Leaderboard from './Leaderboard'

class App extends Component {
  componentDidMount() {
    this.props.handleInitialData()
  }

  render() {
    const { authedUser } = this.props
    return (
      <BrowserRouter>
        <React.Fragment>
          <div className="app">
            { authedUser === null 
            ? <Login />
            : <React.Fragment>
                <Nav />
                <Switch>
                  <Route exact path="/" component={Home} />
                  <Route path="/questions/bad_id" component={Error404} />
                  <Route path="/questions/:question_id" component={QuestionCard} />
                  <Route path="/new" component={NewPoll} />
                  <Route path="/leaderboard" component={Leaderboard} />
                  <Route component={Error404} />
                </Switch>
              </React.Fragment>
            }
          </div>
        </React.Fragment>
      </BrowserRouter>
    )
  }
}

function mapStateToProps({ authedUser }) {
  return {
    authedUser
  }
}

export default connect(mapStateToProps, { handleInitialData })(App)