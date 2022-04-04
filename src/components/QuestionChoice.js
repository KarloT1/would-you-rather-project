import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleSaveQuestionAnswer } from '../actions/users'
import { withRouter } from 'react-router-dom'

class QuestionChoice extends Component {
  constructor(props) {
    super(props) 

    this.state = {
      value: ""
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    this.setState({
      value: event.target.value
    })
  }

  handleSubmit(event) {
    event.preventDefault()
    if (this.state.value !== "") {
      const { authedUser, question, handleSaveQuestionAnswer } = this.props
      handleSaveQuestionAnswer(authedUser, question.id, this.state.value)
    } 
  }

  render() {
    const { author, question } = this.props
    return (
      <React.Fragment>
        <div className="question-heading">
          <h3>{author.name} asks:</h3>
          <img src={author.avatarURL} alt="User avatar." />
        </div>
        <div className="poll-question">
          <h3>Would you rather</h3>
          <form onSubmit={this.handleSubmit} className="poll-question-form">

            <div className="poll-question-input">
              <input 
                type="radio"
                value="optionOne"
                checked={this.state.value === "optionOne"}
                onChange={this.handleChange}
              />
              <label>{question.optionOne.text}</label>
            </div>

            <div className="poll-question-input">
              <input
                type="radio"
                value="optionTwo"
                checked={this.state.value === "optionTwo"}
                onChange={this.handleChange}
              />
              <label>{question.optionTwo.text}</label>
            </div>

            <button type="submit" className={`${this.state.value ? "" : "disabled"}`}>
              Submit your answer
            </button>
          </form>
        </div>
      </React.Fragment>
    )
  } 
}

function mapStateToProps({ users, questions, authedUser }, { match }) {
  const question_id = match.params.question_id
  let question = questions[question_id]
  let author = users[question.author]
  return {
    authedUser,
    author,
    question
  }
}

export default withRouter(connect(mapStateToProps, { handleSaveQuestionAnswer })(QuestionChoice))