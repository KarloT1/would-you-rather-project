import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setAuthedUser } from '../actions/authedUser'
import logo from '../assets/images/wyr-logo.png'

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
    const { setAuthedUser } = this.props
    const authedUser = this.state.value

    new Promise((res, rej) => {
      setTimeout(() => res(), 500)
    }).then(() => setAuthedUser(authedUser))
  }

  render() {
    const { users } = this.props
    
    return (
      <div className="login-box">
        <div className="login-heading">
          <img src={logo} alt="Game logo." />
          <h2>Please sign in to continue.</h2>
        </div>
          
        <form onSubmit={this.handleSubmit} className="login-form">
          <select onChange={this.handleChange} value={this.state.value}>
          <option disabled value="select">Select your profile</option>
            {
              users.map(user => (
                <option 
                  key={user.id} 
                  value={user.id}
                >
                  {user.name}
                </option>
              ))
            }
          </select>
          {this.state.value === "select" && (
            <p>Please select a profile to sign in.</p>
          )}
          <button type="submit" className={`${this.state.value === "select" ? "disabled" : ""}`} disabled={this.state.value === "select"}>Sign in</button>
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