import React, { Component } from 'react'
import PollBox from './PollBox'
import { connect } from 'react-redux'

class Unanswered extends Component {
  render() {
    const { unanswered } = this.props

    return (
      <React.Fragment>
        {
          unanswered.sort((a, b) => b.timestamp - a.timestamp)
          .map(question => (
            <PollBox
              key={question.id}
              question_id={question.id}
              unanswered={true}
            />
          ))
        }
      </React.Fragment>
    )
  }
}

function mapStateToProps({ authedUser, users, questions }) {
  const answeredIds = Object.keys(users[authedUser].answers)
  const unanswered = Object.values(questions).filter(question => !answeredIds.includes(question.id))

    return {
      unanswered
    }
}

export default connect(mapStateToProps)(Unanswered)