import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { setAuthedUser } from '../actions/authedUser'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons'

class Nav extends Component {
	handleLogout(e) {
		e.preventDefault()
		this.props.setAuthedUser(null)
	}

	render() {
		const { authedUser, users } = this.props
		return (
			<div className="nav">
				<div className="nav-options">
					<NavLink exact to="/" >Home</NavLink>
					<NavLink to="/new">New Poll</NavLink>
					<NavLink to="/leaderboard">Leaderboard</NavLink>
				</div>
				<div className="nav-logout">
					<img src={users[authedUser].avatarURL} alt="User avatar." />
					<p>{users[authedUser].name}</p>
					<button onClick={this.handleLogout.bind(this)}>
						Logout
						<FontAwesomeIcon icon={faArrowRightFromBracket} />
					</button>
				</div>
			</div>
		)
	}
}

function mapStateToProps({ users, authedUser }) {
	return {
		authedUser,
		users
	}
}

export default connect(mapStateToProps, { setAuthedUser })(Nav)