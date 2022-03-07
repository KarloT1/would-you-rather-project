import React, { Component } from 'react'

class Poll extends Component {
  constructor(props) {
    super(props)
    
    this.state = {
      viewPoll: false
    }
  }

  handleClick() {
    this.setState(prevState => ({
      viewPoll: !prevState.viewPoll
    }))
  }

  render() {
    const { question, unanswered } = this.props

    return (
      <React.Fragment>
        <h3>Would you rather</h3>
        <p>
          {question.optionOne.text}
          <br/>
          or ...
        </p>
        <button>{unanswered === true ? "Answer Poll" : "Results"}</button>
      </React.Fragment>
    )
  }
}

export default Poll