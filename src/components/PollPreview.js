import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

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
      return <Redirect push to={`/questions/${question.id}`} />
    }

    return (
      <div className="poll-preview">
        <h3>Would you rather</h3>
        <p>
          {question.optionOne.text}
          <br/>
          or ...
        </p>
        <button onClick={this.handleClick}>{unanswered === true ? "Answer Poll" : "Results"}</button>
      </div>
    )
  }
}

export default PollPreview