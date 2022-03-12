import React, { Component } from 'react'
import { connect } from 'react-redux'
import QuestionCard from './QuestionCard'

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      changeTab: "unanswered"
    }

    this.handleAnswered = this.handleAnswered.bind(this)
    this.handleUnanswered = this.handleUnanswered.bind(this)
  }

  handleAnswered() {
    this.setState({
      changeTab: "answered"
    })
  }

  handleUnanswered() {
    this.setState({
      changeTab: "unanswered"
    })
  }

  render() {
    const { usersQuestions } = this.props

    return (
      <div className="home-page">
        <div className="home-page-tab">
          <div className="home-page-tab-buttons">
            <button 
              onClick={this.handleUnanswered}
              className={this.state.changeTab === "unanswered" ? "active-tab" : ""}
            >Unanswered
            </button>
            <button 
              onClick={this.handleAnswered}
              className={this.state.changeTab === "answered" ? "active-tab" : ""}
            >Answered
            </button>
          </div>
          <div className="home-page-tabs">  
            {
              this.state.changeTab === "unanswered" && (
                usersQuestions.unanswered.map(question => (
                  <QuestionCard
                    key={question.id}
                    question_id={question.id}
                    unanswered={true}
                  />
                ))
              )
            }
            {
              this.state.changeTab === "answered" && (
                usersQuestions.answered.map(question => (
                  <QuestionCard
                    key={question.id}
                    question_id={question.id}
                    unanswered={false}
                  />
                ))
              )
            }
          </div>
        </div>
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
    .filter(question => !answeredIds.includes(question.id))
    .sort((a, b) => b.timestamp - a.timestamp)
  
  return {
    usersQuestions: {
      answered, 
      unanswered
    }
  }
}

export default connect(mapStateToProps)(Home)