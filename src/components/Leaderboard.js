import React, { Component } from 'react'
import { connect } from 'react-redux'

class Leaderboard extends Component {
  render() {
    const { leaderboardData } = this.props

    return (
      <div className="leaderboard">
        {leaderboardData.map((user, id) => (
          <div className="leaderboard-box" key={user.id}>
            <div className="leaderboard-avatar">
              <img src={user.avatarURL} alt="User avatar." />
            </div>
            <div className="leaderboard-numbers">
              <h3>{user.name}</h3>
              <div className="leaderboard-numbers-questions">
                <span>Answered questions</span>
                <span>{user.answerSum}</span>
              </div>
              <div className="leaderboard-numbers-questions">
                <span>Created questions</span>
                <span>{user.questionSum}</span>
              </div>
            </div>
            <div className="leaderboard-score">
              <h3>Score</h3>
              <h3>{user.totalSum}</h3>
            </div>
          </div>
        ))}
      </div>
    )
  }
}

function mapStateToProps({ users }) {
  const leaderboardData = Object.values(users)
    .map(user => ({
      id: user.id,
      name: user.name,
      avatarURL: user.avatarURL,
      answerSum: Object.values(user.answers).length,
      questionSum: user.questions.length,
      totalSum: Object.values(user.answers).length + user.questions.length
    }))
    .sort((a, b) => a.total - b.total)
    .reverse()
    .slice(0, 3)

    return {
      leaderboardData
    }
}

export default connect(mapStateToProps)(Leaderboard)