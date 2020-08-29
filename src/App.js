import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
    }
  }

  render() {
    return (
      <div className="container">
        <h1>Choice maker</h1>
        <div className="question">
          <h2>Question</h2>
          <input 
            type="text"
            placeholder="Enter a question..."
          />
        </div>
        <div className="options">
          <h2>Options</h2>
          <div className="answers">
          <input 
            type="text"
            placeholder="A."
          />
          <input 
            type="text"
            placeholder="B."
          />
          <input 
            type="text"
            placeholder="C."
          />
          </div>
        </div>
        <button className="btn">Answer</button>
      </div>
    )
  }
}




export default App;