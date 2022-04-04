import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import QuestionChoice from './QuestionChoice'
import QuestionPreview from './QuestionPreview'
import QuestionResult from './QuestionResult'
import { withRouter } from 'react-router-dom'

class PollBox extends Component {
	render() {
		const { question, unanswered = null, usersAnswers, question_id } = this.props
		
		return (
			<div className="question-card">
				{
					question_id === undefined
					? [
						question === undefined
						? <Redirect to="/question/wrongId" />
						: [
							usersAnswers.includes(question.id)
							? <QuestionResult />
							: <QuestionChoice />
						]
					] : <QuestionPreview question_id={question_id} unanswered={unanswered} />
				}
			</div>
		)
	}
}

function mapStateToProps({ users, questions, authedUser }, { match, question_id}) {
	let question;
	let usersAnswers;
	let user;

	if (question_id === undefined) {
		question_id = match.params.question_id
		question = questions[question_id]
		user = users[authedUser]
		usersAnswers = Object.keys(user.answers)
	}

	return {
		question,
		usersAnswers,
		match
	}
}

export default withRouter(connect(mapStateToProps)(PollBox))