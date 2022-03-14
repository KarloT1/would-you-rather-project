import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

const YourVoteLabel = () => (
  <div className="badge">
    YOUR VOTE
  </div>
)

class PollResult extends Component {
  
  handleClick = () => {
    this.props.history.push("/")
  }

  render() {
    const { question, user } = this.props
    const optionOneVotes = question.optionOne.votes.length
    const optionTwoVotes = question.optionTwo.votes.length
    const votesTotal = optionOneVotes + optionTwoVotes
    const userVote = user.answers[question.id]

    return (
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
    )
  }
}

function mapStateToProps({ users, authedUser }) {
  const user = users[authedUser]
  return {
    user
  }
}

export default withRouter(connect(mapStateToProps)(PollResult))