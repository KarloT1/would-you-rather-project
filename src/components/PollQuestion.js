import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleSaveQuestionAnswer } from '../actions/users'

class PollQuestion extends Component {
  constructor(props) {
    super(props)

    this.state = {
      value: ""
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(e) {
    this.setState({
      value: e.target.value
    })
  }

  handleSubmit(e) {
    e.preventDefault()
    if (this.state.value !== "") {
      const { authedUser, question, handleSaveQuestionAnswer } = this.props
      handleSaveQuestionAnswer(authedUser, question.id, this.state.value)
    }
  }

  render() {
    const { question } = this.props
    const disabled = this.state.value === "" ? true : false

    return (
      <div className="poll-question">
        <h5>Would you rather</h5>
        <form onSubmit={this.handleSubmit}>

          <label>{question.optionOne.text}</label>
          <input 
            type="radio"
            value="optionOne"
            checked={this.state.value === "optionOne"}
            onChange={this.handleChange}
          />

          <label>{question.optionTwo.text}</label>
          <input
            type="radio"
            value="optionTwo"
            checked={this.state.value === "optionTwo"}
            onChange={this.handleChange}
          />
          <button type="submit" disabled={disabled}>
            Submit your answer
          </button>
        </form>
      </div>
    )
  }
}

function mapStateToProps({ authedUser }, { match }) {
  return {
    authedUser
  }
}

export default connect(mapStateToProps, { handleSaveQuestionAnswer })(PollQuestion)