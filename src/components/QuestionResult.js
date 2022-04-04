import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

const YourVoteLabel = () => (
  <div className="badge">
    YOUR VOTE
  </div>
)

class QuestionResult extends Component {
  constructor(props) {
    super(props)

    this.handleClick = this.handleClick.bind(this)
  }

  handleClick() {
    this.props.history.push("/")
  }

  render() {
    const { question, user, author } = this.props
    const optionOneVotes = question.optionOne.votes.length
    const optionTwoVotes = question.optionTwo.votes.length
    const votesTotal = optionOneVotes + optionTwoVotes
    const userVote = user.answers[question.id]

    return (
      <React.Fragment>
        <div className="question-heading">
					<h3>{author.name} asks:</h3>
					<img src={author.avatarURL} alt="User avatar." />
				</div>
        <div className="poll-results">
          <div className="poll-results-heading">
            <h3>Results:</h3>
            <h4>Would you rather</h4>
          </div>

          <div className="poll-results-content">
            {userVote === "optionOne" && <YourVoteLabel />}
            <p>{question.optionOne.text}</p>
            <div className="progress">
              <div className="bar" style={{width: ((optionOneVotes / votesTotal) * 100) + "%"}}>
                { ((optionOneVotes / votesTotal) * 100).toFixed(2) + "%" }
              </div>
            </div>
            <p>{optionOneVotes} out of {votesTotal} votes</p>
          </div>

          <div className="poll-results-content">
            {userVote === "optionTwo" && <YourVoteLabel />}
            <p>{question.optionTwo.text}</p>
            <div className="progress">
              <div className="bar" style={{width: ((optionTwoVotes / votesTotal) * 100) + "%"}}>
              { ((optionTwoVotes / votesTotal) * 100).toFixed(2) + "%" }
              </div>
            </div>
            <p>{optionTwoVotes} out of {votesTotal} votes</p>
          </div>
          <div className="poll-results-button">
            <button onClick={this.handleClick}>Back</button>
          </div>
        </div>
      </React.Fragment>
    )
  }
}

function mapStateToProps({ users, questions, authedUser }, { match }) {
  const question_id = match.params.question_id
  const user = users[authedUser]
  let question = questions[question_id]
  let author = users[question.author]
  return {
    author,
    question,
    user
  }
}

export default withRouter(connect(mapStateToProps)(QuestionResult))