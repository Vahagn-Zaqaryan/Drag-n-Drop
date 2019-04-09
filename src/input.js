import React, { Component } from 'react';
import './Input.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
        text: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.textGetter(this.state.text);
  }
  render() {
    return (
      <div className="inputs">
        <form onSubmit={this.handleSubmit}>
            <input type="text"  name="text" id="text" onChange={this.handleChange}/>
        </form>
      </div>
    );
  }
}

export default App;
