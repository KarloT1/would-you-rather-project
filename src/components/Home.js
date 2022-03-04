import React, { Component } from 'react'
import { handleInitialData } from '../actions/shared'
import { connect } from 'react-redux'

class Home extends Component {
  render() {
    const { authedUser } = this.props
    return (
      <div>
        Home Page
        <p>Logged in user: {authedUser}</p>
      </div>
    )
  }
}

function mapStateToProps({ authedUser }) {
  return {
    authedUser
  }
}

export default connect(mapStateToProps, { handleInitialData })(Home)