import React, { Component } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import { handleInitialData } from '../actions/shared'
import { connect } from 'react-redux'
import Login from './Login'
import Nav from './Nav'
import Home from './Home'

class App extends Component {
  componentDidMount() {
    this.props.handleInitialData()
  }

  render() {
    const { authedUser } = this.props
    return (
      // <BrowserRouter>
      //   <div className="app">
      //     {authedUser === null ? (
      //       <Route 
      //         render={() => (
              // <div className="app">
              //   <Login />
              // </div>
      //         )}
      //       />
      //     ) : (
      //       <React.Fragment>
      //         <Nav />
      //         <Route exact path="/" component={Home} />
      //       </React.Fragment>
      //     )}
      //   </div>
      // </BrowserRouter>
      <div className="app">
        { authedUser === null 
        ? <Login />
        : <Home />
        }
      </div>
    )
  }
}

function mapStateToProps({ authedUser }) {
  return {
    authedUser
  }
}

export default connect(mapStateToProps, { handleInitialData })(App)