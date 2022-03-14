import React, { Component } from 'react'

class Error404 extends Component {
  render() {
    return (
      <div className="error-404">
        <h2>Link you are trying to approach doesn't exist.</h2>
        <p>Please return to home page to try again.</p>
      </div>
    )
  }
}

export default Error404