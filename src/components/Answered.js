import React, { Component } from 'react'
import PollBox from './PollBox'
import { connect } from 'react-redux'

class Answered extends Component {
  render() {
    const { answered } = this.props

    return (
      <React.Fragment>
        {
          answered.sort((a, b) => b.timestamp - a.timestamp)
          .map(question => (
            <PollBox
              key={question.id}
              question_id={question.id}
              unanswered={false}
            />
          ))
        }
      </React.Fragment> 
    )
  }
}

function mapStateToProps({ authedUser, users, questions }) {
  const answeredIds = Object.keys(users[authedUser].answers)
  const answered = Object.values(questions).filter(question => answeredIds.includes(question.id))

  return {
    answered
  }
}

export default connect(mapStateToProps)(Answered)