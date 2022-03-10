import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import PollQuestion from './PollQuestion'
import PollResult from './PollResult'
import PollPreview from './PollPreview'

const pollTypes = {
	POLL_PREVIEW: "POLL_PREVIEW",
	POLL_QUESTION: "POLL_QUESTION",
	POLL_RESULT: "POLL_RESULT"
}

const PollContent = props => {
	const { pollType, question, unanswered } = props

	switch(pollType) {
		case pollTypes.POLL_PREVIEW:
			return <PollPreview question={question} unanswered={unanswered} />
		case pollTypes.POLL_QUESTION:
			return <PollQuestion question={question} />
		case pollTypes.POLL_RESULT:
			return <PollResult question={question} />
		default:
			return
	}
}

class QuestionCard extends Component {
	render() {
		const { author, question, pollType, badPath, unanswered = null } = this.props

		if(badPath === true) {
			return <Redirect to="/questions/bad_id" />
		}

		return (
			<div className="question-card">
				<div className="question-heading">
					<h3>{author.name} asks:</h3>
					<img src={author.avatarURL} alt="User avatar." />
				</div>
				<React.Fragment>
					<PollContent
						pollType={pollType}
						question={question}
						unanswered={unanswered}
					/>
				</React.Fragment>
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
		pollType,
		badPath = false;
	if (question_id !== undefined) {
		question = questions[question_id]
		author = users[question.author]
		pollType = pollTypes.POLL_PREVIEW
	} else {
		const { question_id } = match.params
		question = questions[question_id]
		const user = users[authedUser]

		if (question === undefined) {
			badPath = true
		} else {
			author = users[question.author]
			pollType = pollTypes.POLL_QUESTION
			if (Object.keys(user.answers).includes(question_id)) {
				pollType = pollTypes.POLL_RESULT
			}
		}
	}

	return {
		badPath,
		question,
		author,
		pollType
	}
}

export default connect(mapStateToProps)(QuestionCard)