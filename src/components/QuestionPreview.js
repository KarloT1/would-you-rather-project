import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

class QuestionPreview extends Component {
  constructor(props) {
    super(props)
    
    this.state = {
      viewPoll: false
    }

    this.handleClick = this.handleClick.bind(this)
  }

  handleClick() {
    this.setState(prevState => ({
      viewPoll: !prevState.viewPoll
    }))
  }

  render() {
    const { question, author, unanswered } = this.props

    if (this.state.viewPoll === true) {
      return <Redirect push to={`/questions/${question.id}`} />
    }

    return (
      <React.Fragment>
        <div className="question-heading">
          <h3>{author.name} asks:</h3>
          <img src={author.avatarURL} alt="User avatar." />
        </div>
        <div className="poll-preview">
          <h3>Would you rather</h3>
          <p>
            {question.optionOne.text}
            <br/>
            or ...
          </p>
          <button onClick={this.handleClick}>{unanswered === true ? "Answer Poll" : "Results"}</button>
        </div>
      </React.Fragment>
    )
  }
}

function mapStateToProps({ users, questions }, { question_id }) {
  let question = questions[question_id]
  let author = users[question.author]

  return {
    question,
    author
  }
}

export default connect(mapStateToProps)(QuestionPreview)