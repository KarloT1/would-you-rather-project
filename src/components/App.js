import React, { Component } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { handleInitialData } from '../actions/shared'
import { connect } from 'react-redux'

class App extends Component {
  componentDidMount() {
    this.props.handleInitialData()
  }

  render() {
    return (
      <div className="App">
        Hello World
      </div>
    );
  }
}

export default connect(null, { handleInitialData })(App)