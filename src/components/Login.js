import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setAuthedUser } from '../actions/authedUser'

class Login extends Component {
  constructor(props) {
    super(props)

    this.state = {
      value: "select"
    }
  
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(e) {
    this.setState({
      value: e.target.value
    })
  }

  handleSubmit(e) {
    e.preventDefault()
    const { dispatch, setAuthedUser } = this.props
    const authedUser = this.state.value

    dispatch(setAuthedUser(authedUser))
  }

  render() {
    const { users } = this.props
    
    return (
      <div className="login-box">
        <div className="login-heading">
          <h2>Would You Rather Game</h2>
          <h4>Please sign in to continue.</h4>
        </div>
          
        <form onSubmit={this.handleSubmit} className="login-form">
          <select onChange={this.handleChange} value={this.state.value}>
          <option disabled value="select">Select your profile</option>
            {
              users.map(user => (
                <option value={user.id}>{user.name}</option>
              ))
            }
          </select>
          <button type="submit">Sign in</button>
        </form>        
      </div>
    )
  }
}

function mapStateToProps({ users }) {
  return {
    users: Object.values(users)
  }
}

export default connect(mapStateToProps, { setAuthedUser })(Login)