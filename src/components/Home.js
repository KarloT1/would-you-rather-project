import React, { Component } from 'react'
import { connect } from 'react-redux'
import Poll from './Poll'
import QuestionCard from './QuestionCard'

class Home extends Component {
  render() {
    const { usersQuestions } = this.props

    return (
      <div className="home-page">
          <h2>Unanswered</h2>
          {usersQuestions.unanswered.map(question => (
            <QuestionCard
              key={question.id}
              userId={question.author}
            >
            <Poll
              question={question}
              unanswered={true}
            />
            </QuestionCard>
          ))}
        <hr/>
          <h2>Answered</h2>
            {usersQuestions.answered.map(question => (
              <QuestionCard
                key={question.id}
                userId={question.author}
              >
              <Poll
                question={question}
                unanswered={false}
              />
              </QuestionCard>
            ))}
      </div>
    )
  }
}

function mapStateToProps({ authedUser, users, questions }) {
  const answeredIds = Object.keys(users[authedUser].answers)
  const answered = Object.values(questions)
    .filter(question => answeredIds.includes(question.id))
    .sort((a, b) => b.timestamp - a.timestamps)
  const unanswered = Object.values(questions)
    .filter(question => !answered.includes(question.id))
    .sort((a, b) => b.timestamp - a.timestamp)
  
  return {
    usersQuestions: {
      answered, 
      unanswered
    }
  }
}

export default connect(mapStateToProps)(Home)