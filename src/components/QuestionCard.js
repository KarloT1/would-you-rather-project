import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import PollQuestion from './PollQuestion'
import PollResult from './PollResult'
import PollPreview from './PollPreview'

class QuestionCard extends Component {
	render() {
		const { author, question, pollComponent, unanswered = null, wrongId } = this.props

		if (wrongId) {
			<Redirect to="/question/wrongId" />
		}
		return (
			<div className="question-card">
				<div className="question-heading">
					<h3>{author.name} asks:</h3>
					<img src={author.avatarURL} alt="User avatar." />
				</div>
				{
					pollComponent === "pollPreview"
					? (
						<PollPreview question={question} unanswered={unanswered} />
					) : [
						pollComponent === "pollQuestion"
						? (
							<PollQuestion question={question} />
						) : (
							<PollResult question={question} />
						)
					]
				}
			</div>
		)

	}
}

function mapStateToProps(
	{ users, questions, authedUser },
	{ match, question_id}
) {
	let question,
		author,
		pollComponent,
		wrongId = false
	if (question_id !== undefined) {
		question = questions[question_id]
		author = users[question.author]
		pollComponent = "pollPreview"
	} else {
		const { question_id } = match.params
		question = questions[question_id]
		const user = users[authedUser]

		if (question === undefined) {
			wrongId = true
		} else {
			author = users[question.author]
			pollComponent = "pollQuestion"
			if (Object.keys(user.answers).includes(question_id)) {
				pollComponent = "pollResult"
			}
		}
	}

	return {
		question,
		author,
		pollComponent,
		wrongId
	}
}

export default connect(mapStateToProps)(QuestionCard)