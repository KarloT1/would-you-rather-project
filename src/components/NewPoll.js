import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { handleSaveQuestion } from '../actions/questions'

class NewPoll extends Component {
  constructor(props) {
    super(props)

    this.state = {
      validSubmit: false,
      isLoading: false,
      option1: "",
      option2: ""
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  
  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit(e) {
    e.preventDefault()
    const { authedUser, handleSaveQuestion } = this.props
    const { option1, option2 } = this.state

    new Promise((res, rej) => {
      this.setState({
        isLoading: true
      })
      handleSaveQuestion(option1, option2, authedUser)
      setTimeout(() => res("success"), 1000)
    }).then(() => {
      this.setState({
        option1: "",
        option2: ""
      })
      this.setState({
        validSubmit: true
      })
    })
  }

  render() {
    const disabled = this.state.option1 === "" || this.state.option2 === ""

    if(this.state.validSubmit === true) {
      return <Redirect to="/" />
    }

    return (
      <div className="new-poll">
        <div className="new-poll-heading">
          <h3>Create a New Poll</h3>
          {this.state.isLoading && (
            <p>Loading...</p>
          )}
          <p>Complete the question:</p>
          <p>Would you rather...</p>
        </div>
        <form onSubmit={this.handleSubmit} className="new-poll-form">
          <input
            type="text"
            name="option1"
            placeholder="Enter option one..."
            value={this.state.option1}
            onChange={this.handleChange}
          />
          <h3>OR</h3>
          <input
            type="text"
            name="option2"
            placeholder="Enter option two..."
            value={this.state.option2}
            onChange={this.handleChange}
          />
          <button type="submit" disabled={disabled}>
            Submit your Poll
          </button>
        </form>
      </div>
    )
  }
}

function mapStateToProps({ authedUser }) {
  return {
    authedUser
  }
}

export default connect(mapStateToProps, { handleSaveQuestion })(NewPoll)