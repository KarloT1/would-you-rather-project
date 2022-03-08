import React, { Component } from 'react'
import { Navigate } from 'react-router-dom'

class PollPreview extends Component {
  constructor(props) {
    super(props)
    
    this.state = {
      viewPoll: false
    }

    this.handleClick = this.handleClick.bind(this)
  }

  handleClick() {
    this.setState(prevState => ({
      viewPoll: !prevState.viewPoll
    }))
  }

  render() {
    const { question, unanswered } = this.props

    if (this.state.viewPoll === true) {
      return <Navigate push to={`/questions/${question.id}`} />
    }

    return (
      <React.Fragment>
        <h3>Would you rather</h3>
        <p>
          {question.optionOne.text}
          <br/>
          or ...
        </p>
        <button onClick={this.handleClick}>{unanswered === true ? "Answer Poll" : "Results"}</button>
      </React.Fragment>
    )
  }
}

export default PollPreview