import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

const YourVoteLabel = () => (
  <div style={{backgroundColor: "red"}}>
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
      <React.Fragment>
        <h2>Results:</h2>
        <h4>Would you rather</h4>

        <div>
          {userVote === "optionOne" && <YourVoteLabel />}
          <label for="optionOne">{question.optionOne.text}</label>
          <progress value={((optionOneVotes / votesTotal) * 100).toFixed(2)} max="100" id="optionOne">
            {optionOneVotes} out of {votesTotal} votes
          </progress>
        </div>

        <div>
          {userVote === "optionTwo" && <YourVoteLabel />}
          <label for="optionTwo">{question.optionTwo.text}</label>
          <progress value={((optionTwoVotes / votesTotal) * 100).toFixed(2)} max="100" id="optionTwo">
            {optionTwoVotes} out of {votesTotal} votes
          </progress>
        </div>
        <button onClick={this.handleClick}>Back</button>
      </React.Fragment>
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