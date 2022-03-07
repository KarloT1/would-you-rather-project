import React, { Component } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { handleInitialData } from '../actions/shared'
import { connect } from 'react-redux'
import Login from './Login'
import Nav from './Nav'
import Home from './Home'
import { LoadingBar } from 'react-redux-loading-bar'

class App extends Component {
  componentDidMount() {
    this.props.handleInitialData()
  }

  render() {
    const { authedUser } = this.props
    return (
      <BrowserRouter>
        <React.Fragment>
          <LoadingBar />
          <div className="app">
            { authedUser === null 
            ? <Login />
            : <Routes>
                <Route exact path="/" element={ <Home /> } />
              </Routes>
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