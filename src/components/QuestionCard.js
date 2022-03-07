import React, { Component } from 'react'
import { connect } from 'react-redux'

class QuestionCard extends Component {
	render() {
		const { user, children } = this.props
		return (
			<div className="question-card">
				<div className="question-heading">
					<h3>{`${user.name} asks:`}</h3>
					<img src={user.avatarURL} alt="User avatar." />
				</div>
				<div className="question-poll">{children}</div>
			</div>
		)
	}
}

function mapStateToProps({ users }, props) {
	const user = users[props.userId]

	return {
		user
	}
}

export default connect(mapStateToProps)(QuestionCard)