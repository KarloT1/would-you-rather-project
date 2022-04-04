import React, { Component } from 'react'
import Answered from './Answered'
import Unanswered from './Unanswered'

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
                <Unanswered />
              )
            }
            {
              this.state.changeTab === "answered" && (
                <Answered />
              )
            }
          </div>
        </div>
      </div>
    )
  }
}

export default Home